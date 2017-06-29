define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Claim_refuse_controller', function ($scope,$state, $http, $filter,$rootScope) {
        $scope.flag = false;
        // 开始页面加载
            ajaxGet(1);
        //是否是我的作品点击事件
        $scope.is_mine = function(type,index){
        	if(type){
        		$scope.Data[index].IsHave = '1';
        	}else{
        		$scope.Data[index].IsHave = '0';
        	}
        }
        //保存按钮点击
        $scope.saveAll = function (text) {
            layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {

                }
            }, function (index) {
            	for(var i=0,len=$scope.Data.length;i<len;i++){
                	 if($scope.Data[i].IsHave == '1'){
                	 	$scope.Data[i].UserClaimWorksStatus = '2';
                	 }
//              	 return false;
                	$http({
			            url: BaseURL+"/User/AddOrUpdateRelationUserClaimWorks",
			            method: "POST",
			            data:$scope.Data[i]
			        }).success(function (status) {
			        	//重新加载页面
		        		document.location.reload();
			            //响应成功
			        }).error(function (error) {
			            //处理响应失败
			            layer.confirm('保存失败，请稍后再试', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
			        });
               }            	
                // 获取页面数据
                layer.close(index);
            });
        };
        
        var oldStayus_connectAuthor = null, // 存储以前的状态
            oldStayus_firstAuthor = null;
            
        // 获取数据
        function ajaxGet(curPage, StatusID) {
            $http({
                // 拒绝认领状态3
                url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserIDAndStatus?sysuserID=" + $rootScope.uid + "&UserClaimWorksStatus=3&pageSize=10&curPage="+curPage,
                method: "Get"
            }).success(function (data) {
                $scope.Data = data.Data;
                $scope.TotalCount=data.TotalCount;
                $scope.flag = true;
            }).error(function (data, header, config, status) {});
        }
        // 分页操作
        $scope.$watch('flag', function () {
            var setPage = {
                "index": function (i) {
                    ajaxGet(i);
                }
            }
            $("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
        });
        //点击文章标题跳转详情页
        $scope.nextYe = function(id) {
			$state.go('index.Research.Article_detail', {
				'data': id
			})
		}
    });
})