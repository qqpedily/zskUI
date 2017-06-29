define(function(require) {
	var app = require('../../javascripts/app');

	app.controller('rNav_left_controller', function($scope, $state, $http, $rootScope) {

		dataLists()
		

		$scope.article_listClick = function() {
			$state.go('index.Research.article_list')
		}
		$scope.nuit_click = function() {
			$state.go('index.Research.unit')
		}
		$scope.adc = function() {
			$state.go('index.Research.article_detail')
		}

		$rootScope.flag = false;
		$rootScope.defg = false;
		$scope.dataTj = [];
		//调用左边的数据
		function dataLists() {
			//内容类型
			$http({
				url: BaseURL + "/TemplateField/GetSYS_TemplateContentTypeListAndCount",//?userID= + $rootScope.uid
				method: "Get"
			}).success(function(data, header, config, status) {
				$scope.datac = data;
				console.log(data)
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			//发表日期
			$http({
				url: BaseURL + "/TemplateField/GetSYS_YearListAndCount",
				method: "Get"
			}).success(function(data, header, config, status) {
				$scope.datat = data;
				//console.log.log(data)
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			//语言
			$http({
				url: BaseURL + "/TemplateField/GetSYS_LanguageListAndCount",
				method: "Get"
			}).success(function(data, header, config, status) {
				//console.log.log(data)
				$scope.datay = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});
			//收录类型
			$http({
				url: BaseURL + "/TemplateField/GetSYS_IndexedTypeListAndCount",
				method: "Get"
			}).success(function(data, header, config, status) {
				//console.log.log(data)
				$scope.datas = data;
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
				//console.log.log(data)
				$scope.dataq = data;
				//响应成功
			}).error(function(data, header, config, status) {
				$scope.msg = "您的网络出现波动，请刷新后重试！";
				$scope.IsDisplay = true;
				//处理响应失败
			});

		}

		$scope.rad = function(data) {
			//console.log.log($scope.searchId)
			$state.go('index.Research.article_list', {
				'data': data,
				'tiaoj': $scope.sVal,
				'Tid': 'unit'
			})
		}

		//公共方法
		$rootScope.scopeClick = function(a, b) {

			var data = $rootScope.chaxutiaojian(a);
			$scope.rad(data);

		}
			
		//公共查询条件封装  返回一个查询的data模板   参数a为顶部查询的条件
		$rootScope.chaxutiaojian = function(a) {

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
				//      				 {'k':'QuanwenList'}
			];
			
			for(var i = 0; i < 4; i++) {
				dl(msList[i])
			};
			//sid：id  ip:input的name
			function dl(kk) {
				$("input[name=" + kk.k + "]:checkbox").each(function(index) {
					var id ='11111111-2222-3333-4444-00049D56A9CD'
					if($(this).is(":checked")) {
						dataobj[$(this).val()] = $(this).attr('aName');
						dataList.push(dataobj)
						if($(this).attr('value')=='TemplateID'){
							sVal.push({"cc": $(this).attr('TypeN')})
						}else{
							sVal.push({"cc": $(this).attr('aName')})
						}
							
						dataobj = {};
					}
				})
			};
			$scope.sVal = sVal;
			if(a == 'undefined' || a == '') {
				if(typeof a != "number") {
					if(a.length > 1) {
						Order = a[0]
						OrderBy = a[1]
					} else {
						dataList.push(a)
					}
				}
			}
			var has = ''
			var has = $("input[type='radio']:checked").attr('data-value')
			a = 1;
			var ik = 'Title';  //按题名
//			var ik = 'author'; //按作者
			var searchId = $scope.searchId;
			if(typeof(searchId) != "undefined" && searchId != '') {
				dataobj[ik] = searchId
				dataList.push(dataobj)
				sVal.push({
					"cc": searchId
				})
			}
			
			$scope.dataTj = dataList;
			//查询的条件调用
			
			var data = {
				"Diclist": dataList,
				"Hasattachment": has,
				"PageSize": 5,
				"CurPage": 1,
				"Order": Order,
				"OrderBy": OrderBy
			}
			return data;
		}

		$rootScope.ain = function() {
			//console.log.log(1)
			$("#ain").addClass("active");
			$("#ay").removeClass("active");
			$("#am").removeClass("active");
			$("#ack").removeClass("active");
			$state.go('Home')
			//console.log.log(1)
		}
		$rootScope.ay = function() {
			$("#ain").removeClass("active");
			$("#ay").addClass("active");
			$("#am").removeClass("active");
			$("#ack").removeClass("active");
			$state.go('index.Research.unit')
			//console.log.log(2)
		}
		$rootScope.am = function() {
			$("#ain").removeClass("active");
			$("#ay").removeClass("active");
			$("#am").addClass("active");
			$("#ack").removeClass("active");
			$state.go('index.Scholars')
			//console.log.log(3)
		}
	});
});