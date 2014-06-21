angular.module('kp',['ngRoute', 'kp.services'])
	.config(router);

function router($routeProvider){
	$routeProvider.
		when('/',{template:" ", controller:'HomeController'}).
		when('/gallery',{template:" ", controller:'GalleryController'}).
		when('/gallery/:theme',{templateUrl:'../partials/gallery.html', controller:'GalleryController'}).
		when('/service',{templateUrl:'../partials/service.html', controller:'ServiceController'}).
		otherwise({redirectTo:'/'});
};

function MainController($scope, GalleryService, $window, $timeout){
	$scope.imagePathes = [];
	$scope.galleryService = GalleryService;
	$scope.showNavigationArrow = false;
	$scope.left = "";

	var scroll = false;
	var scrolldelay = null;

	$scope.setActive = function(type){
		$scope.homeActive = '';
		$scope.galleryActive = '';

		$scope[type + 'Active'] = 'active';
	};

	$scope.getImages = function(theme){
		$scope.left = 0;
		$scope.galleryService.startGallery(theme,
			function(galleryPath, filesCount){
				var pathArray = [];
				for (var i = 1; i <= filesCount; i++) {
					pathArray.push(galleryPath + '/' + i + '.jpg');
				};
				$scope.imagePathes = pathArray;
			});
	}

	$scope.scroll = function(direction){
		scroll = true;
		var directionMult = 10;
		if (direction === 'left') {
			directionMult = -10;
		};

		$window.scrollBy(directionMult,0);
    	scrolldelay = $timeout(function(){
    		if (scroll)
    			$scope.scroll(direction);
    	},70); 
	};

	$scope.stopScrolling = function(){
		scroll = false;
		$timeout.cancel(scrolldelay);
	}
};

function HomeController($scope){
	$scope.setActive('home');

	// $scope.galleryService.startGallery('children');
	$scope.getImages('children');
};

function GalleryController($scope, $routeParams, $window){
	$scope.setActive('gallery');

	// $scope.galleryService.startGallery($routeParams.theme);
	if ($routeParams.theme){
		$scope.getImages($routeParams.theme);
		$window.scroll(0,0);
	}
};

function ServiceController($scope){
	
}

