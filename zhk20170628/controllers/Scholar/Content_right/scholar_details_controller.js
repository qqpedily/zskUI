define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('scholar_details_controller', function($scope, $http, $stateParams, $state, $cookies, $cookieStore, $timeout, $rootScope) {
		var userid = $rootScope.uid;
		var userName = $stateParams.userName;
		$rootScope.dataVal = $stateParams.dataVal;
		var dataVal = $stateParams.dataVal;
		$scope.downLoadUrl = $stateParams.userImg;
		$scope.downLoadUrl2 = $stateParams.userImg2;
		$scope.userid = userid;
		console.log($stateParams.userImg)
		console.log()
		var longTime = '2000000';
		var date = new Date();
		$scope.gz = true; //关注状态

		if($stateParams.dataVal == '') {
			$rootScope.dataVal = $cookies.get('UserTime');
			//			console.log('get')
		} else {
			$cookies.put('UserTime', $stateParams.dataVal, {
				expires: new Date(new Date().getTime() + longTime)
			});
			//			console.log('set')
		}

		setCollect();
		dataLists();
		$scope.orAttion = '关注用户'
		//关注用户
		//1000447   123456
		var s = 0;
		var name = userName; // 存储学者的名字 张建航

		function dataLists() {
			//内容类型
			$http({
				url: BaseURL + "/MainUser/LoadContentListCount?username=" + userName,
				method: "Get"
			}).success(function(data, header, config, status) {
				$scope.datac = data.Result;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			//发表日期
			$http({
				url: BaseURL + "/MainUser/GetSYS_YearListAndCountAsync?username=" + userName,
				method: "Get"
			}).success(function(data, header, config, status) {
				console.log(data)
				if(data == '') {
					$scope.datat = jdata;
				} else {
					if(data.length < 5) {
						$scope.datat = yearList(data);
					} else {
						$scope.datat = data;
					}
				}

				chartInit(userName);
				//				
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			$scope.nextYe = function(id) {
				$state.go('index.Research.Article_detail', {
					'data': id
				})

			}

			var year = date.getFullYear();

			var jdata = [{
					'ContentYearCount': 0,
					'ContentYearID': 'issued',
					'ContentYear': year
				},
				{
					'ContentYearCount': 0,
					'ContentYearID': 'issued',
					'ContentYear': year - 1
				},
				{
					'ContentYearCount': 0,
					'ContentYearID': 'issued',
					'ContentYear': year - 2
				},
				{
					'ContentYearCount': 0,
					'ContentYearID': 'issued',
					'ContentYear': year - 3
				},
				{
					'ContentYearCount': 0,
					'ContentYearID': 'issued',
					'ContentYear': year - 4
				}
			]

			function yearList(data) {
				var year = date.getFullYear();
				var go = 0
				var obj = {}
				var arr = new Array(5);
				var leng = data.length;
				var arrC = []
				$.each(data, function(i) {
					arrC.push(data[i].ContentYear)
				});
				$.each(arr, function(i) {
					if(data[go].ContentYear == year - i) {
						arr[i] = data[go]
						go++
					} else {
						arr[i] = {
							"ContentYearID": "issued",
							"ContentYear": year - i,
							"ContentYearCount": 0
						}
					}

				});
				if(go == 0 || leng > go + 1) {
					var m = leng - go;
					for(var j = 0; j < m; j++) {
						arr.push(data[leng - m + j])

					}
				}
				return arr;
			}
			//语言
			$http({
				url: BaseURL + "/MainUser/GetSYS_LanguageListAndCount?username=" + userName,
				method: "Get"
			}).success(function(data, header, config, status) {
				//				
				$scope.datay = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			//收录类型
			$http({
				url: BaseURL + "/MainUser/GetUserIndexedTypeListAndCount?username=" + userName,
				method: "Get"
			}).success(function(data, header, config, status) {

				$scope.datas = data;
				console.log(data)
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			//全文
			$http({
				url: BaseURL + "/TemplateField/GetSYS_AttachmentListAndCount",
				method: "Get"
			}).success(function(data, header, config, status) {

				$scope.dataq = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});

		}
		// 去主页
		$scope.goHome = function() {
			$state.go('index.Home');
		};
		// 去学者页
		$scope.goScholar = function() {
			$state.go('index.Scholars');
		};
		// 显示更多摘要
		$scope.showmoreDetail = function($event) {
			var index = $($event.target).attr('data-value');
			$('.one' + index).toggle('show');
		};

		// 去作品详情页
		$scope.goArtialDetail = function($event) {
			var val = $($event.target).parents('li').attr('data-value');
			$state.go('index.Research.Article_detail', {
				data: val
			});
		};
		// 作品收藏功能，收藏作品
		$scope.collectAll = function($event) {
			var dom_this = $($event.target);
			var proid = dom_this.parents('li').attr('data-value');
			$http({
				url: BaseURL + "/User/LoadUserCollectProductBySysUserIDAndProductionID?sysuserID=" + userid + "&productionID=" + proid,
				type: 'get'
			}).success(function(data) {
				if(data == '' || data == null) {
					addCollect(userid, proid);
					dom_this.addClass('color');
				} else {
					dom_this.removeClass('color');
				}
			})
		};
		// 添加收藏
		function addCollect(sysid, proid) {
			$http({
				url: BaseURL + "/User/AddOrUpdateRelationUserCollectProduct",
				method: 'post',
				data: {
					"ProductionID": proid,
					"SysUserID": sysid,
				}
			}).success(function(data) {
				if(IsSucceed == true) {}
			})
		} // 页面加载判断是否已经关注作品
		function setCollect() {
			$('.listCollect').each(function(i, item) {
				var _this = $(item);
				var productionID = $(item).attr('data-value');
				$http({
					url: BaseURL + "/User/LoadUserCollectProductBySysUserIDAndProductionID",
					type: 'post',
					data: {
						'sysuserID': userid,
						'productionID': productionID
					}
				}).success(function(data) {;
					if(data.Data.length > 0) {
						//						console.log(_this);
						_this.addClass('color');
					} else {
						//						console.log(_this);
						_this.addClass('color');
					}
				})
			})
		}

		// 获取传递过来的学者id

		//		console.log(dataVal)
		if(dataVal == '') {
			ajaxGet($cookies.get('dataVal')); //获取学者信息
			//orAttion(userid, $cookies.get('dataVal')); // 判断用户是否已经关注这个学者
		} else {
			$cookies.put('dataVal', dataVal, {
				expires: new Date(new Date().getTime() + 500000000000000)
			});

			ajaxGet(dataVal); //获取学者信息
			//orAttion(userid, dataVal); // 判断用户是否已经关注这个学者
		};
		// 获取学者信息，通过返回的学者信息，进行查询。
		function ajaxGet(value) {
			//			console.log(value)   //获取的是ID
			$http({
				url: BaseURL + "/User/GetUserInfoByID/" + value,
				method: "Get"
			}).success(function(data) {
				console.log(data)
				$scope.userList = data;
				bm(data.UUID)
				$scope.uuidOne = data.UserID;
				// 学者个人描述
				$scope.describe = data.PersonalProfile == null ? '暂无信息' : data.PersonalProfile;
				// 学者发文可能采用的名字
				$scope.scholarInfo = data;
				name = data.SurnameChinese + data.NameChinese;

				getArtialbyAuthor(name, 1);

				yjfx();

				gzLogin(1)
			}).error(function(data, header, config, status) {
				//				console.log('ajaxGet 方法报错')
			});
		};
		//获取别名
		function bm(UUID) {
			$http({
				url: BaseURL + "/User/GetUserAliasList?UserID=" + UUID,
				method: "Get"
			}).success(function(data) {
				console.log(data)
				if(data[0].AliasName !== '') {
					$scope.bm = data[0].AliasName;
					$scope.bmm = data
				} else {
					$scope.bm = userName;
					$scope.bmm = userName;
				}

			}).error(function(data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		}
		// 获取职称
		function getOccpu(pptid) {
			//			console.log(pptid)
			if(pptid == null || pptid == '') {
				return;
			} else {
				$http({
					url: BaseURL + "/User/GetSYSPositionalTitleTypeByID/" + pptid,
					method: "Get"
				}).success(function(data) {
					//					console.log('获取职称：' + data)
					$scope.Occup = data;
				}).error(function(data, header, config, status) {
					layer.confirm('请求失败，请刷新重试', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
				});
			};
		};

		//获取研究方向
		function yjfx() {
			$http({
				url: BaseURL + "/User/GetUserSearchDirectionList?UserID=" + dataVal,
				method: "Get"
			}).success(function(data, header, config, status) {
				if(data == '') {
					$scope.yjfx = '暂无研究方向'
				} else {
					$scope.yjfx = data[0].SubjectName;
				}
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				//处理响应失败
			});
		}
		//http://192.168.199.8:8555/user_img/图片地址 
		//获取学者院系。
		function getCllege(depid) {
			if(depid == null || depid == '') {
				return;
			} else {
				$http({
					url: BaseURL + "/User/User_GetSYSCollegeByID/" + depid,
					method: "Get"
				}).success(function(data) {
					//					console.log('获取学者院系：' + data)
					$scope.College = data;
				}).error(function(data, header, config, status) {
					layer.confirm('请求失败，请刷新重试', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
				});
			};
		};
		// 添加关注
		function addAttion() {
			//			console.log($scope.userList)
			console.log('进入关注')
			var data = {
				"UserID": $rootScope.uid,
				"CollectInfoID": $scope.userList.UUID,
				"CollectInfoName": $scope.userList.SurnameChinese + $scope.userList.NameChinese
			}
			//			console.log('关注完成')
			$http({
				url: BaseURL + "/User/AddOrUpdateRelationUserCollectScholar",
				method: "post",
				data: data
			}).success(function(data) {
				console.log(data)
				$scope.orAttion = '已关注'
			})
		};

		$scope.addAt = function(n) { //关注前的验证

			gzLogin(n);

			//				$scope.orAttion = '已关注'

		}

		function gzLogin(n) {
			if(n=='')
			n = 1
			console.log('验证')
			var data = {
				"sysuserID": $rootScope.uid,
				"scholarID": $scope.userList.UUID
			}
			

			$http({
				url: BaseURL + "/User/LoadUserCollectScholarBySysUserIDAndScholarID?sysuserID=" + $rootScope.uid + "&scholarID=" + $scope.userList.UUID,
				method: "get"
			}).success(function(data, status) {
				console.log(data)
				if(data == '' || data == null) {
					//未关注
					console.log('g1')
					if(n == 2) {
						addAttion()
						console.log('g2')
					}else{
						console.log('g3')
					}
					
				} else {
					console.log('g4')
					$scope.orAttion = '已关注'
					console.log( '已关注')
				}
				
			}).error(function(error) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		}

		//添加收藏
		function addacc() {
			//			console.log($scope.userList)
			var data = {
				"UserID": $rootScope.uid,
				"CollectInfoID": $scope.userList.UUID,
				"CollectInfoName": $scope.userList.SurnameChinese + $scope.userList.NameChinese
			}

			//			console.log('关注完成')
			$http({
				url: BaseURL + "/User/AddOrUpdateRelationUserCollectProduct",
				method: "post",
				data: data
			}).success(function(data) {
				alert('已关注')
			})
		};

		$scope.scClick = function(id) { //收藏前的验证
			console.log(id)
			console.log('收藏前的验证')
			var data = {
				"sysuserID": $rootScope.uid,
				"productionID": id
			}

			$http({
				url: BaseURL + "/User/LoadUserCollectProductBySysUserIDAndProductionID?sysuserID=" + $rootScope.uid + "&productionID=" + id,
				method: "get"
			}).success(function(data, status) {

				if(data !== '' || data !== 'null') {
					//					console.log('没有关注 执行关注！')
					addacc();
				} else {
					//					console.log('您已经关注过了！')
				}
			}).error(function(error) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		}
		//分页	
		$scope.$watch('flag', function() {
			//			console.log('flag')
			//			console.log(s)
			var setPage1 = {
				"index": function(i) {
					if(s > 2) {
						//						console.log(i)
						getArtialbyAuthor(userName, i)
					}
				}
			};
			if(s == 2) {
				//				console.log('加载分页')
				$("#pageSize").initPage($scope.TotalCount, 0, setPage1.index);
				s++;
				//				console.log('生成分页')
				if(typeof($scope.TotalCount) == 'number') {
					//console.log('显示分页 分页数为：' + $scope.data.TotalCount)
					$('#pageSize').css('display', 'block');
				} else if(typeof($scope.TotalCount) == 'undefined') {
					//console.log('不显示分页值为:' + $scope.data.TotalCount)
					$('#pageSize').css('display', 'none');
				}
				//console.log('$watch进入defg 观察结束')
				$scope.dz = true
			} else {
				if($scope.dz) {
					//console.log('a')
				} else {
					//console.log(s)
					console.log('未生成分页')
					$('#pageSize').css('display', 'none');
					//console.log(s)
					s++;
				}

			}
			s++;
		})
		// 根据作者名，获取作者的作品
		function getArtialbyAuthor(name, curPage) { //第一次展示位置
			//			console.log(name)
			$http({
				url: BaseURL + "/Productions/GetLoadProductionByMetaData?columname=author&metaDataValue=" + name + "&pageSize=5&curPage=" + curPage,
				method: "Get"
			}).success(function(data, mes) {
				//				console.log('getArtialbyAuthor')
				if(data.errCode !== -1) {
					if(data.Data.length > 0) {
						console.log(data)
						$scope.Artial = data.Data;
						$scope.totalArtialCount = data.TotalCount;
						$scope.relationAll = data.Data[0].author; //.split(';')
						$scope.TotalCount = data.TotalCount;
						fl();
					} else {
						$scope.totalArtialCount = '0';
						console.log('没有数据')
					}
				}
			})
		};

		function fl() {
			//			console.log('fl')
			if($scope.flag == true) {
				$scope.flag = false
				//				console.log('$scope.flag == false')
			} else {
				//				console.log('$scope.flag == true')
				$scope.flag = true
			}
		}
		// 判断用户是否已经关注这个学者
//		function orAttion(userid, scholarid) {
//			$http({
//				url: BaseURL + "/Attention/LoadBySysUserIDAndScholarID?sysuserID=" + userid + "&scholarID=" + scholarid,
//				method: 'get'
//			}).success(function(data) {;
//
//				if(data == null) {
//					$scope.orAttion = '+关注'
//				} else {
//					$scope.orAttion = '取消关注';
//					uuid = data.UUID;
//				}
//			})
//		};
		//导出选中数据请求
		$scope.fileDownsc = function(id) {
			$http({
				url: BaseURL + "MainUser/GetAttachmentByBusssinessid?busssinessid=" + id,
				method: "Get"
			}).success(function(data) {
				$scope.bsUrl = data;
			}).error(function(data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		}
		$scope.more = function(a) {
			var b = "pane" + a;
			$("#" + b).toggleClass("fontMax");
		}
		$scope.morezy = function(a) {
			var b = "zy" + a;
			$("#" + b).toggleClass("zsShow");

		}
		//收藏事件
		//		$scope.scClick = function(idx) {
		//			console.log(idx)
		//			console.log($scope.data)
		//			console.log(idx)
		//
		//			addl()
		//
		//			function addl() {
		//				var data = {
		//					"sysuserID": $rootScope.uid,
		//					"productionID": $scope.userList.ProductionID
		//				}
		//
		//				$http({
		//					url: BaseURL + "/User/LoadUserCollectProductBySysUserIDAndProductionID?sysuserID=" + $rootScope.uid + "&productionID=" + $scope.userList.ProductionID,
		//					method: "get"
		//				}).success(function(data, status) {
		//					if(data == '' || data == 'undefined') {
		//						addou();
		//					} else {
		//						alert('您已经关注过了！')
		//					}
		//				}).error(function(error) {
		//					layer.confirm('请求失败，请刷新重试', {
		//						btn: ['确认'],
		//					}, function(index) {
		//						layer.close(index);
		//					});
		//				});
		//			}
		//
		//			function addou() {
		//				var data = {
		//					"UserID": $rootScope.uid,
		//					"CollectInfoID": $scope.userList.ProductionID,
		//					"CollectInfoName": $scope.userList.Title
		//				}
		//
		//				$http({
		//					url: BaseURL + "/User/AddOrUpdateRelationUserCollectProduct",
		//					method: "POST",
		//					data: data
		//				}).success(function(data, status) {
		//					layer.confirm('收藏成功', {
		//						btn: ['确认'],
		//					}, function(index) {
		//						layer.close(index);
		//					});
		//				}).error(function(error) {
		//					layer.confirm('请求失败，请刷新重试', {
		//						btn: ['确认'],
		//					}, function(index) {
		//						layer.close(index);
		//					});
		//				});
		//			}
		//
		//		}
		$scope.sc = function(i) {
			fl();
			if(typeof(i) == 'undefined') {
				i = 1
			}
			var data = chaxutiaojian();
			data.CurPage = i;

			$http({
				url: BaseURL + "/Productions/LoadProductionByCondition",
				method: "POST",
				data: data
			}).success(function(data, status) {
				//				console.log('sc方法开始加载')
				$scope.Artial = data.Data;

				//				console.log('sc方法加载完成')
				//				console.log('---操作结束---')
				//响应成功
			}).error(function(error) {
				console.log("error");
				//处理响应失败
			});

		}

		//公共查询条件封装  返回一个查询的data模板   参数a为顶部查询的条件
		function chaxutiaojian() {

			var dataList = [];
			var dataobj = {};
			var vName = {};
			var sVal = [];
			var Order = "";
			var OrderBy = "";
			var msList = [{
					'k': 'ContentTypelist'
				},
				{
					'k': 'IndexedTypeList'
				},
				{
					'k': 'LanguageList'
				},
				{
					'k': 'YearList'
				}
			];

			for(var i = 0; i < 4; i++) {
				dl(msList[i])
			};
			//sid：id  ip:input的name
			function dl(kk) {
				$("input[name=" + kk.k + "]:checkbox").each(function(index) {
					if($(this).is(":checked")) {
						dataobj[$(this).val()] = $(this).attr('aName');
						console.log(dataobj)
						dataList.push(dataobj)
						dataobj = {};
					}
				})
			};
			$scope.sVal = sVal;

			dataList.push({
				'author': userName
			})

			console.log(dataList)
			//查询的条件调用
			var data = {
				"Diclist": dataList,
				"PageSize": 5,
				"CurPage": 1,
				"Order": '',
				"OrderBy": ''
			}
			return data;
		}
		// 图表初始化 $scope.datat
		function chartInit(name) {
			var data = $scope.datat;
			var sesName = name.substring(0, 10);
			var myChart = echarts.init(document.getElementById('main'));
			// 指定图表的配置项和数据
			var ContentYear = []
			var ContentYearCount = []
			$.each(data, function(i, v) {

				ContentYear.push(data[i].ContentYear + "年")
				ContentYearCount.push(data[i].ContentYearCount)
			});
			option = {
				title: {
					text: sesName + '文献统计',
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['文档数', '重要成果']
				},
				toolbox: {
					show: true,
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					data: ContentYear
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
						name: '文献数',
						type: 'bar',
						data: ContentYearCount,
						markPoint: {
							data: [{
									type: 'max',
									name: '最大值'
								},
								{
									type: 'min',
									name: '最小值'
								}
							]
						},
						markLine: {
							data: [{
								type: 'average',
								name: '平均值'
							}]
						}
					}
					//					{
					//						name: '重要成果',
					//						type: 'bar',
					//						data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
					//						markPoint: {
					//							data: [{
					//									name: '年最高',
					//									value: 182.2,
					//									xAxis: 7,
					//									yAxis: 183,
					//									symbolSize: 18
					//								},
					//								{
					//									name: '年最低',
					//									value: 2.3,
					//									xAxis: 11,
					//									yAxis: 3
					//				s				}
					//							]
					//						},
					//						markLine: {
					//							data: [{
					//								type: 'average',
					//								name: '平均值'
					//							}]
					//						}
					//					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}

	});
	//中英文
	app.filter('ZE', function() {
		return function(input) {
			console.log(input)
			if(input.Abstract == '') {
				console.log(input.EnglishAbstract)
				return input.EnglishAbstract;
			} else {
				console.log(input.Abstract)
				return input.Abstract
			}
		}
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
	app.filter('imgSrc', function() {
		return function(input) {
			var src = '';
			if(input == undefined) {
				return;
			}
			src = 'tp.png'
			return src;
		}
	});

	app.filter('moreText', function() {
		return function subString(str, len, hasDot) {
			if(str != null) {
				var newLength = 0;
				var newStr = "";
				var chineseRegex = /[^\x00-\xff]/g;
				var singleChar = "";
				var strLength = str.replace(chineseRegex, "**").length;
				//console.log.log(strLength)
				for(var i = 0; i < strLength; i++) {
					singleChar = str.charAt(i).toString();
					if(singleChar.match(chineseRegex) != null) {
						newLength += 2;
					} else {
						newLength++;
					}
					if(newLength > len) {
						break;
					}
					newStr += singleChar;
				}
				if(hasDot && strLength > len) {
					newStr += "...";
				}
			} else {
				newStr = '暂无...'
			}

			return newStr;
		}
	})
});

//		$scope.$watch('flag', function() {
//			var setPage = {
//				"index": function(i) {
//					getArtialbyAuthor(name, i);
//				}
//			};
//			$("#pageSize").initPage($scope.TotalCount, 0, setPage.index);
//		})

//		$scope.$watch('defg', function() {
//			console.log(s)
//			console.log('defg')
//			if(s == 2)
//				console.log('$watch进入defg 观察开始')
//
//			var setPage1 = {
//				"index": function(i) {
//					if(s > 2) {
//						
//					}
//				}
//			};
//			if(s == 2) {
//				console.log('加载分页')
//				$("#pageSize").initPage($scope.data.TotalCount, 0, setPage1.index);
//				console.log('加载分页完成')
//				console.log('---初始化操作结束---')
//				s++;
//				console.log('生成分页')
//				if(typeof($scope.data.TotalCount) == 'number') {
//					console.log('显示分页 分页数为：' + $scope.data.TotalCount)
//					$('#pageSize').css('display', 'block');
//				} else if(typeof($scope.data.TotalCount) == 'undefined') {
//					console.log('不显示分页值为:' + $scope.data.TotalCount)
//					$('#pageSize').css('display', 'none');
//				}
//
//				console.log('$watch进入defg 观察结束')
//				$scope.dz = true
//			} else {
//				if($scope.dz) {
//					console.log('a')
//				} else {
//					console.log(s)
//					console.log('未生成分页')
//					$('#pageSize').css('display', 'none');
//					console.log(s)
//					s++;
//				}
//
//			}
//			s++;
//		})