define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Claim_done_controller', function ($scope,$state, $http,$rootScope) {
        $scope.flag = false;
        ajaxGet(1);
        function ajaxGet(curPage) {
            $http({
                // 已认领状态码 - 2
                url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserIDAndStatus?sysuserID=" + $rootScope.uid + "&UserClaimWorksStatus=2&pageSize=10&curPage="+curPage,
                method: "Get"
            }).success(function (data, header, config, status) {
                $scope.Data = data.Data;
                $scope.TotalCount = data.TotalCount;
                $scope.flag = true;
            }).error(function (data, header, config, status) {
                // 处理相应请求
            });
        };
        //点击文章标题跳转详情页
        $scope.nextYe = function(id) {
			$state.go('index.Research.Article_detail', {
				'data': id
			})
		}
        $scope.saveAll = function (text) {
            layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {

                }
            }, function (index) {
            	for(var i=0,len=$scope.Data.length;i<len;i++){
                	$http({
			            url: BaseURL+"/User/AddOrUpdateRelationUserClaimWorks",
			            method: "POST",
			            data:$scope.Data[i]
			        }).success(function (status) {
			            //响应成功
			        }).error(function (error) {
			            //处理响应失败
			        });
                }
                layer.close(index);
            });
        }
        /*// 点击进入首页 传入对应的参数
        $scope.first_index = function () {
            ajaxGet(1);
        }*/
        // 分页操作
        $scope.$watch('flag', function () {
            var setPage = {
                "index": function (i) {
                    ajaxGet(i);
                }
            }
            $("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
        });
    });
})