(function($) {
	
	/**
	* Provide the HTML to create the modal dialog.
	*/
	Drupal.theme.prototype.overlaycmsNodeForm = function() {
	
	  var $output = $('<div>').attr( { 'class' : 'overlaycms-modal' });
	  // add the content to the output wrapper
	  $output
	  .append(
	  	$('<div class="ctools-modal-content ctools-sample-modal-content">')
			.append(
		  	$('<div class="popups-close"><a class="close" href="#">' + Drupal.CTools.Modal.currentSettings.closeText + '</a></div>')
	  	)
	  );
	  
	  return $('<div></div>').append($output).html();
	
	};
		// Theme for overlay edit options
	Drupal.theme.prototype.overlaycmsEditTools = function(nid) {
	  var $output = $('<div class="overlaycms-edit"></div>');
	  
	  $output
	  .append(
	  	$('<a>').attr({ 'class' : 'overlaycms-open-modal ctools-use-modal', 'href' : '/overlaycms/nojs/edit/node/' + nid })
	  	.append(
	  		$('<span>').attr({ 'class' : 'overlaycms-open-modal-icon' })
	  	)
	  );
	  
	  return $('<div></div>').append($output).html();
	
	};

})(jQuery);