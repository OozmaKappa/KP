
$(document).ready(
	function(){
		// $.getScript("./js/gallery.js", function(){});

		// $(".content").insertBefore(".headerBottomLine");

	// $("a.navigation").hover(function(){
	angular.element("span").mouseenter(function(){
		var submenu = $(this).children('div').eq(0);
		var position = $(this).position();
		// var width = $(this).outerWidth();

		submenu.css({ 
			left: position.left + "px" 
		});
		submenu.fadeIn("fast", function(){});
	});

	$("span").mouseleave(function(){
		var submenu = $(this).children('div').eq(0);
		submenu.fadeOut("slow", function(){});
	});

	var footer = angular.element('.footer');
	// var leftOffset = parseInt(footer.css('left'));
 //    var countLeft = function(){
	// 	var left = $(this).scrollLeft() + leftOffset;
	// 	var scroll = $(".scroll");
	// 	var maxLeft = $(".scroll")[0].scrollWidth - $(window).width();
	// 	// console.log('maxLeft: ', maxLeft, ' scrollLeft: ', $(this).scrollLeft(), ' leftOffset: ', leftOffset);
	// 	return left < maxLeft ? left : maxLeft;
	// }

	// // var header = angular.element('.header');
	// $(window).scroll(function(){
	// 	var left = 	countLeft()    
	//     footer.css({'left': left});
	//     // header.css({'left': left});
	// });




	    
    var pageHeight = angular.element("html").height();
	$(window).resize(function(){
	    var viewPortHeght = parseInt(window.innerHeight);
	    if(viewPortHeght < pageHeight)
	    	footer.addClass('footer-hidden');
	    else
	    	footer.removeClass('footer-hidden');
	});
});

