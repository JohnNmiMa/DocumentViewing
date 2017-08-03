docSignApp

.constant('DOCUSIGN_DEMO_URL', 'https://demo.docusign.net/restapi/v2')

.factory('DocuSignService', ['$http', '$q', 'AdminService', 'DOCUSIGN_DEMO_URL', function($http, $q, adminSvc, DOCUSIGN_DEMO_URL) {

    var login_info = {},
        ds_templates = {};

    var login = function() {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: DOCUSIGN_DEMO_URL + "/login_information?api_password=true&include_account_id_guid=true",
                headers: buildCredsHeader()
            };

        if (_.isEmpty(req.headers)) {
            defer.reject({statusText:"Invalid DocuSign credentials header"});
        } else if (_.isEmpty(login_info)) {
            $http(req).then(function(data) {
                login_info = data.data;
                adminSvc.setPassword(login_info.apiPassword);
                defer.resolve(data.data);
            }, function(response) { defer.reject(response); });
        } else {
            // We've already logged in - return the info
            defer.resolve(login_info);
        }

        return defer.promise;
    };

    var templates = function() {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: login_info.loginAccounts[0].baseUrl + "/templates",
                headers: buildCredsHeader()
            };

        $http(req).then(function(data) {
            ds_templates = data.data.envelopeTemplates;
            defer.resolve(data.data);
        }, function(response) { defer.reject(response); });

        return defer.promise;
    };

    var createAccount = function() {
    };

    var accounts = function() {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: login_info.loginAccounts[0].baseUrl,
                headers: buildCredsHeader()
            };

        $http(req).then(function(data) {
            defer.resolve(data.data);
        }, function(response) { defer.reject(response); });

        return defer.promise;
    };

    var envelopes = function() {
        var defer = $q.defer(),
            req = {
                method: 'GET',
                url: login_info.loginAccounts[0].baseUrl + "/envelopes?from_date=01-01-1970",
                headers: buildCredsHeader()
            };

        $http(req).then(function(data) {
            defer.resolve(data.data);
        }, function(response) { defer.reject(response); });

        return defer.promise;
    }

    var envelopeUsingServerTemplate = function() {
        var defer = $q.defer(),
            req = {
                method: 'POST',
                url: login_info.loginAccounts[0].baseUrl + "/envelopes",
                headers: buildCredsHeader(),
                data: {
                    "status":"sent",
                    "emailBlurb":"Welcome to JohnCo. We are offering you a position at JohnCo, and are looking forward to working with you. Please sign the enclosed IGR job offer letter.",
                    "emailSubject": "JohnCo IGR Offer Letter - please read and sign!",
                    "templateId": ds_templates[1].templateId,
                    "templateRoles":[
                        {
                            "email":"johnmarksjr@gmail.com", // Add real email addr here
                            "name":"James T Kirk",
                            "roleName":"Signer 1",
                            "routingOrder":"2",
                            "tabs": {
                                "signHereTabs": [{
                                    "anchorString": "Sign here:",
                                    "anchorXOffset": "10",
                                    "anchorYOffset": "-22",
                                    "anchorIgnoreIfNotPresent": "false",
                                    "anchorUnits": "pixels"
                                }],
                                "dateSignedTabs": [{
                                    "anchorString": "Date here:",
                                    "anchorXOffset": "0",
                                    "anchorYOffset": "-18",
                                    "anchorIgnoreIfNotPresent": "false",
                                    "anchorUnits": "pixels"
                                }]
                            }
                        },
                        {
                            "email":"john@newtonsoftware.com", // Add real email addr here
                            "name":"John Kirk",
                            "roleName":"Signer 2",
                            "routingOrder":"1",
                            "tabs": {
                                "signHereTabs": [{
                                    "anchorString": "Sign here:",
                                    "anchorXOffset": "90",
                                    "anchorYOffset": "-22",
                                    "anchorIgnoreIfNotPresent": "false",
                                    "anchorUnits": "pixels"
                                }]
                            }
                        }
                    ]
                }
            };

        $http(req).then(function(data) {
            defer.resolve(data.data);
        }, function(response) {
            defer.reject(response);
        });

        return defer.promise;
    };

    var getAccountInfo = function() {
        return login().then(accounts);
    };
    var getTemplates = function() {
        return login().then(templates);
    };
    var getEnvelopes = function() {
        return login().then(envelopes);
    };
    var sendEnvelopeUsingJohnCoServerTemplate = function() {
        return login().then(templates).then(envelopeUsingServerTemplate);
    };

    /***** Utils *****/
    function buildCredsHeader() {
        var creds = adminSvc.getModel(),
            credsHeader = '',
            header = {};

        if (!_.isEmpty(creds)) {
            credsHeader = '<DocuSignCredentials>' +
                    '<Username>' + creds.username + '</Username>' +
                    '<Password>' + creds.password + '</Password>' +
                    '<IntegratorKey>' + creds.integratorKey + '</IntegratorKey>' +
                '</DocuSignCredentials>';

            header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-DocuSign-Authentication': credsHeader
            }
        }
        return header;
    }

    return {
        /* DocuSign Util APIs */
        login: login,
        createAccount: createAccount,
        getAccountInfo: getAccountInfo,
        getTemplates: getTemplates,
        getEnvelopes: getEnvelopes,

        /* Envelope/Signing-request creation/sending */
        sendEnvelopeUsingJohnCoServerTemplate: sendEnvelopeUsingJohnCoServerTemplate
    }
}]);
