define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Read_periodical_controller', function ($scope, $http,$rootScope) {
        ajaxGet(1);
        $scope.flag = false;
        var postArr = [];

        function ajaxGet(curPage) {
            $http({
                url: BaseURL + "/Attention/GetRelationUserAttentionPeriodicalBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=8&curPage=" + curPage,
                method: "Get"
            }).success(function (data) {
                $scope.scholarList = data.Data;
                $scope.TotalCount = data.TotalCount;
                $scope.flag = true;
                //响应成功
            }).error(function (data, header, config, status) {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            });
        }

        // 全选操作
        $scope.sleleAll = function () {
            $('.liebiao_detail_bottom ul li input').attr('checked', 'checked');
        }
        // postArr删除操作
        function ajaxPost() {
            $("input[name='test']:checked").each(function () { // 遍历选中的checkbox
                postArr.push($(this).parents('li').attr('data-value'));
                $(this).parents('li').remove();
            });
        };


        $scope.deleteAll = function (text) {
            if ($("input[name='test']:checked").length > 0) {
                layer.confirm(text, {
                    btn: ['确认', '取消'],
                    btn2: function (index, layero) {

                    }
                }, function (index) {
                    // 获取页面数据
                    ajaxPost();
                    alert(postArr);
                    layer.close(index);
                });
            } else {
                layer.confirm('还未选中！', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });

            }
        };
        $scope.$watch('flag', function () {
            var setPage = {
                "index": function (i) {
                    ajaxGet(i);
                }
            }
            $("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
        })
    })
})