<?php
/**
 * cinder.block.inc
 * Drupal hook_block_view callback functions
 */

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_request_demo_link_block() {
	$content = array();

	$content['main'] = array(
		'#markup' => theme('cinder_request_demo_link'),
	);

	return $content;
}

/**
 * cinder_homepage_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_homepage_link_block() {
	$content = array();

	$content['main'] = array(
		'#markup' => theme('cinder_request_demo_link', array('text' => 'homepage', 'icon' => 'plus large', 'href' => '/')),
	);

	return $content;
}

/**
 * cinder_news_events_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_news_events_block() {
	$content = array(
		'#suffix' => '<div class="clear"></div>',
	);

	$content['news'] = array(
		'#prefix' => '<div class="news-node-list">',
		'#suffix' => '</div>',
		'nodes' => array(
			'#prefix' => '<div class="node-list-name"><a class="node-list-name-link no-hover purple" href="/company/news-and-events">News</a></div>',
			'list' => theme('ursacontent_node_list', array('type' => 'news', 'view_mode' => 'block', 'no_title' => TRUE)),
		),
	);

	$content['events'] = array(
		'#prefix' => '<div class="event-node-list">',
		'#suffix' => '</div>',
		'nodes' => array(
			'#prefix' => '<div class="node-list-name"><a class="node-list-name-link no-hover purple" href="/company/news-and-events">Events</a></div>',
			'list' => theme('ursacontent_node_list', array('type' => 'event', 'view_mode' => 'full', 'no_title' => TRUE)),
		),
	);

	return $content;
}

/**
 * cinder_client_testimonial_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_client_testimonial_block() {
	$content = array();

	$content['list'] = array(
		'#prefix' => '<div class="client-testimonial-block polaris-carousel fader no-controls" data-carousel-interval="10000">',
		'#suffix'	=> '</div>',
		'nodes' 	=> theme('ursacontent_node_list', array('type' => 'testimonial', 'view_mode' => 'full', 'no_title' => FALSE, 'order' => 'changed')),
	);

	return $content;
}

/**
 * cinder_client_shows_top_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_client_showcase_top_block() {
	$content = array();
	$vocab = taxonomy_get_tree(variable_get('polaris_industries_vocabulary'));
	$content['main'] = array(
		'#markup' => theme('cinder_client_showcase', array('vocab' => $vocab)),
	);

	return $content;
}

/**
 * cinder_client_testimonial_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_client_showcase_bottom_block() {
	return cinder_client_showcase_top_block();
}

/**
 * cinder_solutions_carousel_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_solutions_carousel_block() {
	$content = array();
	$content['main'] = array(
		'#markup' => theme('cinder_block_solutions_carousel'),
	);

	return $content;
}

/**
 * cinder_action_links_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_action_links_block() {
	$content = array();

	$content['main'] = array(
		'#markup' => theme('cinder_action_links'),
	);

	return $content;
}

/**
 * cinder_action_links_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_contact_links_block() {
	$content = array();

	$content['main'] = array(
		'#markup' => theme('cinder_contact_links'),
	);

	return $content;
}

/**
 * cinder_case_studies_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_case_studies_block() {
	$content = array();

	$content['list'] = array(
		'#markup' => theme('cinder_block_case_studies'),
	);

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_team_members_block() {
	$content = array();

	$content['list'] = array(
		'#prefix' => '<div class="team-member-block-title title">Meet our executive team</div>',
		'nodes' => theme('ursacontent_node_list', array('type' => 'teammate', 'view_mode' => 'block', 'no_title' => TRUE))
	);

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_events_sidebar_block() {
	$content = array();

	$content['list'] = theme('ursacontent_node_list', array('type' => 'event', 'view_mode' => 'full'));

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_solutions_menu_block() {
	$content = array();
	// pull the solutions portion of the main menu to preserve consistent weighting
	$menu_items = _menu_get_ancestors('main-menu', 'Solutions');
	foreach($menu_items['nested'][0] as $item) {
		// get the nid from the path
		$nodes[] = _get_nid_from_path($item['link_path']);
	}
	// load all the nodes we collected
	// split the array into groups of 5
	$node_chunks = array_chunk($nodes, 5);
	foreach($node_chunks as $index => $nodes) {
		$nodes = node_load_multiple($nodes);
		$content['menu'][] = array(
			'#prefix' => '<div class="solutions-menu-list'. ($index == (count($node_chunks) - 1) ? ' last' : '' ) . ($index == 0 ? ' first' : '' ) .'"><ul class="strip">',
			'#suffix' => '</ul><div class="clear"></div></div>',
			'nodes' => node_view_multiple($nodes, 'menu'),
		);
	}

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_solutions_links_header_block() {
	$content = array();
	// list solutions links
	$content['main'] = array(
		'#markup' => theme('cinder_link_menu', array('links' => _menu_get_ancestors('main-menu', 'Solutions'))),
	);

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_solutions_links_footer_block() {

	return cinder_solutions_links_header_block();

}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_polaris_showcase_block() {
	$content = array();
	// load the slideshow node by the path solutions/slideshow
	$path = drupal_lookup_path('source', 'solutions/slideshow');
	$node = node_load(_get_nid_from_path($path));
	$content['main'] = node_view($node, 'block');

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_why_polaris_block() {
	$content = array();

	$vocab = taxonomy_get_tree(variable_get('why_polaris_vocabulary'));
	$content['main'] = array(
		'#markup' => theme('cinder_why_polaris', array('vocab' => $vocab)),
	);

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_career_nodes_block() {
	$content = array();

	$content['list'] = array(
		'#suffix' => '<div class="clear"></div>',
		'nodes' => array(
			'#prefix' => '<div class="node-list-name"><a class="node-list-name-link no-hover purple" href="/company/careers">Careers</a></div>',
			'list' => theme('ursacontent_node_list', array('type' => 'career', 'view_mode' => 'block', 'no_title' => TRUE, 'range' => array('start' => 0, 'end' => 4))),
		),
	);

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_contact_info_block() {
	$content = array();

	$content['locations'] = array(
		'#prefix' => '<div class="contact-info-location-list">',
		'#suffix' => '</div>',
		'list' => theme('ursacontent_node_list', array('type' => 'location', 'view_mode' => 'contact form', 'no_title' => TRUE)),
	);

	$content['main'] = array(
		'#markup' => theme('cinder_contact_info'),
		'#suffix' => '<div class="clear"></div>',
	);
	
	$content['#suffix'] = '<div class="clear"></div>';

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_careers_sidebar_block() {
	$content = array();

	$content['list'] = theme('ursacontent_node_list', array('type' => 'career', 'view_mode' => 'sidebar'));

	return $content;
}

/**
 * cinder_request_demo_link_block
 * hook_block_view callback
 * @return a renderable content array
 */
