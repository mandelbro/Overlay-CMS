/**
 * @file scroll.js
 * The art of scrolling
 */
(function($) { // make this friendly to other libraries
	/**
	 * scrollview
	 * listens to the body scroll event to determine when
	 * a specified element is in view.
	 *
	 * Add the scrollview class to an element, and two classes
	 * will be added to it when the element is at least 50% high
	 * on the screen and a scroll event occurs
	 * The two classes are as follows:
	 *  - activeview: indicates the element is currently in view
	 *  - scrollviewed: indicates the element is out of view, but
	 *		has previously been viewed
	 * Once the scroll event is off the screen, the activeview
	 * class is removed, and the scrollviewed class remains
	 */
	function scrollview() {

		// get all scrollview elements
		var element = $('.scrollview');
		// initiate the scroll view object
		var listener = new ScrollviewListener(element);
	}

	$(scrollview);

	function ScrollviewListener(elements) {
		var self = this;
		this.elements = elements;
		this.handler = function(event) {
			// get current scroll position
			var top = $(this).scrollTop() + (window.innerHeight / 2);
			// compare elements position top with document scroll top
			self.elements.each(function(){
				element = $(this);
				// if the position of viewing area is greater than the position of the element, show it
				if(top > element.offset().top) {
					if(!element.hasClass('scrollviewed')) {
						element.addClass('scrollviewed');
					}
					if(!element.hasClass('activeview')) {
						element.addClass('activeview');
					}
				}
				else { // otherwise remove activeview
					if(element.hasClass('activeview')) {
						element.removeClass('activeview');
					}
				}
			});
		};

		// setup the body listener
		$(document).on('scroll', this.handler);

	};

})( jQuery );