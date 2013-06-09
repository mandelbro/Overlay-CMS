;(function($){

  Drupal.overlayCMS = Drupal.OverlayCMS || new OverlayCMS();
  
  Drupal.behaviors.overlayCMSparseData = {
    attach : function() {
    	Drupal.overlayCMS.parse();
    }
  };
  
  function OverlayCMS() {
  }
  
  OverlayCMS.prototype.parse = function() {
		$('*[data-nid]').each(function() {
			var $element = $(this);
			// insert the editor element
			$element.append(Drupal.theme('overlaycmsEditTools', {
				'nid' : $element.data('nid'),
				'fields' : $element.data('fields'),
				'type' : 'edit'
			}));
			// run the chaos tools modal parser
			Drupal.behaviors.ZZCToolsModal.attach();
			// profit
		});
	};
	
})(jQuery);