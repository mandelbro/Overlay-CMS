<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the solution content type
 */
function ursacontent_solution_node_type_update($info) {
	
	// add the body field
	node_add_body_field($info, 'Introduction');
	
	// create the additional solution fields
	$fields = array(
		'teaser' => array(
			'label'	=> 'Index Page Text',
			'type'	=> 'text',
			'widget'	=> array(
				'weight' => 10,
			),
		),
		'features' => array(
			'label'	=> 'Features & Benefits',
			'type'	=> 'text_long',
			'cardinality' => FIELD_CARDINALITY_UNLIMITED,
			'widget'	=> array(
				'type' => 'polaris_widget_multifield',
				'weight' => 15,
			),
		),
		'column_left' => array(
			'label'	=> 'Detail Page Column Text',
			'type'	=> 'text_long',
			'widget'	=> array(
				'weight' => 20,
			),
		),
		'column_left_image' => array(
			'label'	=> 'Detail Page Column Images',
			'type'	=> 'image',
			'cardinality' => 5,
			'widget'	=> array(
				'weight' => 21,
			),
		),
		'tagline' => array(
			'label'	=> 'Content Footer Tagline',
			'type'	=> 'text_long',
			'widget'	=> array(
				'weight' => 30,
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
 *    Handle storage custom fields when saving an solution node
 */
function ursacontent_solution_node_insert($node) {
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an solution node
 */
function ursacontent_solution_node_delete($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an solution node.
function ursacontent_solution_node_load($node) 
}
 */

/*
 *  Implementation of hook_view
 *    Handle storage custom fields when saving an solution node
 */
function ursacontent_solution_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('body', 'teaser', 'features', 'column_left', 'column_left_image', 'tagline');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
	// get the image content
	if(!empty($node->column_left_image)) {
		$node->column_images = array();
		$node->column_left_image = isset($node->column_left_image['fid']) ? array($node->column_left_image) : $node->column_left_image;
		foreach($node->column_left_image as $index => $image) {
			$style = $index == 0 ? 'screenshot_in_monitor' : 'screenshot';
			$node->column_images[] = array(
				'large' => theme('image_style', array('style_name' => 'original', 'path' => $image['uri'], 'alt' => $image['alt'], 'attributes' => array('class' => 'solution-column-image large'))),
				'small' => theme('image_style', array('style_name' => $style, 'path' => $image['uri'], 'alt' => $image['alt'], 'attributes' => array('class' => 'solution-column-image small'))),
				'caption' => $image['alt'],
			);
		}
	}
}

function ursacontent_solution_preprocess_node(&$variables) {
	
	$variables['attr_title'] = _make_attr_safe($variables['title']);
		
}