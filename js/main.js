
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
			"width" : geometry.clipZoneWidth + "px",
		});
		
		// Return a small value if 'size' if significantly smaller than 'normalSize'
		// if 'size' is about 'normalSize', return normalSize * ratio.
		// if 'size' is much larger, return a large value.
		var squareProgressive = function(size, normalSize, ratio) {
			return (size / normalSize) * (size * ratio);
		};
		geometry.sectionWidth = geometry.clipZoneWidth - 2 * squareProgressive(geometry.clipZoneWidth, 800, .07);
		geometry.sectionHeight = geometry.clipZoneHeight - 2 * squareProgressive(geometry.clipZoneHeight, 800, .07);
		var border = {
			width: squareProgressive(geometry.clipZoneWidth, 800, .07),
			height: squareProgressive(geometry.clipZoneHeight, 800, .07),
		};
		$("section").css({
			"height" : (geometry.sectionHeight - border.height) + "px",
			"width" : (geometry.sectionWidth - border.width) + "px",
			"border-width": border.height + "px " + border.width + "px",
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
		var r = $(section).attr("data-radius") * 1.6;

		return {
			left: cos * r * geometry.sectionWidth - (geometry.sectionWidth / 2) + geometry.bounds.width / 2,
			top: sin * r * geometry.sectionHeight - (geometry.sectionHeight / 2) + geometry.bounds.height / 2
		};
	}
	
	var previousTranslation = null;
	function selectSection() {
		function translationForSection(section) {
			var pos = sectionPosition(section);
			return {
				left: (geometry.clipZoneWidth - $(section).outerWidth()) / 2 - pos.left,
				top: (geometry.clipZoneHeight - $(section).outerHeight()) / 2 - pos.top,
				z: 0
			};
		}
		
		var section = currentSection();		
		var pos = translationForSection(section);

		if (previousTranslation && Modernizr.cssanimations) {

			var mid = {
				left: (previousTranslation.left + pos.left) / 2,
				top: (previousTranslation.top + pos.top) / 2,
				z: (previousTranslation.z + pos.z) / 2 - 200
			};
			
			var anim = Zanimo($("#content")[0]);
			var animBackground = Zanimo($("#background")[0]);
			var slowFactor = .5;
			if (Modernizr.csstransforms3d) {
				anim = anim
					.then(Zanimo.transitionf("transform",
						"translate3d(" + mid.left + "px," + mid.top + "px, " + mid.z + "px)", 400, "ease-in-out"))
					.then(Zanimo.transitionf("transform",
						"translate3d(" + pos.left + "px," + pos.top + "px, " + pos.z + "px)", 400, "ease-in-out"));
				animBackground = animBackground
					.then(Zanimo.transitionf("transform",
						"translate3d(" + mid.left * slowFactor + "px," + mid.top * slowFactor + "px, " + mid.z + "px)", 400, "ease-in-out"))
					.then(Zanimo.transitionf("transform",
						"translate3d(" + pos.left * slowFactor + "px," + pos.top * slowFactor + "px, " + pos.z + "px)", 400, "ease-in-out"));
				
			} else {
				anim = anim.then(Zanimo.transitionf("transform", "translate(" + pos.left + "px," + pos.top + "px)", 800, "ease-in-out"));
				animBackground = animBackground
					.then(Zanimo.transitionf("transform", "translate(" + pos.left * slowFactor + "px," + pos.top * slowFactor+ "px)", 800, "ease-in-out"));
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
		$("section").css({"z-index" : 0});
		$(section).css({"z-index": 10});
		previousTranslation = pos;
	}
	
	// Browsers try to scroll to the correct location.
	// Make sure to reset scrolling, we'll pace stuff ourselves.
	$("#clipZone").scroll(function() {
		this.scrollLeft = 0;
		this.scrollTop = 0;
	});
	
	//$(".opticodeLogo").html('<a href="#home">opticod<span class="inverseVideo">e</span>.ch</a>');
	$(".opticodeLogo").html('opticode.ch');
	
	window.onresize = _.debounce( function() {
			previousTranslation = null;
			resizeSections();
		} , 20);
	window.onhashchange = selectSection;
	window.onresize();
	
	
	// Fill the index section
	var index = "<ul>";
	$("section").each(function() {
		var id = $(this).attr("id");
		if (id != "index") {
			index += '<li><a href="#' + id + '">' + $(this).find("h1").html() + '</a></li>';
		}
	});
	index += "</ul>";
	$('#indexContainer').html(index);
	
	// Duplicate navigation bar in all sections
	$("section").prepend($("#home nav"));
	
	// Format youtube references
	$(".youtubeIcon").each(function() {
		$(this).html('<iframe width="420" height="315" src="//www.youtube.com/embed/'
			+ $(this).attr("data-youtubeid") + '?rel=0&theme=light&color=white" frameborder="0" allowfullscreen></iframe>'
			+ '<span>' + $(this).html() + '</span>');
	});
});
