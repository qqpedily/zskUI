define(function (require) {
    var app = require('../../../javascripts/app');
    app.controller('Claim_submit_controller', function ($scope, $http, $filter, $state,$rootScope) {
        ajaxGet(1);
        $scope.go = function () {
            $state.go('index.Nav_left.Ulist');
        }
//      var oldStayus_connectAuthor = null, // 存储以前的状态
//          oldStayus_firstAuthor = null;

        function ajaxGet(curPage, StatusID) {
            $http({
                // 未提交状态码 4 
                url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=10&curPage="+curPage,
                method: "Get"
            }).success(function (data, header, config, status) {
                $scope.Data = data.Data;
                $scope.TotalCount=data.TotalCount;
                $scope.flag = true;
            }).error(function (data, header, config, status) {
                //处理响应失败
            });
        }
        //点击获取附件
//      $scope.
        //上传附件
        $scope.saveAll = function(index,text){
        	var id = $scope.Data[index].ProductionID;
			var fileObj = document.getElementById(id).files[0];// 获取文件对象
			var fileObj1 = document.getElementById(id).files[1];
			var fileObj2 = document.getElementById(id).files[2];
			var fileObj3 = document.getElementById(id).files[3];
			var fileObj4 = document.getElementById(id).files[4];
	        // FormData 对象
	        var form = new FormData();
	       	form.append("$scope.Data[index].ProductionID",fileObj);// 可以增加表单数据
	        form.append("$scope.Data[index].ProductionID",fileObj1);// 文件对象
	        form.append("$scope.Data[index].ProductionID",fileObj2);
	        form.append("$scope.Data[index].ProductionID",fileObj3);
	        form.append("$scope.Data[index].ProductionID",fileObj4);
	        form.append('ProductionID',id);
			if(fileObj == undefined){
				layer.confirm('请上传附件', {
					btn: ['确认'],
				}, function (index) {
					layer.close(index);
				});
				return false;
			}
			layer.confirm(text, {
		        btn: ['确认', '取消'],
		        btn2: function (index, layero) {
							
		        }
		    }, function (index) {
		        // 获取页面数据
		            $http({
					    url: BaseURL+"/User/SavaFiles",
					    method: "POST",
					    data:form,
					    headers: {'Content-Type':undefined},
              			transformRequest: angular.identity  
					}).success(function (status) {
						//附件上传失败，提示信息
						if(status.IsSucceed == false){
							layer.confirm('附件上传失败，请稍后再试', {
							    btn: ['确认'],
							}, function (index) {
							    layer.close(index);
							});
							return false;
						}
					    layer.confirm('附件上传成功', {
						    btn: ['确认'],
						}, function (index) {
						    layer.close(index);
						});
					    //响应成功
					    setTimeout(function(){
					    	document.location.reload();
					    },400);
					}).error(function (error) {
					    layer.confirm('附件上传失败，请稍后再试', {
						    btn: ['确认'],
						}, function (index) {
						    layer.close(index);
						});
					    //处理响应失败
					});
		        layer.close(index);
		   });	
        }
        //分页操作
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