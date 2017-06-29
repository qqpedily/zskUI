define(function (require) {
	var app = require('../../../javascripts/app');
	app.controller('Fav_article_controller', function ($scope, $http,$rootScope) {
		ajaxGet(1);
		$scope.TotalCount;
		$scope.flag = false;
		//  收藏的作品
		function ajaxGet(curPage) {
		$http({
				url: BaseURL + "/User/GetRelationUserCollectProductBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=8&curPage="+curPage,
				method: "Get"
			}).success(function (data) {
//				console.log(data)
				$scope.articleList = data.Data;
				$scope.TotalCount = data.TotalCount;
				$scope.flag = true;
				//响应成功
			}).error(function (data, header, config, status) {
				layer.confirm('请求失败，请刷新重试!', {
					btn: ['确认'],
				}, function (index) {
					layer.close(index);
				});
			});
		};
		$scope.checkAll = function () {
			$("input[name='test']").prop('checked', true);
		};
		// 获取页面数据
		function ajaxPost() {
			var postArr = [];
			$("input[name='test']:checked").each(function (index, item) { // 遍历选中的checkbox
				postArr.push($(this).parents('li').attr('data-value'));
				$(this).parents('li').remove();
			});
			return postArr;
		};
		// 删除按钮事件
		$scope.DeleteItem = function (text) {
			
			if ($("input[name='test']:checked").length > 0) {
				layer.confirm(text, {
					btn: ['确认', '取消'],
					btn2: function (index, layero) {}
				}, function (index) {
					// 获取页面数据   
				var	postarr = ajaxPost();
//				console.log(postarr)
					// 删除单条数据
					DeleteArticle(postarr);
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
		//导出功能
		$scope.exportData = function (text) {
			if ($("input[name='test']:checked").length > 0) {
				layer.confirm(text, {
					btn: ['确认', '取消'],
					btn2: function (index, layero) {}
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
		// 删除操作
		function DeleteArticle(data) {
			$http({
				url: BaseURL + "/User/DeleteRelationUserCollectProductByList?idlist=" + data,
				method: "post",
				data: {
					'idlist': data
				}
			}).success(function (result) {
				layer.confirm('删除成功！', {
					btn: ['确认'],
				}, function (index) {
					layer.close(index);
				});
			}).error(function (data) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function (index) {
					layer.close(index);
				});
			});
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