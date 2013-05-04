<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the slideshow content type
 */
function ursacontent_slideshow_node_type_update($info) {

	// create the additional slideshow fields
	$fields = array(
		'slide_images' => array(
			'label'	=> 'Slide Images',
			'type'	=> 'image',
			'cardinality' => 6,
			'widget'	=> array(
				'weight' => 5,
			),
		),
		'slide_text' => array(
			'label'	=> 'Slide Text',
			'type'	=> 'text',
			'cardinality' => 6,
			'widget'	=> array(
				'type' => 'text',
				'weight' => 10,
			),
		),
		'info_link' => array(
			'label'	=> 'Learn More URL',
			'type'	=> 'text',
			'widget'	=> array(
				'type' => 'text',
				'weight' => 15,
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
 *    Handle storage custom fields when saving an slideshow node
 */
function ursacontent_slideshow_node_insert($node) {

}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an slideshow node
 */
function ursacontent_slideshow_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an slideshow node.
function ursacontent_slideshow_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an slideshow node
 */
function ursacontent_slideshow_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('slide_text', 'slide_images', 'info_link');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
}

function ursacontent_slideshow_preprocess_node(&$variables) {
	$node = $variables['elements']['#node'];
	// get the image content
	for($i=0; $i<=6; $i++) {
		// if both records for this iteration are empty, skip
		if(empty($node->slide_images[$i]) && empty($node->slide_text[$i])) continue;

		$variables['slides'][$i]['image'] = isset($node->slide_images[$i]) ? theme('image_style', array('style_name' => 'original', 'path' => $node->slide_images[$i]['uri'], 'attributes' => array('class' => 'slideshow-slide-image'. ($i == 0 ? ' polaris-carousel-control next' : NULL)))) : NULL;
		$variables['slides'][$i]['text'] = isset($node->slide_text[$i]) ? $node->slide_text[$i] : NULL;
		$variables['slides'][$i]['url'] = isset($node->info_link[$i]) && $node->info_link[$i] != '<none>' ? $node->info_link[$i] : NULL;
	}
}

/**
 *  ursacontent_form_slideshow_node_form_alter()
 *    Main form for creating and modifying custom pages
 *  @param $page
 *    Optional, a fully-loaded $page node only required if form is being
 *    used to modify an existing page.
 */
function ursacontent_form_slideshow_node_form_alter(&$form, &$form_state, $form_id) {
  global $user;

  // $form = node_content_form($node, $form_state);

	// add validation function
	$form['#validate'][] = 'ursacontent_slideshow_form_validate';

	// add submit function

}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_slideshow_form_validate(&$form, &$form_state) {
	// get a node object for interacting with the field api
	$node = (object) $form_state['values'];

	// if 'showcase' is checked, make sure there is an image
	$slide_images = field_get_items('node', $node, 'slide_images');
	$slide_text = field_get_items('node', $node, 'slide_text');

	// for each image, there should be corresponding text
	foreach($slide_images as $index => $image) {
		// if there is an image but no text, throw an error
		if($image['fid']) {
			if(!$slide_text[$index]['value']) {
				form_set_error('slide_text', 'You must provide text for each slide with an image');
			}
		}
	}

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_slideshow_form_submit(&$form, &$form_state) {

}