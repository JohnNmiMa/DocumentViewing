docSignApp.controller('AdminCtrl', ['$rootScope', '$scope', 'AdminService', function($rootScope, $scope, adminSvc) {
    $rootScope.selectedPage = 'admin';

    $scope.data = {};

    function init() {
        var adminModel = adminSvc.getModel();

        $scope.data.integratorKey = "";
        $scope.data.username = "";
        $scope.data.password = "";

        if (!_.isEmpty(adminModel)) {
            $scope.data = adminModel;
        }
    }

    $scope.submit = function() {
        if($scope.adminForm.$valid) {
            console.log('Valid Form Submitted: ', $scope.data);
            adminSvc.setModel($scope.data);
        } else {
            console.log('The Form "myForm" is invalid');
        }
    };

    init();
}]);

