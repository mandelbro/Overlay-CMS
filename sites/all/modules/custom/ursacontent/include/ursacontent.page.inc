<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the page content type
 */
function ursacontent_page_node_type_update($info) {

	// add the body field
	node_add_body_field($info);

	// create the additional page fields
	$fields = array(
		'image' => array(
			'label'	=> 'Header Image',
			'type'	=> 'image',
			'widget'	=> array(
				'weight' => 5,
			),
		),
		'header_text' => array(
			'label'	=> 'Header Text',
			'type'	=> 'text',
			'widget'	=> array(
				'type' => 'text',
				'weight' => 10,
			),
		),
		'content_header' => array(
			'label'	=> 'Content Header Text',
			'type'	=> 'text',
			'widget'	=> array(
				'type' => 'text',
				'weight' => 15,
			),
		),
		'layout' => array(
			'label'	=> 'Page Layout',
			'type'	=> 'list_text',
			'widget'	=> array(
				'type' => 'options_buttons',
				'weight' => 20,
			),
			'field_settings' => array(
				'allowed_values' => array('narrow' => 'Narrow', 'wide' => 'Wide'),
			),
			'required' => TRUE,
			'default_value' => 'narrow',
		),
		'node_attachment' => array(
			'label'	=> 'Attach Slideshow (Displays in Header)',
			'type'	=> 'list_text',
			'widget'	=> array(
				'type' => 'options_select',
				'weight' => 25,
			),
			'field_settings' => array(
				'allowed_values_function' => 'ursacontent_page_get_slideshows',
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
 *    Handle storage custom fields when saving an page node
 */
function ursacontent_page_node_insert($node) {

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ursacontent_page_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an page node.
function ursacontent_page_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ursacontent_page_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('body', 'header_text', 'content_header', 'layout', 'node_attachment');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
	// get the image content
	if(!empty($node->image)) {
		$node->header_image = theme('image_style', array('style_name' => 'original', 'path' => $node->image['und'][0]['uri'], 'attributes' => array('id' => 'page-node-header-image')));
	}
}

function ursacontent_page_preprocess_node(&$variables) {

	if($variables['layout']) {
		$variables['classes_array'][] = _make_attr_safe($variables['layout']);
	}

	// if a slideshow exists for this page, show it
	if($variables['node_attachment']) {
		$variables['slideshow'] = theme('ursacontent_page_slideshow', array('node' => node_load($variables['node_attachment']), 'langcode' => $variables['language']));
	}
}

/**
 *  ursacontent_page_form_alter()
 *    Main form for creating and modifying custom pages
 *  @param $page
 *    Optional, a fully-loaded $page node only required if form is being
 *    used to modify an existing page.
 */
function ursacontent_page_form($node, $form_state) {
  global $user;

  // $form = node_content_form($node, $form_state);

	// add validation function

	// add submit function

}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_page_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_page_form_submit(&$form, &$form_state) {

}

/**
 * preprocess function for ursacontent_page_slideshow template
 */
function template_preprocess_ursacontent_page_slideshow(&$variables) {
	$node = &$variables['node'];
	// define custom fields
	$fields = array('info_link', 'slide_images', 'slide_text');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $variables['langcode']);
	// get the image content
	for($i=0; $i<=6; $i++) {
		// if both records for this iteration are empty, skip
		if(empty($node->slide_images[$i]) && empty($node->slide_text[$i])) continue;

		$variables['slides'][$i]['image'] = isset($node->slide_images[$i]) ? theme('image_style', array('style_name' => 'original', 'path' => $node->slide_images[$i]['uri'], 'attributes' => array('class' => 'page-slideshow-slide-image'))) : NULL;
		$variables['slides'][$i]['text'] = isset($node->slide_text[$i]) ? $node->slide_text[$i] : NULL;
		$variables['slides'][$i]['url'] = isset($node->info_link[$i]) ? $node->info_link[$i] : NULL;
	}
}

/**
 * ursacontent_page_get_slideshows()
 * retrievies a list of slideshows to attach to a page node
 */
function ursacontent_page_get_slideshows() {
	$options = array();

	$query = new EntityFieldQuery();
	// only get nodes of type slideshow
	$query->entityCondition('entity_type', 'node')
				->propertyCondition('type', 'slideshow');

	$result = $query->execute();

	if(!$result) return $options;

	$nodes = node_load_multiple(array_keys($result['node']));

	foreach($nodes as $nid => $node) {
		$options[$nid] = $node->title;
	}

	return $options;
}