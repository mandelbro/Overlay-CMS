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
	function hoverEnabler() {
	  // get all hoverable div elements
	  var elements = $('.hoverEnabler');
	  // for each, add a hover listener
	  $.each(elements, function(index, element) {
	    element = $(element);
	    element.hover(
	      function(event) { // mouse enter
	        element.addClass('hover');
	      },
	      function(event) { // mouse leave
	        element.removeClass('hover');
	      }
	    );
	  });
	}
	
	$(hoverEnabler);

})( jQuery );