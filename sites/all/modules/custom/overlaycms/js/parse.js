;(function($){

  Drupal.overlayCMS = Drupal.OverlayCMS || new OverlayCMS();

  Drupal.behaviors.overlayCMSparseData = {
    attach : function() {
    	console.log('test');
    	Drupal.overlayCMS.parse();
    }
  };

  OverlayCMS.prototype.parse = function() {
		$('*[data-nid]').each(function() {
			var $element = $(this);
			// insert the editor element
			$element.append(Drupal.theme('overlaycmsEditTools', {
				'nid' : $element.data('nid'),
				'fields' : $element.data('fields'),
				'type' : 'edit'
			})).addClass('overlay-edit-field');
			// profit
		});
		// run the modal parser
		Drupal.overlayCMS.addModalHandlers();
	};

})(jQuery);