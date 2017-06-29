define(function(require) {
	var app = require('../../../javascripts/app');

	app.controller('unit_controller', function($scope, $http, $rootScope, $state) {
		//加载一级目录
		$scope.defg = false

		LoadIng();

		function LoadIng() {
			//console.log('院系请求开始')
			$http({
				url: BaseURL + "/SYSCollege/GetSYSCollegeList",
				method: "Get"
			}).success(function(data, header, config, status) {
				console.log(data)
				var num = data.length;
				var n = num / 2;
				$scope.n = n;
				$scope.AllDepartment = data;
				$scope.AllDataTwo = aa(n);

				function aa(n) {
					var obj = [];
					var m = n;
					for(var j = m; j < num; j++) {
						obj.push(data[m]);
						m++;
					}
					return obj;
				}
				setTimeout(function(){
					fn();
				},1000)
				
				
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}

		//点击加载二级目录
		$scope.loadTwolist = function(i) {
			AddloadTwolist(i)
			//console.log(i)
		}

		function AddloadTwolist(i) {
			$http({
				url: BaseURL + "/SYSCollege/getSYSCollegeListByParentID?parentid=" + i,
				method: "Get"
			}).success(function(data, header, config, status) {
				$scope.cs = data;
				console.log(data)
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
		}
		
		//根据子结点查询
		$scope.cc = function(a, b) {
			var dataList = []
			var c = {}
			var d = {}
			var e =[]
			c[a] = b
			d['cc'] = b
			e.push(d)
			dataList.push(c)
			var data = {
				"Diclist": dataList,
				"PageSize": 5,
				"CurPage": 1,
				"Order": '',
				"OrderBy": ''
			}
			
			$state.go('index.Research.article_list', {
				data: data,
				tiaoj: e,
				Tid: "unit_z",
				Wxid:a
			});
		}

		$scope.show1 = function(e) {
			$(e.target).parents("ul").siblings().children('li').removeClass('active').children('div').children('ul').removeClass('show');
		}
		$scope.oj = function(a, b) {
			$state.go('index.Research.article_list')
		}
		function fn () {
			$(".fa-angle-down").click(function() {
			$(this).parent().parent().toggleClass("active").find(".sub_list").toggleClass("show");
			$(this).parent().parent().siblings().removeClass("active").find(".sub_list").removeClass("show");
		});
		};
	});
});