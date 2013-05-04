<?php

/**
 * cinder.template.inc
 * Preprocess functions for Cinder Templates
 */
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_request_demo_link(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_news_events(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_client_showcase(&$variables) {
	// create a url safe string for each term
	foreach($variables['vocab'] as $index => &$term) {
		$term = taxonomy_term_load($term->tid);
		$term->link_path = field_get_items('taxonomy_term', $term, 'field_link_path');
		$term->link_path = $term->link_path[0]['value'];
	}
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_block_solutions_carousel(&$variables) {
	global $user;
	// pull the solutions portion of the main menu to preserve consistent weighting
	$menu_items = _menu_get_ancestors('main-menu', 'Solutions');
	foreach($menu_items['nested'][0] as $item) {
		// get the nid from the path
		$nodes[] = _get_nid_from_path($item['link_path']);
	}
	// load all the nodes we collected
	$nodes = node_load_multiple($nodes);
	// setup the solutions array
	$variables['solutions'] = array();
	// loop through the solutions nodes
	foreach($nodes as $node) {
		// run the node preprocess function
		ursacontent_solution_node_view($node, 'carousel', NULL);
		
		$variables['solutions'][] = (object) array(
			'icon_name' => _make_attr_safe($node->title), // assign the base for the icon name
			'title' 		=> $node->title, // assign the title
			'teaser' 		=> $node->teaser, // assign the teaser
			'url' 			=> drupal_lookup_path('alias', 'node/'. $node->nid), // assign the url
		);
	}
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_action_links(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_contact_links(&$variables) {
	$variables['email'] = theme_get_setting('info_email');
	$variables['phone'] = theme_get_setting('phone_number');
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_header_slider(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_block_case_studies(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_team_members(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_events_sidebar(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_solutions_menu(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_solutions_link_menu(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_polaris_showcase(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_why_polaris(&$variables) {
	$vocab = $variables['vocab'];
	// chunk the vocab for even columns
	$variables['columns'] = array_chunk($vocab, round(count($vocab)/2));
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_career_nodes(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_contact_info(&$variables) {

	$variables['email'] = array(
		'info' => theme_get_setting('info_email'),
		'support' => theme_get_setting('support_email'),
		'recruiting' => theme_get_setting('recruit_email'),
	);
	
	$variables['phone'] = array(
		'tel' => theme_get_setting('phone_number'),
		'fax' => theme_get_setting('fax_number'),
	);
	
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_careers_sidebar(&$variables) {
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_link_menu(&$variables) {
	$parent = $variables['links']['parent'];
	$links = $variables['links']['nested'];
	$clean_links = array();
	foreach($links as $layer => $link_array) {
		foreach($link_array as $index => $link) {
			$clean_links[] = array(
				'title' => $link['link_title'],
				'url' => url($link['link_path']),
				'active' => ($link['link_path'] == $_GET['q'] ? ' active' : NULL),
				'parent' => ($index === 0 ? ' parent-item' : NULL),
			);
		}
	}
	// replace the links variable with the new clean links
	$variables['links'] = $clean_links;
}
 
/**
 * Template Preprocess function
 */
function template_preprocess_cinder_footer_link_menu(&$variables) {
	$parent = $variables['links']['parent'];
	$links = $variables['links']['nested'];
	$clean_links = array();
	foreach($links as $layer => $link_array) {
		foreach($link_array as $link) {
			$clean_links[] = array(
				'title' => $link['link_title'],
				'url' => url($link['link_path']),
			);
		}
	}
	// attach the parent
	array_unshift($clean_links, array(
		'title' => $parent['link_title'],
		'url' => url($parent['link_path']),
	));
	// replace the links variable with the new clean links
	$variables['links'] = $clean_links;
}