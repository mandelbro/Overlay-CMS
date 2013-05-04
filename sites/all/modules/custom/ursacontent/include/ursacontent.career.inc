<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the career content type
 */
function ursacontent_career_node_type_update($info) {
	
	// add the body field
	node_add_body_field($info, 'Job Description');
	
	// create the additional career fields
	$fields = array(
		'department' => array(
			'label'	=> 'Department Title',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 10,
			),
		),
		'required_skills' => array(
			'label'	=> 'Department Title',
			'type'	=> 'text_long',
			'widget'	=> array(
				'weight' => 15,
			),
		),
		'apply_link' => array(
			'label'	=> 'Application Link or Email Address',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 20,
			),
		),
		/* uncomment to restore the department options list
		'department' => array(
			'label'	=> 'Department',
			'type'	=> 'list_text',
			'widget'	=> array(
				'type' => 'options_select',
				'weight' => 20,
			),
			'field_settings' => array(
				'allowed_values' => array('Chief Information Officer', 'Chief Technology Officer', 'Head of Business Development', 'Department of Redundancy Department of Reduncancy'),
			),
		),
		*/
	);
	
	foreach($fields as $name => $field) {
		// add custom fields to the node type
		_node_add_field($info, $name, $field);
	}
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an career node
 */
function ursacontent_career_node_insert($node) {
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an career node
 */
function ursacontent_career_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an career node.
function ursacontent_career_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an career node
 */
function ursacontent_career_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('body', 'department', 'required_skills', 'apply_link');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
	// default email to recruit email
	if(empty($node->apply_link)) $node->apply_link = theme_get_setting('recruit_email');
	// determine the link type to show (email or normal link)
	if(valid_email_address($node->apply_link)) {
		$node->apply_link = 'mailto:'. $node->apply_link .'?subject=Job Application for '. $node->title;
	}
}

function ursacontent_career_preprocess_node(&$variables) {
}

/**
 *  ursacontent_career_form_alter()
 *    Main form for creating and modifying custom careers
 *  @param $node
 *    Optional, a fully-loaded $node node only required if form is being
 *    used to modify an existing career.
 */
function ursacontent_career_form($node, $form_state) {
  global $user;
  
  // $form = node_content_form($node, $form_state);
	
	// add validation function
	
	// add submit function
	
}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_career_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_career_form_submit(&$form, &$form_state) {

}