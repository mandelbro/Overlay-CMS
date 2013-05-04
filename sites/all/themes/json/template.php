<?php

/**
 * Override or insert variables into the maintenance page template.
 */
function json_preprocess_maintenance_page(&$vars) {
  // While markup for normal pages is split into page.tpl.php and html.tpl.php,
  // the markup for the maintenance page is all in the single
  // maintenance-page.tpl.php template. So, to have what's done in
  // json_preprocess_html() also happen on the maintenance page, it has to be
  // called here.
  json_preprocess_html($vars);
}

/**
 * Override or insert variables into the html template.
 */
function json_preprocess_html(&$vars) {

}

/**
 * Override or insert variables into the page template.
 */
function json_preprocess_page(&$vars) {
  global $user;
}

/**
 * Override or insert variables into the node template. Also creates optional
 * templates for each nodetype
 */
function json_preprocess_node(&$variables) {
	global $language;
	$node = $variables['node'];
}