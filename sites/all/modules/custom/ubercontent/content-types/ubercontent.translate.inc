<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the translate content type
 */
function ubercontent_translate_node_type_update($info) {

	// create the additional translate fields
	$fields = array(
		'string' => array(
			'label'	=> 'Translation Strings',
			'type'	=> 'translation_field',
			'cardinality' => FIELD_CARDINALITY_UNLIMITED,
			'widget'	=> array(
				'type' => 'translation_field',
				'weight' => 5,
			),
		),
	);

	foreach($fields as $name => $field) {
		// add custom fields to the node type
		ubercontent_node_add_field($info, $name, $field);
	}

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an translate node
 */
function ubercontent_translate_node_insert($node) {

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an translate node
 */
function ubercontent_translate_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an translate node.
function ubercontent_translate_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an translate node
 */
function ubercontent_translate_node_view($node, $view_mode, $langcode) {

	// if full mode is requested, redirect to the homepage
	if($view_mode == 'full') drupal_goto('');
}

/**
 * template_preprocess_node callback
 */
function ubercontent_translate_preprocess_node(&$variables) {

}

/**
 *  ubercontent_form_translate_node_form_alter()
 *    Main form for creating and modifying custom translate
 */
function ubercontent_form_translate_node_form_alter(&$form, &$form_state, $form_id) {
  global $user;

  // $form = node_content_form($node, $form_state);

	// add validation function
	// $form['#validate'][] = 'ubercontent_translate_form_validate';

	// add submit function
	// $form['#submit'][] = 'ubercontent_translate_form_submit';

}

/**
 *  Validation handler for ubercontent_form()
 */
function ubercontent_translate_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ubercontent_form()
 */
function ubercontent_translate_form_submit(&$form, &$form_state) {

}