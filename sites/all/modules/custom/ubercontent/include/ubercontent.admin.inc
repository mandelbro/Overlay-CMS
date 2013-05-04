<?php

/**
 * ubercontent.admin.inc
 * produces admin control panel pages for the ubercontent module
 */
function ubercontent_admin_router($section = NULL) {
	$content = array();

	switch($section) {
		case 'run-install' :
			ubercontent_run_reinstall();
			break;
		default :
		$content['main'] = ubercontent_admin_control_links();
	}

	return $content;
}

/**
 * module invocation
 */
function ubercontent_run_reinstall() {
	// purge deleted data, otherwise shit gets cray yo.
	field_purge_batch(10);
	// invoke hook_reinstall
	module_invoke_all('reinstall');
	// return to the main control panel
	drupal_goto('admin/config/ubercontent');
}

function ubercontent_admin_control_links() {
	$content = array();

	$content['welcome'] = array(
		'#prefix' => '<div class="greeting">',
		'#suffix' => '</div>',
	);

	$content['welcome']['header'] = array(
		'#markup' => '<h1>Ubercontent Control Panel</h1>',
	);

	$content['links'] = array(
		'#prefix' => '<div class="block-content clearfix"><ul class="admin-list">',
		'#suffix' => '</ul></div>',
	);

	$content['links'][] = array(
		'#prefix' => '<li class="leaf">',
		'#suffix' => '</li>',
		'#markup' => '<a href="/admin/config/ubercontent/run-install" class="path-admin-config-system-backup_migrate- path-admin-config-system-backup-migrate path-admin-config-system path-admin-config path-admin"><span class="icon"></span>Run Install</a>',
	);

	return $content;
}