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
	  	$('<div class="ctools-modal-content ctools-sample-modal-content">')
			.append(
		  	$('<div class="popups-close"><a class="close" href="#">' + Drupal.CTools.Modal.currentSettings.closeText + '</a></div>')
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
	Drupal.theme.prototype.overlaycmsEditTools = function(nid) {
	  var $output = $('<div class="overlaycms-edit"></div>');
	  
	  $output
	  .append(
	  	$('<a>').attr({ 'class' : 'overlaycms-open-modal ctools-use-modal ctools-modal-overlaycms-style', 'href' : '/overlaycms/nojs/node/edit/' + nid })
	  	.append(
	  		$('<span>').attr({ 'class' : 'overlaycms-open-modal-icon' })
	  	)
	  );
	  
	  return $('<div></div>').append($output).html();
	
	};

})(jQuery);

Drupal.theme.prototype.CToolsSampleModal = function () {
  var html = '';

  html += '<div id="ctools-modal" class="popups-box">';
  html += '  <div class="ctools-modal-content ctools-sample-modal-content">';
  html += '    <table cellpadding="0" cellspacing="0" id="ctools-face-table">';
  html += '      <tr>';
  html += '        <td class="popups-tl popups-border"></td>';
  html += '        <td class="popups-t popups-border"></td>';
  html += '        <td class="popups-tr popups-border"></td>';
  html += '      </tr>';
  html += '      <tr>';
  html += '        <td class="popups-cl popups-border"></td>';
  html += '        <td class="popups-c" valign="top">';
  html += '          <div class="popups-container">';
  html += '            <div class="modal-header popups-title">';
  html += '              <span id="modal-title" class="modal-title"></span>';
  html += '              <span class="popups-close"><a class="close" href="#">' + Drupal.CTools.Modal.currentSettings.closeText + '</a></span>';
  html += '              <div class="clear-block"></div>';
  html += '            </div>';
  html += '            <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
  html += '            <div class="popups-buttons"></div>'; //Maybe someday add the option for some specific buttons.
  html += '            <div class="popups-footer"></div>'; //Maybe someday add some footer.
  html += '          </div>';
  html += '        </td>';
  html += '        <td class="popups-cr popups-border"></td>';
  html += '      </tr>';
  html += '      <tr>';
  html += '        <td class="popups-bl popups-border"></td>';
  html += '        <td class="popups-b popups-border"></td>';
  html += '        <td class="popups-br popups-border"></td>';
  html += '      </tr>';
  html += '    </table>';
  html += '  </div>';
  html += '</div>';

  return html;

}