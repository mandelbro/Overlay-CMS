<?php
/**
 * @file wordpress_msb.inc
 * New wordpress_msb module larva
 */

/**
 * Peforms the calls to the wordpress feed api
 */
function apifeeds_wordpress_msb_load($count){

	$url = 'http://intego.com/mac-security-blog/feed/';
	//$url = 'http://192.155.80.103/mac-security-blog/feed/';
	$response = _apifeeds_http($url);
	$data = simplexml_load_string($response->getBody());

	if(!$data) return array();
	$posts = array();

	for($i = 0; $i < $count; $i++) {

		$posts[] = _wordpress_msb_load_attributes((array) $data->channel->item[$i]);
	}

	return $posts;
}

//get attributes of track from wordpress_msb
function _wordpress_msb_load_attributes($post){
	//sometimes characters are formatted funny, so lets be sure that isn't the case here
	$title = $post['title'];
	$enclosure = (array) $post['enclosure'];

	// First, replace UTF-8 characters.
	$title = str_replace(
	array("\xe2\x80\x98", "\xe2\x80\x99", "\xe2\x80\x9c", "\xe2\x80\x9d", "\xe2\x80\x93", "\xe2\x80\x94", "\xe2\x80\xa6"),
	array("'", "'", '"', '"', '-', '--', '...'),
	$title);

	// Next, replace their Windows-1252 equivalents.
	$title = str_replace(
	array(chr(145), chr(146), chr(147), chr(148), chr(150), chr(151), chr(133)),
	array("'", "'", '"', '"', '-', '--', '...'),
	$title);

	return array(
		'title' => $title,
		'link' => $post['link'],
		'image' => !empty($enclosure['@attributes']) ? $enclosure['@attributes']['url'] : NULL,
	);
}
