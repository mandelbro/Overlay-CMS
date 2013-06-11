
(function($) {

	/**
	 * jQuery.transitionend
	 * Retrievs the total amount of time, in miliseconds that
	 * an element will be transitioned
	 */
	$.fn.transitionend = function(index) {
		index = index || 0;
		// check the main transition duration property
		if(this.css('transition-duration')) {
			return Math.round(parseFloat(this.css('transition-duration').split(',')[index]) * 1000);
		}
		else {
			// check the vendor transition duration properties
			if(this.css('-webkit-transtion-duration')) return Math.round(parseFloat(this.css('-webkit-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-moz-transtion-duration')) return Math.round(parseFloat(this.css('-moz-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-ms-transtion-duration')) return Math.round(parseFloat(this.css('-ms-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-o-transtion-duration')) return Math.round(parseFloat(this.css('-ms-transtion-duration').split(',')[index]) * 1000);
		}
		// if we're here, then no transition duration was found, return 0
		return 0;
	};

})( jQuery );


(function($) {

	/**
	 * jQuery.zOrder
	 * Applies Ascending or descending z-index to group of jQuery elements
	 */
	$.fn.zOrder = function(direction) {
		direction = direction || 'desc'; // default to desc, higher to lower z-order value
		this.each(function(index) {
			$element = $(this),
			position = $element.css('position');
			$element.css({
				'z-index' : (direction == 'asc' ? (index + 1) : -index),
				'position' : $(this).css('position', (position == 'static' ? 'relative' : position))
			});
		});
		return this;
	};

})( jQuery );


(function($) {
	/**
	 * Adds a CSS3 property (or map of properties) to an element
	 * @param p
	 * 	- CSS3 Property (non css3 properties are technically okay, it's just ... why?)
	 * @param v
	 * 	- Value to set CSS3 Property
	 */
	// automate the property generation process
	var methods = {
		'setProperty' : function(p,v) {
			var properties = {};

			properties['-webkit-'+ p] = v;
			properties['-moz-'+ p] = v;
			properties['-ms-'+ p] = v;
			properties['-o-'+ p] = v;
			properties[p] = v;
			this.css(properties);
		},
		'getProperty' : function(p) {
			var self = this,
					value,
					properties = [
						p,
						'-webkit-'+ p,
						'-moz-'+ p,
						'-ms-'+ p,
						'-o-'+ p
					];
			$.each(properties, function() {
				if(self.css(this)) {
					value = self.css(this);
					return false;
				}
			});
			return value;
		}
	};

	$.fn.css3 = function(p,v) {
		var self = this,
				css = false;
		// loop through all elements
		this.each(function() {
			var $element = $(this);
			// have a map of css3 properties
			if(typeof p == 'object') {
				$.each(p, function(p,v) {
					methods.setProperty.apply($element, [p,v]);
				});
			}
			else {
				if(!v) { // just return a property
					css = methods.getProperty.apply($element, [p]);
				}
				else { // just set a p and a v
					methods.setProperty.apply($element, [p,v]);
				}
			}

		});

		return css ? css : this; // if we have a css value, return it, otherwise return the object for chaining
	};

})( jQuery );


(function($) { // make this friendly to other libraries

	/**
	 * Parallax Scroll
	 * moves element a fraction of the amount scrolled
	 */
	var methods = {
				'doParallaxScroll' : {
					'universal' : function(settings) {
						if(settings.counter < 2) settings.counter++;
						var scrollTop = $(document).scrollTop();
						if(settings.counter == 1) {
							settings.scrolledPasedLowestPoint = (scrollTop > 1);
						}
						var scrollSpeed = (settings.scrolledPasedLowestPoint ? 1 : settings.speed/100),
								scrollTopSpeedAdjustment = Math.round((scrollSpeed - (settings.speed/100)) * settings.scrollTopWhenSpeedChanged);
						settings.top = scrollTopSpeedAdjustment - (Math.round((scrollTop * scrollSpeed) * 1000) / 1000);
						settings.scrolledPasedLowestPoint = (settings.counter > 1 && settings.lowestPoint !== false && scrollTop > settings.lowestPoint);
						if(settings.counter > 1 && !settings.scrolledPasedLowestPoint) settings.scrollTopWhenSpeedChanged = scrollTop;

						if(Modernizr.csstransforms3d) {
							methods.doParallaxScroll.css3d.apply(this, [settings]);
						}
						else if(Modernizr.csstransforms) {
							methods.doParallaxScroll.css3.apply(this, [settings]);
						}
						else {
							methods.doParallaxScroll.css.apply(this, [settings]);
						}

						return settings;
					},
					'css' : function(settings) {
						this.css('top', settings.top + settings.baseTop + 'px');
					},
					'css3' : function(settings) {
						this.css3('transform', 'translate(0px, ' + settings.top + 'px)');
					},
					'css3d' : function(settings) {
						this.css3('transform', 'translate3d(0px, ' + settings.top + 'px, 0px)');
					}
				}
			};


	$.fn.parallaxScroll = function() {
		// mobile browsers ain't ready for this jelly
		if(Modernizr.touch) return;
		var self = this;

		var settings = {
			'lowestPoint' : parseInt(this.attr('data-lowest-point')) || false,
			'stopPoint' : this.outerHeight() + this.offset().top,
			'baseTop' : this.offset().top,
			'scrolledPasedLowestPoint' : false,
			'documentScrolledAtPageLoad' : ($(document).scrollTop() > 1),
			'scrollTopWhenSpeedChanged' : 0,
			'speed' : parseInt(this.attr('data-speed')) || 25,
			'position' : this.css('position'),
			'counter' : 0
		};
		// do some setup on the element, all elements need to be fixed, and fixed position elements are
		// scoped to the document (out of the flow), so that's annoying in most cases, but convenient here
		this.css('position', (settings.position == 'absolute' || settings.position == 'fixed' ? 'fixed' : 'relative'));
		// now setup the event listener
		$(document).on('scroll', function(e) {
			settings.e = e;
			settings = methods.doParallaxScroll.universal.apply(self, [settings]);
		});
		return this;
	};

	$(window).on('load', function() {
		var $pScroll = $('.parallax-scroll');
		if($pScroll.length) $pScroll.each(function() { $(this).parallaxScroll(); });
	});

})( jQuery );

// flexiframe plugin
(function($) {

	var methods = {
		adjustHeight : function(ratio, width) {
			if(width == currentWidth) return;
			currentWidth = width;
			this.height(width/ratio);
		}
	},
	currentWidth;

	// allow iFrames to have a 'max-width'
	$.fn.flexiFrame = function() {
		// first set a max-width of 100% if it doesn't already have that
		this.css('max-width', '');
		var self = this,
				width = this.width(),
				ratio = width / this.height();
				currentWidth = width;

		setTimeout(function() {
			self.css('max-width', '100%');
			window.setInterval(function() {
				methods.adjustHeight.apply(self, [ratio, self.width()]);
			}, 100);
		}, 10);
		// make chainable
		return this;
	};

})( jQuery );

/**
 * hoverEnabler
 * @mandelbro 05/16/2012
 *
 * A simple solution to adding css hover effects to elements
 * in a cross browser capatable way
 *
 * Just add the .hoverEnabler class to any element which lacks
 * cross-browser support for the :hover css psuedo class, then
 * instead of using the pseudo class, just use the .hover class
 *
 * Requires jQuery ... obviously
 */
(function($) {

	$.fn.enableHover = function() {
		if(Modernizr.touch) return;
		this.hover(
			function(event) { // mouse enter
				$(this).addClass('hover');
			},
			function(event) { // mouse leave
				$(this).removeClass('hover');
			}
		);
	};

	function hoverEnabler() {
	  // get all hoverable div elements
	  var $elements = $('.hoverEnabler');
	  // for each, add a hover listener
	  $elements.each(function() {
	    $(this).removeClass('hoverEnabler').enableHover();
	  });
	}

	$(hoverEnabler);

})( jQuery );


(function($) {

	/**
	 * jQuery.transitionend
	 * Retrievs the total amount of time, in miliseconds that
	 * an element will be transitioned
	 */
	$.fn.transitionend = function(index) {
		index = index || 0;
		// check the main transition duration property
		if(this.css('transition-duration')) {
			return Math.round(parseFloat(this.css('transition-duration').split(',')[index]) * 1000);
		}
		else {
			// check the vendor transition duration properties
			if(this.css('-webkit-transtion-duration')) return Math.round(parseFloat(this.css('-webkit-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-moz-transtion-duration')) return Math.round(parseFloat(this.css('-moz-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-ms-transtion-duration')) return Math.round(parseFloat(this.css('-ms-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-o-transtion-duration')) return Math.round(parseFloat(this.css('-ms-transtion-duration').split(',')[index]) * 1000);
		}
		// if we're here, then no transition duration was found, return 0
		return 0;
	};

	/**
	 * Adds a CSS3 property to an element
	 * @param p
	 * 	- CSS3 Property
	 * @param v
	 * 	- Value to set CSS3 Property
	 */
	var css3property = function(p,v) {
		var property = {};

		property['-webkit-'+ p] = v;
		property['-moz-'+ p] = v;
		property['-ms-'+ p] = v;
		property['-o-'+ p] = v;
		property[p] = v;

		return property;
	};

	/**
	 * jQuery.minimize
	 * Provides a nice CSS3/jQuery fallback animated minimize effect
	 */
	$.fn.minimize = function(duration, opts) {
		opts = opts || {};
		// this allows the opts object to be submitted as a function instead of an object
		opts = typeof opts == 'function' ? { 'finished' : opts } : opts;
		// normalize inputs
		opts = $.extend({
			'duration' : Modernizr.touch ? 0 : (duration || 500),
			'easing' : 'cubic-bezier(0.475, 0.405, 0.485, 0.990)',
			'finished' : function() {}
		}, opts);

		var self = this,
				defer = $.Deferred(),
				d = opts.duration,
				e = opts.easing,
				f = opts.finished;

		this.data('loadHeight', (this.data('loadHeight') || this.outerHeight()));
		// setup base styles
		this.css({
			'overflow' : 'hidden',
			'height' : this.height() + 'px',
			'opacity' : 1,
			'filter' : 'alpha(opacity=100)'
		});
		defer.then(function() {
			self.css($.extend(css3property('transition', 'opacity .3s ease'), {
				'opacity' : 0,
				'filter' : 'alpha(opacity=0)'
			}));
		});

		window.setTimeout(function() {
			defer.resolve();
		}, 10);

		$.when(defer).done(function() {
			window.setTimeout(function() {
				self.animate({
					'height' : '0px'
				}, opts.duration, function() {
					f();
					self.hide();
				});
				// run the finished function
			}, self.transitionend());
		});
	};


	/**
	 * jQuery.maximize
	 * Provides a nice CSS3/jQuery fallback animated maximize effect
	 */
	$.fn.maximize = function(duration, opts) {
		var self = this,
				loadHeight = this.data('loadHeight'),
				doMaximize;
		opts = opts || {};
		// this allows the opts object to be submitted as a function instead of an object
		opts = typeof opts == 'function' ? { 'finished' : opts } : opts;
		// normalize inputs
		opts = $.extend({
			'duration' : Modernizr.touch ? 0 : (duration || 500),
			'easing' : 'cubic-bezier(0.475, 0.405, 0.485, 0.990)',
			'finished' : function() {}
		}, opts);

		doMaximize = function(height) {
			if(self.is(':visible') && self.height() > 0) return;
			var defer = $.Deferred(),
					d = opts.duration,
					e = opts.easing,
					f = opts.finished;
			// setup base styles
			self.css({
				'overflow' : 'hidden',
				'height' : '0px',
				'display' : 'block',
				'opacity' : 0,
				'filter' : 'alpha(opacity=0)'
			});
			// set the opacity to 0
			defer.then(function() {
				self.animate({
					'height' : height +'px'
				}, opts.duration, function() { f(); });
			});

			window.setTimeout(function() {
				defer.resolve();
			}, 10);

			$.when(defer).done(function() {
				window.setTimeout(function() {
					self.css($.extend(css3property('transition', 'opacity .3s ease, height '+ d +' '+ e), {
						'opacity' : '1',
						'filter' : 'alpha(opacity=100)'
					}));
					window.setTimeout(function() {
						// run the finished function
						f();
					}, self.transitionend());
				}, opts.duration);
			});
		};

		if(!loadHeight) {
			$.when(this.collapsedHeight()).done(function(height) {
				doMaximize(height);
			});
		}
		else {
			doMaximize(loadHeight);
		}
	};

	/**
	 * jQuery.collapsedHeight
	 * 	Retrieve the collapsed height of an element
	 */
	$.fn.collapsedHeight = function() {
		var self = this,
				defer = $.Deferred(),
				clone = this.clone(),
				height;
		clone.css({
			'position' : 'absolute',
			'left' : '-1000%',
			'top' : '-1000%',
			'display' : 'block',
			'height' : 'auto'
		});
		$('body').append(clone);

		window.setTimeout(function() {
			clone.remove();
		}, 20);

		window.setTimeout(function() {
			defer.resolve(self.outerHeight());
		}, 10);

		return defer;
	};

})( jQuery );

(function($){

	$(function() {

		var mqls = [window.matchMedia("(min-width: 1900px)"), window.matchMedia("(max-width: 780px)"), window.matchMedia("(max-width: 480px)")],
				handleOrientationChange = function(mql) {
					switch(mql.media) {
						case '(min-width: 1900px)' :
							$(document).trigger('hd.mediaQuery', { 'mql' : mql });
							break;
						case '(max-width: 780px)' :
							$(document).trigger('tabletPortrait.mediaQuery', { 'mql' : mql });
							break;
						case '(max-width: 480px)' :
							$(document).trigger('mobile.mediaQuery', { 'mql' : mql });
							break;
					}
					$(document).trigger('changed.mediaQuery', { 'mql' : mql });
				},
				mql, i;

		for(i in mqls) {
			mql = mqls[i];
			if(!mql.addListener) return;
			mql.addListener(handleOrientationChange);
			handleOrientationChange(mql);
		}

	});

})(jQuery);

/**
 * Array.chunk
 * replicates the array_chunk php function by splitting the the specified
 * array into an array of arrays of the specified size
 *
 * @param array
 *		the array to be chunked
 * @param size
 *		the size of the chunks
 * @return an array of arrays, each of at most the specified size
 */
Array.chunk = function(array, size) {
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%size ? [] : [array.slice(i,i+size)];
        })
    );
};

Object.size = function(obj) {
    var size = 0;
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * getQueryValue
 * extracts an index from a given query string
 *
 * you specify an index by adding a query string after the # of your
 * href like this: /example-page#index=1.  Your script will be responsible
 * for extracting the query string from the href or uri.
 *
 * @param queryString
 *		the query string from which you want to extract the index
 */
var getQueryValue = function(key, queryString) {

	var value = queryString.split(key + '=')[1];

	if(!value) return false;

	return value.split('&')[0];

};

(function($){

	var methods = {
		'getAdjustedDuration' : function(options) {
			// get the difference between where we are and where we need to go
			var targetPosition = options.target.offset().top, // target element position
					documentscrollTop = $(document).scrollTop(), // target element scroll top
					offsetTarget = targetPosition - documentscrollTop; // difference between where we are and where we need to go
			// return how many ms to go the specified distance at the specified speed
			return Math.abs(offsetTarget * options.speed);
		}
	};

	$.fn.clickScroll = function(options) {
		var $link = this,
				id = $link.attr('rel') || $link.attr('href'),
				duration;
				if(!id) return;
				id = id.indexOf('/') === 0 ? id.replace('/', '') : id;
				id = id.replace(/([ ;&,.+*~\':"!^$[\]()=>|\/])/g,'\\$1');

		if(id.indexOf('#') !== 0 || !$(id).length) return; // if the first char isn't a hash, it's not an id selector
		 // make sure we have an options object
		if(typeof options == 'string') options = { 'duration' : options };
		// setup defaults, options parameter overrides these
		options = $.extend({
			'duration' : 400,
			'speed' : 20,
			'easing' : 'jswing',
			'target' : $(id),
			'offset' : 0,
			'finished' : function() {}
		}, options);
		// correct speed for ms
		options.speed = 1 - (options.speed / 100);
		// the listener
		$('body').off('click.clickScroll', 'a[href="' + $link.attr('href') + '"]').on('click.clickScroll', 'a[href="' + $link.attr('href') + '"]', function(e) {
			e.preventDefault();
			var href = $link.attr('href').replace('#', ''),
					duration = methods.getAdjustedDuration.apply($link, [options]);
			href = href.indexOf('/') === 0 ? href.replace('/', '') : href;
			location.hash = '#/' + href;
			// scroll to the target
			$('body,html').animate({
				'scrollTop' : (options.target.offset().top - options.offset)
			}, duration, options.easing, options.finished);
		});

		// return the jQuery object
		return this;
	};

})(jQuery);