define(function(require) {
	var app = require('../../../javascripts/app');

	app.controller('Ulist_controller', function($scope,$state, $http, $stateParams, $rootScope) {
		
		//模板切换
		$scope.magazineTypeChange=function(index){
			var oSpans = $('#ulist_button>span');
			for(var i = 0;i<oSpans.length;i++){
				oSpans[i].className = '';
			}
			oSpans[index].className = 'cur';
			$scope.magazineContentType = $scope.magazineType[index].ContentType;
			$http({
				url: BaseURL + "/TemplateField/GetMateDataByTemplateID?templateID="+$scope.magazineType[index].TemplateID,
				method: "Get"
			}).success(function(data, header, config, status) {
				for(var i = 0,len=data.length;i<len;i++){
			        for(var j=0;j<len-1;j++){
			            if(data[j].FieldSequence > data[j+1].FieldSequence){
			                var items = data[j];
			                data[j] = data[j+1];
			                data[j+1] = items;
			            }
			        }
			    }
				for(var i = 0,len=data.length;i<len;i++){
					if(data[i].FieldType == '0'){
						if(data[i].DefaultText!=null){
							data[i].DefaultText = data[i].DefaultText.split(";");
						}
					}
				}				
				$scope.productData = data;
			}).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
		        });
		}
		//多选框点击后面'+'增加一条数据
		$scope.productDataAdd=function(index,type){
			if(type){
				$scope.productData.splice(index+1,0,{
					DefaultText:null,
					DefaultValue:null,
					EnglishShow:null,
					FieldName: $scope.productData[index].FieldName,
					FieldSequence:1,
					FieldType:1,
					IsShow:0,
					MetaDataID:$scope.productData[index].MetaDataID,
					MoreValue:0,
					NeedFill:5,
					Remark:" ",
					TemplateID:$scope.productData[index].TemplateID
				});
			}else{
				$scope.productData.splice(index,1);
			}
		}
		// 字段意思： 
			// TemplateID	uniqueidentifier	Y		模板ID
			// MetaDataID	uniqueidentifier			元数据ID
			// FieldSequence			字段顺序
			// FieldName				字段名
			// FieldType	int			字段类型（0为下拉列表，1为单行文本框，2为文本域）
			// DefaultValue			默认值
			// NeedFill	int			是否必填（0为是，1为否）
			// MoreValue	int			是否多值（0为是，1为否）
			// IsShow	 int			是否显示（0为是，1为否）
			// EnglishShow	int			英文值显示效果（0为保持原样，1为句首字母大写，2为标题式首字母大写，3为首字母大写样式，4为全部大写，5为全部小写）
			// CountStyle	int			输入统计形式(文本框为0，复选框为1)
		load();
		function load(){
			//论文模板数据
			$http({
				//  url: "http://10.0.130.39:8010/GetDataService.svc/Get5MonthlyRepayDataRecord",
				url: BaseURL + "/TemplateField/GetAllTemplate",
				method: "Get"
			}).success(function(data, header, config, status) {
				$scope.magazineType = data;
				setTimeout(function(){
					var oSpans = $('#ulist_button>span');
					oSpans[0].className = 'cur';
				},500);
			}).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
		    });
			//进来直接请求期刊论文模板			
/*$http({
				//  url: "http://10.0.130.39:8010/GetDataService.svc/Get5MonthlyRepayDataRecord",
				url: BaseURL + "/TemplateField/GetMateDataByTemplateID?templateID=11111111-2222-3333-4444-00049D56A9CD",
				method: "Get"
			}).success(function(data, header, config, status) {
				console.log(data);
				//
				for(var i = 0,len=data.length;i<len;i++){
//					data[i].savaOptionIndex = '';
			        for(var j=0;j<len-1;j++){
			            if(data[j].FieldSequence > data[j+1].FieldSequence){
			                var items = data[j];
			                data[j] = data[j+1];
			                data[j+1] = items;
			            }
			        }
			    }
				for(var i = 0,len=data.length;i<len;i++){
					if(data[i].FieldType == '0'){
						data[i].DefaultText = data[i].DefaultText.split(";");
//						data[i].DefaultValue = data[i].DefaultValue.split(";");
						console.log(data[i].DefaultText);
					}
				}
				
				$scope.productData = data;
//				console.log(data);
			}).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
		        });*/
		}
		
		
		$scope.productDataSave = function(text) {
			for(var i = 0,len=$scope.productData.length;i<len;i++){
					if($scope.productData[i].FieldType == '0'){
						$scope.productData[i].DefaultText = $scope.productData[i].DefaultText[$scope.productData[i].DefaultValue -1];
					}
					//必填项验证
					if($scope.productData[i].NeedFill == '0'){
						if($scope.productData[i].DefaultText == null || $scope.productData[i].DefaultText ==""){
							layer.confirm('带"*"的信息为必填项', {
			                    btn: ['确认'],
			                }, function (index) {
			                    layer.close(index);
			                });
							return false;
						}
					}
					//日期验证
					if($scope.productData[i].FieldName == '发表日期'){
//						if($scope.productData[i])
						if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.productData[i].DefaultText) == false){
							layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                	btn: ['确认'],
		            	}, function (index) {
		                	layer.close(index);
		            	});
						return false;
						}
					}
				}
			
			for(var i = 0,len=$scope.productData.length;i<len;i++){
				var data = {
						"TemplateID": $scope.productData[i].TemplateID,
						"UserID":  $rootScope.uid,
						"IsUploadFileFlag": 0,
						"TemplateName":$scope.magazineContentType,
						"DicProductionsField": $scope.productData
				}			
			}
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
                // 获取页面数据
               $http({
		            url: BaseURL + "/Productions/AddOrUpdateProductionsField",
					method: "POST",
					data: data
		        }).success(function (data,b,c,d,status) {
		            //响应成功
		            layer.confirm('保存成功', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
	                $scope.productData = '';
	                //上传附件
	                var ulistUploadAttachment = document.getElementById('ulistUploadAttachment');
					var fileObj = ulistUploadAttachment.files[0];// 获取文件对象
					var fileObj1 = ulistUploadAttachment.files[1];
					var fileObj2 = ulistUploadAttachment.files[2];
					var fileObj3 = ulistUploadAttachment.files[3];
					var fileObj4 = ulistUploadAttachment.files[4];
			        // FormData 对象
			        var form = new FormData();
			        form.append("ulistUploadAttachment",fileObj);// 可以增加表单数据
			        form.append("ulistUploadAttachment",fileObj1);// 文件对象
			        form.append("ulistUploadAttachment",fileObj2);
			        form.append("ulistUploadAttachment",fileObj3);
			        form.append("ulistUploadAttachment",fileObj4);
			        form.append('ProductionID',data.ErrorMessage);
			        if(fileObj != undefined){
			        	$http({
						    url: BaseURL+"/User/SavaFiles",
	//					    url: BaseURL+"/User/SavaFilesTest?guid="+data.ErrorMessage,
						    method: "POST",
						    data:form,
						    headers: {'Content-Type':undefined},
	              			transformRequest: angular.identity  
						}).success(function (status) {
						    //响应成功
						    //重新加载页面
						    
						}).error(function (error) {
						    layer.confirm('附件上传失败，请稍后再试', {
							    btn: ['确认'],
							}, function (index) {
							    layer.close(index);
							});
						    //处理响应失败
						});
			       }  
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
		        });
	                layer.close(index);
	         });			
		};
	})
})