function cinder_footer_link_menu_block() {
	$content = array();
	$content['columns'] = array(
	);
	// list location nodes
	$content['columns'][] = array(
		'#prefix' => '<div class="footer-link-menu-column location">',
		'#suffix' => '</div>',
		'list' => theme('ursacontent_node_list', array('type' => 'location', 'view_mode' => 'teaser', 'no_title' => TRUE)),
		'#weight' => 0,
	);
	// list solutions links
	$content['columns'][] = array(
		'#prefix' => '<div class="footer-link-menu-column solutions">',
		'#suffix' => '</div>',
		'solutions' => array(
			'#markup' => theme('cinder_footer_link_menu', array('links' => _menu_get_ancestors('main-menu', 'Solutions'))),
		),
		'#weight' => 5,
	);
	$content['columns'][] = array(
		'#prefix' => '<div class="footer-link-menu-column company">',
		'#suffix' => '</div>',
		'company' => array(
			'#markup' => theme('cinder_footer_link_menu', array('links' => _menu_get_ancestors('main-menu', 'Company'))),
		),
		'#weight' => 7,
	);
	$content['columns'][] = array(
		'#prefix' => '<div class="footer-link-menu-column case-studies resources contact">',
		'#suffix' => '</div>',
		'case_studies' => array(
			'#markup' => theme('cinder_footer_link_menu', array('links' => _menu_get_ancestors('main-menu', 'Case Studies'))),
		),
		'resources' => array(
			'#markup' => theme('cinder_footer_link_menu', array('links' => _menu_get_ancestors('main-menu', 'Resources'))),
		),
		'contact' => array(
			'#markup' => theme('cinder_footer_link_menu', array('links' => _menu_get_ancestors('main-menu', 'Contact'))),
		),
		'#weight' => 10,
	);

	return $content;
}