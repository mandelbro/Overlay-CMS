<?php
/**
 * @file ubercontent.inc
 * 		Helper functions for the ubercontent module
 */

/*
 * ubercontent_node_add_field
 * Created by: mandelbro
 * adds a Field field to a noded
 *
 * @param $type
 * 		Content type object
 * @param $field_name
 * 		The field machine name
 * @param $label
 * 		Field label
 * @param $options
 *		Field options to send to field_create_instance
 */
function ubercontent_node_add_field($type, $field_name, $options = NULL) {
  $field = field_info_field($field_name);
  $instance = field_info_instance('node', $field_name, $type->type);

  // Create new field.
  if (!$field) {

    $field = array(
      'field_name' => $field_name,
  		'cardinality' => isset($options['cardinality']) ? $options['cardinality'] : 1,
      'type' => $options['type'],
      'translatable' => isset($options['translatable']) ? $options['translatable'] : FALSE,
			'settings' => isset($options['field_settings']) ? $options['field_settings'] : array(),
    );

    // Create the field and instance.
    try {
			$field = field_create_field($field);
    }
    catch (Exception $e) {
      drupal_set_message(t('There was a problem creating field %label: !message', array('%label' => $instance['label'], '!message' => $e->getMessage())), 'error');
    }
  }

  if (empty($instance)) {
    $instance = array(
      'field_name' => $field_name,
      'entity_type' => isset($options['entity_type']) ? $options['entity_type'] : 'node',
      'bundle' => $type->type,
      'label' => $options['label'],
      'required' => isset($options['required']) ? $options['required'] : FALSE,
      'widget' => isset($options['widget']) ? $options['widget'] : array('type' => 'text'),
      'settings' => isset($options['settings']) ? $options['settings'] : array('display_summary' => TRUE),
      'default_value_function' => isset($options['default_value_function']) ? $options['default_value_function'] : '',
      'default_value' => !isset($options['default_value']) ? NULL : array(
      	array('value' => $options['default_value']),
      ),
      'display' => isset($options['display']) ? $options['display'] : array(),
			'indexes' => isset($options['indexes']) ? $options['indexes'] : array()
    );

    // Create the field and instance.
    try {
			$instance = field_create_instance($instance);
    }
    catch (Exception $e) {
      drupal_set_message(t('There was a problem creating field %label: !message', array('%label' => $instance['label'], '!message' => $e->getMessage())), 'error');
    }
  }
  return $instance;
}

/**
 * ubercontent_get_field_values
 * A convenience method which simplifies the values from field arrays,
 * the original field values are stored in a new array [field_content]
 *
 * This processing occurs just before render so there shouldn't be any issues
 * effecting later proccessing caused by changing the fields
 *
 * @param $node
 * 	The node the get values for
 * @param $fields
 *  Array of fields to retrieve
 * @param $langcode
 * 	The language of the field to return
 */
function ubercontent_get_field_values(&$node, $fields, $langcode = NULL) {
	global $language;
	if(!empty($node->field_content)) return; // already ran this function on this node, bail
	$langcode = !$langcode ? 'und' : $langcode;
	// setup the field_content array to store the old values
	$node->field_values = array();
	if(!$fields) return;
	foreach($fields as $field) {
		// get the field value for the given language
		$field_value = field_get_items('node', $node, $field, $langcode);
		// store the old field
		$node->field_values[$field] = render(field_view_value('node', $node, $field, $field_value, NULL, $langcode));
	}
}

/**
 * ubercontent_get_options
 * get options from the options module
 * @param $field
 *		I'll need the field you're after, and it should probably be
 * 		a list_xxx field type
 */
function ubercontent_get_options($field) {
	return _options_get_options(field_info_field($field), NULL, NULL, NULL, NULL);
}

/**
 * ubercontent_save_node_types
 * Performs a save of an array of nodetypes
 */
function ubercontent_save_node_types($types) {

	// create a new node type for each
	foreach($types as $type) {
		// Create the content type object
		$type = node_type_set_defaults($type);

		/**
		 * Saving the content type after saving the variables allows modules to act
		 * on those variables via hook_node_type_insert().
		 */
		$status = node_type_save($type);

		drupal_set_message('Node type "'. $type->type . '" ' . ($status == 2 ? 'Updated' : 'Saved'));
	}

	// rebuild the menus so we can see our new types
	node_types_rebuild();
	menu_rebuild();
}

/**
 * ubercontent_save_taxonomy_vocabs
 * Accepts a nested array of vocabularies with terms and
 * performs a save operation
 */
function ubercontent_save_taxonomy_vocabs($vocabs) {
	// make sure we're working with an array
	if(empty($vocabs)) return;
	// iterate through each vocabulary array and programitically create the vocabulary/terms
	foreach($vocabs as $machine_name => $vocab) {
		// separate the array terms from the vocab object
		$terms = isset($vocab['terms']) ? $vocab['terms'] : array();
		$vocabulary = (object)$vocab['vocabulary'];
		// check if a term exists for this machine name, if so, skip this vocab
		if(taxonomy_vocabulary_machine_name_load($machine_name)) continue;
		// create the vocabulary term
		$status = taxonomy_vocabulary_save($vocabulary);
		// add the vid to variable storage
		variable_set($vocabulary->machine_name .'_vocabulary', $vocabulary->vid);
		// add each term to the vocabulary
		foreach($terms as $term) {
			// add the vid to the term
			$term['vid'] = $vocabulary->vid;
			taxonomy_term_save((object)$term);
		}
	}

}