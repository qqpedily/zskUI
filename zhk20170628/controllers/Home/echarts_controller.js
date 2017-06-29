define(function(require) {
	var app = require('../../javascripts/app');
	app.controller('echarts_controller', function($scope, $state, $http, $rootScope) {
		//$state.go('/UserHome');
		$scope.dataOne = data1
		var title = ''
		var data1 = [{
				"Year": "2017",
				"CollegeResult": [{
						"ResultType": null,
						"Year": "上海金山医院",
						"Count": 5
					},
					{
						"ResultType": null,
						"Year": "上海华山医院",
						"Count": 5
					},
					{
						"ResultType": null,
						"Year": "生物医学研究院",
						"Count": 6
					},
					{
						"ResultType": null,
						"Year": "复旦儿科医院",
						"Count": 3
					},
					{
						"ResultType": null,
						"Year": "上海中山医院",
						"Count": 2
					}
				]
			},
			{
				"Year": "2016",
				"CollegeResult": [{
						"ResultType": null,
						"Year": "上海市浦东医院",
						"Count": 1
					},
					{
						"ResultType": null,
						"Year": "上海中山医院",
						"Count": 1
					}
				]
			},
			{
				"Year": "2015",
				"CollegeResult": [{
					"ResultType": null,
					"Year": "上海金山医院",
					"Count": 1
				}]
			},
			{
				"Year": "2014",
				"CollegeResult": [{
						"ResultType": null,
						"Year": "上海金山医院",
						"Count": 1
					},
					{
						"ResultType": null,
						"Year": "生物医学研究院",
						"Count": 1
					}
				]
			},
			{
				"Year": "2013",
				"CollegeResult": [{
					"ResultType": null,
					"Year": "生物医学研究院",
					"Count": 5
				}]
			}
		]
		$scope.dataOne == ''
		var myChart = echarts.init(document.getElementById('main'));
		var z = true;
		$scope.aa = function() {
			title = '年度成果院所排名';
			if(c || typeof($scope.dataOne) == 'undefined') {
				z = false;
				aaa();
			} else if(z == false) {
				exianxing(1, title, 'bar')
				z = true;
			} else if(z == true) {
				exianxing(1, title, 'line')
				z = false;
			}
		}
		$scope.aa()

		function aaa() {
			$scope.data = data1
			$scope.dataOne = data1
			exianxing(1, title, 'bar')
			//			});
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

		function exianxing(n, t, l) { //n为进来的ID数  t为名称
			//			app.title = '堆叠柱状图';
			var dataList = []
			var CollegeName = []
			var Year = [] //在用
			var Count = [] //在用
			var arrNum = []
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
			console.log('子单位去重' + CollegeName)
			//根据条件创建对应数组个数
			$.each(CollegeName, function(i) {
				arrNum.push([])
			});
			console.log('根据条件创建对应数组个数' + arrNum.length)
			//获取子单位的个数
			var CNlength = CollegeName.length;
			console.log('获取子单位的个数' + CNlength)
			$.each(data, function(i) {
				console.log(i)
				if(data[i].CollegeResult == null) {
					var ar = new Array(CNlength)
					$.each(CollegeName, function(j) {
						arrNum[j].push(0)
					});
				} else {
					$.each(data[i].CollegeResult, function(j) {
						$.each(CollegeName, function(k) {
							if(CollegeName[k] == data[i].CollegeResult[j].Year) {
								arrNum[k].push(data[i].CollegeResult[j].Count)
							}
							if(k == data[i].CollegeResult.length) {
								for(var s = 0; s < CollegeName.length - 1; s++) {
									var a = arrNum[s].length;
									var b = arrNum[1 + s].length;
									if(a != b) {
										if(arrNum[s].length > arrNum[s + 1].length) {
											arrNum[1 + s].push(0)
										} else {
											arrNum[s].push(0)
										}
									}
								}
							}
						});
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

			option = {
				title: {
					text: t
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: CollegeName
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
			myChart.setOption(option);
		}

	});
});

//0 4 9 12 9
//0 1 0 0  1