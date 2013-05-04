<?php


/**
 * Implementation of hook_node_type_insert
 * 	Adds custom fields to the page content type
 */
function ubercontent_job_node_type_update($info) {
	// add the body field
	node_add_body_field($info, 'Body');

  $fields = array();

	foreach($fields as $name => $field) {
		// add custom fields to the node type
		ubercontent_node_add_field($info, $name, $field);
	}
}


/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ubercontent_job_node_insert($node) {
}


/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ubercontent_job_node_update($node) {
}


/*
 *  Implementation of hook_insert
 *    Handle storage custom fields when saving an page node
 */
function ubercontent_job_node_view($node, $view_mode, $langcode) {
}


/**
 * template_preprocess_node callback
 */
function ubercontent_job_preprocess_node(&$variables) {
}


/**
 * Validation handler for ubercontent_form()
 */
function ubercontent_job_form_validate(&$form, &$form_state) {

}


/*
 * Submit handler for ubercontent_form()
 */
function ubercontent_job_form_submit(&$form, &$form_state) {

}