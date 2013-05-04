<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the casestudy content type
 */
function ursacontent_casestudy_node_type_update($info) {
	
	// create the additional casestudy fields
	$fields = array(
		'teaser' => array(
			'label'	=> 'Teaser',
			'type'	=> 'text_long',
			'widget'	=> array(
				'weight' => 10,
			),
		),
		'image' => array(
			'label'	=> 'Selector Image',
			'type'	=> 'image',
			'widget'	=> array(
				'weight' => 12,
				'description' => t('Image that will be shown on the case study selection screen.'),
			),
		),
		'organization' => array(
			'label'	=> 'Organization',
			'type'	=> 'taxonomy_term_reference',
			'widget'	=> array(
				'type' => 'options_select',
				'weight' => 15,
			),
			'field_settings' => array(
        'allowed_values' => array(
          array(
            'vocabulary' => 'polaris_organizations',
            'parent' => '0',
          ),
        ),
			),
			'required' => TRUE,
			'default_value' => 0,
		),
	);
	
	foreach($fields as $name => $field) {
		// add custom fields to the node type
		_node_add_field($info, $name, $field);
	}
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an casestudy node
 */
function ursacontent_casestudy_node_insert($node) {
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an casestudy node
 */
function ursacontent_casestudy_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an casestudy node.
function ursacontent_casestudy_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an casestudy node
 */
function ursacontent_casestudy_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('teaser', 'organization', 'image');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
}

function ursacontent_casestudy_preprocess_node(&$variables) {
}

/**
 *  ursacontent_casestudy_form_alter()
 *    Main form for creating and modifying custom casestudys
 *  @param $node
 *    Optional, a fully-loaded $node node only required if form is being
 *    used to modify an existing casestudy.
 */
function ursacontent_casestudy_form($node, $form_state) {
  global $user;
  
  // $form = node_content_form($node, $form_state);
	
	// add validation function
	
	// add submit function
	
}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_casestudy_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_casestudy_form_submit(&$form, &$form_state) {

}