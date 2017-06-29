define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('article_list_controller', function($scope, $http, $stateParams, $state, $rootScope, $cookies, $cookieStore) {
		$scope.defg = true;
		$scope.datatj = $stateParams.data;
		$scope.tiaoj = $stateParams.tiaoj;
		$scope.Wxid = $stateParams.Wxid;
		console.log($stateParams.tiaoj)
		$scope.default = $stateParams.default;
		$scope.Tid = $stateParams.Tid;
		console.log($stateParams.data)
		//console.log($stateParams.tiaoj)
		//console.log($stateParams.default)
		console.log($stateParams.Tid)
		$scope.dz = false
		var ss = $stateParams.tiaoj;

		var longTime = '2000000';
		var Tid = $stateParams.Tid;
		var c = true;
		var s = 0;
		var v = 0;
		if(Tid == '' || typeof(Tid) == 'undefined') {
			//			Tid = $cookies.get('Tid');
		}
		//console.log('开始加载数据操作')
		if(Tid == 'default') {
			//console.log('default页数据')
			//			//console.log('default  cookes存储')
			//			$cookies.put('default', $stateParams.default, {
			//				expires: new Date(new Date().getTime() + longTime)
			//			});
			//
			//			$cookies.put('defaultTiaoj', $stateParams.tiaoj, {
			//				expires: new Date(new Date().getTime() + longTime)
			//			});
			//			$cookies.put('Tid', $stateParams.Tid, {
			//				expires: new Date(new Date().getTime() + longTime)
			//			});
		}
		//绑定数据defaultcid
		if(Tid == 'unit') {
			console.log('左侧导航过来');
			$scope.datatj = $stateParams.data;
			wac(1);
			$scope.v = 'unit';
		} else if(Tid == 'defaultcid') {
			var CollegeId = $stateParams.CollegeId;
			//console.log(CollegeId)
			console.log('院系列表');
			ajaxGet(CollegeId, 1);
			$scope.v = 'ajaxGet';
		} else if(Tid == 'unit_z') {
			//console.log('上级子节点进入');
			sjchaxun($scope.tiaoj);
			$scope.v = 'sx'
		} else if(Tid == 'sx') {
			//console.log('页面刷新');
			chaxun(1);
			$scope.v = 'sx'
		} else {

			wac(1);
			c = true
		}

		function wc() {
			if($scope.defg == true)
				$scope.defg = false;
			else
				$scope.defg = true
		}
		$scope.$watch('defg', function() {
			//console.log(s)
			//console.log('defg')
			if(s == 2)
				//console.log('$watch进入defg 观察开始')

				var setPage1 = {
					"index": function(i) {
						if(s > 2) {
							console.log('执行' + $scope.v + '操作')
							//console.log($scope.v)
							if($scope.v == 'chaxun') {
								chaxun(i) //首页条件查询
							} else if($scope.v == 'ajaxGet') {
								var CollegeId = $stateParams.CollegeId;
								ajaxGet(CollegeId, i); //首页院校查询
							} else if($scope.v == 'unit') {
								//console.log(i)
								wac(i);
							} else if($scope.v == 'sx') {
								wac(i);
							} else if($scope.v == 'px') {

							}
						}
					}
				};
			if(s == 2) {
				//console.log('加载分页')
				$("#pageSize").initPage($scope.data.TotalCount, 0, setPage1.index);
				//console.log('加载分页完成')
				//console.log('---初始化操作结束---')
				s++;
				//console.log('生成分页')
				if(typeof($scope.data.TotalCount) == 'number') {
					//console.log('显示分页 分页数为：' + $scope.data.TotalCount)
					$('#pageSize').css('display', 'block');
				} else if(typeof($scope.data.TotalCount) == 'undefined') {
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
					//console.log('未生成分页')
					$('#pageSize').css('display', 'none');
					//console.log(s)
					s++;
				}

			}
			s++;
		})
		//零散条件查询结果
		function chaxun(i) {
			var dataList = []
			dataList.push($stateParams.default)
			var data = {
				"Diclist": dataList,
				"PageSize": 5,
				"CurPage": i,
				"Order": '',
				"OrderBy": ''
			}
			$http({
				url: BaseURL + "/Productions/LoadProductionByCondition",
				method: "POST",
				data: data
			}).success(function(data, status) {
				//console.log('chaxun方法开始加载')
				$scope.data = data;
				//console.log(data)
				//console.log('chaxun方法加载完成')
				//console.log('---操作结束---')

				wc()

				//响应成功
			}).error(function(error) {
				//console.log("error");
				//处理响应失败
			});

		}
		//上节子节点查询
		function sjchaxun(i) {

			if(Tid == 'unit_z') {
				var dataList = $stateParams.data;
				$http({
					url: BaseURL + "/Productions/LoadProductionByDepartID?departid="+$scope.Wxid+"&pageSize=5&curPage=1",
					method: "get",
					data: dataList
				}).success(function(data, status) {
					//console.log('sjchaxun方法开始加载') 
					$scope.data = data.Result;
					console.log(data)
					//console.log('sjchaxun方法加载完成')
					//console.log('---操作结束---')
					wc()
					//响应成功
				}).error(function(error) {
					//console.log("error");
					//处理响应失败
				});
			} else {
				var dataList = $rootScope.chaxutiaojian(i);
				dataList.Diclist.push(i)
				$http({
					url: BaseURL + "/Productions/LoadProductionByCondition",
					method: "POST",
					data: dataList
				}).success(function(data, status) {
					//console.log('sjchaxun方法开始加载')
					$scope.data = data;
					console.log(data)
					//console.log('sjchaxun方法加载完成')
					//console.log('---操作结束---')
					wc()
					//响应成功
				}).error(function(error) {
					//console.log("error");
					//处理响应失败
				});
			}

			console.log(dataList)

		}

		// 根据学院id请求数据，映射到页面
		function ajaxGet(value, curPage) {
			console.log(value)
			$http({
				url: BaseURL + "/MainUser/GetProductionsByCID?cid=" + value + "&pageSize=5&curPage=" + curPage,
				method: "Get"
			}).success(function(data) {
				//console.log('ajaxGet方法开始加载')
				console.log(data)
				$scope.data = data;
				//console.log(data)
				//console.log('ajaxGet方法加载完成')
				//console.log('---操作结束---')
				wc()
			}).error(function(data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		};

		function ajaxAllGet(value, curPage) {
			$http({
				url: BaseURL + "/MainUser/GetProductionsByCID?cid=" + value + "&pageSize=5&curPage=" + curPage,
				method: "Get"
			}).success(function(data) {
				//console.log('ajaxALLGet方法开始加载')
				$scope.data = data;
				//console.log(data);
				//console.log('ajaxALLGet方法加载完成')
				//console.log('---操作结束---')
				wc()
			}).error(function(data, header, config, status) {
				layer.confirm('请求失败，请刷新重试', {
					btn: ['确认'],
				}, function(index) {
					layer.close(index);
				});
			});
		};
		$scope.more = function(a) {
			var b = "pane" + a;
			$("#" + b).toggleClass("fontMax");
		}
		$scope.morezy = function(a) {
			var b = "zy" + a;
			$("#" + b).toggleClass("zsShow");

		}
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
		$scope.dLoad = function(id){
			$http({
					url: BaseURL + "/Productions/AddProductsDownloadNum?productid=" + id,
					method: "get"
				}).success(function(data, status) {
					
				}).error(function(error) {
					
				});
		}

		//收藏事件
		$scope.scClick = function(idx) {
			//console.log(idx)
			//console.log($scope.data)
			//console.log(idx)
			addl()

			function addl() {
				var data = {
					"sysuserID": $rootScope.uid,
					"productionID": idx.ProductionID
				}
				//console.log(data)

				$http({
					url: BaseURL + "/User/LoadUserCollectProductBySysUserIDAndProductionID?sysuserID=" + $rootScope.uid + "&productionID=" + idx.ProductionID,
					method: "get"
				}).success(function(data, status) {
					if(data == null) {
						console.log('没有关注 准备进入')
						addou();
					} else {
						console.log('您已经关注过了')
						alert('已经关注过了！')
					}
				}).error(function(error) {
					layer.confirm('请求失败，请刷新重试', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
				});
			}

			function addou() {
				var data = {
					"UserID": $rootScope.uid,
					"CollectInfoID": idx.ProductionID,
					"CollectInfoName": idx.Title
				}
				//console.log(data)

				$http({
					url: BaseURL + "/User/AddOrUpdateRelationUserCollectProduct",
					method: "POST",
					data: data
				}).success(function(data, status) {
					layer.confirm('收藏成功', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
				}).error(function(error) {
					layer.confirm('请求失败，请刷新重试', {
						btn: ['确认'],
					}, function(index) {
						layer.close(index);
					});
				});
			}

		}

		$scope.nextYe = function(id) {
			$state.go('index.Research.Article_detail', {
				'data': id
			})

		}

		$scope.allSelect = function(e) {
			$(e.target).children('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
			$("input[name=ckbAll]:checkbox:checked").each(function(i, e) {
				$scope.more($(this).attr('id'));
				$scope.morezy($(this).attr('id'));
			});
		}

		$scope.aa = function(a) {
			$('input[name=ckbAll]').prop("checked", a)
		}

		$scope.ao = function(a) {

		}
		var t = 'asc';
		$scope.sc = function(a, e) {

			var c = []
			$(e.target).children('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
			//			var t0 = 'desc';
			if(t == 'desc')
				t = 'asc'
			else
				t = 'desc'
			//console.log(t)
			var data = $rootScope.chaxutiaojian();
			if(data.Diclist.length == 0) {
				var Dd = {
					"Diclist": [{
						"iso": "中文"
					}],
					"PageSize": 5,
					"CurPage": 1,
					"Order": "",
					"OrderBy": ""
				}
				var data = Dd;
			} else {
				var data = $scope.datatj;
			}

			if(data.Diclist.length == 0) {
				console.log('0')
			}
			data.Order = a;
			console.log(a)
			data.OrderBy = t;
			console.log(data)
			$http({
				url: BaseURL + "/Productions/LoadProductionByCondition",
				method: "POST",
				data: data
			}).success(function(data, status) {
				$scope.data = data;
				console.log(data)
				//响应成功
			}).error(function(error) {
				//console.log("error");
				//处理响应失败
			});

			//			$rootScope.scopeClick(c);
		}

		function wac(i) {
			var data = $scope.datatj;
			data.CurPage = i;
			console.log(data)
			$http({
				url: BaseURL + "/Productions/LoadProductionByCondition",
				method: "POST",
				data: data
			}).success(function(data, status) {
				//console.log('wac方法开始加载')
				$scope.data = data;
				console.log(data)
				//console.log('wac方法加载完成')
				//console.log('---操作结束---')
				wc()
				//响应成功
			}).error(function(error) {
				//console.log("error");
				//处理响应失败
			});
		}

		//批量下载
		$scope.BatchDownload = function() {
			$("input[name=ckbAll]:checkbox:checked").each(function(i, e) {
				//				//console.log(i)
				for(var k = 0; k < $scope.data.Data[i].CommAttachmentList.length; k++) {
					downloadf($scope.data.Data[i].CommAttachmentList[k].FileFullPath, $scope.data.Data[i].CommAttachmentList[k].RelativePath);
					//					//console.log(k)
				}
			});
		}
		//批量下载函数
		function downloadf(href, title) {
			var a = document.createElement('a');
			a.setAttribute('href', href);
			a.setAttribute('download', title);
			a.click();
		}

		//第一单位与第二单位的请求
		//		function oneTwoDataList(id, num) {
		//			$http({
		//				url: BaseURL + "/MainUser/GetProductionsByCID?cid=" + value + "&pageSize=5&curPage=" + curPage,
		//				method: "Get"
		//			}).success(function(data) {
		//				$scope.data = data;
		//			}).error(function(data, header, config, status) {
		//				layer.confirm('请求失败，请刷新重试', {
		//					btn: ['确认'],
		//				}, function(index) {
		//					layer.close(index);
		//				});
		//			});
		//		}

	});
	app.filter('moreText', function() {
		return function subString(str, len, hasDot) {
			if(str != null) {
				var newLength = 0;
				var newStr = "";
				var chineseRegex = /[^\x00-\xff]/g;
				var singleChar = "";
				var strLength = str.replace(chineseRegex, "**").length;
				////console.log(strLength)
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
	app.filter('fillk', function() {
		return function subString(string) {
			if(string == 0 || string == '')
				string = 0
			return string;
		}
	})

});