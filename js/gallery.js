var services = angular.module('kp.services', ['ngResource']);

services.value('version', '0.1');

services.factory('GalleryService', ['$timeout', '$resource', '$http', function($timeout, $resource, $http){     
	function GalleryService(){
		this.pictures = [];
        this.fade_duration = 2500;
		this.display_duration = 5000;
		this.change = null;
		this.helperPHPResource = null;
		this.helperJSResource = null;
		this.galleries = null;
		this.galleryPath = './img/gallery';


		// this.helperPHPResource = $resource('php/helper.php');		
		// this.helperPHPResource.get({}, function(data){
		// 	console.log(data);
		// 	this.galleries = data;
		// }, function(error){
		// 	console.log(error);
		// });

		$http.get('/api/galleries').success(function(data){
			console.log(data);
			this.galleries = data;
		}).error( function(error){
			console.log(error);
		});
    }

    var galleryService = new GalleryService();

    GalleryService.prototype.init = function(){
		this.pictures = [];
		this.i = 0;
		this.next_pic = 0;
		this.div_index = 1;
	};

	GalleryService.prototype.startGallery = function(theme, callback){
		var galleryPath = this.galleryPath + '/' + theme;
		var numberOfFiles = 1;
		var self = galleryService;

		if (!self.galleries) {
			// self.helperPHPResource.get({}, function(data){
			// 	self.galleries = data;
			// 	self.startGallery(theme, callback);
			// });
			$http.get('/api/galleries').success(function(data){
				self.galleries = data;
				self.startGallery(theme, callback);
			}).error( function(error){
				console.log(error);
			});
		}else{
			self.galleries.some(function(gallery){
				if (gallery.name !== theme) 
					return false;	// continue

	 			numberOfFiles = gallery.number;
			});
		};

		callback(galleryPath, numberOfFiles);
		// self.show(galleryPath, numberOfFiles);
	};

	GalleryService.prototype.show = function(path, filesCount){
		this.init();
		
		do{
			this.i++;
			this.bild = path + '/' + this.i + ".jpg";
			this.pictures.push( this.bild );	
		}
		while ( this.i < filesCount );

		if (this.change !== null) {$timeout.cancel(this.change);};

		this.bildwechsel(this.div_index);
	};

	GalleryService.prototype.bildwechsel = function(bildIndex) 
	{	
		index = this.pictures.length - 1;
		if (this.next_pic == index) this.next_pic = 0;
		else this.next_pic++ ;

		index_out = bildIndex;
		(bildIndex == 1) ? bildIndex++ : bildIndex--;

		console.log(this.next_pic);
		this.fade_sequence(index_out, bildIndex, this.next_pic);
		
		this.change = $timeout(function(){galleryService.bildwechsel(bildIndex)}, this.display_duration);
	};
			
	// GalleryService.prototype.fade_sequence = function( index_out, index_in, next_picture )
	// {
	// 	console.log(this.pictures[next_picture]);
	// 	$('#img' + index_out ).fadeOut(this.fade_duration);
	// 	$('#img' + index_in ).replaceWith( '<img class="galleryPicture" id="img' + index_in + '" src="' + this.pictures[next_picture] + '" style="display: none">' );
	// 	$('#img'  + index_in).fadeIn(this.fade_duration);
	// };
    
    return galleryService;
}]);

