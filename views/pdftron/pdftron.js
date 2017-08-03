docViewerApp.controller('PdftronCtrl', ['$rootScope', '$scope',
function(                              $rootScope,   $scope) {
    $rootScope.selectedPage = 'pdftron';

    $scope.showDocument = false;
    $scope.pdftronPreview = function() {
        $scope.document = "/pdftron-dist/GettingStarted.xod";
        $scope.showDocument = true;
    }
}])

.factory("PdftronPreviewService", [function () {
    var pdftronViewer;

    var displayDocument = function(path) {
        var PDFTRON_ROOT_DIRECTORY = '/pdftron-dist/',
            viewerElement = document.getElementById('NewtonDocumentPreviewer');

        // We are using our own mobile device checking function, rather that the PDFTron version. The PDFTron
        // version uses the 'userAgent' string. On ie11 desktop, the word 'Touch' is in the userAgent string,
        // and in the PDFTron check, it the mobile viewer is used.
        PDFTron.WebViewer.isMobileDevice = isMobileDeviceWrapper(PDFTron.WebViewer.isMobileDevice);

        if (!_.isEmpty(viewerElement)) {
            if (pdftronViewer) {
                pdftronViewer.loadDocument(path);
            } else {
                pdftronViewer = new PDFTron.WebViewer(
                    {
                        path: PDFTRON_ROOT_DIRECTORY+'lib',
                        initialDoc: path,
                        config: "/views/pdftron/config.js",
                        type: 'html5,html5mobile',
                        documentType: "xod",
                        streaming: true,
                        enableAnnotations: false,
                        mobileRedirect: false
                    }, viewerElement);
                // l: "demo:john@newtonsoftware.com:70d2d53d015ea30c9db20e4430fa2983d18e7aa30f7354c207",
            }
            return pdftronViewer;
        }
    };

    var destroyViewer = function() {
        pdftronViewer = null;
    };

    function isMobileDeviceWrapper(pdftronIsMobileDevice) {
        return function() {
            var isMobileDevice = pdftronIsMobileDevice();
            if (isMobileDevice && (navigator.userAgent.match(/Trident/i) || navigator.userAgent.match(/Edge/i)) ) {
                // We are on a Window's device (IE* or Edge). Use the scrollbarWidth test to see if touch.
                return PDFTron.WebViewer.scrollbarWidth() === 0;
            }
            return isMobileDevice;
        }
    }

    return {
        displayDocument: displayDocument,
        destroyViewer: destroyViewer
    }
}])

// Various dialog to approximate the Newton app layout/dialogs

.directive("createPreviewDialog", ['$timeout', function($timeout) {

    return {
        restrict: "E",
        templateUrl: "/views/pdftron/createPreviewDialog.html",
        scope: {
            dataProvider: '=provider',
            clientId: '='
        },
        controller: ['$scope', function($scope) {
            $scope.activeIndex = 0;
            $scope.file =  $scope.dataProvider.files[0];
            $scope.tokens = $scope.dataProvider.tokens;
            $scope.signingEnabled = $scope.dataProvider.signingEnabled;

            $scope.cancelDialog = function() {
                $scope.$emit("closeOfferLetterPreview");
            };

            $scope.switchFile = function(file, index) {
                $scope.file = null; //Remove flex paper so it reloads
                $scope.activeIndex = index;
                $timeout(function() {
                    $scope.file = file;
                }, 0);
            }
        }]
    }
}])

.controller('previewDialogCtrl', ['$scope', '$timeout',
    function($scope, $timeout) {

        $scope.pdfFile="";
        $scope.loadingTokens = true;

        if ($scope.document) {
            $timeout(function() {
                $scope.loadingTokens = false;
                $scope.pdfFile=$scope.document;
            },1000);
        }
    }
])

.directive("previewDialog", ['PdftronPreviewService', function(pdftronSvc) {
    var html =
        '<div id="NewtonDocumentPreviewer">' +
            '<div layout="column" ng-show="loadingTokens" layout-align="center center" style="height:95%; width:100%;">' +
                '<md-progress-circular md-mode="indeterminate"></md-progress-circular>' +
            '</div>' +
        '</div>';

    return {
        restrict: "E",
        replace: true,
        scope:{
            document:'='
        },
        template: html,
        controller: 'previewDialogCtrl',
        link : function(scope) {

            scope.$watch('pdfFile', function (newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    pdftronSvc.displayDocument(scope.pdfFile);
                }
            });

            scope.$on('$destroy', function () {
                pdftronSvc.destroyViewer();
            });
        }
    }
}]);
