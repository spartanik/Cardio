// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app=angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',
                           //added directive for calendar support
                           'starter.directives',
                           //initial values
                           'starter.constants'
                           ])

.value('user',{
	  editable : false,
	  login: 'login',
	  password: 'password',
	  loggedin: false,
	  agreed: false,
	  nickname: 'NewUserName',
	  dayoff : 'Saturday',
	  age : 50,
	  weight : 80,
	  height : 180,
	  fitness_level : 5
})
.value('db',{
	  localDB:null,
	  remoteDB:null
})
                           
.run(function($ionicPlatform, user, db) {
	
	db.localDB=new PouchDB("cardio"),
	db.remoteDB = new PouchDB("https://couchdb-8fc719.smileupps.com/cardio",
			{skipSetup: true});
	db.localDB.sync(db.remoteDB, {live: true});
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

	// Translations support
	  for (lang in translations) {
		$translateProvider.translations(lang, translations[lang]);
	}

	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('sanitize');
	
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  
  .state('tab.login-signup', {
    url: '/login/signup',
    views: {
      'tab-login': {
        templateUrl: 'templates/login-signup.html',
        controller: 'LoginCtrl',
      }
    }
  })
  
  // TODO FINISH CALENDAR SUPPORT
  .state('tab.account-calendar', {
    url: '/login/calendar-view',
    views: {
      'tab-account': {
        templateUrl: 'templates/calendar-view.html',
        controller: 'CalendarCtrl',
      }
    }
  })
  
  .state('tab.disclaimer', {
    url: '/disclaimer',
    views: {
      'tab-disclaimer': {
        templateUrl: 'templates/tab-disclaimer.html',
        controller: 'DisclaimerCtrl'
      }
    }
  })

  .state('tab.lessons', {
      url: '/lessons',
      views: {
        'tab-lessons': {
          templateUrl: 'templates/tab-lessons.html',
          controller: 'LessonsCtrl',
          controller: 'SlideController'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});

app.factory('quizFactory', function() {
	// TODO Add questions download (storing will be done automatically by pouchDB)
	var questions = [
	         		{
	         			question: "Which is the largest country in the world by population?",
	         			options: ["India", "USA", "China", "Russia"],
	         			answer: 2
	         		},
	         		{
	         			question: "When did the second world war end?",
	         			options: ["1945 When did the second world war \n end?", "1939", "1944", "1942"],
	         			answer: 0
	         		},
	         		{
	         			question: "Which was the first country to issue paper currency?",
	         			options: ["USA", "France", "Italy", "China"],
	         			answer: 3
	         		},
	         		{
	         			question: "Which city hosted the 1996 Summer Olympics?",
	         			options: ["Atlanta", "Sydney", "Athens", "Beijing"],
	         			answer: 0
	         		},
	         		{	
	         			question: "Who invented telephone?",
	         			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
	         			answer: 1
	         		}
	         	];
	          
	         	return {
	         		getQuestion: function(id) {
	         			if(id < questions.length) {
	         				return questions[id];
	         			} else {
	         				return false;
	         			}
	         		}
	         	};
	         });

