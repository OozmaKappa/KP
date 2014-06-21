
$(document).ready(
	function(){
		// $.getScript("./js/gallery.js", function(){});

		// $(".content").insertBefore(".headerBottomLine");

	// $("a.navigation").hover(function(){
	$("span").mouseenter(function(){
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
	    
    var pageHeight = angular.element("html").height();
	$(window).resize(function(){
	    var viewPortHeght = parseInt(window.innerHeight);
	    if(viewPortHeght < pageHeight)
	    	footer.addClass('footer-hidden');
	    else
	    	footer.removeClass('footer-hidden');
	});
});

