﻿
define(function(require) {
	var app = require('../../javascripts/app');
	app.controller('Default_controller', function($scope, $state, $http, $rootScope) {
		tabs(".tabs");
		var myChart = echarts.init(document.getElementById('main'));

		$scope.getNewProVal;
		$scope.contentType1 = [];
		$scope.contentType2 = [];
		$scope.Year;
		$scope.languageConut;
		$scope.collectType;
		$scope.collegeDesign;
		$scope.maxDownLoad;
		$scope.scholarRe;
		$scope.getImportResult;
		$scope.wenxianCount;
		$scope.chengguoCount;

		loadIng();

		st();
	
		function loadIng() {
			//获取去所有院系
			$http({
				url: BaseURL + "/SYSCollege/GetIndexList",
				method: "get"
			}).success(function(data) {

				////console.log(data)
				var num = data.length;
				var n = num / 2;
				$scope.n = n;
				$scope.collegeDesign1 = data;
				$scope.collegeDesign2 = aa(n);
				////console.log($scope.collegeDesign1)
				////console.log($scope.collegeDesign2)

				function aa(n) {
					var obj = [];
					var m = n;
					for(var j = m; j < num; j++) {
						obj.push(data[m]);
						m++;
					}
					return obj;
				}
			})
			//学者推荐
			$http({
				url: BaseURL + "/MainUser/GetIndexUserList",
				method: "get"
			}).success(function(data) {
				////console.log(data)
				$scope.scholarRe = data;
			})
			// 获取文献数量OK
			$http({
				url: BaseURL + "/Productions/LoadProductionAllCount",
				method: "get"
			}).success(function(data) {
				$scope.wenxianCount = data;
				//////////console.log(data)
			})
			// 获取全部成果OK
			$http({
				url: BaseURL + "/Productions/LoadProductionCitationNumAll",
				method: "get"
			}).success(function(data) {
				//////////console.log(data)
				$scope.chengguoCount = data;
			})
			//获取最新文献
			$http({
				url: BaseURL + "/Productions/LoadProductionOrderByCraeattime?pageSize=8&curPage=1",
				method: "get"
			}).success(function(data) {
				//console.log(data)
				$scope.hh = data
			}).error(function(data) {
				////////console.log(data)
			});
		}

		function st() {
			//内容类型
			$http({
				url: BaseURL + "/TemplateField/GetSYS_TemplateContentTypeListAndCount",
				method: "get"
			}).success(function(data) {
				//				//console.log(data)
				$scope.dd = data
				$scope.contentType1 = data.slice(0, 9);
				$scope.contentType12 = data.slice(9, 18);
			}).error(function() {
				////////console.log(data)
			})

			//发表日期
			$http({
				url: BaseURL + "/TemplateField/GetSYS_YearListAndCount",
				method: "get"
			}).success(function(data) {
				//console.log(data)
				$scope.ee = data;
			}).error(function(data) {});

			//语言
			$http({
				url: BaseURL + "/TemplateField/GetSYS_LanguageListAndCount",
				method: "get"
			}).success(function(data) {
				//console.log(data.Result)
				$scope.ff = data;
			}).error(function(data) {
				////////////console.log(data)
			})

			//收录类型
			$http({
				url: BaseURL + "/TemplateField/GetSYS_IndexedTypeListAndCount",
				method: "get"
			}).success(function(data) {
				$scope.gg = data;
			}).error(function(data) {
				//console.log(data)
			});
			//			$http({
			//				url: BaseURL + "/Productions/LoadProductionOrderByDownloadNum?pageSize=8&curPage=1",
			//				method: "get"
			//			}).success(function(data) {
			//				////console.log(data)
			//				$scope.maxDownLoad = data;
			//			});
			//			$http({
			//				url: BaseURL + "/Productions/LoadProductionOrderByCitationNum?pageSize=8&curPage=1",
			//				method: "get"
			//			}).success(function(data) {
			//				////console.log(data)
			//				$scope.getImportResult = data;
			//			});

		}
		// 跳转到学者列表
		$scope.Scholars = function() {
			$state.go('index.Scholars');
		};
		$scope.tj = function() {
			$state.go('index.echarts');
		};
		// 跳转到学者详情页
		$scope.toScholarDetail = function($event) {
			var scholar = $($event.target).parents('.user_list').attr('data-value');
			var name = $($event.target).parents('.user_list').attr('data-name');
			var userImg = $($event.target).parents('.user_list').attr('data-img');
			$state.go('index.scholar_details', {
				"dataVal": scholar,
				'userName': name,
				'userImg': downLoadUrl + '/' + userImg
			});
		};
		// 跳转到作品详情页
		$scope.wherefo = function($event) {
			var val = $($event.target).parents('li').attr('data-value');
			$state.go('index.Research.Article_detail', {
				data: val
			});
		};
		// 跳转到作品列表页
		$scope.goArticalList = function($event) {
			var cid = $($event.target).parents('li').attr('data-value');
			$state.go('index.Research.article_list', {
				CollegeId: cid,
				Tid: "defaultcid"
			});
		};
		/** 方法集合 */

		$scope.maxDown = function() {
			maxDownLoad();
		};
		$scope.ImportResult = function() {
			getImportResult();
		};

		// 获取下载最多
		function maxDownLoad() {
			$http({
				url: BaseURL + "/Productions/LoadProductionOrderByDownloadNum?pageSize=8&curPage=1",
				method: "get"
			}).success(function(data) {
				////console.log(data)
				$scope.maxDownLoad = data;
			});
		};
		// 获取重要成果
		function getImportResult() {
			$http({
				url: BaseURL + "/Productions/LoadProductionOrderByCitationNum?pageSize=8&curPage=1",
				method: "get"
			}).success(function(data) {
				////console.log(data)
				$scope.getImportResult = data;
			});
		};
		// 点击内容类型、发表日期、语言、收录类型传值到作品列表页
		$scope.goAtrtialList = function($event) {
			var arr = []
			var json = [];
			var json2 = {};
			var key = $($event.target).attr('data-value');
			var value = $($event.target).attr('data-val');
			if(key == 'TemplateID') {
				json = [{
					'cc': $($event.target).attr('TypeN')
				}];
			} else {
				json = [{
					'cc': value
				}];
			}

			json2[key] = value;
			arr.push(json2)
			var data = {
				"Diclist": arr,
				"PageSize": 5,
				"CurPage": 1,
				"Order": '',
				"OrderBy": ''
			}
			//////console.log(data)
			//////////console.log(json2)

			// Tid是标识位置，表明是首页传过来的数据
			$state.go('index.Research.article_list', {
				tiaoj: json,
				data: data,
				Tid: 'unit'
			})
		};

		//		var data = newDataList2;

		// 页面中新建图表。
		
		//////////console.log($rootScope.uid)
		var Year = []
		var Count = []
		// 页面中新建图表。
		var z = false;
		var title = '年度成果院所排名'
		$scope.lb = 'line'

		$scope.aao = function(n) {
			//console.log(n)
			if(n == 1) {
				$scope.ttName = '年度成果院所排名';
				if($scope.data !== 'undefined')
					aaa();
				else
					data = $scope.data;
			} else if(n == 2) {
				$scope.ttName = '年度成果科系排名';
				if($scope.dataTwo !== 'undefined')
					bbb();
				else
					data = $scope.dataTwo;
			} else if(n == 3) {
				$scope.ttName = '年度论文院所收录情况排名';
				if($scope.dataThree !== 'undefined')
					ccc();
				else
					data = $scope.dataThree;
			} else if(n == 4) {
				$scope.ttName = '年度论文科系收录情况排名';
				if($scope.dataFour !== 'undefined')
					ddd();
				else
					data = $scope.dataFour;
			} else if(n == 5) {
				$scope.ttName = '年度成果类型院所排名比较'
				if($scope.dataFive !== 'undefined')
					eee();
				else
					data = $scope.dataFive;
			} else if(n == 6) {
				$scope.ttName = '年度成果类型科系排名比较'
				if($scope.dataSix !== 'undefined')
					fff();
				else
					data = $scope.dataSix;
			} else if(n == 7) {
				$scope.ttName = '年度成果类型分布'
				if($scope.dataSeven !== 'undefined')
					ggg();
				else
					data = $scope.dataSeven;
			} else if(n == 8) {
				$scope.ttName = '年度论文收录情况统计'
				if($scope.dataEight !== 'undefined')
					hhh();
				else
					data = $scope.dataEight;
			} else if(n == 9) {
				$scope.ttName = '成果收录情况年度比较'
				if($scope.dataNine !== 'undefined')
					iii();
				else
					data = $scope.dataNine;
			} else if(n == 10) {
				$scope.ttName = '年度代表性成果统计'
				if($scope.dataTen !== 'undefined')
					jjj();
				else
					data = $scope.dataTen;
			} else if(n == 11) {
				$scope.ttName = '作者发文量TOP100'
				if($scope.dataEleven !== 'undefined')
					kkk();
				else
					data = $scope.dataEleven;
			} else if(n == 12) {
				$scope.ttName = '作者CSCD发文量TOP100'
				if($scope.dataTwelve !== 'undefined')
					lll();
				else
					data = $scope.dataTwelve;
			} else if(n == 13) {
				$scope.ttName = 'CSCD引用TOP100作者'
				if($scope.dataThirteen !== 'undefined')
					mmm();
				else
					data = $scope.dataThirteen;
			}
			if($scope.lb == 'bar')
				$scope.lb = 'line'
			else
				$scope.lb = 'bar'
		}

		$scope.aao(1)

		function aaa() { //通过年度成果院所排名
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByStarYearAndEndYear?collegetype=1&top=5&pageSize=5&curPage=1",
				method: "get"
			}).success(function(data) {
				//console.log(data)
				$scope.data = data
				$scope.dataOne = data
				exianxing(1, $scope.lb)
			});
		}

		function bbb() { //通过年度成果科系排名
			////console.log('bbb')
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByStarYearAndEndYear?collegetype=2&top=3&pageSize=5&curPage=1",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataTwo = data
				exianxing(2, $scope.lb);

			});

		}

		function ccc() { //通过年度论文院所收录情况排名  完成
			$http({
				url: BaseURL + "/Statistical/GetTongJiByNDLunWenYuanSuoShouLuPaiMing?collegetype=1&top=5&pageSize=5&curPage=1",
				method: "get"
			}).success(function(data) {
				//console.log(data)
				$scope.data = data
				$scope.dataThree = data
				exianxing(3, $scope.lb);

			});
		}

		function ddd() { //通过年度论文科系收录情况排名   完成
			$http({
				url: BaseURL + "/Statistical/GetTongJiByNDLunWenYuanSuoShouLuPaiMing?collegetype=2&top=5&pageSize=5&curPage=1",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataFour = data
				exianxing(4, $scope.lb);

			});
		}

		function eee() { //年度成果类型院所排名比较   没有接口
			////console.log('eee')
			$http({
				url: BaseURL + "/Statistical/GetTongJiByNDLunWenShoulu?departid=&staryear=2013&endyear=2017&indexed=",
				method: "get"
			}).success(function(data) {
				$scope.dataFive = data
				exianxing(5, $scope.lb);

			});
		}

		function fff() { //年度成果类型科系排名比较  没有接口
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByNianDuKeXiPaiMing?staryear=2013&endyear=2017&kexiid=",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataSix = data
				exianxing(6, $scope.lb);
			})
		}

		function ggg() { //年度成果类型分布   数据重复
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByNianDuChengGuoLeiXingFenBu?staryear=2012&endyear=2017",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataSeven = data
				exianxing(7, $scope.lb);

			});
		}

		function hhh() { //年度论文收录情况统计     参数有问题  数据问题
			$http({
				url: BaseURL + "/Statistical/GetTongJiByNDLunWenShoulu?departid=&staryear=2013&endyear=2017&indexed=s",
				method: "get"
			}).success(function(data) {
				console.log(data)
				$scope.data = data
				$scope.dataEight = data
				exianxing(8, $scope.lb);

			});
		}

		function iii() { //成果收录情况年度比较   需要重写方法  可写重写
			$http({
				url: BaseURL + "/Statistical/GetTongJiByNDChengGuoBiJiao",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				console.log(data)
				$scope.dataNine = data
				GetTongJiByNDChengGuoBiJiao(9, $scope.lb)
			});
		}

		function jjj() { //年度代表性成果统计   没有接口
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByNianDuKeXiPaiMing?staryear=2013&endyear=2017&kexiid=",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataTen = data
				exianxing(10, $scope.lb);

			});
		}

		function kkk() { //作者发文量TOP100    完成
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByZuoZheTop100?staryear=2012&endyear=2017",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataEleven = data
				GetStatisticalByZuoZheTop100(11, $scope.lb)
			});
		}

		function GetStatisticalByZuoZheTop100(n, l) {
			var Year = []
			var dataList = []
			var userList = new Array([], [])
			var data = $scope.data
			$.each(data, function(i, v) {
				userList[0][i] = v.Year
				userList[1][i] = v.CollegeResult[0].Count
			});
			
			dataList.push({
				name: '数量',
				type: $scope.lb,
				data:  userList[1]
			});
			optionList(userList[0], dataList)

		}
		function GetTongJiByNDChengGuoBiJiao(n, l) {
			var Year = []
			var dataList = []
			var userList = [[],[]]
			var data = $scope.data
			$.each(data, function(i, v) {
				userList[0][i] = v.TypeName
				userList[1][i] = v.TypeCount
			});
			
			dataList.push({
				name: '数量',
				type: $scope.lb,
				data:  userList[1]
			});
			optionList(userList[0], dataList)

		}

		function lll() { //作者CSCD发文量TOP100  sci 有数据  cscd无数据  完成
			$http({
				url: BaseURL + "/Statistical/GetStatisticalByZuoZheSCIOrCSCDTop100?staryear=2012&endyear=2017&sciorcscd=sci",
				method: "get"
			}).success(function(data) {
				$scope.data = data
				$scope.dataTwelve = data
				GetStatisticalByZuoZheTop100(12, $scope.lb);

			});
		}

		function mmm() { //CSCD引用TOP100作者 没有数据  完成
			$http({
				url: BaseURL + "/Statistical/LoadUserCitationProductionsByContain?staryear=2012&endyear=2017&sciorcscd=sci&departid=&pageSize=100&curPage=1",
				//"",
				method: "get"
			}).success(function(data) {
				console.log(data)
				$scope.data = data
				$scope.dataThirteen = data
				GetStatisticalByZuoZheTop100(13, $scope.lb);

			});
		}

		function removeDuplicatedItem(ar) {
			var tmp = {},
				ret = [];

			for(var i = 0, j = ar.length; i < j; i++) {
				if(!tmp[ar[i]]) {
					tmp[ar[i]] = 1;
					ret.push(ar[i]);
				}
			}
			return ret;
		}

		function rComparison(n, l) {
			var dataList = []
			var Year = []

			optionList(Year, dataList)

		}

		function optionList(y, d) {
			
			var Year = y
			var dataList = d 
			option = {
				title: {
					text: $scope.ttName
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					//					data: CollegeName
				},
				toolbox: {
					show: true,
					feature: {
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
					data: Year
				}],
				yAxis: [{
					type: 'value'
				}],
				series: dataList
			};
			myChart.setOption(option,true);
		}

		function exianxing(n, l) { //n为进来的ID数  t为名称   前两个可用
			//			app.title = '堆叠柱状图';
			var dataList = []
			var CollegeName = []
			var Year = [] //在用
			var Count = [] //在用
			var arrNum = []
			data = ''
			data = $scope.data
			//获取年操作
			$.each(data, function(i, v) {
				Year.push(data[i].Year)
				$.each(data[i].CollegeResult, function(j, v) {
					CollegeName.push(data[i].CollegeResult[j].Year)
				});
			});
			//子单位去重
			CollegeName = removeDuplicatedItem(CollegeName)
			//console.log('子单位去重' + CollegeName)
			//根据条件创建对应数组个数
			$.each(CollegeName, function(i) {
				arrNum.push([])
			});
			//console.log(arrNum)
			//console.log('根据条件创建对应数组个数' + arrNum.length)
			//获取子单位的个数
			var CNlength = CollegeName.length;
			//console.log('获取子单位的个数' + CNlength)
			var ar = new Array(CNlength)

			$.each(data, function(i) {

				//console.log(i)
				if(data[i].CollegeResult == null) {

					$.each(CollegeName, function(j) {
						arrNum[j].push(0)
					});
				} else {
					var zts = new Array(CNlength)
					var cx = false
					$.each(data[i].CollegeResult, function(j) {

						$.each(CollegeName, function(k) {

							var zt = false
							if(CollegeName[k] == data[i].CollegeResult[j].Year) {
								arrNum[k].push(data[i].CollegeResult[j].Count)
								zt = true
								zts[k] = zt
							} else {
								zt = false
								if(zts[k] == undefined || zts[k] == false) {
									zts[k] = zt
								}

							}
							if(k == CNlength) {
								if(zt == false)
									arrNum[k].push(0)
							}

						});
						//console.log(zts)
						if(data[i].CollegeResult.length == j + 1) {
							//console.log('查看结果')
							$.each(CollegeName, function(o) {
								//console.log(zts[o])
								if(zts[o] == false) {
									arrNum[o].push(0)
									//console.log(arrNum[o])
								}
							})
							//console.log(arrNum)
							//console.log(zts)
						}
					});

				}
			});
			$.each(CollegeName, function(i, v) {
				dataList.push({
					name: CollegeName[i],
					type: l,
					data: arrNum[i]
				})
			});

			optionList(Year, dataList)
		}
	});

	// 过滤字数，进行显示...
	app.filter('moreText', function() {
		return function subString(str, len, hasDot) {
			if(str != null) {
				var newLength = 0;
				var newStr = "";
				var chineseRegex = /[^\x00-\xff]/g;
				var singleChar = "";
				var strLength = str.replace(chineseRegex, "**").length;
				////////console.log(strLength)
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