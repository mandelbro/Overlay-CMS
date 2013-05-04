<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the testimonial content type
 */
function ursacontent_testimonial_node_type_update($info) {
	
	// add the body field
	node_add_body_field($info, 'Job Description');
	
	// create the additional testimonial fields
	$fields = array(
		'attribution' => array(
			'label'	=> 'Attribution',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 10,
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
 *    Handle storage custom fields when saving an testimonial node
 */
function ursacontent_testimonial_node_insert($node) {
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an testimonial node
 */
function ursacontent_testimonial_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an testimonial node.
function ursacontent_testimonial_node_load($node) {
  //designed to support node_load_multiple() and node_load()
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an testimonial node
 */
function ursacontent_testimonial_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('body', 'attribution', 'organization');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
}

function ursacontent_testimonial_preprocess_node(&$variables) {
	$node = $variables['elements']['#node'];
	// load the organization
	$term = taxonomy_term_load($variables['organization']['tid']);
	$variables['organization_class'] = _make_attr_safe($term->name);
	$variables['font_size'] = strlen($node->body) > 200 ? 'small-text' : 'normal-text';
}

/**
 *  ursacontent_testimonial_form_alter()
 *    Main form for creating and modifying custom testimonials
 *  @param $node
 *    Optional, a fully-loaded $node node only required if form is being
 *    used to modify an existing testimonial.
 */
function ursacontent_testimonial_form($node, $form_state) {
  global $user;
  
  // $form = node_content_form($node, $form_state);
	
	// add validation function
	
	// add submit function
	
}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_testimonial_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_testimonial_form_submit(&$form, &$form_state) {

}