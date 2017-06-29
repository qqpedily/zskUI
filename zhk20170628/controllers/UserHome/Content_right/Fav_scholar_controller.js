define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('Fav_scholar_controller', function($scope, $http, $filter, $rootScope) {
		
		read(1);
		$scope.TotalCount;
		$scope.flag = false;
		
		// 收藏的学者
		function read(curPage) {
			$http({
				url: BaseURL + "/User/GetRelationUserCollectScholarBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=8&curPage="+curPage,
				method: "Get"
			}).success(function(data) {
//				console.log(data)
				$scope.scholarList = data.Data;
				$scope.TotalCount = data.Data.length;
				$scope.flag = true;
//				console.log($scope.TotalCount)
			}).error(function(data, header, config, status) {
			/*	layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});*/
				console.log(data)
			});
		}
		read()
		// 取消收藏事件
		$scope.resolve = function($event, text) {
			layer.confirm(text, {
				btn: ['确认', '取消'],
				btn2: function(index, layero) {}
			}, function(index) {
				var postNum = $($event.target).val();
//				console.log(postNum)
				$($event.target).parents('tr').remove();
				var json = {
					"UserID": $rootScope.uid,
					"CollectInfoID": postNum,
					"CollectInfoName": ""
				};
				var a = JSON.stringify(json);
				deleteArr(a);
				layer.close(index);
//				console.log(a);
			});

		};

		function deleteArr(data) {
			$http({
				url: BaseURL + "/User/DeleteRelationUserCollectScholar",
				method: "post",
				data: data
			}).success(function(result) {
				if(result.IsSucceed == true) {
					layer.confirm('删除成功！', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
				}
			}).error(function() {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
					read()
				});
			})
		};
		$scope.$watch('flag', function () {
			var setPage = {
				"index": function (i) {
					read(i);
				}
			}
			$("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
		})
	})
})