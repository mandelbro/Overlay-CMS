
(function($) {

	function ActiveLink(link, method) {
		var self = this;
		this.link = $(link);
		this[method]();
	}

	ActiveLink.prototype.click = function() {
		var self = this;

		this.activeElement = $('#'+ _getHashbang(this.link.attr('href')));
		this.callback = this.link.attr('class').indexOf('active-callback--') > 0 ? window[this.link.attr('class').split('active-callback--')[1].split(' ')[0]] : null;
		this.callback = this.callback || null;
		// if the link href and the url are the same, simulate a click
		if(_getHashbang(this.link.attr('href')) && _getHashbang(this.link.attr('href')) == _getHashbang(window.location.href)) {
			// simulate the link click
			window.setTimeout(function() {
				self.link.click();
				// scroll to the element
				$('body').animate({ 'scrollTop' : Math.round(self.activeElement.offset().top - 50) }, 800, function() {
				});
			}, 50);
		}

		this.link.on('click', function(event) {
			if(!_getHashbang(self.link.attr('href'))) event.preventDefault();
			// make sure the base path of the href matches the base of the url
			var target = $(this);
			if(target.hasClass('toggle')) {
				if(target.hasClass('clicked')) {
					// if the target is toggled on, get rid of the hasbang in the url as we turn it off
					event.preventDefault();
					window.location.href = _removeHashbang(window.location.href)+ '#!';
				}
				self.activeElement.toggleClass('activelink active');
				target.toggleClass('clicked');
			}
			else {
				$('.activelink.active').removeClass('activelink active');
				self.activeElement.addClass('activelink active');
			}
			if(self.callback) self.callback();
		});

	};

	ActiveLink.prototype.scrollTo = function() {
		this.link.on('click', function(event) {
			event.preventDefault();
			// get the element we're scrolling to
			var scrollTarget = $($(this).attr('href'));
			// animate the scroll of the window?/document?/body? element to the target scroll height
			$('body').animate({ 'scrollTop' : (scrollTarget.offset().top - 50) }, 1050);
		});
	}

	var activeLink_init = function() {
		var links = new Array(),
				overlay = $('<div id="activelink-overlay-wrapper"><div id="activelink-overlay-screen" class="activelink-overlay-close"></div></div>'),
				elements = $('a.activelink'),
				scrollTo = $('a.activelink-scrollto');

		scrollTo.each(function(index){
			// create a new instance of multifield for each field
			links[index] = new ActiveLink(this, 'scrollTo');
		});

		// process each field
		elements.each(function(index) {
			// create a new instance of multifield for each field
			links[index] = new ActiveLink(this, 'click');
		});
		// any clicks on the body outside the active element will close it automatically
		$('.body:first').on('click', function(event) {
			var target = $(event.target);
			if(!target.parents().hasClass('activelink active') && !target.hasClass('toggle')) {
				// clear out the hashbang
				if(_getHashbang(window.location.href)) window.location.href = _removeHashbang(window.location.href);
				$('.activelink.active').addClass('animating').removeClass('activelink active');
				window.setTimeout(function() {
					$('.animating').removeClass('animating');
				}, 800);
			}
		});
		// provide support for activelinkOverlay
		$('.body:first').append(overlay).find('.activelink-overlay-content').hide();
	};

	$(activeLink_init);

})( jQuery );

var verticalExpand = function(element) {
	element = element || this.activeElement;
	var self = this;
	var expandEl = element.find('.expand:first');
	var height = expandEl.find('.inner:first').outerHeight();

	if(!expandEl.height()) {
		element.addClass('animating');
		expandEl.css({ 'height' : height +'px' });
	}
	else {
		expandEl.css({ 'height' : height +'px' });
		window.setTimeout(function(){
			element.addClass('animating');
			expandEl.css({ 'height' : '0px' });
		}, 100);
	}

	expandEl.on('transitionend webkitTransitionEnd', function(event) {
		element.removeClass('animating');
		// if the element has a set height
		if(expandEl.height()) {
			expandEl.css({ 'height' : 'auto' });
		}
	});

};

var _getRelativeUrl = function(url) {
	url = url.split('//')[1]; // get rid of http://
	url = url.split('/'); // split along the /
	delete(url[0]); // get rid of the server name
	return url.join('/');
};

var _getHashbang = function(url) {
	return url.split('#!')[1]; // isolate the hashbang
	// ... profit?
};

var _removeHashbang = function(url) {
	return url.split('#!')[0]; // isolate the hashbang
	// ... profit?
};