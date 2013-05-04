<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the teammate content type
 */
function ursacontent_teammate_node_type_update($info) {

	// add the body field
	node_add_body_field($info, 'Bio');

	// create the additional teammate fields
	$fields = array(
		'job_title' => array(
			'label'	=> 'Job Title',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 10,
			),
		),
		'image' => array(
			'label'	=> 'Team Member Photo',
			'type'	=> 'image',
			'widget'	=> array(
				'weight' => 12,
			),
		),
		'social_links' => array(
			'label'	=> 'Social Links (LinkedIn, Twitter, etc.)',
			'type'	=> 'text_long',
			'cardinality' => FIELD_CARDINALITY_UNLIMITED,
			'widget'	=> array(
				'type' => 'polaris_widget_multifield',
				'weight' => 15,
			),
		),
		'phone' => array(
			'label'	=> 'Phone Number',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 20,
			),
		),
		'email_address' => array(
			'label'	=> 'Email Address',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 25,
			),
		),
		'office_location' => array(
			'label'	=> 'Office Location',
			'type'	=> 'list_text',
			'widget'	=> array(
				'type' => 'options_buttons',
				'weight' => 30,
			),
			'field_settings' => array(
				'allowed_values_function' => 'ursacontent_teammate_get_office_locations',
			),
			'required' => TRUE,
			'default_value' => 'bellevue',
		),
	);

	foreach($fields as $name => $field) {
		// add custom fields to the node type
		_node_add_field($info, $name, $field);
	}

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an teammate node
 */
function ursacontent_teammate_node_insert($node) {

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an teammate node
 */
function ursacontent_teammate_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an teammate node.
function ursacontent_teammate_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an teammate node
 */
function ursacontent_teammate_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('body', 'job_title', 'social_links', 'phone', 'email_address', 'office_location');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
	// get the image content
	if(!empty($node->image)) {
		$node->profile_image_large = theme('image_style', array('style_name' => 'profile_large', 'path' => $node->image['und'][0]['uri'], 'attributes' => array('class' => 'teammate-profile-image large')));
		$node->profile_image_small = theme('image_style', array('style_name' => 'profile_small', 'path' => $node->image['und'][0]['uri'], 'attributes' => array('class' => 'teammate-profile-image small')));
	}
}

function ursacontent_teammate_preprocess_node(&$variables) {
	$variables['social_links'] = !is_array($variables['social_links']) ? array($variables['social_links']) : $variables['social_links'];

	foreach($variables['social_links'] as $link) {
		$link = str_replace('http://', '', $link);
		if(strpos($link, 'linkedin') !== false) {
			$social_links[] = array(
				'url' 	=> 'http://'. $link,
				'icon' 	=> 'linkedin',
			);
		}
		else if(strpos($link, 'twitter') !== false) {
			$social_links[] = array(
				'url' 	=> 'http://'. $link,
				'icon' 	=> 'twitter',
			);
		}
		else if(strpos($link, 'facebook') !== false) {
			$social_links[] = array(
				'url' 	=> 'http://'. $link,
				'icon' 	=> 'facebook',
			);
		}
		else {
			$social_links[] = array(
				'url' 	=> 'http://'. $link,
				'icon' 	=> 'link',
			);
		}
	}
	$variables['social_links'] = $social_links;
}

/**
 *  ursacontent_teammate_form_alter()
 *    Main form for creating and modifying custom teammates
 *  @param $node
 *    Optional, a fully-loaded $node node only required if form is being
 *    used to modify an existing teammate.
 */
function ursacontent_teammate_form($node, $form_state) {
  global $user;
  // get social links
  //
  // $form = node_content_form($node, $form_state);

	// add validation function

	// add submit function

}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_teammate_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_teammate_form_submit(&$form, &$form_state) {

}

/**
 * Allowed Values function for location options
 */
function ursacontent_teammate_get_office_locations() {

	return array(
		'bellevue' => 'Bellevue',
		'dublin'	 => 'Dublin',
	);

}