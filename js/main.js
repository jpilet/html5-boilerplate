
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
	
	function sectionPosition(section) {
		return {
			left: -(section.attr("data-x") * horizontalSeparation) + 100,
			top: -(section.attr("data-y") * verticalSeparation) + 100
		};
	}
	
	var selectedSection = null;
	function selectSection() {
		var section = currentSection();
		var previousSection = selectedSection;
		
		if (previousSection === section) {
			return;
		}
		selectedSection = section;
		
		var pos = sectionPosition(section);
		$("#clipZone")[0].scrollLeft = 0;
		$("#clipZone")[0].scrollTop = 0;
		if (previousSection && Modernizr.cssanimations) {
			var prevPos = sectionPosition(previousSection);
			var mid = {
				left: (prevPos.left + pos.left) / 2,
				top: (prevPos.top + pos.top) / 2
			};
			
			var anim = Zanimo($("#content")[0]);
			if (Modernizr.csstransforms3d) {
				anim = anim
					.then(Zanimo.transitionf("transform", "translate3d(" + mid.left + "px," + mid.top + "px, -200px)", 400, "ease-in"))
					.then(Zanimo.transitionf("transform", "translate3d(" + pos.left + "px," + pos.top + "px, 0px)", 400, "ease-out"));
			} else {
				anim = anim.then(Zanimo.transitionf("transform", "translate(" + pos.left + "px," + pos.top + "px)", 800, "ease-in-out"));
			}
			anim.fail(function() {
				$("#content").css({
					"transform": "translate(" + pos.left + "px," + pos.top + "px)"
				}); 		
			});
		} else {
			// Initial selection: no animation, or no animation support.
			$("#content").css({
				"transform": "translate(" + pos.left + "px," + pos.top + "px)"
			}); 
		}
	}
	
	window.onresize = _.debounce( resizeSections , 200);
	window.onhashchange = selectSection;
	window.onresize();	
});
