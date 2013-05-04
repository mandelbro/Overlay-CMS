<?php
/**
 * @file zendesk.inc
 * New zendesk module larva
 */

/**
 * Peforms the calls to the audioscrobbler and zendesk
 * API's for zendesk feed functionality
 */
function apifeeds_zendesk_load($display, $count = 5){
	$zendesk_username = 'dev-admin@urbaninfluence.com';
	$zendesk_password = '4/LCvMdF9b';
	$zendesk_api_token = 'dvSrknsiVNMFPnQgAo9gQmEPrRd8C4zyodIPXK1B';


	$url = "http://support.intego.com/forums/20680416-faq.rss";

	$response = _apifeeds_http($url);
	$data = simplexml_load_string($response->getBody());

	if(!$data) return array();

	$topics = array();

	for($i = 0; $i < $count; $i++) {

		$topics[] = _zendesk_build_attributes((array) $data->channel->item[$i]);
	}

	return $topics;
}

//get attributes of track from zendesk
function _zendesk_build_attributes($topic){
	if(empty($topic)) return;
	//sometimes characters are formatted funny, so lets be sure that isn't the case here
	$title = $topic['title'];
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
		'link' => $topic['link'],
	);
}