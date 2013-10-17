
jQuery( function($){
	var geometry = {
		sectionWidth: 0,
		sectionHeight: 0,
		clipZoneWidth: 0,
		clipZoneHeight: 0,
		bounds: {
			width: 0,
			height: 0,
		}
	};
			
	function computeBounds() {
		var bounds = geometry.bounds;
		var maxX = -1000;
		var minX = 1000;
		var maxY = -1000;
		var minY = 1000;
		
		// sectionPosition depends on bounds.width and bounds.height, which are
		// not known at this point. However, it is just a translation
		// that has no impact on width and height.
		bounds.width = 0;
		bounds.height = 0;
		$("section").each(function() {
			var pos = sectionPosition(this);
			var x = pos.left;
			var y = pos.top;
			maxX = Math.max(maxX, x + geometry.sectionWidth);
			minX = Math.min(minX, x);
			maxY = Math.max(maxY, y + geometry.sectionHeight);
			minY = Math.min(minY, y);
		});
		bounds.width = Math.max(maxX * 2, - minX * 2);
		bounds.height = Math.max(maxY * 2, - minY * 2);
	}
		
	function placeSections() {		
		computeBounds();
		$("#content").css({
			"width": geometry.bounds.width,
			"height": geometry.bounds.height,
		});
		
		$("section").each(function() {
			$(this).css(sectionPosition(this));
		});
	}

	function resizeSections() {
		var height = window.innerHeight, width = window.innerWidth;
		var clipZone = $("#clipZone");
		var headerHeight = clipZone[0].offsetTop;
		
		geometry.clipZoneWidth = width;
		geometry.clipZoneHeight = (height - headerHeight);
		clipZone.css({
			"height": geometry.clipZoneHeight + "px",
			"width" : geometry.clipZoneWidth + "px"
		});
		
		geometry.sectionWidth = geometry.clipZoneWidth * .8;
		geometry.sectionHeight = geometry.clipZoneHeight * .8;
		$("section").css({
			"height" : geometry.sectionHeight + "px",
			"width" : geometry.sectionWidth + "px"
		});
		
		placeSections();
		selectSection();
	}
	
	function currentSection() {
		return $(location.hash ? location.hash: "#home");
	}
	
	function sectionPosition(section) {
		var angle = $(section).attr("data-angle") * Math.PI / 180.0;
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
		var r = $(section).attr("data-radius") * 1.5;

		return {
			left: cos * r * geometry.sectionWidth - (geometry.sectionWidth / 2) + geometry.bounds.width / 2,
			top: sin * r * geometry.sectionHeight - (geometry.sectionHeight / 2) + geometry.bounds.height / 2
		};
	}
	
	function translationForSection(section) {
		var pos = sectionPosition(section);
		return {
			left: (geometry.clipZoneWidth - geometry.sectionWidth) / 2 - pos.left,
			top: (geometry.clipZoneHeight - geometry.sectionHeight) / 2 - pos.top
		};
	}

	var selectedSection = null;
	function selectSection() {
		// Browsers try to scroll to the correct location.
		// Make sure to reset scrolling, we'll pace stuff ourselves.
		$("#clipZone")[0].scrollLeft = 0;
		$("#clipZone")[0].scrollTop = 0;
		
		var section = currentSection();
		var previousSection = selectedSection;
		
		if (previousSection === section) {
			return;
		}
		selectedSection = section;
		
		var pos = translationForSection(section);

		if (previousSection && Modernizr.cssanimations) {
			var prevPos = translationForSection(previousSection);

			var mid = {
				left: (prevPos.left + pos.left) / 2,
				top: (prevPos.top + pos.top) / 2
			};
			
			var anim = Zanimo($("#content")[0]);
			if (Modernizr.csstransforms3d) {
				anim = anim
					.then(Zanimo.transitionf("transform", "translate3d(" + mid.left + "px," + mid.top + "px, -200px)", 400, "ease-in-out"))
					.then(Zanimo.transitionf("transform", "translate3d(" + pos.left + "px," + pos.top + "px, 0px)", 400, "ease-in-out"));
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
