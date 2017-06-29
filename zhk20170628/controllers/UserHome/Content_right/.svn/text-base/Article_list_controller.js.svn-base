define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Article_list_controller', function ($scope, $http, $filter, $state,$rootScope) {
        var rs = $rootScope;
//      ajaxGet(1); // 第一次请求
		load();		
        $scope.flag = false;
        var postArr = [];
		
		function load(){
			$http({
                // 待认领状态码 - 0
                url: BaseURL + "/StaticProductions/GetByUserID",
                method: "Get",
                params:{
                	"userID":$rootScope.uid,
                }
           }).success(function (data) {
                $scope.Data = data;
                $scope.totalCount = data.TotalCount;
                $scope.flag = true;
            }).error(function (data) {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            });
//			$http({
                /*// 待认领状态码 - 0
                url: BaseURL + "/Productions/GetLoadProductionByMetaData",
                method: "Get"
                params:{
                	'columname':'author',
                	'metaDataValue':,
                	'pageSize':20,
                	'curPage':1
                }
            }).success(function (data) {
                $scope.Data = data.Data;
                $scope.totalCount = data.TotalCount;
                $scope.flag = true;
            }).error(function (data) {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            });*/
		}
        /*function ajaxGet(curPage) {
            $http({
                // 待认领状态码 - 0
                url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserIDAndStatus?sysuserID=" + $rootScope.uid + "&UserClaimWorksStatus=4&pageSize=100&curPage=" + curPage,
                method: "Get"
            }).success(function (data) {
                $scope.Data = data.Data;
                $scope.totalCount = data.TotalCount;
                $scope.flag = true;
            }).error(function (data) {
                layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
            });
        };*/
        // 保存操作 
        $scope.saveAll = function (text) {
            if ($("input[name='test']:checked").length > 0) {
                layer.confirm(text, {
                    btn: ['确认', '取消'],
                    btn2: function (index, layero) {

                    }
                }, function (index) {
                    ajaxPost();
                    alert(postArr);
                    layer.close(index);
                });
            } else {
                layer.confirm('还未选中', {
                    btn: ['确认']
                })
            }
        };
        //跳转作品详情页
        $scope.nextYe = function(id) {
			$state.go('index.Research.Article_detail', {
				'data': id
			})
		}
        // 获取页面数据
        function ajaxPost() {
            $("input[name='test']:checked").each(function () { // 遍历选中的checkbox
                postArr.push($(this).parents('tr').attr('data-value'));
            });
        };
        // 全选操作
        $scope.checkAll = function () {
			$("input[name='subBox']").each(function(){
				this.checked = true;
			})
        };
        // 通过监控flag的值来生成分页
        $scope.$watch('flag', function () {
            var setPage = {
                "index": function (i) {
//                  load(i);
                }
            }
            $("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
        })
    })
})