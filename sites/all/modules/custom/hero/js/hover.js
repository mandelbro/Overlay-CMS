/**
 * @file hover.js
 * All things Hover!
 */

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
	$.fn.hoverEnabler = function(){
		var $this = this;
		this.hover(
			function(event) { // mouse enter
				$this.addClass('hover');
			},
			function(event) { // mouse leave
				$this.removeClass('hover');
			}
		);
	};

	$(function() {
	  $('.hoverEnabler').each(function(){
	  	$(this).removeClass('hoverenabler').hoverEnabler();
	  });
	});
})( jQuery );