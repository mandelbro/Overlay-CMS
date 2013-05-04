<?php

/**
 * apifeeds.template.inc
 * Preprocess functions for Cinder Templates
 */

/**
 * Template Preprocess function
 */
function template_preprocess_apifeeds_zendesk(&$variables) {

	$variables['items'] = apifeeds_load_items('zendesk', $variables['display'], $variables['limit'], $variables['recache']);
}

/**
 * Template Preprocess function
 */
function template_preprocess_apifeeds_wordpress_msb(&$variables) {

	$variables['items'] = apifeeds_load_items('wordpress_msb', $variables['limit'], $variables['recache']);
}

function apifeeds_preprocess_page(&$vars) {
  // if an ajax request has been made, get the json
  if(isset($_GET['apiajax']) && $_GET['apiajax'] == 'true') {
  	die(json_encode(render($vars['page']['content'])));
  }
}