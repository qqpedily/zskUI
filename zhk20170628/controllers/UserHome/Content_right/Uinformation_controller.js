﻿define(function (require) {
    var app = require('../../../javascripts/app');
	var PicUrl = 'http://192.168.199.8:8555/user_img/';
    app.controller('Uinformation_controller', function ($scope, $http,$rootScope) {   	
    	var SYSUserID = $rootScope.uid;
    	Initialization();//初始化控件
    	load(); //读取用户信息
       //获取select的值 
		$scope.slsbb = function(a,b){
			$scope.data[a].DefaultText = $('#'+b).find('option:selected').text();
			$scope.data[a].DefaultValue = $('#'+b).find('option:selected').val();
			a = b = ''
		}
        
        //===========begin===========初始化控件===================  
        function Initialization(){
        	$http({
	            url: BaseURL+"/User/LoadByIdentityTypeData",
	            method:"GET",
	        }).success(function (data,status) {
	        	$scope.Lbitd = data;
	            //响应成功
	        }).error(function (error) {
	            //处理响应失败
	        });
        }
        //============end==========初始化控件=====================
        //转换身份信息的ID
        function ItIDX(){
        	var l = $scope.Lbitd;
        	var i = $scope.data.ItID;
        	for(var j = 0 ; j < l.length; j++ ){
        		if(l[j].ItID == i)
        			break;
        	}
        	return l[j].ItID;
        }       
        function ItID (){
        	 var i = $scope.data.ItID;
        	 var ItID = $scope.Lbitd[i].ItID;
        	 return ItID;
        }
    
     //=============================提交区====================================
     //基本信息========================================
        $scope.ngSave = function(text){
			//点击弹出弹框--
			//必填项验证
			if($scope.data.Orcid == null || $scope.data.UserID == null){
				layer.confirm('带"*"的信息为必填项', {
	                btn: ['确认'],
	            }, function (index) {
	                layer.close(index);
	            });
				return false;
			}
			//日期格式验证
			if($scope.data.BirthDay != null){
				if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.data.BirthDay) == false){
					layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
                // 获取页面数据
               $http({
		            url: BaseURL+"/User/AddOrUpdateUser",
		            method: "POST",
		            data:$scope.data
		            
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('保存成功', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
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
        }
        //别名管理========================================
        //点击批量增补/重建别名
        $scope.UserBatchAliasRadioClick=function(data){
        	if(data){
        		$('#UserBatchAliasRadio').show();
        		$('.UpdateAliasRadioPanel').hide();
				$('.BatchAliasRadioPanel').show();
        	}else{
        		$('#UserBatchAliasRadio').hide();
        		$('.UpdateAliasRadioPanel').hide();
				$('.BatchAliasRadioPanel').show();
        	}
        }
        //点击批量增补/重建别名--->保存按钮
        $scope.UserBatchAliasRadioSaveData={
			"lastName":" ",
			"name": "",
			"lastNameSpell":" ",
			"nameSpell":""
        }
        $scope.UserBatchAliasRadioSave=function(text){
        	var str = $scope.UserBatchAliasRadioSaveData.lastNameSpell+" "+$scope.UserBatchAliasRadioSaveData.nameSpell+
        	'('+$scope.UserBatchAliasRadioSaveData.lastName+$scope.UserBatchAliasRadioSaveData.name+')';
        	if($scope.UserBatchAliasRadioSaveData.lastName == " " && $scope.UserBatchAliasRadioSaveData.lastNameSpell== " "){
        		//未添加别名验证
        		layer.confirm('请先添加一个别名', {
	                btn: ['确认'],
	            }, function (index) {
	                layer.close(index);
	            });
	            return false;
        	}
        	var data = {
        		"UserID": $scope.data.UUID,
				"AliasName": str,
				"FirstChineseShow": 1,
				"FirstEnglishShow": 0
        	}
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserAlias",
		            method: "POST",
		            data:data
		        }).success(function (status) {
		        	layer.confirm('保存成功', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
		        	$scope.UserBatchAliasRadioSaveData={
						"lastName":"",
						"name": "",
						"lastNameSpell":"",
						"nameSpell":""
			        }
		            load();
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
        }
        //批量增加别名
        $scope.batchAddAlia=function(){
        	$http({
	            url: BaseURL+"/User/SetUserAliasByUserID?userid="+$scope.data.UUID,
	            method: "POST",
	        }).success(function (status) {
	            //响应成功
	            load();
	        }).error(function (error) {
	            //处理响应失败
		        layer.confirm('请求失败，请刷新重试', {
	                btn: ['确认'],
	            }, function (index) {
	                layer.close(index);
	            });
	        });
        }
        //批量增加别名--刷新按钮
        $scope.batchAddAliaFresh = function(){
        	layer.confirm('刷新成功', {
	                btn: ['确认'],
	            }, function (index) {
	                layer.close(index);
	            });
        	load();
        }
        //首选中文/英文按钮点击切换
        $scope.batchAddAliaBtnChange=function(data,index){
        	if(data){
//      		alert(0+'+'+index);
				$scope.UserAlia[index].FirstEnglishShow = 0;
				$scope.UserAlia[index].FirstChineseShow = 1;
        	}else{
//      		alert(1+'+'+index);
				$scope.UserAlia[index].FirstEnglishShow = 1;
				$scope.UserAlia[index].FirstChineseShow = 0;
        	}
        	$http({
	            url: BaseURL+"/User/AddOrUpdateUserAlias",
	            method: "POST",
	            data:$scope.UserAlia[index]
	        }).success(function (status) {
	            //响应成功
	        }).error(function (error) {
	            //处理响应失败
		        layer.confirm('请求失败，请刷新重试', {
	                btn: ['确认'],
	            }, function (index) {
	                layer.close(index);
	            });
	        });
        }
		//点击别名修改--弹出修改窗口，获取数据
		$scope.batchAddAliaUpdateShow=function(index){
			//切换修改/增加别名面板
			$('.UpdateAliasRadioPanel').show();
			$('.BatchAliasRadioPanel').hide();
			//获取别名，切割后绑定到修改面板
			var UUID = $scope.UserAlia[index].UUID;
			var UserID = $scope.UserAlia[index].UserID;
			var str = $scope.UserAlia[index].AliasName;
			var index2 = str.indexOf('(');
			var str2 = str.slice(0,index2);
			var str1 = str.slice(index2+1);
			str1 = str1.slice(0,-1);
			var str3 = str1.slice(0,1);
			var str4 = str1.slice(1);
			var index = str.indexOf(' ');
			var str5 = str2.slice(0,index);
			var str6 = str2.slice(index +1);
			$scope.batchAddAliaUpdateData = {
				"lastName":str3,
				"name": str4,
				"lastNameSpell":str5,
				"nameSpell":str6,
				"AliasName":str5+str6+"("+str3+' '+str4+')',
				"UUID":UUID,
				"UserID":UserID
			};
		}
		//点击别名修改弹窗中保存按钮，修改数据
		$scope.batchAddAliaUpdate=function(text){
			var str = $scope.batchAddAliaUpdateData.lastNameSpell+" "+$scope.batchAddAliaUpdateData.nameSpell+
        	'('+$scope.batchAddAliaUpdateData.lastName+$scope.batchAddAliaUpdateData.name+')';
			var data = {
				"UUID":$scope.batchAddAliaUpdateData.UUID,
				"UserID":$scope.batchAddAliaUpdateData.UserID,
				"AliasName":str,
				FirstChineseShow:1,
				FirstEnglishShow:0
			}
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserAlias",
		            method: "POST",
		            data:data
		        }).success(function (status) {
		            load();
		            data = {};
		            $scope.batchAddAliaUpdateData = {
					"lastName":"",
					"name": "",
					"lastNameSpell":"",
					"nameSpell":"",
					"AliasName":"",
					"UUID":"",
					"UserID":""
				};
		            //响应成功
		        }).error(function(error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
				$('.UpdateAliasRadioPanel').hide();
				$('.BatchAliasRadioPanel').show();           	
                layer.close(index);
           });
		}
		//别名删除功能
		$scope.batchAddAliaDel = function(a,text){
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
                $http({
		            url: BaseURL+"/User/DelUserAlias",
		            method: "Get",
		            params:{UUID:$scope.UserAlia[a].UUID}
		        }).success(function (status) {
		        	layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		            load();
		        }).error(function (error) {
		        	layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
                layer.close(index);
            });
			
		}
        //学术履历========================================
        //研究方向--添加按钮===============
       $scope.researchDirectionData = {
			"UserID": SYSUserID,
        	"SubjectName":' ',
        	"SubjectEnglishName": " ",
			"SearchDirectionNam": " ",
			"SearchDirectionEng": " ",
			"ThemeName": " ",
			"ThemeEnglishName": " ",
			"Power": 0
        }
        $scope.researchDirectionAdd=function(text){
			$http({
		            url: BaseURL+"/User/AddOrUpdateUserSearchDirection",
		            method: "POST",
		            data:$scope.researchDirectionData
		        }).success(function (status) {
		        	load();
		            //响应成功
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
        }
        //研究方向--修改按钮===============
        $scope.researchDirection=function(data,text){
        	//必填项验证
			if($scope.gudata[data].SearchDirectionNam == " " || $scope.gudata[data].SubjectName == " "){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserSearchDirection",
		            method: "POST",
		            data:$scope.gudata[data]
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('修改成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        //研究方向--删除按钮===============
        $scope.researchDirectionDel=function(data,text){
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/DelUserSearchDirection",
		            method: "Get",
		            params:{UUID:$scope.gudata[data].UUID}
		        }).success(function (status) {
		            load();
		            //响应成功
		            layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        //显示和隐藏研究方向遮罩层
        $scope.flag=true;
        $scope.researchDirection_show=function(){			
        	$scope.flag=true;
        }
        $scope.researchDirection_hide=function(){			
        	$scope.flag=false;
        }     
        //荣誉奖励--保存按钮===============
        $scope.honorAwardAddData = {
			"UserID": SYSUserID,
        	"HonorAwardTime":" ",
        	"HonorAwardInfo":" ",
        	"HonorAwardInfoEnglish":" ",
        	"HonorAwardExplain":" ",
        	"HonorAwardExplainEnglish":" ",
        	"Mechanism":" ",
        	"MechanismEnglish":" ",
        	"ProjectName":" ",
        	"ProjectEnglishName":" ",
        	"Ranking":"",
        	"RewardLevel":1,
        	"RewardType":1,
        	"Power":0
        };
        $scope.honorAwardAdd=function(text){			
			$http({
		            url: BaseURL+"/User/AddOrUpdateUserHonorAward",
		            method: "POST",
		            data:$scope.honorAwardAddData
		        }).success(function (status) {
					load();	        
		            //响应成功
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });      	
        }
        //荣誉奖励--修改按钮===============
        $scope.honorAward=function(data,text){
			//必填项验证
			//日期格式验证
			if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserHonorAward[data].HonorAwardTime) == false){
				layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		            btn: ['确认'],
		        }, function (index) {
		            layer.close(index);
		        });
				return false;
				}
			if($scope.UserHonorAward[data].HonorAwardTime == " " || $scope.UserHonorAward[data].HonorAwardInfo == " "){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserHonorAward",
		            method: "POST",
		            data:$scope.UserHonorAward[data]
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('修改成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        //荣誉奖励--删除按钮===============
        $scope.honorAwardDel = function(data,text){
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/DelUserHonorAward",
		            method: "Get",
		            params:{"UUID":$scope.UserHonorAward[data].UUID}
		        }).success(function (status) {
		        	load();
		            //响应成功
		            layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        
        //研究项目--添加按钮=========================
        $scope.researchProjectAddData = {
//      	"UUID": "97ca0fac-758c-4b11-9bee-2d822711525e",
        	"UserID": SYSUserID,
        	"ProjectName": " ",
			"ProjectNameEnglish": "",
			"ProjectID": "",
			"FinancialBody": "",
			"FinancialBodyEnglish": "",
			"RelyingInstitution": "",
			"RelyingInstitutionEnglish": "",
			"ResearchPlan": "",
			"ResearchPlanEnglish": "",
			"FundingType": "",
			"FundingTypeEnglish": "",
			"ProjectLeader": "",
			"ProjectLeaderEnglish": "",
			"ProjectRole": 0,
			"LeadingMember": "",
			"LeadingMemberEnglish": "",
			"SubjectClassification": "",
			"SubjectClassificationEnglish": "",
			"TotalExpenditure": "",
			"AssumeTaskFund": "",
			"StartTime": "",
			"EndTime": "",
			"ProjectProfile": "",
			"ProjectProfileEnglish": "",
			"Power": 0
        }
        $scope.researchProjectAdd=function(text){
        	$http({
		            url: BaseURL+"/User/AddOrUpdateUserResearchProject",
		            method: "POST",
		            data:$scope.researchProjectAddData
		        }).success(function (status) {
					load();
		            //响应成功
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
        }
        //研究项目--修改按钮=========================
        $scope.researchProject=function(data,text){
			//必填项验证
			if($scope.UserResearchProject[data].ProjectName == " "){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
			//日期格式验证
			if($scope.UserResearchProject[data].StartTime != "" || $scope.UserResearchProject[data].EndTime != ""){
				if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserResearchProject[data].StartTime) == false || /^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserResearchProject[data].EndTime) == false){
					layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}
			/*//数字验证
			if($scope.UserResearchProject[data].AssumeTaskFund != "" || $scope.UserResearchProject[data].TotalExpenditure != ""){
				if(/^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$.test($scope.UserResearchProject[data].StartTime) == false || /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$.test($scope.UserResearchProject[data].EndTime) == false){
					layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}*/
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserResearchProject",
		            method: "POST",
		            data:$scope.UserResearchProject[data]
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('修改成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
	    }
        //研究项目--删除按钮=========================
        $scope.researchProjectDel=function(data,text){
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/DelUserResearchProject", 
		            method: "Get",
		            params:{"UUID":$scope.UserResearchProject[data].UUID}
		        }).success(function (status) {
		            load();
		            //响应成功
		            layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
       
       //工作经历--添加功能========================================
        $scope.UserWorkExperienceAddData={
//      	  "UUID": "97ca0fac-758c-4b11-9bee-2d822711525e",
        	  "UserID": SYSUserID,
        	  "StartTime": "",
			  "EndTime": "",
			  "Mechanism": "",
			  "MechanismEnglish": "",
			  "Dept": "",
			  "DeptEnglish": "",
			  "Post": "",
			  "PostEnglish": "",
			  "Title": "",
			  "TitleEnglish": "",
			  "RegionContry": "",
			  "RegionProvince": "",
			  "RegionCity": "",
			  "Power": 0
        };
        $scope.UserWorkExperienceAdd=function(text){
			$http({
		            url: BaseURL+"/User/AddOrUpdateUserWorkExperience",
		            method: "POST",
		            data:$scope.UserWorkExperienceAddData
		     }).success(function (status) {
		            //响应成功
		            /*var sec = document.getElementsByClassName('prov').length;*/
		            load();
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
        }
       //工作经历--修改功能========================================
        $scope.workUndergo = function(data,text){	
			//必填项验证
			if($scope.UserWorkExperience[data].StartTime == "" || $scope.UserWorkExperience[data].Mechanism == "" || $scope.UserWorkExperience[data].Dept == ""){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
			//日期格式验证
			if($scope.UserWorkExperience[data].StartTime != "" || $scope.UserWorkExperience[data].EndTime != ""){
				if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserWorkExperience[data].StartTime) == false || /^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserWorkExperience[data].EndTime) == false){
					layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserWorkExperience",
		            method: "POST",
		            data:$scope.UserWorkExperience[data]
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('修改成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        //工作经历--删除功能========================================
        $scope.workUndergoDel=function(data,text){
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/DelUserWorkExperience", 
		            method: "Get",
		            params:{"UUID":$scope.UserWorkExperience[data].UUID}
		        }).success(function (status) {
		            load();
		            //响应成功
		            layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
   
        //教育背景========================================
        //学习经历--添加功能
        $scope.learningExperienceAddData={
        	  "UserID": SYSUserID,
        	  "StartTime": "",
			  "EndTime": "",
			  "Mechanism": "",
			  "MechanismEnglish": "",
			  "Dept": "",
			  "DeptEnglish": "",
			  "Major": "",
			  "MajorEnglish": "",
			  "RegionContry": "",
			  "RegionProvince": "",
			  "RegionCity": "",
			  "MajorType": "",
			  "MajorTypeEnglish": "",
			  "Tutor": "",
			  "TutorEnglish": "",
			  "Degree": 0,
			  "Power": 0
        }
        $scope.learningExperienceAdd=function(text){
        	$http({
		            url: BaseURL+"/User/AddOrUpdateUserLearningExperience",
		            method: "POST",
		            data:$scope.learningExperienceAddData
		        }).success(function (status) {
		        	
					load();
		            //响应成功
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
        }
        //学习经历--修改功能
        $scope.learningExperience=function(data,text){
        	//必填项验证
			if($scope.UserLearningExperience[data].StartTime == "" || $scope.UserLearningExperience[data].Mechanism == "" || $scope.UserLearningExperience[data].Major == ""){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
			//日期格式验证
			if($scope.UserLearningExperience[data].StartTime != "" || $scope.UserLearningExperience[data].EndTime != ""){
				if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserLearningExperience[data].StartTime) == false || /^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserLearningExperience[data].EndTime) == false){
					layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserLearningExperience",
		            method: "POST",
		            data:$scope.UserLearningExperience[data]
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('修改成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        //学习经历--删除功能
        $scope.learningExperienceDel=function(data,text){
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
	            url: BaseURL+"/User/DelUserLearningExperience", 
	            method: "Get",
	            params:{"UUID":$scope.UserLearningExperience[data].UUID}
	        }).success(function (status) {
				load();
	            //响应成功
	            layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        
        //执业资格--添加功能
        $scope.practiceQualificationAddData = {//添加数据
  			"UserID": SYSUserID,
  			"StartTime": "",
 			"EndTime": "",
  			"Authority": "",
  			"AuthorityEnglish": "",
  			"ProfessionalCategory": "",
  			"ProfessionalCategoryEnglish": "",
  			"Description": "",
  			"DescriptionEnglish": "",
  			"RegionContry": "",
  			"RegionProvince": "",
  			"RegionCity": "",
  			"QualificationName": "",
  			"QualificationEnglish": "",
 			 "Power": 0
        }
        $scope.practiceQualificationAdd=function(text){
       		$http({
		            url: BaseURL+"/User/AddOrUpdateUserPracticeQualification",
		            method: "POST",
		            data:$scope.practiceQualificationAddData
		        }).success(function (status) {
					load();
		            //响应成功
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
        }
        //执业资格--修改功能
        $scope.practiceQualification=function(data,text){
			//必填项验证
			if($scope.UserPracticeQualification[data].StartTime == "" || $scope.UserPracticeQualification[data].Authority == ""){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
			//日期格式验证
			if($scope.UserPracticeQualification[data].StartTime != "" || $scope.UserPracticeQualification[data].EndTime != ""){
				if(/^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserPracticeQualification[data].StartTime) == false || /^(1|2)\d{3}\-(0|1)\d\-(0|1|2|3)\d$/.test($scope.UserPracticeQualification[data].EndTime) == false){
					layer.confirm('请输入正确的日期格式：xxxx-xx-xx', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}
			layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/AddOrUpdateUserPracticeQualification",
		            method: "POST",
		            data:$scope.UserPracticeQualification[data]
		        }).success(function (status) {
		            //响应成功
		            layer.confirm('修改成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        }
        //执业资格--删除功能
        $scope.practiceQualificationDel=function(data,text){
        	layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
            	$http({
		            url: BaseURL+"/User/DelUserPracticeQualification", 
		            method: "Get",
		            params:{"UUID":$scope.UserPracticeQualification[data].UUID}//待添加数据
		        }).success(function (status) {
		            //响应成功
		            load();
		            layer.confirm('删除成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
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
        	
        }
              
        //设置密码========================================
        $scope.oldPassword="";//旧密码     
        $scope.newPassword="";//新密码     
        $scope.againPassword="";//再次输入新密码    
        $scope.setPassword=function(text){
        	var setOldPassword = document.getElementById('setOldPassword');
        	var setNewPassword = document.getElementById('setNewPassword');
        	var setPasswordAgain = document.getElementById('setPasswordAgain');
        	setOldPassword.innerText = '';
        	var data ={
//      		"UUID":"DE2DA287-9852-48ED-914A-00E5A82CFBE3",//修改密码的死数据密码123456
        		"UUID":$scope.data.UUID,
        		"PassWord":$scope.newPassword,
        		"Pwd":$scope.oldPassword
        	}
        	if(data.PassWord.length < 6){
        		setNewPassword.style.display = 'inline';
        	}else if(data.PassWord != $scope.againPassword){
        		setPasswordAgain.style.display = 'inline';
        		setNewPassword.style.display = 'none';
        	}else{
        		setPasswordAgain.style.display = 'none';
        		layer.confirm(text, {
                btn: ['确认', '取消'],
                btn2: function (index, layero) {
					
                }
            }, function (index) {
	            	$http({
			            url: BaseURL+"//User/AddOrUpdateUserPwd",
			            method: "POST",
			            data:data
			        }).success(function (status,a) {
	//		            //响应成功
			            if(a==200&&status.IsSucceed==false){
			            	setOldPassword.innerText = status.ErrorMessage;
			            }else{
			            	layer.confirm('密码修改成功', {
				                btn: ['确认'],
				            }, function (index) {
				                layer.close(index);
				            });
			            }
			            //清空数据
			        	$scope.oldPassword="";
			        	$scope.newPassword="";
			        	$scope.againPassword="";
			        }).error(function (error,des) {
			            //处理响应失败
			            layer.confirm('请求失败，请刷新重试', {
			                btn: ['确认'],
			            }, function (index) {
			                layer.close(index);
			            });
			        });
	                layer.close(index);
	          	});	
        	}
        }
        
        $scope.setPasswordFlag=false;//显示隐藏的标志
        $scope.setPassword_show=function(){
        	$scope.setPasswordFlag=true;
        }
        $scope.setPassword_hide=function(){
        	$scope.setPasswordFlag=false;
        }
        //联系信息========================================共2个保存
        //联系信息  添加按钮（2个保存共用一个函数）
        $scope.contactInformationData = {
		  "UserID": SYSUserID,
		  "RegisteredMail": "",
		  "IsRegisteredMail": 0,
		  "ContactMail": "",
		  "IsContactMail": 0,
		  "OfficeTelephone": "",
		  "IsOfficeTelephone": 0,
		  "MobilePhone": "",
		  "IsMobilePhone": 0,
		  "Fax": "",
		  "IsFax": 0,
		  "ZipCode": "",
		  "IsZipCode": 0,
		  "MailingAddress": "",
		  "MailingAddressEnglish": "",
		  "IsMailingAddress": 0,
		  "Blog": "",
		  "IsBlog": 0,
		  "LinkName": "",
		  "LinkNameEnglinsh": "",
		  "LinkAddress": "",
		  "IsLinkAddress": 0
        }
        $scope.contactInformationlAdd = function(){
        	$http({
		            url: BaseURL+"/User/AddOrUpdateUserContactInformation",
		            method: "POST",
		            data:$scope.contactInformationData
		       }).success(function (status) {
		            //响应成功
		            layer.confirm('保存成功', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        }).error(function (error) {
		            //处理响应失败
		            layer.confirm('请求失败，请刷新重试', {
		                btn: ['确认'],
		            }, function (index) {
		                layer.close(index);
		            });
		        });
        }
        //联系信息保存按钮
        $scope.contactInformationl=function(text){
			//必填项验证
			if($scope.UserContactInformation.LinkName == ""){
				layer.confirm('带"*"的信息为必填项', {
	                    btn: ['确认'],
	                }, function (index) {
	                    layer.close(index);
	                });
				return false;
			}
			//手机号验证
			if($scope.UserContactInformation.MobilePhone != ""){
				if(/^1(3|4|5|7|8)\d{9}$/.test($scope.UserContactInformation.MobilePhone) == false){
					layer.confirm('请输入正确的手机号', {
		                    btn: ['确认'],
		                }, function (index) {
		                    layer.close(index);
		                });
					return false;
				}
			}
				layer.confirm(text, {
	                btn: ['确认', '取消'],
	                btn2: function (index, layero) {
						
	                }
	            }, function (index) {
	                $http({
			            url: BaseURL+"/User/AddOrUpdateUserContactInformation",
			            method: "POST",
			            data:$scope.UserContactInformation
			        }).success(function (status) {
			            //响应成功
			            layer.confirm('保存成功', {
			                btn: ['确认'],
			            }, function (index) {
			                layer.close(index);
			            });
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
        }
        
        //个人主页========================================
        //保存
        $scope.personalHomepageUpdate=function(text){
        	layer.confirm(text, {
	                btn: ['确认', '取消'],
	                btn2: function (index, layero) {
						
	                }
	            }, function (index) {
	                $http({
			            url: BaseURL+"/User/AddOrUpdateUserPersonalHomepage",
			            method: "POST",
			            data:$scope.UserPersonalHomepageList
			        }).success(function (status) {
			            //响应成功
			            layer.confirm('保存成功', {
			                btn: ['确认'],
			            }, function (index) {
			                layer.close(index);
			            });
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
        }
        //个人主页头像刷新
        $scope.personalHomepagePicFresh=function(){
        	load();
        }
        $scope.personalHomepagePicDel = function(text){
        	$scope.UserPersonalHomepageList.UploadIMG = '';
        	layer.confirm(text, {
	                btn: ['确认', '取消'],
	                btn2: function (index, layero) {
						
	                }
	            }, function (index) {
	                $http({
			            url: BaseURL+"/User/AddOrUpdateUserPersonalHomepage",
			            method: "POST",
			            data:$scope.UserPersonalHomepageList
			        }).success(function (status) {
			            //响应成功
			            load();
			            layer.confirm('删除成功', {
			                btn: ['确认'],
			            }, function (index) {
			                layer.close(index);
			            });
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
        }
        
        //一进页面直接加载
        function load(){
        	//基本信息
			$http({
		        url: BaseURL+"/User/GetUser?UUID="+SYSUserID,
		        method: "Get"
		  }).success(function (data, header, config, status) {
		        $scope.data = data;
		        //响应成功
		    }).error(function (data, header, config, status) {
//		        $scope.IsDisplay = true;
		        layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
		        //处理响应失败
		    });
		    //别名管理
		    $http({
		        url: BaseURL+"/User/GetUserAliasList?UserID="+SYSUserID,
		        method: "Get"
		    }).success(function (data, header, config, status) {
				  $scope.UserAlia = data;
		        //响应成功
		    }).error(function (data, header, config, status) {
//		        $scope.IsDisplay = true;
		        //处理响应失败
		        layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
		    });
		    
        	//研究方向
        	$http({
	            url: BaseURL+"/User/GetUserSearchDirectionList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	              $scope.gudata = data;
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
//	        
	        //UserHonorAward荣誉奖励
	        $http({
	            url: BaseURL+"/User/GetUserHonorAwardList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	              $scope.UserHonorAward = data;
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
	        //UserResearchProject研究项目
	        $http({
	            url: BaseURL+"/User/GetUserResearchProjectList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	              $scope.UserResearchProject = data;
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
	        //UserWorkExperience工作经验
	        $http({
	            url: BaseURL+"/User/GetUserWorkExperienceList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	              $scope.UserWorkExperience = data;
	              
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
	        //UserPracticeQualification教育背景
	        //学习经历
	        $http({
	            url: BaseURL+"/User/GetUserLearningExperienceList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	                $scope.UserLearningExperience = data;				    
	            //响应成功
	       }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
	        //UserPracticeQualification执业资格
	        $http({
	            url: BaseURL+"/User/GetUserPracticeQualificationList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	            $scope.UserPracticeQualification = data;
	            
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;	            
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
	        //UserContactInformation联系信息????
	        $http({
	            url: BaseURL+"/User/GetUserContactInformationList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	        	if(data.length=='0'){
	        		data = [$scope.contactInformationData];
	        	}
	            $scope.UserContactInformation = data[0];
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });
	        //GET/User/GetUserPersonalHomepageList 个人主页
	        $http({
	            url: BaseURL+"/User/GetUserPersonalHomepageList?UserID="+SYSUserID,
	            method: "Get"
	        }).success(function (data, header, config, status) {
	        	if(data.length == 0){
	        		data.push({UploadIMG:" "});
	        	}
	        	data[0].UploadIMG = PicUrl+data[0].UploadIMG;

	            $scope.UserPersonalHomepageList = data[0];
	            //响应成功
	        }).error(function (data, header, config, status) {
//	            $scope.IsDisplay = true;
	            //处理响应失败
	            layer.confirm('请求失败，请刷新重试', {
                    btn: ['确认'],
                }, function (index) {
                    layer.close(index);
                });
	        });  
        }
    });
});