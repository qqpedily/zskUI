define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('Group_joined_controller', function($scope, $http, $state,$rootScope) {

		//我创建的组的数据
		render();

		function render() {
			$http({
				url: BaseURL + "/UseGroup/GetUseGroupList?SponsorID="+$rootScope.uid,
				method: "Get"
			}).success(function(data, header, config, status) {
				console.log(data)
				$scope.Mydata = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}

		//		render();
		// 点击创建组按钮实现跳转
		$scope.createGop = function() {
			$state.go('index.Nav_left.Group_create')
		}

		//点击我创建的小组调用不同的接口，显示不同的信息
		$scope.change = function() {
			render();
			//已加入组的数据
			$http({
				url: BaseURL + "/UseGroup/GetUseGroup_UserList?SysUserID="+ $rootScope.uid +"&Join=1",
				method: "Get"
			}).success(function(data, header, config, status) {
				console.log(data);
				$scope.Data = data;
				render();
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}
		//		render();

		//点击    退出小组   按钮和   是   按钮（逻辑一样）
		$scope.exitGroup = function(a, b) {
			console.log($scope.Data);
			var data = {
				"UUID": a,
				"UseGroupID": "9d131be3-2e02-4804-9962-21355661edf3",
				"InvitationTime": "2017-05-14 09:32:48",
				"Join": b,
				"sort": 2,
				"Rrelation_UseGroup": {
					"UseGroupID": "9d131be3-2e02-4804-9962-21355661edf3",
					"UseGroupName": "测试用户组E",
					"SponsorID": $rootScope.uid,
					"CreateTime": "2017-05-18 16:52:32",
					"Describe": "描述E",
					"GroupType": "1",
					"Sort": 1,
					"UserName": "姓名A"
				}
			}
			$http({
				url: BaseURL + "/UseGroup/UpdateRelationUseGroupUser",
				method: "Post",
				data: data,
			}).success(function(data, header, config, status) {
				console.log(data);
				$('#detailBox').css('display', 'none');
				$http({
					url: BaseURL + "/UseGroup/GetUseGroup_UserList?SysUserID=" + $rootScope.uid + "&Join=1",
					method: "Get"
				}).success(function(data, header, config, status) {
					console.log(data);
					$scope.Data = data;
					render();
					//响应成功
				}).error(function(data, header, config, status) {
					$scope.msg = "您的网络出现波动，请刷新后重试！";
					$scope.IsDisplay = true;
					//处理响应失败
				});
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		};
		//		render();
		//点击删除组
		$scope.delete = function(a, text) {
			layer.confirm(text, {
				btn: ['确认', '取消'],
				btn2: function(index, layero) {}
			}, function(index) {
				// 获取页面数据
				$http({
					url: BaseURL + "/UseGroup/DelRelation_UseGroup?",
					method: "Get",
					params: {
						UseGroupID: a
					}
				}).success(function(data, header, config, status) {
					render();
				}).error(function(data, header, config, status) {});
				layer.close(index);
			});

		}
		//		render();

		$scope.showDetailInfo = function(aitem) {
			$('#detailBox').css('display', 'block');
			$scope.itemInfo = aitem;
		}
		render();

		//点击修改组
		$scope.editGroup = function() {
			//	console.log(1111);
			$state.go('index.Nav_left.Group_create')
		}

	})
})