define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('Claim_controller', function($scope, $state, $http, $filter, $rootScope) {
		$scope.flag = false;
		// 页面执行填满数据
		ajaxGet(1);
		// 获取数据
		function ajaxGet(curpage) {
			//现接口
			$http({
				// 待认领状态码 - 0
				url: BaseURL + "/User/GetClaimWorksCombineBySysUserIDAndStatus?sysuserID=" + $rootScope.uid + "&chineseName=" + $rootScope.fullName + "&englishName=" + $rootScope.EnglishName + "&pageSize=10&curPage=" + curpage,
				method: "Get",
			}).success(function(data) {
				for(var i = 0, len = data.Data.length; i < len; i++) {
					data.Data[i].AuthorOrder = 0;
					data.Data[i].CorrespondenceAuthor = 0;
					data.Data[i].ParticipatingAuthor = 0;
					data.Data[i].UserClaimWorksStatus = 0;
				}
				$scope.Data = data.Data;
				$scope.TotalCount = data.TotalCount;
				$scope.flag = true;
			}).error(function(data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		}
		// 提交操作 
		$scope.submit_Claim = function(text) {
			//判断是否同时进行认领/拒绝作品操作
			for(var i = 0, len = $scope.Data.length; i < len; i++) {
				if(($scope.Data[i].CorrespondenceAuthor == '1' || $scope.Data[i].AuthorOrder == '1' || $scope.Data[i].ParticipatingAuthor == '1') && $scope.Data[i].UserClaimWorksStatus == '3') {
					layer.confirm('不能同时认领/拒绝作品', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
					return false;
				}
				//页面没有操作判断
				if($scope.Data[i].CorrespondenceAuthor != 0 || $scope.Data[i].AuthorOrder != 0 || $scope.Data[i].UserClaimWorksStatus != 0) {
					if($scope.Data[i].CorrespondenceAuthor == '1' || $scope.Data[i].AuthorOrder == '1' || $scope.Data[i].ParticipatingAuthor == '1') {
						$scope.Data[i].UserClaimWorksStatus = '2';
						$scope.Data[i].IsHave = 1;
					}
					layer.confirm(text, {
						btn: ['确认', '取消'],
						btn2: function(index, layero) {

						}
					}, function(index) {
						// 获取页面数据
						var submitData = {
							ProductionID: $scope.Data[i].ProductionID,
							SysUserID: $rootScope.uid,
							UserClaimWorksStatus: $scope.Data[i].UserClaimWorksStatus,
							IsHave: $scope.Data[i].IsHave,
							AuthorOrder: $scope.Data[i].AuthorOrder,
							CorrespondenceAuthor: $scope.Data[i].CorrespondenceAuthor,
							ParticipatingAuthor: $scope.Data[i].ParticipatingAuthor
						}
						$http({
							url: BaseURL + "/User/AddOrUpdateRelationUserClaimWorksByUserID",
							method: "POST",
							data: submitData
						}).success(function(status) {
							//重新加载页面
							document.location.reload();
							layer.confirm('提交成功', {
								btn: ['确认'],
							}, function(index) {
								layer.close(index);
							});
							//响应成功
							ajaxGet();
						}).error(function(error) {
							//处理响应失败
						});
						//		                }
						layer.close(index);
					});
					return true;
				}
			}
			layer.confirm('没进行任何操作', {
				btn: ['确认'],
			}, function(index) {
				layer.close(index);
			});
			return false;
		};
		// 还原操作
		/*$scope.restore_Claim = function (text) {
		    layer.confirm(text, {
		        btn: ['确认', '取消'],
		        btn2: function (index, layero) {

		        }
		    }, function (index) {
		        window.location.reload();
		        layer.close(index);
		    });1
		};*/
		// 监控页面值
		$scope.$watch('flag', function() {
			var setPage = {
				"index": function(i) {
					ajaxGet(i);
				}
			}
			$("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
		});
		$scope.nextYe = function(id) {
			$state.go('index.Research.Article_detail', {
				'data': id
			})
		}
	})
});