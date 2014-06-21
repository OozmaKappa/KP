angular.module("kp").directive("fixedxy",
  function($window, $document) {
    return {

      // This means the directive can be used as an attribute only. Example <div data-my-slide="variable"> </div>
      restrict: "A",

      // This is the functions that gets executed after Angular has compiled the html
      link: function(scope, element) {
        var w = angular.element($window);

        var countLeft = function(w){
          var left = w[0].scrollX ;
          var scroll = angular.element('div.scroll');
          
          if (!scroll[0] || scroll[0].scrollWidth < 1)
            return 0;
          
          var maxLeft = scroll[0].scrollWidth - w[0].innerWidth;
          return left < maxLeft ? left : maxLeft;
        }

        var countTop = function(w){
          var top = w[0].scrollY ;
          return top;
        }

        angular.element($window).bind("scroll", function(){
          var left = countLeft(w);
          var top = countTop(w);
          scope.leftScrollStyle = left; 
          scope.rightScrollStyle =  -left; 

          scope.topScrollStyle = top; 
          scope.bottomScrollStyle = -top; 
          scope.$apply();
        });        
      }
    };
  }
);

angular.module("kp").directive("animateMove", function($window){
  return {
    restrict: "A",
    link: function(scope, element){
      var thresholdAcheived = false;
      var el = element[0];
      var elToRight = angular.element(element[0].children[0]);
      var elToLeft = angular.element(element[0].children[1]);
      if ($window.scrollY < el.clientHeight){
        elToRight.css({'left':'-20%'});
        elToLeft.css({'left':'+20%'});
      } 
      angular.element($window).bind("scroll", function(){
        console.log(el.offsetTop, $window.scrollY);
        if ($window.scrollY >= el.offsetTop - el.clientHeight && !thresholdAcheived) {
          elToRight.animate({left:'+=20%'});
          elToLeft.animate({left:'-=20%'});
          thresholdAcheived = true;
        }
        else if ($window.scrollY + $window.innerHeight < el.offsetTop + el.clientHeight && thresholdAcheived){
          thresholdAcheived = false;
          elToRight.animate({left:'-=20%'});
          elToLeft.animate({left:'+=20%'});
        }
        scope.$apply();
        // unbind();
      });
    }
  }
});



