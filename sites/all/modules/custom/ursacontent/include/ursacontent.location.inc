<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the location content type
 */
function ursacontent_location_node_type_update($info) {
	
	// create the additional location fields
	$fields = array(
		'address_street' => array(
			'label'	=> 'Street Address',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 10,
			),
		),
		'address_citystate' => array(
			'label'	=> 'City, State, Zip Code',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 15,
			),
		),
		'address_country' => array(
			'label'	=> 'Country',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 16,
			),
		),
		'phone' => array(
			'label'	=> 'Phone Number',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 20,
			),
		),
		'fax' => array(
			'label'	=> 'Fax Number',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 25,
			),
		),
	);
	
	foreach($fields as $name => $field) {
		// add custom fields to the node type
		_node_add_field($info, $name, $field);
	}
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an location node
 */
function ursacontent_location_node_insert($node) {
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an location node
 */
function ursacontent_location_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an location node.
function ursacontent_location_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an location node
 */
function ursacontent_location_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('address_street', 'address_citystate', 'phone', 'fax', 'address_country');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
}

function ursacontent_location_preprocess_node(&$variables) {
}

/**
 *  ursacontent_location_form_alter()
 *    Main form for creating and modifying custom locations
 *  @param $node
 *    Optional, a fully-loaded $node node only required if form is being
 *    used to modify an existing location.
 */
function ursacontent_location_form($node, $form_state) {
  global $user;
  
  // $form = node_content_form($node, $form_state);
	
	// add validation function
	
	// add submit function
	
}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_location_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_location_form_submit(&$form, &$form_state) {

}