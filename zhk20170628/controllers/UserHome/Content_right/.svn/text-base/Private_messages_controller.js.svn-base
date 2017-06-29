define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('Private_messages_controller', function($scope, $http, $state, $rootScope) {
		
		//已经来先判断这个人是不是专家
		function isExport(){
			$http({
				url:"http://192.168.199.8:8088/WBSAPI/User/GetUser?UUID="+ $rootScope.uid,
				method:"Get"
			}).success(function(data){
			    $scope.isExport = data.IsExpert
			    console.log(  $scope.isExport)
			}).error(function(data){
				console.log(data)
			})
		}
		isExport()
		
		
		
		//点击普通评论调用接口
			$http({
				url:BaseURL + "/User/LoadUserCommentListByUserIDAndType?userID="+ $rootScope.uid+"&type=0&pageSize=10&curPage=1",
				method:"Get"
			}).success(function(data){
//				$scope.imgHeadUrl = "http://192.168.199.8:8555/user_img/" + data.Data[0].UploadIMG;
				$rootScope.count = data.TotalCount;
				$scope.Generaldata = data.Data; 
				console.log(data)
			}).error(function(data){
				console.log(data)
			})
		console.log($rootScope.uid)
		var SYSUserID = $rootScope.uid;
		//查询名字的按钮
		$scope.searchName = function() {
			var shoujianName = $("#shoujianren").val()
			$rootScope.Addressee = shoujianName
			$http({
				url: BaseURL + "/UseGroup/GetUserList?",
				method: "Get",
				params: {
					UserName: shoujianName
				}
			}).success(function(data, header, config, status) {
				console.log(data)
				$scope.resultName = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}
		
		//获取下拉列表中选中的人名和他的ID 
		$scope.selectInfo = function(){
			var userName = $("#selectName option:selected");
			console.log(userName);
			$rootScope.AddresseeUID = $("#selectName option:selected").attr("uid");
		}

		// 点击私信，显示写信输入框
		$scope.sendMes = function() {
			$scope.seneInfoMes = true;
			$scope.yesreceiveMessage = false;
			$scope.noreceivedMessage = false;
		};
		
		//点击写信中的发送按钮的js
		$scope.sendMessageBtn = function() {
			if($rootScope.uid !== undefined) {
				// 要接收人名字
				var username = $("#selectName option:selected");
				var usersendVal = $('textarea[name="key_name"]').val();
				if(username.length == 0 || usersendVal.length == 0) {
					layer.confirm('请输入完整信息！', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
						return;
					});
				} else {
					var time = new Date();
					$http({
						url: BaseURL + "/User/AddOrUpdateUserPrivateLetter",
						method: "post",
						data: {
							"UserName": username,
							"SendUserID": SYSUserID,
							"Content": usersendVal,
							"Type": 0,
							"UserID": $rootScope.AddresseeUID,
							"CreateTime": time,
							"ValidStatus": true

						}
					}).success(function(result) {
						if(result.IsSucceed == true) {
							$rootScope.SendUserID = SYSUserID;
							layer.confirm('发送成功！', {
								btn: ['确认'],
							}, function(index) {
								layer.close(index);
								$('input[name="key_name"]').val('');
								$('textarea[name="key_name"]').val('')
								return;
							});
						}
					})
				};
			} else {
				alert("请登录账号");

			}

		};

		
		//点击专家评论调用接口
		$scope.comments = function() {
			$(".tab_2").show()
			$("#tab_2").addClass("active")
			$("#tab_2").siblings().removeClass("active")
		    $(".tab_1").hide()
			$(".tab_3").hide()
			$(".tab_4").hide()
			$http({
				url:BaseURL + "/User/LoadUserCommentListByUserIDAndType?userID="+ $rootScope.uid+"&type=1&pageSize=10&curPage=1",
				method: "Get"
			}).success(function(data) {
				console.log(data)
				$scope.comments = data.Data;
			}).error(function(data) {
				console.log(data)
			})
		}

		//点击私信调用接口 
		$scope.private_letter = function() {
			$http({
				url: BaseURL +
					"/User/GetUserPrivateLetterListByUserIDOrSendUserid?userid=" + $rootScope.uid + "&senduserid=&pageSize=10&curPage=1",

				method: "Get"
			}).success(function(data) {
				console.log(data)
				$scope.personalLetter = data.Data;
				console.log($scope.personalLetter)
			}).error(function(data) {
				console.log(data)
			})
		}

		//点击报错调用接口
		$scope.errors = function() {
			$http({
				url:BaseURL + "/User/LoadUserCommentListByUserIDAndType?userID="+ $rootScope.uid+"&type=2&pageSize=10&curPage=1",
			}).success(function(data){
				console.log(data)
			}).error(function(data){
				console.log(data)
			})
		}

		//普通评论中的点击切换显示
		$scope.allmessage = function(){
			$("#allMessage").show()
			$("#myMessage").hide()
		}
		$scope.mymessage = function(){
			$("#allMessage").hide()
			$("#myMessage").show()
		}
		
		$scope.shouXin = function() {
			$("#shouxin").show();
			$("#xiexin").hide()
		}

		$scope.writeLetter = function() {
			$("#shouxin").hide();
			$("#xiexin").show()
		}

	})
})