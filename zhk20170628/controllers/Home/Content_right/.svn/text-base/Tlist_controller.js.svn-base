define(function (require) {
    var app = require('../../../javascripts/app');

    app.controller('Tlist_controller', function ($scope, $http) {
        $http({
            //  url: "http://10.0.130.39:8010/GetDataService.svc/Get5MonthlyRepayDataRecord",
            url: "http://47.92.90.65:9555/SYSCollege/GetData",
            method: "Get"
        }).success(function (data, header, config, status) {
                        
              $scope.Tables = data;
            //响应成功
        }).error(function (data, header, config, status) {
            $scope.msg = "您的网络出现波动，请刷新后重试！";
            $scope.IsDisplay = true;
            //处理响应失败
        });

    });
});
