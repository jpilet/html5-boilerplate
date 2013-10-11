
jQuery( function($){
	function resizeSections() {
		var height = window.innerHeight, width = window.innerWidth;
		var headerHeight = $("#content")[0].offsetTop;
		
		$("#content").css({
			"height" : height - headerHeight + "px",
			"width" : width + "px"
		});
		
		
		$("section").css({
			"min-height" : (height - headerHeight - 10) + "px",
			"width" : (width - 10) + "px"
		});
		
		
	}
	
	function selectSection(section) {
		$("section").css({
			"display": "none"
		});
		$(section).css({"display":"block"});
	}
	
	resizeSections();
	window.onresize = _.debounce( resizeSections , 200);
	
	selectSection("#home");
	
	window.onhashchange = function() {
		selectSection(location.hash);
	};
});
