docSignApp.factory('AdminService', ['$window', function($window) {
    var getModel = function() {
        var model = $window.sessionStorage.getItem('AdminDocSignModel');
        return model ? JSON.parse(model) : null;
    };
    var setModel = function(data) {
        if (_.isEmpty(data)) return;
        $window.sessionStorage.setItem('AdminDocSignModel', JSON.stringify(angular.copy(data)));
    };
    var setPassword = function(password) {
        var model = getModel();
        model.password = password;
        setModel(model);
    };

    return {
        // Model API
        getModel: getModel,
        setModel: setModel,
        setPassword: setPassword
    }
}]);