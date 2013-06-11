;(function($) {

	/**
	* Provide the HTML to create the modal dialog.
	*/
	Drupal.theme.prototype.overlaycmsModal = function(data) {

	  var $output = $('<div>').attr( { 'class' : 'overlay fixed-height overlaycms-modal' });
	  // add the content to the output wrapper
	  $output
	  .append(
	  	$('<section class="fixie overlay-content overlaycms-modal-content">')
	  	.append(
	  		// here is where we'll add save and close controls
	  		$('<div>').attr({ 'class' : 'modal-scroll' })
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
	  	$('<a>').attr({ 'class' : 'overlaycms-open-modal ' + settings.type, 'href' : '/overlaycms/nojs/node/edit/' + settings.nid + '?fields=' + settings.fields })
	  	.append(
	  		$('<span>').attr({ 'class' : 'overlaycms-open-modal-icon' })
	  	)
	  );

	  return $('<div></div>').append($output).html();

	};

})(jQuery);