
jQuery( function($){
	function computeBounds() {
		var bounds = {
			maxX: -1000,
		    minX: 1000,
		    maxY: -1000,
		    minY: 1000
		  };
		$("section").each(function() {
			var x = this.getAttribute("data-x");
			var y = this.getAttribute("data-y");
			bounds.maxX = Math.max(bounds.maxX, x);
			bounds.minX = Math.min(bounds.minX, x);
			bounds.maxY = Math.max(bounds.maxY, y);
			bounds.minY = Math.min(bounds.minY, y);
		});
		bounds.width = bounds.maxX - bounds.minX + 1;
		bounds.height = bounds.maxY - bounds.minY + 1;
		return bounds;
	}
	var bounds = computeBounds();
	var horizontalSeparation = 0;
	var verticalSeparation = 0;
	
	function placeSections(_horizontalSeparation, _verticalSeparation) {
		horizontalSeparation = _horizontalSeparation;
		verticalSeparation = _verticalSeparation;
		
		var sections = $("section");
		
		$("#content").css({
			"width": bounds.width * horizontalSeparation,
			"height": bounds.height * verticalSeparation,
		});
		
		$("section").each(function() {
			$(this).css({
				"left": this.getAttribute("data-x") * horizontalSeparation,
			    "top": this.getAttribute("data-y") * verticalSeparation
			});
		});
	}

	function resizeSections() {
		var height = window.innerHeight, width = window.innerWidth;
		var clipZone = $("#clipZone");
		var headerHeight = clipZone[0].offsetTop;
		
		var clipZoneWidth = width;
		var clipZoneHeight = (height - headerHeight);
		clipZone.css({
			"height": clipZoneHeight + "px",
			"width" : clipZoneWidth + "px"
		});
		
		var sectionWidth = clipZoneWidth * .5;
		var sectionHeight = clipZoneHeight * .5;
		$("section").css({
			"height" : sectionHeight + "px",
			"width" : sectionWidth + "px",
		});
		
		placeSections(clipZoneWidth * .8, clipZoneHeight * .8);
		selectSection();
	}
	
	function currentSection() {
		return $(location.hash ? location.hash: "#home");
	}
	
	function selectSection() {
		var section = currentSection();
			var left = -(section.attr("data-x") * horizontalSeparation) + 100;
			var top = -(section.attr("data-y") * verticalSeparation) + 100;
			$("#clipZone")[0].scrollLeft = 0;
			$("#clipZone")[0].scrollTop = 0;
			
			$("#content").css({
				"left": left + "px",
				"top": top + "px"
			});
			
	}
	
	resizeSections();
	window.onresize = _.debounce( resizeSections , 200);
	
	selectSection();
	
	window.onhashchange = selectSection;
});
