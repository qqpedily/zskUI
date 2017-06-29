define(function (require) {
    var app = require('../../javascripts/app');

    app.controller('Nav_left_controller', function ($scope, $state, $http,$rootScope) {
        var uid = $rootScope.uid;
        /**提交作品 */
        // 1.提交作品
        $scope.UlistClick = function () {
            $state.go('index.Nav_left.Ulist')
        }
        // 2.已提交作品
        $scope.Article_list = function () {
            $state.go('index.Nav_left.Article_list')
        };

        // 测试
        $scope.Product_list = function () {
            $state.go('index.Nav_left.Product_list')
        };

        /**作品认领与全文提交 */
        // 1.待认领祖品
        $scope.Claim = function () {
            $state.go('index.Nav_left.Claim')
        };
        // 2.已认领作品
        $scope.Claim_done = function () {
            $state.go('index.Nav_left.Claim_done')
        };
        // 3.已拒绝作品
        $scope.Claim_refuse = function () {
            $state.go('index.Nav_left.Claim_refuse')
        };
        // 4.未提交全文
        $scope.Claim_submit = function () {
            $state.go('index.Nav_left.Claim_submit')
        }

        // 个人工作室-个人主页   跳转个人主页  中英文 带参
        $scope.goProfile = function () {
            $state.go('scholar_details')
        };
        /**组管理*/
        // 加入组
        // $scope.Group_join = function () {}
        /**组管理*/
        // 加入组
        $scope.Group_join = function () {
            $state.go('index.Nav_left.Group_join')
        };
        // 已加入组
        $scope.Group_joined = function () {
            $state.go('index.Nav_left.Group_joined')
        };
        //创建组
        $scope.Group_create = function () {
            $state.go('index.Nav_left.Group_create')
        };
        // 编辑个人信息
        $scope.UinformationClick = function () {
            $state.go('index.Nav_left.Uinformation')
        };
        //收藏管理
        //1、收藏的作品
        $scope.Fav_article = function () {
            $state.go('index.Nav_left.Fav_article')
        };
        //2、收藏的学者
        $scope.Fav_scholar = function () {
            $state.go('index.Nav_left.Fav_scholar')
        };
        //3、收藏的期刊
        $scope.Fav_periodical = function () {
            $state.go('index.Nav_left.Fav_periodical')
        };
        //4、收藏的主题
        $scope.Fav_topic = function () {
            $state.go('index.Nav_left.Fav_topic')
        };
        //提醒我阅读的作品
        //1、关注学者的最新作品
        $scope.Read_scholar = function () {
            $state.go('index.Nav_left.Read_scholar')
        };
        //2、关注期刊的最新作品
        $scope.Read_periodical = function () {
            $state.go('index.Nav_left.Read_periodical')
        };
        //3、设定主题的最新作品
        $scope.Read_topic = function () {
            $state.go('index.Nav_left.Read_topic')
        };
        
        //交流和私信
         $scope.Private_messages = function () {
            $state.go('index.Nav_left.Private_messages')
        };
        
        //个人作品统计
        $scope.User_article_list = function () {
            $state.go('index.Nav_left.User_article_list')
        };

        // 404页面
        $scope.go404 = function () {
            $state.go('404');
        };
        $scope.toScholarDetail = function () {
            $state.go('index.scholar_details', {
                "dataVal": uid
            });
        };
        // 已提交作品数量
        $http({
            url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserIDAndStatusCount?sysuserID=" + uid + "&UserClaimWorksStatus=" + 4,
            type: "get"
        }).success(function (data) {
            if (typeof data == 'number') {
                $scope.claimDoneCount = data;
            }
        })
        // 待认领作品数量
        $http({
            url: BaseURL + "/RelationUserClaimWorks/LoadSheltersCount?sysuserID=" + uid + "&chineseName=" + $rootScope.fullName+"&englishName="+$rootScope.EnglishName,
            type: "get"
        }).success(function (data) {
            $scope.claimConut = data;            
        });
        // 已认领作品
        $http({
            url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserIDAndStatusCount?sysuserID=" + uid + "&UserClaimWorksStatus=" + 2,
            type: "get"
        }).success(function (data) {
            if (typeof data == 'number') {
                $scope.claimAlsoCount = data;
            }
        });
        // 已拒绝作品
        $http({
            url: BaseURL + "/User/GetRelationUserClaimWorksBySysUserIDAndStatusCount?sysuserID=" + uid + "&UserClaimWorksStatus=" + 3,
            type: "get"
        }).success(function (data) {
            if (typeof data == 'number') {
                $scope.claimRefuseCount = data;
            }
        });
        // 未提交全文
       $http({
            url: BaseURL + "/RelationUserClaimWorks/LoadNotAttachmentCount?sysuserID=" + uid,
            type: "get"
        }).success(function (data) {
            if (typeof data == 'number') {
                $scope.claimNoCount = data;
            }
        })
        
    })
});