<?php

function ubercontent_ajax_node_list() {
  $type = $_GET['type'];
  $language = $_GET['language'];
  $offset = $_GET['offset'];
  
  $query = new EntityFieldQuery();
  $query->entityCondition('entity_type', 'node');
  $query->propertyCondition('type', $type, '=');
  $query->propertyCondition('language', $language, '=');
  $query->range($offset, 3);
  
  $count = $query->count()->execute();
  
  $output = theme('ubercontent_node_list', array(
    'type' => $type,
    'range' => array(
      'start' => $offset,
      'end' => 3
    ),
    'view_mode' => isset($view_mode) ? $view_mode : 'teaser',
    'conditions' => array(
      'language' => isset($language) ? $language : 'en',
    )
  ));
  
  drupal_json_output(array(
    'html' => render($output),
    'count' => $count
  ));
    
  exit(1);
}