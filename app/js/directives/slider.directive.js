smdc.directive('slider',['$document', function($document) {
	return {
		restrict: 'E',
		link: function(scope, e, a) {

			var index = 0;
			var currentOffset;

			var ul = e.children();
				ul = ul.children();
				ul = ul[0];

			var li = e.children();
				li = li.children();
				li = li[0].children;

			function slide() {
			    if(index >= li.length -1) {
			        index = 0;  
			        ul.style.left = 0;
			    } else {
			        index++;
			        currentOffset = 500 * index;
			        ul.style.left = '-' + currentOffset + 'px';			        
			    }
			}		
			window.setInterval(slide, 2000);
		},
		templateUrl: function(e,a) {
           return 'views/partials/' + a.data + '-slider.html'
       }
	}
}]);