﻿
define(function(require) {
	var app = require('../javascripts/app');
	app.controller('index_controller', function($scope, $state, $http, $cookies, $rootScope, $window) {
		//1.index页面，一进来就调用接口		
		//$rootScope.uid = 'CD1F7BC3-32CD-4DC4-82EA-00044788C86E'
		$rootScope.uid = $cookies.get("uid");
		$rootScope.ticket = $cookies.get("Ticket");
		$rootScope.imgHeadUrl = $cookies.get("imgURL");
		$rootScope.fullName = $cookies.get("fullName");
		$rootScope.EnglishName = $cookies.get("EnglishName")
		console.log($rootScope.imgHeadUrl)

		if($cookies.get("Ticket") !== undefined) {
			console.log($rootScope.ticket)
			$http({
				url: BaseURL + "/Account/VerifyTicket?",
				method: "Get",
				params: {
					"ticket": $cookies.get("Ticket"),
				}
			}).success(function(data, headers, config, status) {
				console.log(data);
				$("#right_login").hide();
				$("#right_logined").show();

				//当登录成功以后调用获取头像的接口
				$http({
					url: BaseURL + "/User/GetUserPersonalHomepageList?UserID=" + $rootScope.uid,
					method: "Get"
				}).success(function(data) {
					console.log(data);
					if(data.length == 0) {
						console.log("没有照片")
						$scope.imgHeadUrl = "img/default.jpg"
					} else {
						console.log("有照片")
						$cookies.put("imgURL", data[0].UploadIMG)
						$scope.imgHeadUrl = "http://192.168.199.8:8555/user_img/" + data[0].UploadIMG;
						console.log($scope.imgHeadUrl);
					}
				}).error(function(data) {
					console.log(data);
				})
				//把调用接口成功后返回来的数据直接显示在页面中
				$scope.fullName = data.User.SurnameChinese + data.User.NameChinese;
				$rootScope.fullName = data.User.SurnameChinese + data.User.NameChinese;
			}).error(function(data, header, config, status) {
				console.log("调用接口失败了，应该删除当前的这个ticket票据");
				//				$cookies.remove("Ticket")
			})
		} else {
			console.log("请先登录")
			/*$http({
				url: BaseURL + "/Account/Logout",
				method: "Post",
				data: {}
			}).success(function(data) {
				$cookies.remove("Ticket");
			}).error(function(data) {
				console.log(data)
			})*/
		}

		//首页的路由
		$scope.Ain = function() {
			$("#ain").addClass("active");
			$("#ay").removeClass("active");
			$("#am").removeClass("active");
			$state.go("index.Home");
		}
		//研究单元的路由
		$scope.Ay = function() {
			$("#ay").addClass("active");
			$("#ain").removeClass("active");
			$("#am").removeClass("active");
			$state.go("index.Research.unit")
		}
		//我校学者的路由
		$scope.Am = function() {
			$("#ain").removeClass("active");
			$("#ay").removeClass("active");
			$("#am").addClass("active");

			$state.go("index.Scholars")
		}
		//帮助页面的路由
		$scope.help = function() {
			$state.go()
		}
		console.log($rootScope.uid)
		console.log($rootScope.fullName)
		//点击用户面跳转页面
		$scope.personal = function() {
			$state.go("index.scholar_details", {
				'dataVal': $rootScope.uid,
				'userName': $rootScope.fullName
			})
		}

		//点击个人工作室管理跳转页面
		$scope.ack = function() {
			/*$("#ack").css("color","darkred");
			$("#ack").css("backgroundColor","")*/
			/*$("#ain").removeClass("active");
			$("#am").removeClass("active");
			$("#ay").removeClass("active");*/
			$state.go('index.Nav_left.Uinformation');
		}

		//每次给登录页中的用户输入框和密码输入框输入的时候，就让提示框全部隐藏
		$("UserName").focus(function() {
			$("#login_result").text("你好啊")
			$("#login_message").hide()
		})

		//登录按钮	
		$scope.Login = function() { 

			console.log($rootScope.EnglishName)

			//当那个页面一打开时，就获取验证码
			yanzheng();

			$("#UserName").val("")
			$("#PassWord").val("")
			$("#login_learn").hide()
			$("#login_message").hide()
			$("#login_message").hide()
			$("#Login").show();
			var ticket = $cookies.get("Tocket");
			console.log(ticket);

			//登录按钮
			$scope.login = function() {
				$("#login_result").text("");
				$("#login_learn").hide();
				if($("#UserName").val() == "" && $("#PassWord").val() == "") {
					$("#Btn_Login").disabled = false;
					$("#login_result").text(" 请填写完整登录信息");
				} else {
					$("#login_learn").show();
					$("#login_result").text("");
				}

				if(YZM == true) {
					$http({
						url: BaseURL + "/Account/Logon",
						method: "Post",
						data: {
							"UserName": $scope.userName,
							"Password": $scope.passWord,
						}
					}).success(function(data, headers, config, status, request) {
						console.log(data);
						$scope.errormessage = data.ErrorMessage;
						if(data.IsSucceed == true) {
							//							var UID = data.User.UserID;
							$scope.fullName = data.User.SurnameChinese + data.User.NameChinese;
							$cookies.put("EnglishName", data.User.SurnamePhoneticize + data.User.NamePhoneticize)
							$rootScope.EnglishName = $cookies.get("EnglishName")
							$("#right_login").hide()
							$("#right_logined").show();

							//判断是否点击了记住密码
							if($("#remberPass").prop("checked") == true) {
								console.log("记住密码")
								$cookies.put("remeberPSD", $scope.passWord)
							} else {
								console.log("忘记密码")
							}

							//保存票据
							$cookies.put('Ticket', data.Ticket, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							//保存uid
							$cookies.put('uid', data.User.UserID, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							//保存名称
							$cookies.put('fullName', data.User.SurnameChinese + data.User.NameChinese, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							$rootScope.fullName = $cookies.get("fullName");
							$rootScope.EnglishName = $cookies.get("EnglishName")
							$rootScope.ticket = $cookies.get("Ticket");
							$("#login_result").text("登录成功")
							setTimeout(function() {
								var uid = $cookies.get("uid");
								$("#Login").hide();
								window.location.href = './index.html#/index/Home';
								location.reload()
								//当登录成功以后调用获取头像的接口
								$http({
									url: BaseURL + "/User/GetUserPersonalHomepageList?UserID=" + uid,
									method: "Get"
								}).success(function(data) {
									console.log(data);
									if(data.length == 0) {
										console.log("没有照片")
										$scope.imgHeadUrl = "img/default.jpg"
									} else {
										console.log("有照片")
										$cookies.put("imgURL", data[0].UploadIMG)
										$scope.imgHeadUrl = "http://192.168.199.8:8555/user_img/" + data[0].UploadIMG;
										console.log($scope.imgHeadUrl);
									}
								}).error(function(data) {
									console.log(data);
								})
							}, 500);
						}
					}).error(function(data, header, config, status) {
						console.log(data)
					});
				} else {
					$("#emptyYzm").text("请输入验证码")
					$("#yanzheng").focus()
				}

			}
		}

		function yanzheng() {
			var code  =  "";        
			var  codeLength  =  4;  
			var  checkCode  =  document.getElementById("yanzhengma");        
			var  random  =  new  Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
			for(var  i  =  0;  i  <  codeLength;  i++)  { //循环操作  
				        
				var  index  =  Math.floor(Math.random() * 36);        
				code  +=  random[index];    
			}      
			$scope.code = code;
		}
		$scope.yanzheng = function() {
			$("#yanzheng").val("")
			var code  =  "";        
			var  codeLength  =  4;  
			var  checkCode  =  document.getElementById("yanzhengma");        
			var  random  =  new  Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
			for(var  i  =  0;  i  <  codeLength;  i++)  { //循环操作      
				var  index  =  Math.floor(Math.random() * 36);        
				code  +=  random[index];    
			}      
			$scope.code = code;
			console.log(code)
		}
		var YZM = false;
		//判断验证码
		$("#yanzheng").blur(function() {  
			var  inputval  = $("#yanzheng").val().trim(); 
			if(inputval.length == 0) {
				$("#emptyYzm").text("请输入验证码")
			}
			if(inputval !== "") {
				var inputCode = inputval.toUpperCase();
				console.log(inputCode)
				var yzm = $scope.code;
				console.log(yzm)
				if(inputCode !== yzm) {
					$("#emptyYzm").text("验证码输入错误,请重新输入")
					$("#yanzheng").val("")
				} else {
					$("#emptyYzm").text("")
					$("#errorYZM").hide()
					YZM = true;
				}
			}
		})

		//4.退出
		$scope.logout = function() {
			$http({
				url: BaseURL + "/Account/Logout",
				method: "Post",
				data: {}
			}).success(function(data) {
				$cookies.remove("Ticket");
				$cookies.remove("imgURL")
				$cookies.remove("fullName");
				$cookies.remove("uid");
				$cookies.remove("EnglishName");
				$cookies.remove("remeberPSD");
				$cookies.remove("UUID");
				$cookies.remove("dataVal");
				$cookies.remove("UserTime");
				$cookies.remove("ProductionID");

				$("#right_logined").hide();
				$("#right_login").show()
				$("#UserName").val("");
				$("#PassWord").val("");
				$("#sexChinese").val("")
				$("#sexpinYin").val("")
				$("#nameChinese").val("")
				$("#namepinYin").val("")
				$("#tel").val("")
				$("#password").val("")
				$("#checkpassword").val("")
				$("#allMessage").text("")
				$("#errorMessage").hide()
				$("#login_result").text("")
				$scope.userName = ""
				$scope.passWord = ""
				$rootScope = ""

				$state.go('index.Home');
				location.reload()
			}).error(function(data) {
				console.log(data)
			})

		}

		//5. 注册按钮
		$(".close").click(function() {
			$(".login_form").hide();
		});
		$(".close").click(function() {
			$(".reg_form").hide();
		});
		//6.点击导航栏上的注册按钮
		$scope.Regist = function() {
			$("#Regist").show();
			$("#allMessage").text("")
			$("#emilBox").val("");

			var Emilemp = true;
			var xingemp = true;
			var xingPYemp = true;
			var nameemp = true;
			var namePYemp = true;
			var passemp = true;
			//单位的信息
			$http({
				url: BaseURL + "/SYSCollege/GetSYSCollegeList",
				methos: "Get",
			}).success(function(data) {
				$scope.unit = data;
			}).error(function(data) {
				console.log(data);
			})

			$scope.unit_click = function() {
				$scope.parentID = $('#unit_select option:selected').attr("unitid");
				$scope.UnitID = $("#unit_select option:selected").attr("UnitID");
				var parentid = $scope.parentID
				//部门的信息
				$http({
					url: BaseURL + "/SYSCollege/getSYSCollegeListByParentID?parentid=" + parentid,
					methos: "Get"
				}).success(function(data) {
					$scope.department = data;
				}).error(function(data) {
					console.log(data);
				})
				$scope.department_click = function() {
					$scope.DeptID = $("#department_select option:selected").attr("deptid");
				}
			}

			//职称的信息
			$http({
				url: BaseURL + "/User/GetSYSPositionalTitleTypeList",
				method: "Get",
			}).success(function(data) {
				$scope.positional = data;
			}).error(function(data) {
				console.log(data)
			})
			$scope.positional_click = function() {
				console.log($("#positional_select option:selected"))
				$scope.PttID = $("#positional_select option:selected").attr("PttID");
			}

			//身份的信息
			$http({
				url: BaseURL + "/SysManage/GetSYSIdentityTypeList",
				method: 'Get'
			}).success(function(data) {
				$scope.degree = data
			})
			$scope.degree_click = function() {
				$scope.ItID = $("#degree_select option:selected").attr("ItID");
			}

			//检查注册页面邮箱格式的函数
			function checkEmail(str) {
				var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				if(re.test(str)) {
					$("#emil_result").text("")
					Emilemp = false;
				} else {
					$("#emil_result").text("邮箱格式有误,请您检查后重新填写")
					$("#emilBox").val("");
					$("#emilBox").focus();
				}
			}
			$("#emilBox").blur(function() {
				checkEmail($scope.regEmil);

			})

			//检查输入的姓和名的第一个框是否是汉字
			function checkChinese1(str) {
				var myReg = /^([\u4e00-\u9fa5]){1,5}$/;
				if(myReg.test(str) && myReg.test(str)) {
					$("#Chinesesex").text("");
					xingemp = false;
				} else {
					$("#sexChinese").val("");
					$("#sexChinese").focus();
					$("#Chinesesex").text("请输入中文字符且字数不超过5个");
				}
			}

			function checkChinese2(str) {
				var myReg = /^([\u4e00-\u9fa5]){1,5}$/;
				if(myReg.test(str) && myReg.test(str)) {
					$("#Chinesename").text("");
					nameemp = false;
				} else {
					$("#nameChinese").val("");
					$("#nameChinese").focus();
					$("#Chinesename").text("请输入中文字符且字数不超过5个");
				}
			}
			$("#sexChinese").blur(function() {
				checkChinese1($scope.fristName);
				$("#emptySurnameChinese").hide()

			})
			$("#nameChinese").blur(function() {
				checkChinese2($scope.lastName);
				$("#emptyNameChinese").hide()

			})
			//检查输入的姓和名的第二个框是否是拼音
			function checkpinYin1(str) {
				var myReg = /^([a-z A-Z]){1,}$/;
				if(myReg.test(str) && $("#sexpinYin").val().trim() !== "") {
					$("#emptysexPY").text("")
					xingPYemp = false;
				} else {
					$("#sexpinYin").val("");
					$("#sexpinYin").focus();
					$("#emptysexPY").text("请输入英文字母")
				}
			}

			function checkpinYin2(str) {
				var regExp = /^([a-z A-Z]){1,}$/;
				if(regExp.test(str) && $("#namepinYin").val().trim() !== "") {
					$("#emptyNamePY").text("")
					namePYemp = false;
				} else {
					$("#namepinYin").val("");
					$("#namepinYin").focus();
					$("#namePYMsgBox").text("请输入英文字母")
				}
			}
			$("#sexpinYin").blur(function() {
				checkpinYin1($scope.sexPY)

				$("#emptySurnamePY").hide();
			})
			$("#namepinYin").blur(function() {
				checkpinYin2($scope.namePY)
				$("#emptyNamePY").hide();
			})
			//检查电话的格式是否正确
			function checkPhone(str) {
				if(/^1(3|4|5|7|8)\d{9}$/.test(str)) {
					$("#telmsgBox").text("");
				} else {
					$("#tel").val("");
					$("#tel").focus();
					$("#telmsgBox").text("电话的格式有误");
				}
			}
			$("#tel").blur(function() {
				checkPhone($scope.regtellNumber)
			})
			//检查输入的秘密必须是数字和字母
			function psd1(str) {
				if(/^[a-zA-Z0-9]{6,10}$/.test(str.trim())) {
					$("#emptyPassword").text("");
				} else {
					$("#password").val("")
					$("#password").focus()
					$("#emptyPassword").text("密码由6-10数字和字母组成,不能输入空格");
				}
			}
			//检查两次密码输入是否相同
			function checkPassword(password1, passwors2) {
				$("#emptyPassword2").text("")
				$("#passwordBox").text("");
				if(password1 == passwors2) {
					$("#emptyPassword2").text("")
					$("#passwordBox").text("");
					passemp = false;
				} else {
					$("#checkpassword").val("");
					$("#passwordBox").text("两次密码不相同，请重新填写");
				}
			}
			$("#password").blur(function() {
				psd1($scope.regPassword)
				checkPassword($scope.regPassword, $scope.againPassword)
			})
			$("#checkpassword").blur(function() {
				checkPassword($scope.regPassword, $scope.againPassword)

			})

			//点击注册按钮
			$scope.regist = function() {

				if(xingPYemp == false) {
					alert("行的拼音不为空")
				}

				$("#allMessage").text("")
				$("#ErrorMessage").hide()
				if(Emilemp == false && xingemp == false && nameemp == false &&
					passemp == false && xingPYemp == false && namePYemp == false) {
					var registerUser = {
						"UserEmail": $scope.regEmil,
						"SurnameChinese": $scope.fristName,
						"SurnamePhoneticize": $scope.sexPY,
						"NameChinese": $scope.lastName,
						"NamePhoneticize": $scope.namePY,
						"UnitID": $scope.UnitID,
						"DeptID": $scope.DeptID,
						"PttID": $scope.PttID,
						"ItID": $scope.ItID,
						"Telphone": $scope.regtellNumber,
						"Password": $scope.regPassword,
						"TwoPassword": $scope.againPassword
					};
					console.log(registerUser);
					var allName = $scope.fristName + $scope.lastName;
					$http({
						url: BaseURL + "/Account/Register",
						method: "Post",
						data: registerUser
					}).success(function(data, headers, lastNameconfig, status) {
						console.log(data);
						$scope.registData = data.UUID
						$scope.fullName = data.SurnameChinese + data.NameChinese;
						$scope.resultmsg = data.ErrorMessage;

						$cookies.put("UUID", data.UUID);
						$rootScope.uuid = $cookies.get("UUID")

						//如果注册成功的话就调用登录的接口,并且把页面跳转到登录成功的页面
						alert('注册成功');
						$http({
							url: BaseURL + "/Account/Logon",
							method: "Post",
							data: {
								"UserName": registerUser.UserEmail,
								"Password": registerUser.Password
							}
						}).success(function(data) {
							console.log(data)
							//保存票据
							$cookies.put('Ticket', data.Ticket, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							$rootScope.ticket = $cookies.get("Ticket");
							//保存uid
							$cookies.put('uid', data.User.UserID, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							//保存名称
							$cookies.put('fullName', data.User.SurnameChinese + data.User.NameChinese, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							//保存英文名称
							$cookies.put('EnglishName', data.User.SurnamePhoneticize + data.User.NamePhoneticize, {
								expires: new Date(new Date().getTime() + 500000000000000)
							});
							$rootScope.fullName = $cookies.get("fullName");
							$rootScope.EnglishName = $cookies.get("EnglishName")
							$rootScope.ticket = $cookies.get("Ticket");
							$rootScope.uid = $cookies.get("uid")
							//当登录成功以后调用获取头像的接口
							$http({
								url: BaseURL + "/User/GetUserPersonalHomepageList?UserID=" + $rootScope.uid,
								method: "Get"
							}).success(function(data) {
								console.log(data);
								if(data.length == 0) {
									console.log("没有照片")
									$scope.imgHeadUrl = "img/default.jpg"
									console.log($scope.imgHeadUrl)
								} else {
									console.log("有照片")
									$cookies.put("imgURL", data[0].UploadIMG)
									$scope.imgHeadUrl = "http://192.168.199.8:8555/user_img/" + data[0].UploadIMG;
									console.log($scope.imgHeadUrl);
								}
							}).error(function(data) {
								console.log(data);
							})
						}).error(function(data) {
							console.log(data)
						})
						if(data.IsSucceed !== false) {
							$("#allMessage").text("登录成功");
							$("#Regist").hide()
							$("#right_login").hide()
							$("#right_logined").show();
						}
						if(data.IsSucceed == false) {
							$("#errorMessage").show()
						} else {
							console.log(data)
						}
					}).error(function(data, header, config, status) {
						console.log(data);
					});
				} else {
					$("#allMessage").text("请填写所有必填信息");
				}
			}
		}

		$scope.topFinds = function() {
			console.log($('#slt').val())
			if($('#slt').val() == 0) {
				var ik = 'Title';
			} else {
				var ik = 'author';
			}
			var tFind = [];
			var dataList = [];
			var dataobj = {};
			var ls = []

			dataobj[ik] = $scope.topFind;
			dataList.push(dataobj)
			ls.push({
				'cc': $scope.topFind
			})
			var data = {
				"Diclist": dataList,
				"PageSize": 5,
				"CurPage": 1,
				"Order": '',
				"OrderBy": ''
			}

			console.log(dataList)
			$state.go('index.Research.article_list', {
				'data': data,
				'tiaoj': ls,
				'Tid': 'unit'
			})
			dataList = [];
			dataobj = {};
			tFind = ''
			console.log('clear')
		}
		//访问数据统计李唐20170628添加
		var caution = false
		
		function setCookie(name, value, expires, path, domain, secure) { 
			var curCookie = name + "=" + escape(value) +  ((expires) ? ";expires=" + expires.toGMTString() : "") +  ((path) ? "; path=" + path : "") +  ((domain) ? "; domain=" + domain : "") +  ((secure) ? ";secure" : "") ; 
			if(!caution || (name + "=" + escape(value)).length <= 4000)  { 
				document.cookie = curCookie 
			} 
			else if(confirm("Cookie exceeds 4KB and will be cut!"))  { 
				document.cookie = curCookie 
			}
		}
		
		function getCookie(name) { 
			var prefix = name + "=" 
			var cookieStartIndex = document.cookie.indexOf(prefix) ; 
			if(cookieStartIndex == -1)  { 
				return null 
			}    
			var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
			if(cookieEndIndex == -1)  { 
				cookieEndIndex = document.cookie.length 
			} 
			return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
		}
		
		function deleteCookie(name, path, domain) { 
			if(getCookie(name))  { 
				document.cookie = name + "=" +  ((path) ? "; path=" + path : "") +  ((domain) ? "; domain=" + domain : "") +  "; expires=Thu, 01-Jan-70 00:00:01 GMT" 
			}
		}
		
		function fixDate(date) { 
			var base = new Date(0) ;
			var skew = base.getTime();
			if(skew > 0)  { 
				date.setTime(date.getTime() - skew) 
			}   
		}
		var now = new Date()
		fixDate(now)
		now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
		var visits = getCookie("counter")
		if(!visits) { 
			visits = 1;
		} 
		else { 
			visits = parseInt(visits) + 1;
		} 
		setCookie("counter", visits, now)
  		 $scope.visit=visits;
	});
});