angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $location, user) {
	
	$scope.$location = $location;
	$scope.user=user;
	
//	$scope.calculateQuantity = function() {
//	    $scope.quantityResult = calculateService.calculate($scope.quantity, 10);
//	  };
	
})

.controller("CalendarCtrl", function($scope) {
	$scope.day = moment();
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  

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

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
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
