
(function($) {

	function ActiveLink(link) {
		var self = this;
		this.link = $(link);
		this.activeElement = $(this.link.attr('rel'));
		this.callback = this.link.attr('class').indexOf('active-callback--') ? window[this.link.attr('class').split('active-callback--')[1].split(' ')[0]] : null;
		this.callback = this.callback || null;
		// if the link href and the url are the same, simulate a click
		if(this.link.attr('href') == _get_relative_url(window.location.href)) {
			// scroll to the element
			$('body').animate({ 'scrollTop' : (this.activeElement.offset().top - 60) }, 300, function() {
					self.link.click();
			});
		}
		
		
		this.link.on('click', function(event) {
			if(!_get_hashbang(self.link.attr('href'))) event.preventDefault();
			// make sure the base path of the href matches the base of the url
			$('.activelink.active').removeClass('activelink active');
			self.activeElement.addClass('activelink active');
			self.callback(event);
		});
		
	}

	var activeLink_init = function() {
		var links = new Array(),
				overlay = $('<div id="activelink-overlay-wrapper"><div id="activelink-overlay-screen" class="activelink-overlay-close"></div></div>'),
				elements = $('a.activelink');
		
		// process each field
		$.each(elements, function(index, link) {
			// create a new instance of multifield for each field
			links[index] = new ActiveLink(link);
		});
		// any clicks on the body outside the active element will close it automatically
		/*
		$('.body:first').on('click', function(event) {
			var target = $(event.target);
			if(!target.parents().hasClass('activelink active')) {
				// clear out the hashbang
				if(_get_hashbang(window.location.href)) window.location.href = _remove_hashbang(window.location.href);
				$('.activelink.active').addClass('polaris-animate').removeClass('activelink active');
				window.setTimeout(function() {
					$('.polaris-animate').removeClass('polaris-animate');
				}, 800);
			}
		});
		*/
		// provide support for activelinkOverlay
		$('.body:first').append(overlay).find('.activelink-overlay-content').hide();
	};
	
	$(activeLink_init);
	
})( jQuery );

/**
 * Custom active link callbacks, in case, whatever
 */
var solutionMenu = function(event) {
	var self = this;
};

var activelinkOverlay = function(event) {
	var $ = jQuery, // make sure we have $
			self = this,
			content,
			screen = $('#activelink-overlay-wrapper'),
			element = $($(event.currentTarget).attr('rel'));
	
	// check if this element already has an overlay content element in data
	if(element.data('overlayContent')) {
		content = element.data('overlayContent');
		$(element.attr('rel')).addClass('overlay-active');
	}
	else {
		// otherwise select it and remove it
		content = element.addClass('overlay-active').find('.activelink-overlay-content').remove();
		// place it into the wrapper element with a close link
		screen.append(
			content.append(
			$('<span class="activelink-overlay-close activelink-overlay-close-link"></span>')
			)
		);
		// and attach it to the link as data
		element.data('overlayContent', content);
	}
	
	if(!Modernizr.csstransitions) {
		// display the overlay content
		content.show();
		// display the overlay screen
		screen.show().animate({opacity : 1}, 400);
	}
	else {
		// set display to block (opacity = 0)
		screen.show();
		// set display to block (opacity = 0)
		content.show();
		window.setTimeout(function(){
			// transition in the overlay screen
			screen.css({ opacity : 1 });
		}, 50);
		screen.off('transitionend oTransitionEnd MSTransitionEnd webkitTransitionEnd')
					.on('transitionend oTransitionEnd MSTransitionEnd webkitTransitionEnd', function(){
						if($(this).css('opacity') == 0) {
							screen.hide();
							content.hide();
						}
					});
	}
	
	// position the element, scroll height + body height / 2 - content height / 2
	var scrollTop = $(window).scrollTop() || $('body').scrollTop(); // fucking IE
	content.css({
		top : Math.round(scrollTop + ($('body').outerHeight() / 2) - (content.outerHeight() / 1.75)) + 'px'
	});
	
	// add event listener for close overlay
	$('.activelink-overlay-close').off('click').on('click', function() {
		if(_get_hashbang(window.location.href)) window.location.hash = '#!';
		if(!Modernizr.csstransitions) {
			// display the overlay screen
			screen.animate({opacity : 0}, 400, function() {
				$(this).hide();
				content.hide();
			});
		}
		else {
			// transition in the overlay screen
			screen.css({ opacity : 0 });
		}
		element.removeClass('overlay-active');
	});
	
	// ... profit?
	
};

var activelinkExpand = function(event) {
	var $ = jQuery, // make sure we have $
			self = this,
			element = $(event.currentTarget),
			wrapper = $(element.attr('rel')),
			content = wrapper.find('.activelink-expand-content');
	event.preventDefault();
	// close function
	var toggleContent = function(le) {
		if(!le.length) return;
		if(le.height() == 0) {
			le.css({ 'height' : 'auto'});
		}
		else {
			le.css({ 'height' : '0px'});
		}
	};
	
	// clean up any open sections
	if($('.activelink-expanded')[0] !== wrapper[0]) {
		toggleContent($('.activelink-expanded').find('.activelink-expand-content'));
		$('.activelink-expanded').removeClass('activelink-expanded').find('.activelink').removeClass('closed');
	}
	
	if(!element.hasClass('closed')) {
		window.location.hash = '#!'+ _get_hashbang(element.attr('href'));
		// add the closed class to the clicked link
		element.toggleClass('closed');
		// add the active class to the wrapper
		wrapper.addClass('activelink-expanded');
		// find the expand content
		toggleContent(content);
		$('body').animate({ 'scrollTop' : (element.offset().top - 60) }, 150);
	}
	else {
		window.location.hash = '#!';
		toggleContent($('.activelink-expanded').find('.activelink-expand-content'));
		$('.activelink-expanded').removeClass('activelink-expanded').find('.activelink').removeClass('closed');
	}

	// ... expand italics
};

var _get_relative_url = function(url) {
	url = url.split('//')[1]; // get rid of http://
	url = url.split('/'); // split along the /
	delete(url[0]); // get rid of the server name
	return url.join('/');
};

var _get_hashbang = function(url) {
	return url.split('#!')[1]; // isolate the hashbang
	// ... profit?
};

var _remove_hashbang = function(url) {
	return url.split('#!')[0]; // isolate the hashbang
	// ... profit?
};