define(function(require) {
	var app = require('../javascripts/app');
	
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/index/Home');
		//首页一级
		$stateProvider.state('index', {
			url: '/index',
			templateUrl: 'views/index.html',
			controller: 'index_controller',
			controllerUrl: 'controllers/index_controller.js',
		});
		//个人工作室  Nav_left首页的路由
		$stateProvider.state('index.Nav_left', {
			url: '/UserHome',
			templateUrl: 'views/UserHome/Nav_left.html',
			controller: 'Nav_left_controller',
			controllerUrl: 'controllers/UserHome/Nav_left_controller.js',
		});
		/**提交作品 */
		//1.开始提交
		$stateProvider.state('index.Nav_left.Ulist', {
			url: '/Ulist',
			templateUrl: 'views/UserHome/Content_right/Ulist.html',
			controller: 'Ulist_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Ulist_controller.js'
		});

		// 2、已提交作品
		$stateProvider.state('index.Nav_left.Article_list', {
			url: '/Article_list',
			templateUrl: 'views/UserHome/Content_right/Article_list.html',
			controller: 'Article_list_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Article_list_controller.js'
		});

		// 2、测试
		$stateProvider.state('index.Nav_left.Product_list', {
			url: '/Product_list',
			templateUrl: 'views/UserHome/Content_right/Product_list.html',
			controller: 'Product_list_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Product_list_controller.js'
		});

		/**作品认领与全文提交 */
		// 1.待认领祖品
		$stateProvider.state('index.Nav_left.Claim', {
			url: '/Claim',
			templateUrl: 'views/UserHome/Content_right/Claim.html',
			controller: 'Claim_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Claim_controller.js'
		});
		// 2.已认领作品
		$stateProvider.state('index.Nav_left.Claim_done', {
			url: '/Claim_done',
			templateUrl: 'views/UserHome/Content_right/Claim_done.html',
			controller: 'Claim_done_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Claim_done_controller.js'
		});
		// 3.已拒绝作品
		$stateProvider.state('index.Nav_left.Claim_refuse', {
			url: '/Claim_refuse',
			templateUrl: 'views/UserHome/Content_right/Claim_refuse.html',
			controller: 'Claim_refuse_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Claim_refuse_controller.js'
		});
		// 4.未提交全文
		$stateProvider.state('index.Nav_left.Claim_submit', {
			url: '/Claim_submit',
			templateUrl: 'views/UserHome/Content_right/Claim_submit.html',
			controller: 'Claim_submit_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Claim_submit_controller.js'
		});
		//组管理
		//1、加入组管理
		$stateProvider.state('index.Nav_left.Group_join', {
			url: '/Group_join',
			templateUrl: 'views/UserHome/Content_right/Group_join.html',
			controller: 'Group_join_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Group_join_controller.js'
		});
		//2、已加入组管理
		$stateProvider.state('index.Nav_left.Group_joined', {
			url: '/Group_joined',
			templateUrl: 'views/UserHome/Content_right/Group_joined.html',
			controller: 'Group_joined_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Group_joined_controller.js'
		});
		//3、创建组
		$stateProvider.state('index.Nav_left.Group_create', {
			url: '/Group_create',
			templateUrl: 'views/UserHome/Content_right/Group_create.html',
			controller: 'Group_create_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Group_create_controller.js'
		});

		//编辑个人信息
		$stateProvider.state('index.Nav_left.Uinformation', {
			url: '/Uinformation',
			templateUrl: 'views/UserHome/Content_right/Uinformation.html',
			controller: 'Uinformation_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Uinformation_controller.js'
		});

		//收藏管理
		//1、收藏的作品
		$stateProvider.state('index.Nav_left.Fav_article', {
			url: '/Fav_article',
			templateUrl: 'views/UserHome/Content_right/Fav_article.html',
			controller: 'Fav_article_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Fav_article_controller.js'
		});
		//2、收藏的学者
		$stateProvider.state('index.Nav_left.Fav_scholar', {
			url: '/Fav_scholar',
			templateUrl: 'views/UserHome/Content_right/Fav_scholar.html',
			controller: 'Fav_scholar_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Fav_scholar_controller.js'
		});
		//3、收藏的期刊
		$stateProvider.state('index.Nav_left.Fav_periodical', {
			url: '/Fav_periodical',
			templateUrl: 'views/UserHome/Content_right/Fav_periodical.html',
			controller: 'Fav_periodical_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Fav_periodical_controller.js'
		});
		//4、收藏的主题
		$stateProvider.state('index.Nav_left.Fav_topic', {
			url: '/Fav_topic',
			templateUrl: 'views/UserHome/Content_right/Fav_topic.html',
			controller: 'Fav_topic_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Fav_topic_controller.js'
		});

		//提醒我阅读的作品
		//1、关注学者的最新作品
		$stateProvider.state('index.Nav_left.Read_scholar', {
			url: '/Read_scholar',
			templateUrl: 'views/UserHome/Content_right/Read_scholar.html',
			controller: 'Read_scholar_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Read_scholar_controller.js'
		});
		//2、关注期刊的最新作品
		$stateProvider.state('index.Nav_left.Read_periodical', {
			url: '/Read_periodical',
			templateUrl: 'views/UserHome/Content_right/Read_periodical.html',
			controller: 'Read_periodical_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Read_periodical_controller.js'
		});
		//3、设定主题的最新作品
		$stateProvider.state('index.Nav_left.Read_topic', {
			url: '/Read_topic',
			templateUrl: 'views/UserHome/Content_right/Read_topic.html',
			controller: 'Read_topic_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Read_topic_controller.js'
		});

		//交流&私信
		$stateProvider.state('index.Nav_left.Private_messages', {
			url: '/Private_messages',
			templateUrl: 'views/UserHome/Content_right/Private_messages.html',
			controller: 'Private_messages_controller',
			controllerUrl: 'controllers/UserHome/Content_right/Private_messages_controller.js'
		});
		
		//个人作品统计
		$stateProvider.state('index.Nav_left.User_article_list', {
			url: '/User_article_list',
			templateUrl: 'views/UserHome/Content_right/User_article_list.html',
			controller: 'user_article_list_controller',
			controllerUrl: 'controllers/UserHome/Content_right/User_article_list_controller.js'
		});

		/*******************************************************************************************************************/

		/**前台页面配置如下*/

		//1.1研究单元入口模块
		$stateProvider.state('index.Research', {
			url: '/Research',
			templateUrl: 'views/Research/rNav_left.html',
			controller: 'rNav_left_controller',
			controllerUrl: 'controllers/Research/rNav_left_controller.js',
		});
		//1.2研究单元——文献筛选列表
		$stateProvider.state('index.Research.article_list', {
			url: '/article_list',
			templateUrl: 'views/Research/Content_right/article_list.html',
			controller: 'article_list_controller',
			controllerUrl: 'controllers/Research/Content_right/article_list_controller.js',
			params: {
				data: '',
				tiaoj: '',
				CollegeId: '',
				Tid: '', //页面来源 
				default: '',
				Tid: '',
				Wxid:''
			}
		});
		//2
		$stateProvider.state('index.Research.article_listt', {
			url: '/article_listt',
			templateUrl: 'views/Research/Content_right/article_listt.html',
			controller: 'article_listt_controller',
			controllerUrl: 'controllers/Research/Content_right/article_listt_controller.js',
			params: {
				data: '',
				tiaoj: '',
				CollegeId: '',
				Tid: '', //页面来源 
				default: '',
				Tid: ''
			}
		});
		//1.3研究单元——文献浏览页
		$stateProvider.state('index.Research.unit', {
			url: '/unit',
			templateUrl: 'views/Research/Content_right/unit.html',
			controller: 'unit_controller',
			controllerUrl: 'controllers/Research/Content_right/unit_controller.js',
		});
		//1.4研究单元
		$stateProvider.state('index.Research.Article_detail', {
			url: '/Article_detail',
			templateUrl: 'views/Research/Content_right/Article_detail.html',
			controller: 'Article_detail_controller',
			controllerUrl: 'controllers/Research/Content_right/Article_detail_controller.js',
			params: {
				data: ''
			}
		});
		// 加载主页
		$stateProvider.state('index.Home', {
			url: '/Home',
			templateUrl: 'views/Home/Default.html',
			controller: 'Default_controller',
			controllerUrl: 'controllers/Home/Default_controller.js'
		});
		$stateProvider.state('index.echarts', {
			url: '/echarts',
			templateUrl: 'views/Home/echarts.html',
			controller: 'echarts_controller',
			controllerUrl: 'controllers/Home/echarts_controller.js'
		});

		//  加载我校学者
		$stateProvider.state('index.Scholars', {
			url: '/Scholars',
			templateUrl: 'views/Home/Scholars.html',
			controller: 'Scholars_controller',
			controllerUrl: 'controllers/Home/Scholars_controller.js',
			params: {
				data: ''
			}
		});
		// 学者详情页
		$stateProvider.state('index.scholar_details', {
			url: '/scholar_details',
			templateUrl: 'views/Scholar/Content_right/scholar_details.html',
			controller: 'scholar_details_controller',
			controllerUrl: 'controllers/Scholar/Content_right/scholar_details_controller.js',
			params: {
				dataVal: '',
				userName: '',
				userImg:'',
				userImg2:''
			}
		});

		//404页
		$stateProvider.state('404', {
			url: '/404',
			templateUrl: 'views/404.html',
			controller: '404',
			controllerUrl: 'controllers/404.js'
		});

	}]);
});