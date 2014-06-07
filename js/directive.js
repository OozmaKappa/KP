angular.module("kp").directive("fixedx",
  function($window, $document) {
    return {

      // This means the directive can be used as an attribute only. Example <div data-my-slide="variable"> </div>
      restrict: "A",

      // This is the functions that gets executed after Angular has compiled the html
      link: function(scope, element) {
        var w = angular.element($window);

        var countLeft = function(w){
          left = w[0].scrollX ;
          var scroll = angular.element('div.scroll');
          
          if (scroll[0].scrollWidth < 1)
            return 0;
          
          var maxLeft = scroll[0].scrollWidth - w[0].innerWidth;
          return left < maxLeft ? left : maxLeft;
        }

        w.scroll(function(){
          var left = countLeft(w);
          scope.leftScrollStyle = {'left': left}; 
          scope.rightScrollStyle = {'right': left * -1}; 
          scope.$apply();
        });
        
      }
    };
  }
);