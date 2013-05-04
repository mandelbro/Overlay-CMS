<?php
/**
 * @file twitter.inc
 * New twitter module larva
 */

/**
 * Peforms the calls to the audioscrobbler and twitter
 * API's for twitter feed functionality
 */
function apifeeds_twitter_load($username, $count = 3){
	$url = "https://api.twitter.com/1/statuses/user_timeline.json?exclude_replies=true&screen_name={$username}&count={$count}";

	$tweet_data = _apifeeds_fetch_url($url);
	$tweet_data = json_decode($tweet_data);

	if(!$tweet_data) array();

	$tweets = array();

	foreach($tweet_data as $tweet) {

		$tweets[] = _twitter_build_attributes($tweet);

	}

	return $tweets;
}

//get attributes of track from twitter
function _twitter_build_attributes($tweet){

	//sometimes characters are formatted funny, so lets be sure that isn't the case here
	$text = $tweet->text;

	// First, replace UTF-8 characters.
	$text = str_replace(
	array("\xe2\x80\x98", "\xe2\x80\x99", "\xe2\x80\x9c", "\xe2\x80\x9d", "\xe2\x80\x93", "\xe2\x80\x94", "\xe2\x80\xa6"),
	array("'", "'", '"', '"', '-', '--', '...'),
	$text);

	// Next, replace their Windows-1252 equivalents.
	$text = str_replace(
	array(chr(145), chr(146), chr(147), chr(148), chr(150), chr(151), chr(133)),
	array("'", "'", '"', '"', '-', '--', '...'),
	$text);

	// How long ago was this tweeped?
	$created = strtotime($tweet->created_at);
	$created = (((time() - $created) / 60)/60); // get number of hours ago
	if($created < 1) { // less than an hour, display number of minutes ago
		$created = round($created * 60);
		$created = format_plural($created, $created .' minute ago', $created .' minutes ago');
	}
	elseif(($created / 24) < 1) { // less than a day, display number of hours ago
		$created = round($created);
		$created = format_plural($created, $created .' hour ago', $created .' hours ago');
	}
	else { // more than a day, display number of days
		$created = round($created / 24);
		$created = format_plural($created, $created .' day ago', $created .' days ago');
	}

	return array(
		'text' => _linkify($text),
		'created' => $created,
	);
}