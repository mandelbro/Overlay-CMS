(function($){

  Drupal.overlayCMS = Drupal.OverlayCMS || {};
  
  Drupal.behaviors.overlayCMSparseData = {
    attach : function() {
    	Drupal.overlayCMS.parse();
    }
  };
  
  Drupal.overlayCMS.parse = function() {
		$('*[data-nid]').each(function() {
			var $element = $(this);
			// insert the editor element
			$element.append(Drupal.theme('overlaycmsEditTools', $element.data('nid')));
			
			console.log(Drupal.behaviors.ZZCToolsModal);
			Drupal.behaviors.ZZCToolsModal.attach();
			// figure out if we need to run the chaos tools modal parser
			// profit
		});
	};
	
})(jQuery)