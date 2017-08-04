docViewerApp.controller('PdftronCtrl', ['$rootScope', '$scope', '$mdDialog', '$mdMedia',
    function(                            $rootScope,   $scope,   $mdDialog, $mdMedia) {
        $rootScope.selectedPage = 'pdftron';

        $scope.pdftronPreview = function() {
            var document = "pdftron-dist/GettingStarted.xod";

            $mdDialog.show(
                {
                    templateUrl: "views/pdftron/createPreviewDialog.html",
                    locals: {
                        document: document
                    },
                    bindToController: true,
                    clickOutsideToClose: false,
                    fullscreen: $mdMedia('xs'),
                    controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
                        $scope.previewDocument = this.document;
                        var prevarr = $scope.previewDocument.split('/');
                        $scope.previewDocumentName = prevarr[prevarr.length - 1];
                        $scope.showDocument = true;
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        }
                    }]
                }
            )
        };
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
            previewDocument:'='
        },
        template: html,
        controller: ['$scope', '$timeout', function($scope, $timeout) {
            $scope.pdfFile="";
            $scope.loadingTokens = true;

            if ($scope.previewDocument) {
                $timeout(function() {
                    $scope.loadingTokens = false;
                    $scope.pdfFile=$scope.previewDocument;
                },1000);
            }
        }],
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
}])

.factory("PdftronPreviewService", [function () {
    var pdftronViewer;

    var displayDocument = function(path) {
        var PDFTRON_ROOT_DIRECTORY = 'pdftron-dist/',
            viewerElement = document.getElementById('NewtonDocumentPreviewer');

        // We are wrapping the PDFTron isMobileDevice function. The PDFTron version uses the
        // 'userAgent' string. On ie11 desktops, the word 'Touch' is in the userAgent string
        // which forces the mobile viewer to be used. Our wrapper function below does some extra
        // checking to see if we are on ie11 desktops.
        if (typeof PDFTron.WebViewer.isMobileDevice === 'function') {
            PDFTron.WebViewer.isMobileDevice = isMobileDeviceWrapper(PDFTron.WebViewer.isMobileDevice);
        }

        if (viewerElement) {
            if (pdftronViewer) {
                pdftronViewer.loadDocument(path);
            } else {
                pdftronViewer = new PDFTron.WebViewer(
                    {
                        path: PDFTRON_ROOT_DIRECTORY+'lib',
                        initialDoc: path,
                        config: "views/pdftron/config.js",
                        type: 'html5,html5mobile',
                        documentType: "xod",
                        streaming: true,
                        enableAnnotations: false,
                        mobileRedirect: false
                    }, viewerElement);
            }
            return pdftronViewer;
        }
    };

    var destroyViewer = function() {
        pdftronViewer = null;
    };

    function isMobileDeviceWrapper(pdftronIsMobileDevice) {
        return function() {
            // return false;
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
}]);


