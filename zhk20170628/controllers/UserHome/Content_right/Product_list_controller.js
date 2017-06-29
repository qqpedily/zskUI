define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Product_list_controller', function ($scope, $http, $filter) {
        $scope.pageIndex = 1;
        $scope.pageCount = 1;

        $scope.pageSize = 5;
        //上一页
        $scope.LastPage = function () {
            if ($scope.pageIndex <= 1) {
                alert("已经是首页了");
            } else {
                $scope.ConferenceTopicList($scope.pageIndex - 1);
                $scope.pageIndex -= 1;
            }
        }
        //下一页
        $scope.NextPage = function () {
            if ($scope.pageIndex >= $scope.pageCount) {
                alert("已经是最后一页了");
            } else {
                $scope.ConferenceTopicList($scope.pageIndex + 1);
                $scope.pageIndex += 1;
            }
        }

        $scope.CurrentPage = function (pageIndex) {
            $scope.ConferenceTopicList(pageIndex);
            $scope.pageIndex = pageIndex;
        }

        $scope.ConferenceTopicList = function (pageIndex) {
            $http({
                url: "http://192.168.199.239:8013/User/GetUserPageList?pageSize=" + $scope.pageSize + "&curPage=" + pageIndex,
                method: 'get'
            }).success(function (data) {
                $scope.Data = data.UserList;
                $scope.pageCount = parseInt((data.TotalCount + $scope.pageSize - 1) / $scope.pageSize);
                $scope.DataCount = data.TotalCount;
            });
        }

        $scope.ConferenceTopicList(1);

    });
});