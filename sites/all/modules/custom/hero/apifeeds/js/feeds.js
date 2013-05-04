(function($) {

	/**
	 * Runs the spotify cache refresh and refreshes
	 * the content on the page
	 */
	var refreshFeedCache = function(type, element) {
		window.setTimeout(function() {
			// runs the spotify cache refresh
			ajax = $.ajax({
				url : "/apifeeds/feeds",
				dataType : 'json',
				data : 'feedtype='+ type +'&apiajax=true',
			});

			ajax.done(function(data) {
				// update the feed element with the returned markup
				element.html($(data).html());
			});
		}, 500);
	};

	/**
	 * use this loader to enable ajax refreshes of content
	 * on each page load for each user, otherwise feed
	 * content will refresh daily
	 */
	$(window).load(function() {
		var twitter = $('.feeds-twitter-feed'),
				spotify = $('.feeds-spotify-feed'),
				instagram = $('.feeds-instagram-feed');
		// if a spotify element is on the page, refresh the cache
		if(twitter.length) {
			twitter.each(function() {
				refreshFeedCache('twitter', $(this));
			});
		}

		if(spotify.length) {
			spotify.each(function() {
				refreshFeedCache('spotify', $(this));
			});
		}

		if(instagram.length) {
			instagram.each(function() {
				refreshFeedCache('instagram', $(this));
			});
		}

	});
})( jQuery );