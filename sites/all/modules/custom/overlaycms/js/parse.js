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
			$element.append(Drupal.theme('overlaycmsEditTools', $element.data('nid')));
			// run the chaos tools modal parser
			Drupal.behaviors.ZZCToolsModal.attach();
			// profit
		});
	};
	
})(jQuery);