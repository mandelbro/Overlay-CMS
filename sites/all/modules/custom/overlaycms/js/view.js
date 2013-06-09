;(function($) {
	
	/**
	* Provide the HTML to create the modal dialog.
	*/
	Drupal.theme.prototype.overlaycmsNodeForm = function(data) {
		
		console.log('overlaycmsNodeForm');
		console.log(data);
	
	  var $output = $('<div>').attr( { 'class' : 'overlaycms-modal' });
	  // add the content to the output wrapper
	  $output
	  .append(
	  	$('<div class="ctools-modal-content ctools-overlaycms-modal-content">')
			.append(
		  	$('<div class="popups-close fuck-balls"><a class="close" href="#">' + Drupal.CTools.Modal.currentSettings.closeText + '</a></div>')
	  	)
	  	.append(
	  		$('<div>').attr({ 'class' : 'modal-scroll' })
	  		.append(
	  			$('<div>').attr({ "id" : "modal-content", "class" : "modal-content popups-body" })
	  		)
	  	)
	  );
	  
	  return $('<div></div>').append($output).html();
	
	};
		// Theme for overlay edit options
	Drupal.theme.prototype.overlaycmsEditTools = function(settings) {
		
		settings = $.extend({
			'nid' : 1,
			'fields' : '',
			'type' : 'edit'
		}, settings);
		
	  var $output = $('<div class="overlaycms-edit"></div>');
	  
	  $output
	  .append(
	  	$('<a>').attr({ 'class' : 'overlaycms-open-modal ctools-use-modal ctools-modal-overlaycms-style ' + settings.type, 'href' : '/overlaycms/nojs/node/edit/' + settings.nid + '?fields=' + settings.fields })
	  	.append(
	  		$('<span>').attr({ 'class' : 'overlaycms-open-modal-icon' })
	  	)
	  );
	  
	  return $('<div></div>').append($output).html();
	
	};

})(jQuery);