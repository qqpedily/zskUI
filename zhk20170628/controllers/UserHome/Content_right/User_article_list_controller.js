define(function(require) {
	var app = require('../../../javascripts/app');
	app.controller('user_article_list_controller', function($scope, $http, $rootScope) {
		$scope.success = null;
		$scope.year = '我是好人';
		$http({
			url: BaseURL + "/User/GetRelationUserCollectProductBySysUserID?sysuserID=" + $rootScope.uid + "&pageSize=10000&curPage=1",
			type: "get",
		}).success(function(data) {
			console.log(data);
		}).error(function() {
			layer.confirm('请求失败，请刷新重试', {
				btn: ['确认'],
			}, function(index) {
				layer.close(index);
			});
		});

		var mydate = {}

		$scope.getResult = function(){
			//发表时间
			mydate.publishTimeStart = $("#publishTimeStart").val()
			mydate.publishTimeEnd = $("#publishTimeEnd").val()
			
			//获取发表得时间，但是由于现在还没有这个接口u，所以还不能做的呢，不着急的
			
			
			
			
			//提交时间开始
			mydate.submitTimeStartY = $("#submitTimeStartY").val()
			mydate.submitTimeStartM = $("#submitTimeStartM").val()
			// 提交时间结束
			mydate.submitTimeEndY = $("#submitTimeEndY").val()
			mydate.submitTimeEndM = $("#submitTimeEndM").val()
			console.log(mydate)
		}
	
		
		//获取年份
	
		// echarts图表
		//      var myChart = echarts.init(document.getElementById('main'));
		//      // 指定图表的配置项和数据
		//      option = {
		//          title: {
		//              text: '复旦大学文献统计',
		//              subtext: '复旦大学统计'
		//          },
		//          tooltip: {
		//              trigger: 'axis'
		//          },
		//          legend: {
		//              data: ['文档数', '重要成果']
		//          },
		//          toolbox: {
		//              show: true,
		//              feature: {
		//                  mark: {
		//                      show: true
		//                  },
		//                  dataView: {
		//                      show: true,
		//                      readOnly: false
		//                  },
		//                  magicType: {
		//                      show: true,
		//                      type: ['line', 'bar']
		//                  },
		//                  restore: {
		//                      show: true
		//                  },
		//                  saveAsImage: {
		//                      show: true
		//                  }
		//              }
		//          },
		//          calculable: true,
		//          xAxis: [{
		//              type: 'category',
		//              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
		//          }],
		//          yAxis: [{
		//              type: 'value'
		//          }],
		//          series: [{
		//                  name: '文献数',
		//                  type: 'bar',
		//                  data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
		//                  markPoint: {
		//                      data: [{
		//                              type: 'max',
		//                              name: '最大值'
		//                          },
		//                          {
		//                              type: 'min',
		//                              name: '最小值'
		//                          }
		//                      ]
		//                  },
		//                  markLine: {
		//                      data: [{
		//                          type: 'average',
		//                          name: '平均值'
		//                      }]
		//                  }
		//              },
		//              {
		//                  name: '重要成果',
		//                  type: 'bar',
		//                  data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
		//                  markPoint: {
		//                      data: [{
		//                              name: '年最高',
		//                              value: 182.2,
		//                              xAxis: 7,
		//                              yAxis: 183,
		//                              symbolSize: 18
		//                          },
		//                          {
		//                              name: '年最低',
		//                              value: 2.3,
		//                              xAxis: 11,
		//                              yAxis: 3
		//                          }
		//                      ]
		//                  },
		//                  markLine: {
		//                      data: [{
		//                          type: 'average',
		//                          name: '平均值'
		//                      }]
		//                  }
		//              }
		//          ]
		//      };
		//      // 使用刚指定的配置项和数据显示图表。
		//      myChart.setOption(option);
		//  });

		var myChart = echarts.init(document.getElementById('main'));
		// 指定图表的配置项和数据
		option = {
			title: {
				text: '个人数据统计图',
				subtext: '2017年'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['期刊论文', '会议论文', '学位论文', '总计']
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
				data: ['期刊论文', '会议论文', '学位论文', '总计']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '期刊论文',
				type: 'bar',
				data: [11, 33, 36, 80],
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
			}, ]

		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	});

});