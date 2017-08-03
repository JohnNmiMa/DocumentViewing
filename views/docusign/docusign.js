docSignApp.controller('DocuSignCtrl', ['$rootScope', '$scope', '$uibModal', 'DocuSignService',
function(                               $rootScope,   $scope,   $uibModal,   docuSignSvc) {
    $rootScope.selectedPage = 'docusign';

    $scope.login = function() {
        docuSignSvc.login()
        .then(function(data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(response) {
            $scope.response = JSON.stringify(response, undefined, 2);
        }).finally(function() {
        });
    };

    $scope.createAccount = function() {
        //docuSignSvc.createAccount()
        //.then(function(data) {
        //    $scope.response = JSON.stringify(data, undefined, 2);
        //}).catch(function(response) {
        //    $scope.response = JSON.stringify(response, undefined, 2);
        //})
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'docusignModal.html',
            controller: 'DocuSignModalCtrl',
            size: "",
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };
    $scope.selectAccount = function() {
    };

    $scope.getAccountInfo = function() {
        docuSignSvc.getAccountInfo()
        .then(function(data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(response) {
            $scope.response = JSON.stringify(response, undefined, 2);
        })
    };

    $scope.getTemplates = function() {
        docuSignSvc.getTemplates()
        .then(function(data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(response) {
            $scope.response = JSON.stringify(response, undefined, 2);
        })
    };

    $scope.getEnvelopes = function() {
        docuSignSvc.getEnvelopes()
        .then(function(data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(response) {
            $scope.response = JSON.stringify(response, undefined, 2);
        })
    };

    $scope.sendEnvelopeUsingJohnCoServerTemplate = function() {
        docuSignSvc.sendEnvelopeUsingJohnCoServerTemplate()
        .then(function (data) {
            $scope.response = JSON.stringify(data, undefined, 2);
        }).catch(function(response) {
            $scope.response = JSON.stringify(response, undefined, 2);
        })
    };

    /* Utils */
}])

.controller('DocuSignModalCtrl', ['$scope', '$uibModalInstance', function ($scope,   $uibModalInstance) {

    $scope.data = {};

    function init() {
        //var adminModel = adminSvc.getModel();

        $scope.data.username = "";
        $scope.data.password = "";

        //if (!_.isEmpty(adminModel)) {
        //    $scope.data = adminModel;
        //}
    }

    $scope.ok = function () {
        //$uibModalInstance.close($scope.selected.item);
        $uibModalInstance.close();
    };

    $scope.submit = function() {
        if($scope.docusignCreateAccountForm.$valid) {
            console.log('Valid Form Submitted: ', $scope.data);
            //adminSvc.setModel($scope.data);
            $uibModalInstance.close();
        } else {
            console.log('The Form "docusignCreateAccountForm" is invalid');
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    init();
}]);
