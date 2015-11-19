angular.module('starter.controllers', ['pascalprecht.translate'])
// ['pascalprecht.translate'] is a translation module

.controller('TabsCtrl', function($scope, $location, user, $translate) {
	
	$scope.user=user;
	
	//translation
	$scope.ChangeLanguage = function(lang){

		$translate.use(lang);
		console.log("Language change to "+lang);
		
	};
})

.controller('LoginCtrl', function($scope, $location, user, db, $translate, $ionicPopup) {
	
	$scope.user=user;
	$scope.$location = $location;
	
	//Canvas tree
	var height = 320, width = 320;
	var canvas = document.getElementById('canvas');
	canvas.height = height;
	canvas.width = width;
	ctx = canvas.getContext("2d");
	tree.draw(ctx,height,width);

	
	$scope.LogIn = function() {
		db.remoteDB.login(user.login, user.password, function (err, response) {

			  if (err) {
				  $scope.showWrongCredentials();
			    if (err.name === 'unauthorized') {
			      // name or password incorrect
			    } else {
			      // cosmic rays, a meteor, etc.
			    }
			  }else{

					user.loggedin=true; 
					db.remoteDB.allDocs();  
					$location.path('/tab/disclaimer');
					
			  }
			});
	}

	$scope.SignUp = function() {
		db.remoteDB.signup(user.login, user.password, function (err, response) {
			console.log(response);
			if (err) {
				  $scope.showWrongSignup();
			    if (err.name === 'conflict') {
			      // "batman" already exists, choose another username
			    } else if (err.name === 'forbidden') {
			      // invalid username
			    } else {
			      // HTTP error, cosmic rays, etc.
			    }
			  }else{

					$scope.showSuccessSignup();
				  $location.path('/tab/login');
//				  $scope.LogIn();
			  }
			});
	}
	
	
	/*		
	//	
		localDB.put({
			  _id: 'test',
			  login: user.login,
			  password: user.password,
			  agreed: user.agreed,
			  age: 68
			}).then(function (response) {
				  // handle response
			}).catch(function (err) {
			  console.log(err);
			});
	//
			localDB.changes().on('change', function() {
			  console.log('change in db ');
			});
*/

	
	/* Login section */
	 $scope.showWrongCredentials = function() {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Incorrect login or password',
	     template: 'Are you sure, that your account is created and active?\nPlease verify your username and password.\nIn case of repeating issue, please contact suppoert.'
	   });
	   alertPopup.then(function(res) {
	     console.log('Cannot do anything '+res);
	   });
	 };
	
	 
	 /* SignUP section */
	 $scope.showSuccessSignup = function() {
		   var alertPopup = $ionicPopup.alert({
		     title: 'Account created!',
		     template: 'Successfully created your new account.'
		   });
		   alertPopup.then(function(res) {
		     console.log('Cannot do anything '+res);
		   });
		 };
	 
	 /* SignUP section */
	 $scope.showWrongSignup = function() {
		   var alertPopup = $ionicPopup.alert({
		     title: 'Cannot create account',
		     template: 'Incorrect input or account already exist. \nPlease check your username and password for strange signs (use only latin letters and numbers).\nIn case of repeating issues, please contact support.'
		   });
		   alertPopup.then(function(res) {
		     console.log('Cannot do anything '+res);
		   });
		 };
	
})

.controller("CalendarCtrl", function($scope) {
	$scope.day = moment();
})

.controller('DisclaimerCtrl', function($scope, $location, user, $state) {
	
	$scope.user=user;
	
	$scope.accept = function(){
		$state.go('tab.lessons');
		user.agreed=true;
	}

	$scope.reject = function(){
		$state.go('tab.login');
		user.agreed=false;
	}
	
})

.controller('LessonsCtrl', function($scope, Chats) {

	
	
})

.controller('SlideController', function($scope, $ionicSlideBoxDelegate, $location, $anchorScroll) {
  
  $scope.myActiveSlide = 1;
  $scope.nextSlide = function() {

	    $ionicSlideBoxDelegate.next();
	      // set the location.hash to the id of
	      // the element you wish to scroll to.
	      $location.hash('top');

	      // call $anchorScroll()
	      $anchorScroll();
		  
	  }
  
  $scope.gotoTop = function() {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('top');

      // call $anchorScroll()
      $anchorScroll();
    };
})

.controller('AccountCtrl', function($scope,user) {
	$scope.user=user;
	
	
  $scope.settings = {
    enableFriends: true
  };
  

  
  $scope.toggleEditable = function(){
	  user.editable = !user.editable;
  };
  
  $scope.isUserEditable = function(){
	  return user.editable;
  };
});
