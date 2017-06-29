define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Fav_topic_controller', function ($scope, $http, $filter,$rootScope) {
        $http({
            url: BaseURL + "/User/GetRelationUserCollectThemeBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=10&curPage=1",
            method: "Get"
        }).success(function (data) {
            $scope.topicList = data.Data;
            //响应成功
        }).error(function (data, header, config, status) {
            layer.confirm('请求失败，请刷新重试', {
                btn: ['确认'],
            }, function (index) {
                layer.close(index);
            });
        });
        // 取消收藏事件
        $scope.resolve = function ($event, text) {
            layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {

                }
            }, function (index) {
                var postNum = $($event.target).val();
                $($event.target).parents('tr').remove();
                var json = {
                    'UUID': postNum
                };
                var a = JSON.stringify(json);
                // 发送postNum到后台
                deletePost(a);
                layer.close(index);
            });
        };

        function deletePost(data) {
            $http({
                url: BaseURL + "/User/DeleteRelationUserCollectTheme",
                method: "post",
                data: data
            }).success(function (result) {
                if (result.IsSucceed == true) {
                    layer.confirm('删除成功！', {
                        btn: ['确认'],
                    }, function (index) {
                        layer.close(index);
                    });
                }
            }).error(function () {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            })
        };
    })
})