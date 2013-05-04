<?php

/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the news content type
 */
function ursacontent_news_node_type_update($info) {
	
	// add the body field
	node_add_body_field($info);
	
	// create the additional event fields
	$fields = array(
		'image' => array(
			'label'	=> 'Image',
			'type'	=> 'image',
			'widget'	=> array(
				'weight' => 5,
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
 *    Handle storage custom fields when saving an news node
 */
function ursacontent_news_node_insert($node) {
	
}

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an news node
 */
function ursacontent_news_node_update($node) {
}

/**
 *  Implementation of hook_load
 *    Adds custom field data to object when node_load() is called
 *    on an news node.
function ursacontent_news_node_load($node) {
}
 */

/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an news node
 */
function ursacontent_news_node_view($node, $view_mode, $langcode) {
	// define custom fields
	$fields = array('image');
	// get the field values and insert them into the node
	_ursacontent_get_field_values($node, $fields, $langcode);
	// format the date
	$node->publish_date = format_date($node->changed, 'news_date');
	// define a content summary
	$langcode = !isset($node->body[$langcode]) ? 'und' : $langcode;
	if(!($node->summary = $node->body[$langcode][0]['summary'])) {
		$node->summary = strlen($node->body[$langcode][0]['value']) > 200 ? trim(substr($node->body[$langcode][0]['value'], 0, 200)) .'...' : $node->body[$langcode][0]['value'];
	}
	
	$node->body = $node->body[$langcode][0]['value'];
	
	// get the image content
	if(!empty($node->image)) {
		if($view_mode == 'full') {
			$node->display_image = theme('image_style', array('style_name' => 'large', 'path' => $node->image['uri'], 'attributes' => array('class' => 'news-node-display-image full')));
		}
		else {
			$node->display_image = theme('image_style', array('style_name' => 'medium', 'path' => $node->image['uri'], 'attributes' => array('class' => 'news-node-display-image medium')));
		}
	}
}

function ursacontent_news_preprocess_node(&$variables) {
	
	
	$variables['node_url'] = url(drupal_lookup_path('alias', 'node/'. $variables['nid']), array('absolute' => TRUE));
}

/**
 *  ursacontent_news_form_alter()
 *    Main form for creating and modifying custom news nodes
 *  @param $node
 *    Optional, a fully-loaded $node node only required if form is being
 *    used to modify an existing news.
 */
function ursacontent_news_form($node, $form_state) {
  global $user;
  
  // $form = node_content_form($node, $form_state);
	
	// add validation function
	
	// add submit function
	
}

/**
 *  Validation handler for ursacontent_form()
 */
function ursacontent_news_form_validate(&$form, &$form_state) {

}

/*
 *  Submit handler for ursacontent_form()
 */
function ursacontent_news_form_submit(&$form, &$form_state) {

}