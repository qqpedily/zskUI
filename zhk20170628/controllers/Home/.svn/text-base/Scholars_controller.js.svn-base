define(function(require) {
	var app = require('../../javascripts/app');
	app.controller('Scholars_controller', function($scope, $state, $http) {
		$scope.lwCount = ''
		$scope.downLoadUrl = downLoadUrl;
		// 存储首字母数据返回数据
		$scope.FirstLetter;
		//存储职称
		$scope.getOccupation;
		// 存储院系
		$scope.collegeDesign;
		//      $scope.TotalCount;
		var t = 0;
		var tt = 0;
		var s = 0; //
		var v = 0; //
		var globalFetter;
		$scope.v = 'd'
		$scope.vv = 'p'
		
		Loading()

		function Loading() {
			console.log('loading执行')
			getValByOccup(1); //会触发
			collegeDesign(); //不会触发
			getOccupation(); //不会触发
			$(".item_list li").click(function() {
				window.open("scholar_details.html", "blank");
			});

		}
		// 按照学院显示学者
		//执行过程  
		//1 加载loading和watch(为S=0不加载)
		//2通过Loading s=1 触发 fn事件 进行分页操作
		var setPage = {
			"index": function(i) {
				if($scope.v == 'a') {
					showop(i) //首页条件查询
					console.log('执行a')
				} else if($scope.v == 'b') {
					console.log('执行b')
					sos(i);
				} else if($scope.v == 'c') {
					console.log('执行c')
					sendFirstLetter(i, 1);
				} else if($scope.v == 'd') {
					console.log('执行d')
					getValByOccup(i);
				} else if($scope.v == 'e') {
					console.log('执行e')
					requireEvent();
				} else if($scope.v == 'f') {
					console.log('执行f')
					requireEvent();
				} else if($scope.v == 'g') {
					console.log('执行g')
					getFdata(i);
				}
			}
		}
		$scope.$watch('TotalCount', function() {
			console.log('come in TotalCount')
			if(t == 1) {
				console.log('t == 1 分页执行')
				if(typeof($scope.TotalCount) == 'undefined') {
					console.log('执行分页1')
					fenye();
				} else {
					console.log('执行分页2')
					$("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
				}
			} else {
				console.log('come in TotalCount初始化无操作')
			}
		})

		function fenye() {
			$("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
		}
		//一级院系点击事件
		$scope.showOrhideParent = function($event) {
			var ev = $($event.target);
			$scope.parentVal = $($event.target).parents('li').attr('data-value');

			showop(1, ev);
		};
		$scope.parentVal1 = '';

		function showop(i, e) {
			console.log('showop')
			var o = ''
			$http({
				url: BaseURL + "/User/LoadUserByDepartID?departid=" + $scope.parentVal + "&pageSize=20&curPage=" + i,
				method: "get",
				data: {
					departid: $scope.parentVal
				}
			}).success(function(data) {

				$scope.TotalCount = data.TotalCount;
				$scope.FirstLetter = data; //1
				console.log(data)
				$scope.parentVal1 = $scope.parentVal;
				$scope.v = 'a';
			});
			// 请求子集部分。
			console.log($scope.parentVal1)
			if($scope.parentVal1 != $scope.parentVal) {
				$http({
					url: BaseURL + "/SYSCollege/getSYSCollegeListByParentID?parentid=" + $scope.parentVal,
					method: "get"
				}).success(function(data) {
					if(data != '') {
						e.parents('li').children('ul').show().parents('li').siblings().children('ul').hide();
					} else {
						e.parents('li').children('ul').hide().parents('li').siblings().children('ul').hide();
					}
					e.parents('li').children('a').addClass('action').parents('li').siblings().children('a').removeClass('action');

					console.log(data)
					$scope.son = data;
				});
			}

		}

		function sos(i) {
			$http({
				url: BaseURL + "/User/LoadUserByDepartID?departid=" + $scope.sonVal + "&pageSize=20&curPage=" + i,
				method: "get",
				data: {
					departid: $scope.sonVal
				}
			}).success(function(data) {
				$scope.TotalCount = data.TotalCount;
				$scope.FirstLetter = data; //2
				$scope.v = 'b';

			})
		}
		// 根据首字母查询方法
		function sendFirstLetter(curPage, n) {
			console.log(curPage + " " + n)
			//1为页面点击   0为首次加载
			if(n == 1) {
				console.log(curPage)
				console.log($scope.letter)
				$http({
					url: BaseURL + "/User/LoadUserBySurnamePhoneticize?phoneticize=" + $scope.letter + "&pageSize=20&curPage=" + curPage,
					method: "get"
				}).success(function(data) {
					console.log(data)
					$scope.pageSize = false;
					$scope.TotalCount = data.TotalCount;
					console.log('数据总数为：' + data.TotalCount)
					console.log('数据总数为：' + $scope.TotalCount)
					$scope.FirstLetter = data; //4
					$scope.v = 'c';
					n = 1;
				});
			} else if(n == 0) {
				n = 0;
				$scope.v = 'c';
				fenye();
			}

		};
		// 按照字母搜索
		// 获取页面院系列表
		function collegeDesign() {
			$http({
				url: BaseURL + "/SYSCollege/GetSYSCollegeList",
				method: "get"
			}).success(function(data) {
				console.log(data)
				$scope.aa = data;
			}).error(function(data) {
				console.log(data)
			});
		};
		// 根据职称获取页面数据学者列表
		function getValByOccup(curPage) {
			console.log('进入了getValByOccup ')
			console.log($scope.vv)
			console.log($scope.v)
			if($scope.vv != 'd' || $scope.v == 'd') {
				console.log('getValByOccup请求开始 ')
				var occpu = $("#postOccpu option:selected").text() == '' ? "教授" : $("#postOccpu option:selected").text();
				console.log(occpu + '_____' + curPage + '_____')
				$http({
					url: BaseURL + "/User/LoadUserByNameAndPositional?name=&positional=" + occpu + "&pageSize=20&curPage=" + curPage,
					method: "get"
				}).success(function(data) {
					if(data.Data.length == 0) {
						layer.confirm('暂无数据', {
							btn: ['确认'],
						}, function(index) {
							layer.close(index);
						});
					} else if(typeof($scope.FirstLetter) == 'undefined') {
						console.log(data)
						$scope.TotalCount = data.TotalCount;
						$scope.FirstLetter = data; //5
						$scope.v = 'd';
						if(t == 0) {
							console.log('第一次分页调用')
							fenye();
							t = 1;
						} else {

							console.log('第一次分页调用下面')
						}

					} else if(s == 1) {
						console.log('加载data')
						$scope.TotalCount = data.TotalCount;
						$scope.FirstLetter = data; //5
						//						$scope.v = 'p';
					} else {
						console.log('没有加载data')
						$scope.TotalCount = data.TotalCount;
						$scope.FirstLetter = data; //5
					}
					console.log('getValByOccup请求结束')
				});
			}

		};

		$scope.zhicd = function(name) {
			$http({
				url: BaseURL + "/Productions/GetLoadProductionByMetaData?columname=author&metaDataValue=" + name + "&pageSize=0&curPage=1",
				method: "get"
			}).success(function(data) {
				if(data.TotalCount > 0) {
					$scope.lwCount = data.TotalCount
				} else {
					$scope.lwCount = '0'
				}
			})
		}
		$scope.zhicl = function() {
			$scope.lwCount = ''
		}

		function imgs() {
			var UploadIMG;
			var PicUrl = 'http://192.168.199.8:8555/user_img/';
			$http({
				url: BaseURL + "/User/GetUserPersonalHomepageList?UserID=" + SYSUserID,
				method: "Get"
			}).success(function(data, header, config, status) {
				//	        	console.log(data);
				UploadIMG = PicUrl + data[0].UploadIMG;
				$scope.UserPersonalHomepageList = data[0];
				//响应成功
			}).error(function(data, header, config, status) {
				//	            $scope.IsDisplay = true;
				//处理响应失败
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		}

		// 按教授查询 + 名字
		function requireEvent(n) {
			if($('#require_name').val() == '') { // 按教授查询 + 名字
				getValByOccup(1);
			} else if($("#postOccpu option:selected").text() == '') { // 按职称查询
				var occpu = '';
				var name = $('#require_name').val();
				$http({
					url: BaseURL + "/User/LoadUserByNameAndPositional?name=" + name + "&positional=" + occpu + "&pageSize=20&curPage=1",
					method: "get"
				}).success(function(data) {
					if(data.Data.length == 0) {
						console.log(data)
						// 警告为空
						layer.confirm('暂无数据！', {
							btn: ['确认'],
						}, function(index) {
							layer.close(index);
						});
					} else {
						console.log(data)
						$scope.v = 'e';
						$scope.TotalCount = data.TotalCount;
						$scope.FirstLetter = data; //6

					}
				});
			} else {
				// 发送职称+姓名
				var occpu = $("#postOccpu option:selected").text(),
					name = $('#require_name').val();
				$http({
					url: BaseURL + "/User/LoadUserByNameAndPositional?name=" + name + "&positional=" + occpu + "&pageSize=20&curPage=1",
					method: "get"
				}).success(function(data) {
					console.log(data)
					if(data.Data.length == 0) {
						// 警告为空
						layer.confirm('暂无数据！', {
							btn: ['确认'],
						}, function(index) {
							layer.close(index);
						});
					} else {
						$scope.TotalCount = data.TotalCount;
						$scope.FirstLetter = data; //7
						$scope.v = 'f';

					}
				});
			};
		};
		// 获取所有职称
		function getOccupation() {
			$http({
				url: BaseURL + "/User/GetSYSPositionalTitleTypeList",
				method: "get"
			}).success(function(data) {
				$scope.getOccupation = data;
			})
		}
		// 按钮查询事件
		$scope.send_require = function() {
			requireEvent(1);
		};
		// 回车键搜索
		$scope.send_require1 = function(e) {
			if(e.keyCode == 13) {
				requireEvent(1);

			}
		};
		$('#search_letter').find('dd').each(function(index, item) {
			_this = $(this);
			_this.on('click', function() {
				$scope.letter = $(this).text();
				globalFetter = $scope.letter;
				sendFirstLetter(1, 0);
			});
		});
		//二级点击加载
		$scope.showOrhideSon = function($event) {
			$scope.sonVal = $($event.target).attr('data-value');
			console.log($scope.sonVal)
			getFdata(1)
		};

		function getFdata(i) {
			$http({
				url: BaseURL + "/User/LoadUserByDepartID?departid=" + $scope.parentVal + "&pageSize=20&curPage=" + i,
				method: "get",
			}).success(function(data) {
				$scope.TotalCount = data.TotalCount;
				$scope.FirstLetter = data; //1
				console.log(data)
				$scope.v = 'g';
				console.log('完成')
			});
		}
		//55d127b6-d860-412b-8f30-28b300f9cf58
		$scope.sendMes = function($event) {
			var scholar = $($event.target).parents('li').attr('data-value');
			var userName = $($event.target).parents('li').attr('data-name');
			var userImg = $($event.target).parents('li').attr('data-img');
			var userImg2 = $($event.target).parents('li').attr('data-img2');
			console.log(userImg)
			$state.go('index.scholar_details', {
				"dataVal": scholar,
				'userName': userName,
				'userImg':userImg,
				'userImg2':userImg2
			});
		};

		function fn() {
			if(tt == 1) {
				console.log('观察开始');
				console.log('加载分页')
				console.log('执行' + $scope.v + '操作')
				$("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
				console.log('加载分页完成')
				console.log('---初始化操作结束---')
				if($scope.TotalCount == '' || typeof($scope.TotalCount) == 'undefined') {
					console.log($scope.TotalCount)
					console.log('没有数据 分页不显示')
					$('#pageSize').css('display', 'none');
				} else {
					console.log('数据总数为：' + $scope.TotalCount)
					console.log('分页正常显示')
					$('#pageSize').css('display', 'block');
				}
				console.log('观察结束')
			}
		}
	});

	// 获取职称
	app.filter('zhic', function() {
		return function(input) {
			var dd;
			if(input == null)
				dd = '职称未上传'
			else if(input.length > 6)
				dd = input.substring(0, 6);
			else
				dd = input
			return dd;
		}
	});

	//论文量
	app.filter('lwCount', function() {
		return function(input) {
			var dd;
			$.ajax({
				url: BaseURL + "/Productions/GetLoadProductionByMetaData?columname=author&metaDataValue=" + input + "&pageSize=0&curPage=1",
				type: "Get",
				async: false,
				success: function(data, mes) {
					if(data.errCode !== -1) {
						if(data.TotalCount > 0) {
							dd = data.TotalCount
						} else {
							dd = 0
						}
					}

				}
			})
			return dd;
		};
	})
});
// $scope.$watch('flag1', function () {
//     var setPage = {
//         "index": function (i) {
//             sendFirstLetter(globalFetter, i);
//         }
//     };
//     $("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
// })