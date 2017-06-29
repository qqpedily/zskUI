define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Fav_periodical_controller', function ($scope, $http,$rootScope) {
        ajaxGet(1);

        function ajaxGet(curPage) {
            $http({
                url: BaseURL + "/User/GetRelationUserCollectPeriodicalBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=10&curPage=" + curPage,
                method: "Get"
            }).success(function (data) {
                $scope.articleList = data.Data;
                $scope.TotalCount = data.TotalCount;
                //响应成功
            }).error(function (data, header, config, status) {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            });
        }

        $scope.checkAll = function () {
            $("input[name='test']").attr('checked', true);
        };
        // 获取要删除或者导出的数据的id。
        function ajaxPost() {
            var postArr = [];
            $("input[name='test']:checked").each(function () { // 遍历选中的checkbox
                postArr.push($(this).parents('li').attr('data-value'));
                $(this).parents('li').remove();
            });
            console.log(postArr);
            return postArr;
        };
        $scope.DeleteItem = function (text) {
            if ($("input[name='test']:checked").length > 0) {
                layer.confirm(text, {
                    btn: ['确认', '取消'],
                    btn2: function (index, layero) {

                    }
                }, function (index) {
                    // 获取页面数据   
                    var postArr = ajaxPost();
                    console.log(postArr);
                    postDelete(postArr);
                    layer.close(index);
                });
            } else {
                layer.confirm('还未选中', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            }
        };
        // 发送删除数据的请求
        function postDelete(data) {
            $http({
                url: BaseURL + "/User/DeleteRelationUserCollectPeriodicalByList?idlist=" + data,
                method: "post",
                data: {
                    "idlist": data
                }
            }).success(function (result) {
                if (result.IsSucceed == true) {
                    layer.confirm('删除成功！', {
                        btn: ['确认'],
                    }, function (index) {
                        layer.close(index);
                    });
                }
            }).error(function (data) {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            })
        };
        //导出功能
        $scope.exportData = function (text) {
            if ($("input[name='test']:checked").length > 0) {
                layer.confirm(text, {
                    btn: ['确认', '取消'],
                    btn2: function (index, layero) {

                    }
                }, function (index) {
                    layer.confirm(text, {
                            btn: ['导出为CSV', '导出enoteca', '导出为Word'],
                            btn2: function (index, layero) {

                            }
                        }, function (index) {
                            // 获取页面数据
                            layer.close(index);
                        }),
                        function () {

                        };
                    layer.close(index);
                });
            } else {
                layer.confirm('还未选中', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            }
        };

        // function DeleteArticle(data) {
        // 	$http({
        // 		url: BaseURL + "User/DeleteRelationUserCollectProducts",
        // 		method: "post",
        // 		data: data
        // 	}).success(function (data) {
        // 		console.log(data);
        // 	}).error(function (data) {
        // 		$scope.msg = "您的网络出现波动，请刷新后重试！";
        // 		$scope.IsDisplay = true;
        // 	});
        // };

    })
})