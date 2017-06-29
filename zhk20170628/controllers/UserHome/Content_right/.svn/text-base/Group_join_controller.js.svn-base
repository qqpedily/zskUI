define(function (require) {
	var app = require('../../../javascripts/app');
	app.controller('Group_join_controller', function($scope, $http, $state,$rootScope) {
		
		console.log($rootScope.uid)
		
		function render() {
			$http({
				url: BaseURL + "/UseGroup/GetUseGroup_UserList?SysUserID=" + $rootScope.uid + "&Join=0",
				method: "Get"
			}).success(function (data, header, config, status) {
				console.log(data)
				$scope.Data = data;
				//响应成功
			}).error(function (data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function (index) {
					layer.close(index);
				});
			});
}

		render();

		$scope.Yes = function (a, b) {
			var data = {
				//      		"UUID": "33f94fb4-fbf6-47d8-93e9-480e8692bc9a",
				"UUID": a,
				"UseGroupID": "9d131be3-2e02-4804-9962-21355661edf3",
				"SysUserID": a,
				"InvitationTime": "2017-05-14T09:32:48",
				"Join": b,
				"sort": 2,
				"Rrelation_UseGroup": {
					"UseGroupID": "9d131be3-2e02-4804-9962-21355661edf3",
					"UseGroupName": "测试用户组E",
					"SponsorID": $rootScope.uid,
					"CreateTime": "2017-05-11T12:12:00",
					"Describe": "描述E",
					"GroupType": "1",
					"Sort": 1,
					"UserName": "姓名A"
				}
			}
			$state.go('index.Nav_left.Group_join')
			$http({
				url: BaseURL + "/UseGroup/UpdateRelationUseGroupUser",
				method: "post",
				data: data,
			}).success(function (data, header, config, status) {
				$scope.Data = data;
				render();
				//响应成功
			}).error(function (data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function (index) {
					layer.close(index);
				});
			});
		};
	})
})