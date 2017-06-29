define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('Article_detail_controller', function($scope, $state, $http, $stateParams, $cookies, $cookieStore, $timeout, $rootScope) {
		$scope.AuthorImg=
			[{"imgurl":"img/paihan.png"},
			{"imgurl":"img/paihan2.png"},
			{"imgurl":"img/paihan3.png"}
			];
		$scope.pdfUrl = '';
		$rootScope.fullName;
		$rootScope.imgURL;
		//console.log($rootScope.fullName,$rootScope.imgURL);
		var SYSUserID = $rootScope.uid;
		console.log(SYSUserID);
//		var pdfSrc = 'http://fta.mofcom.gov.cn/pakistan/xieyi/chinachengruo_cn.pdf';
//		var pdfSrc = 'http://192.168.199.8:8555/yanjiusheng.pdf';
		$scope.seneInfoMes = false; // 控制私信中发送私信输入框的显示和隐藏
		tabs(".tabs");
		// 存储第一个作者
		var globalStrAuthor = '';
		var ProductionID = $stateParams.data;
	
		if(ProductionID == '') {
			getDetail($cookies.get('ProductionID'));
			getAuthorList($cookies.get('ProductionID'))
			getComment($cookies.get('ProductionID'), 0, 1);
			$scope.global = $cookies.get('ProductionID');
		} else {
			$cookies.put('ProductionID', ProductionID, {
				expires: new Date(new Date().getTime() + 500000000000000)
			});
			$scope.global = ProductionID;
			getDetail(ProductionID);
			getAuthorList(ProductionID);
			getComment(ProductionID, 0, 1);
		};
		// 点击浏览按钮事件。
		$scope.btn_look = function($event) {
			$scope.pdfTitle = $($event.target).attr('data-value');
			$('#pdfInto').show();
			PDFObject.embed($scope.pdfSrc, "#pdfInto", {
				page: "2"
			});
		};
		
		$scope.pdfTitle;
		$scope.detailPage;
		$scope.getAuthorList;
		
		$scope.dLoad = function(id){
			$http({
					url: BaseURL + "/Productions/AddProductsDownloadNum?productid=" + id,
					method: "get"
				}).success(function(data, status) {
					console.log(data);
				}).error(function(error) {
					
				});
		}
		
		
		// 获取首页作品信息
		function getDetail(id) {
			$.ajax({
				type:"get",
				url:BaseURL +"/Productions/AddProductsDownloadNum?productid="+id,
				async:true
			});
			$http({
				url: BaseURL + "/Productions/GetProductionsByID?ProductionID=" + id,
				method: "get"
			}).success(function(data) {
				$scope.AhthorList = data;
				$scope.pid=data.ProductionID;
				if(data.Reference==null || data.Reference==""){
					$("#Reference").html("内容暂无数据");
				}
				if(data.Citations==null || data.Reference==""){
					$("#Citations").html("内容暂无数据");
				}
				
				if(data.Indexed==null || data.Indexed==""){
					$("#Indexed").html("");
				}
				if(data.CommAttachmentList.length == 0) {
					$('table').html('附件列表暂无数据！');
				};
				
				$('#pdfInto').hide();
			})
			
			
			
		};
		// 获取作者列表
		function getAuthorList(id) {
			$.ajax({
				type:"get",
				url:BaseURL +"/Productions/AddProductsDownloadNum?productid="+id,
				async:true
			});
			$http({
				url: BaseURL + "/Productions/GetProductionsByID?ProductionID=" + id,
				method: "get"
			}).success(function(data) {
				// 获取第一个作者          globalStrAuthor  
				
				$scope.globalStrAuthor= data.Author.split(';')[0].split('[')[0];
				//console.log(globalStrAuthor)
				$scope.AhthorList = data;
				$scope.AhthorList = data;
				$scope.getAuthorList = data.Author.split(/[,;]/);
				if(data.CommAttachmentList.length !==0){
					var pdfUrl=data.CommAttachmentList[0].RelativePath;
					$scope.pdfSrc = downLoadUrl+"/"+ pdfUrl;
				}

				// 收录
				$scope.indexed = data.Indexed;
				//参考文献
				$scope.Reference=data.Reference;
				$scope.Citations=data.Citations;
			});
			
		};
	
//		//已经来先判断这个人是不是专家
		function isExport(){
			$http({
				url:"http://192.168.199.8:8088/WBSAPI/User/GetUser?UUID="+ $rootScope.uid,
				method:"Get"
			}).success(function(data){
			    $scope.isExport = data.IsExpert
			    console.log($scope.isExport)
			}).error(function(data){
				console.log(data)
			})
		}
		isExport()
		
		/*交流与私信部分*/
		// 添加评论
		$scope.sendMessageclick = function(n) {
			if(n==1){
				var val = $(".textarea").val();
			}else if(n==0){
				var val = $(".textarea2").val();
			}

			var val = $(text_area_comment).val();
			if(val.length == 0) {
				layer.confirm('输入为空！', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
				return;
			};
			var time = new Date();
			var json = {
				'UserID': SYSUserID,
				'Content': val,
				"Type": 0,
				"Level": 0,
				"ProductionID": $('.admin_cont').attr('data-value'),
				'CreateTime': time,
				"ValidStatus": true
			};
			var a = JSON.stringify(json);
			sendMessage(a);
		};
		
		// 发送评论方法。
		function sendMessage(data) {
			if($rootScope.uid !== undefined) {
				$http({
					url: BaseURL + "/User/AddOrUpdateUserComment",
					method: "post",
					data: data
				}).success(function(result) {
					if(result.IsSucceed == true) {
						layer.confirm('添加评论成功！', {
							btn: ['确认'],
						}, function(index) {
							layer.close(index);
							var proid = $('.admin_cont').attr('data-value');
							getComment(proid, 0, 1);
							$(".textarea").val();	
						});
					};
				})
			} else {
				alert("请登录账号");
			}
		};
		
		
		// 获取作品评论信息
		function getComment(id, cType, curPage) {
			$http({
				url: BaseURL + "/User/LoadUserCommentListByProductionIDAndType?productionid=" + id + "&type=" + cType + "&pageSize=10&curPage=" + curPage,
				method: 'get'
			}).success(function(data) {
				$scope.TotalCount = data.TotalCount;
				if(data.Data.length > 0) {
					$scope.orshow = false;
					$scope.commentList = data.Data;
				} else {
					$scope.orshow = true;
				}
			})
		};
		// 删除用户评论
		$scope.deleteComment = function($event) {
			var target = $($event.target);
			var id = $($event.target).attr('data-value');
			var time = new Date();
			var json = {
				'UUID': id,
				'UserID': SYSUserID,
				"Type": 0,
				"Level": 0,
				"ProductionID": $('.admin_cont').attr('data-value'),
				'CreateTime': time,
				"ValidStatus": true
			};
			var a = JSON.stringify(json);
			deleteComment(a, target);
		};
		// 专家点评
		$scope.professCommentClick = function() {
			//已经来先判断这个人是不是专家
				function isExport(){
					$http({
						url:"http://192.168.199.8:8088/WBSAPI/User/GetUser?UUID="+ $rootScope.uid,
						method:"Get"
					}).success(function(data){
						if(data.IsExpert==1){
							$('.l_receiving1').html("暂无评论权限");
						}
					    $scope.isExport = data.IsExpert
					    console.log($scope.isExport)
					    
					}).error(function(data){
						console.log(data)
					})
				}
				isExport()
			
			//查询当前用户是否是专家
			// 获取当前作品的专家点评
			var proid = $('.admin_cont').attr('data-value');
			professComment(proid, 1, 1);
		};
		// 获取专家点评方法。
		function professComment(id, cType, curPage) {
			$http({
				url: BaseURL + "/User/LoadUserCommentListByProductionIDAndType?productionid=" + id + "&type=" + cType + "&pageSize=10&curPage=" + curPage,
				method: 'get'
			}).success(function(data) {
				console.log(data)
				$scope.TotalCount = data.TotalCount;
				if(data.Data.length == 0) {
					$scope.professCommentUl = false;
					$scope.professComment = true;
				} else {
					$scope.professCommentUl = true;
					$scope.professComment = false;
					// 如若有值，就在页面上ng-repeat循环这个值
					$scope.professCommentList = data.Data;
				}
			})
		};
		// 删除作品评论信息
		function deleteComment(data, target) {
			$http({
				url: BaseURL + "/User/DeleteUserComment",
				method: "post",
				data: data
			}).success(function(result) {
				if(result.IsSucceed == true) {
					target.parents('.l_comments_border').remove();
					var proid = $('.admin_cont').attr('data-value');
					getComment(proid, 0, 1);
				};
				
			});
		};
		
		
		// 私信，获取用户的私信。
		$scope.receiveMes = function() {
			$scope.seneInfoMes = false;
			// globalStrAuthor  第一个作者
			var data = '戎兰'
			var res;
			$http({
				url: BaseURL + "/User/LoadUserByUserName?username=" + data,
				method: "get",
			}).success(function(result) {
				if(result == null) {
					return false
				} else {
//					//console.log(SYSUserID)
					queryDialog(SYSUserID, result.UUID)
				}
			});
		};
		// 查看是否有私信。
		function queryDialog(UserID, sendId) {
			$http({
				url: BaseURL + "/User/GetUserPrivateLetterListByUserIDOrSendUserid?userid=" + UserID + "&senduserid=" + sendId + "&pageSize=10&curPage=1",
				method: "get"
			}).success(function(result) {
				console.log(result);
				if(result.errCode != -1) {
					if(result.Data.length > 0) {
						$scope.yesreceiveMessage = true;
						$scope.noreceivedMessage = false;
					} else {
						$scope.yesreceiveMessage = false;
						$scope.noreceivedMessage = true;
					}
				}
			})
		}

		// 查询名字的按钮 
		$scope.searchName = function() {
			  var shoujianName =	$("#shoujianren").val()
			  $rootScope.Addressee = shoujianName
			
			$http({
				url: BaseURL + "/UseGroup/GetUserList?",
				method: "Get",
				params: {
					UserName: shoujianName
				}
			}).success(function(data, header, config, status) {
				//console.log(data)
				$scope.resultName = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}
		
		
		// 私信中的发送按钮
		$('input[name="key_name"]').blur(function() {
			_this = $(this);
			if(_this.val().length == 0) {
				return;
			} else {
				$http({
					url: BaseURL + "/User/LoadUserByUserName?username=" + _this.val(),
					method: "get",
				}).success(function(result) {
					if(result == null) {
						layer.confirm('该学者系统暂未收录！', {
							btn: ['确认'],
						}, function(index) {
							layer.close(index);
						});
					}
				});
			};
		});
		
		
		//获取下拉列表中选中的人名和他的ID 
		$scope.selectInfo = function(){
			var userName = $("#selectName option:selected");
			//console.log(userName);
			$rootScope.AddresseeUID = $("#selectName option:selected").attr("uid");
		}

		// 点击私信，显示写信输入框
		$scope.sendMes = function() {
			$scope.seneInfoMes = true;
			$scope.yesreceiveMessage = false;
			$scope.noreceivedMessage = false;
		};
		
		//私信，按钮发送方法。
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
						console.log(result);
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
		
		// 点击报错栏执行的方法。
		$scope.reportAnErrorClick = function() {
			var proid = $('.admin_cont').attr('data-value');
			reportAnError(proid, 2, 1);
		};
		// 报错页面
		function reportAnError(id, cType, curPage) {
			$http({
				url: BaseURL + "/User/LoadUserCommentListByProductionIDAndType?productionid=" + id + "&type=" + cType + "&pageSize=10&curPage=" + curPage,
				method: 'get'
			}).success(function(data) {
				$scope.TotalCount = data.TotalCount;
				if(data.Data.length == 0) {
					$scope.reportError = true;
					$scope.reportErrorUl = false;
				} else {
					$scope.reportError = false;
					$scope.reportErrorUl = true;
				}
				//              //console.log(data);
			})
		};
	});
	// 自定义指令判断img图片加载失败显示默认图片
	app.directive('errSrc', function() {
		return {
			link: function(scope, element, attrs) {
				element.bind('error', function() {
					if(attrs.src != attrs.errSrc) {
						attrs.$set('src', attrs.errSrc);
					}
				});
			}
		}
	});
	app.filter('Email', function() {
		return function(inputS) {
			var arr = inputS.split(',');
			var email;
			$.ajax({
				url: BaseURL + "/User/LoadUserByUserName?username=" + arr[0],
				type: "get",
				async: false,
				success: function(data) {
					if(data == null || data.UserEmail == null) {
						email = 'javascript:void(0)';
					} else {
						email = data.UserEmail;
					}
				}
			});
			return email;
		};
	});
	app.filter('filterJ', function() {
		return function(input) {
			if(input == null || input == undefined) {
				return "暂无数据"
			}
		}
	});
	app.filter('imgSrc', function() {
		return function(input) {
			var src = '';
			if(input == undefined) {
				return;
			}
			$.ajax({
				url: BaseURL + "/MainUser/LoadUserPersonalHomepageByUseriD?userID=" + input,
				type: 'get',
				async: false,
				success: function(data) {
					//console.log(data);
					if(data == null || data.UploadIMG == null) {
						src = '/img/tp.png'
					} else {
						src = data.UploadIMG
					}
				}
			})
			return src;
		}
	});
})