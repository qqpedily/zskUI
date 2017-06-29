define(function(require) {
	var app = require('../../../javascripts/app');

	app.controller('Group_create_controller', function($scope, $http, $state, $rootScope) {
		var flag = 0;
		var Information;
		//查询按钮
		$scope.search = function() {
			$http({
				url: BaseURL + "/UseGroup/GetUserList?",
				method: "Get",
				params: {
					UserName: $scope.UserName
				}
			}).success(function(data, header, config, status) {
				$scope.Data = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}

		//点击修改组
		$scope.tiaozhuan = function() {
			$state.go('index.Nav_left.Group_joined')
		}

		var rootuid = $rootScope.uid;

		// 点击添加按钮        
		// 获取选中用户的详细的信息		
		// 存储点击保存按钮时要传递的数据
		var RelationUseGroupUser = [];
		$scope.get = function() {
			//console.log($scope.groupDescribing);
			console.log($('#bSelect').find('option'));
			RelationUseGroupUser = []
			flag = 0;
			$('#bSelect').find('option').each(function(index, item) {

				var itemInfo = {};
				itemInfo.Join = 0;
				itemInfo.SysUserID = item.value;
				itemInfo.groupMumber = $(item).text(),
				RelationUseGroupUser.push(itemInfo);

				jsonValadd = {
					"UseGroupName": $scope.groupName,
					"Describe": $scope.groupDescribing,
					"GroupType": "类型D",
					"sort": "0",
					"SponsorID": rootuid,
					"SysUserID": $(item).val(),
					"GroupType": "类型D",
					"Join": 0,
					"Relation_UseGroup_User": RelationUseGroupUser
				}
			});
		}

		$scope.remove = function() {
			RelationUseGroupUser = [];
			flag = 1;
			$('#bSelect').find('option').each(function(index, item) {
				console.log(item);
				var itemInfo = {};
				itemInfo.Join = 0;
				itemInfo.SysUserID = item.value;
				itemInfo.groupMumber = $(item).text();
				itemInfo.groupDescribing = $scope.groupDescribing;
				RelationUseGroupUser.push(itemInfo);
				jsonValdelete = {
					"UseGroupName": $scope.groupName,
					"GroupType": "类型D",
					"sort": "0",
					"SponsorID": $rootScope.uid,
					"SysUserID": $(item).val(),
					"GroupType": "类型D",
					"Join": 0,
					"Relation_UseGroup_User": RelationUseGroupUser
				}
			});
			console.log(RelationUseGroupUser);
		}

		//点击保存按钮
		$scope.save = function() {
			//console.log(data);
			if(flag == 0) {
				Information = jsonValadd
			} else {
				Information = jsonValdelete
			}
			$http({
				url: BaseURL + "/UseGroup/AddRrelation_UseGroup",
				method: "Post",
				data: Information
			}).success(function(data, header, config, status) {
				$state.go('index.Nav_left.Group_joined')
				location.reload()
				console.log("跳转")
				console.log(data);
				//响应成功
			}).error(function(data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			})
		};

	})

})