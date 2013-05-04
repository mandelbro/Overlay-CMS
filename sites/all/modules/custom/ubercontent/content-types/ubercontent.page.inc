<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the page content type
 */
function ubercontent_page_node_type_update($info) {

	// add the body field
	node_add_body_field($info, 'Body');

	// create the additional page fields
	$fields = array(
		'header' => array(
			'label' => 'Header',
			'type' => 'text'
		),
		'subheader' => array(
			'label' => 'Sub Header',
			'type' => 'text'
    )
	);

	foreach($fields as $name => $field) {
		// add custom fields to the node type
		ubercontent_node_add_field($info, $name, $field);
	}

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ubercontent_page_node_insert($node) {

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ubercontent_page_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an page node.
function ubercontent_page_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ubercontent_page_node_view($node, $view_mode, $langcode) {
	global $language;
	if($view_mode == 'full') {
		if($language->language != $node->language) {
			$translations = translation_node_get_translations($node->tnid);
			if(!$translations) return;
			drupal_goto(drupal_get_path_alias('node/'. $translations[$language->language]->nid));
		}
	}
}

/**
 * template_preprocess_node callback
 */
function ubercontent_page_preprocess_node(&$variables) {
	$node = $variables['node'];

	$header = field_get_items('node', $node, 'header');
	$variables['header'] = render(field_view_value('node', $node, 'header', $header[0]));

	$subheader = field_get_items('node', $node, 'subheader');
	$variables['subheader'] = render(field_view_value('node', $node, 'subheader', $subheader[0]));

	$body = field_get_items('node', $node, 'body');
	$variables['body'] = render(field_view_value('node', $node, 'body', $body[0]));

}

/**
 *  ubercontent_form_page_node_form_alter()
 *    Main form for creating and modifying custom pages
 *  @param $page
 *    Optional, a fully-loaded $page node only required if form is being
 *    used to modify an existing page.
 */
function ubercontent_form_page_node_form_alter(&$form, &$form_state, $form_id) {
  global $user;

  // $form = node_content_form($node, $form_state);

	// add validation function
	// $form['#validate'][] = 'ubercontent_page_form_validate';

	// add submit function
	// $form['#submit'][] = 'ubercontent_page_form_submit';

}

/**
 *  Validation handler for ubercontent_form()
 */
function ubercontent_page_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ubercontent_form()
 */
function ubercontent_page_form_submit(&$form, &$form_state) {

}