
function OverlayCMS() {

	// declare public properties

}

(function($) {

	OverlayCMS.prototype.addHandlers = function() {

		// add click handlers to all prompt buttons


	};

	OverlayCMS.prototype.buildModal = function(settings) {

		// default settings values
		settings = $.extend({
			'afterShowModal' : function(),
			'insertModalContent' : function()
		}, settings);

		var showOverlay = function(overlay) {
			var scrollV, windowH, top_adjustment;
			scrollV = $(window).scrollTop();
			windowH = $('body').innerHeight();
			// if the element can have a variable height, adjust it for the window height
			if(!overlay.hasClass('fixed-height')) {
			}
			window.setTimeout(function(){
				// get the top position, 50% of screen height minus 50% of element height
				top_adjustment = (overlay.find('.fixed:first').outerHeight()/1.75);
				overlay.find('.fixed:first').css({'top' : '50%', 'margin-top' : -top_adjustment + 'px' });
				overlay.find('.close-overlay').css({'top' : '50%', 'margin-top' : (-top_adjustment - 12) + 'px' });
			}, 10);

			if(Modernizr.csstransitions) {
				overlay.show();
				window.setTimeout(function() {
					overlay.addClass('visible');
				}, 10);
			}
			else {
				overlay.fadeIn(400);
			}
		}

		var hideOverlay = function(overlay) {
			// animate closed
			if(Modernizr.csstransitions) {
				overlay.removeClass('visible');
				window.setTimeout(function() {
					overlay.hide();
				}, overlay.transitionend(0));
			}
			else {
				overlay.fadeOut(400);
			}
		}

		// detach all overlays from the DOM and append them to #page
		var overlays = $('.overlay').detach().appendTo('#page');
		// add close link to first fixed elements
		overlays.each(function() {
			$(this).append('<span class="close-overlay"></span>');
		});
		// give event listeners to all elements with the open-overlay class
		$('.open-overlay').on('click', function(event) {
			event.preventDefault();
			// use the href to determine the overlay to show
			showOverlay($($(this).attr('href') + ':first'));
		});
		// listen for the overlay or close-overlay to close the overlay
		$('.overlay, .close-overlay').on('click', function(event) {
			// check if the target is
			var target = $(event.target);
			if(target.hasClass('overlay') || target.hasClass('close-overlay')) {
				hideOverlay(target.is('.overlay') ? target : target.parents('.overlay'));
			}
		});
		var popIndex;
		// listen for pop state to manage overlays
		$(window).on('popstate', function() {
			if(popIndex !== this.history.length) {
				// move the index forward
				popIndex = this.history.length;
				return;
			}
			var hash = window.location.hash.replace('#/', '#');
			// clear all overlays
			$('.overlay').each(function() {
				hideOverlay($(this));
			});
		});


	}

})(jQuery);