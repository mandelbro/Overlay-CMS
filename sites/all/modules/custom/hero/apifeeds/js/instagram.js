
(function($){
  $.fn.instagram = function(options) {
    var that = this,
        apiEndpoint = "https://api.instagram.com/v1",
        settings = {
            hash: null
          , userId: null
          , locationId: null
          , search: null
          , accessToken: null
          , clientId: null
          , show: null
          , onLoad: null
          , onComplete: null
          , maxId: null
          , minId: null
          , next_url: null
          , resolution : null
          , placeholders : null
        };

    options && $.extend(settings, options);

    function createPhotoElement(photo, resolution) {
    	resolution = settings.resolution || 'standard';
      return $('<a>')
      			.attr('class', 'instafeed-item')
            .attr('target', '_blank')
            .attr('href', photo.link)
            .append(
              $('<img>')
                .addClass('instagram-image')
                .attr('src', photo.images[resolution +'_resolution']['url'])
            );
    }

    function createPhotoTitle() {
      return $('<span>')
      			.attr('class', 'instafeed-item')
            .append(
              $('<img>')
                .addClass('instagram-image')
                .attr('src', settings.placeholders.title)
            );
    }

    function createPhotoPlaceholder() {
      return $('<span>')
      			.attr('class', 'instafeed-item')
            .append(
              $('<img>')
                .addClass('instagram-image')
                .attr('src', settings.placeholders.blank)
            );
    }

    function composeRequestURL() {

      var url = apiEndpoint,
          params = {};

      if (settings.next_url != null) {
        return settings.next_url;
      }

      if(settings.hash != null) {
        url += "/tags/" + settings.hash + "/media/recent";
      }
      else if(settings.search != null) {
        url += "/media/search";
        params.lat = settings.search.lat;
        params.lng = settings.search.lng;
        settings.search.max_timestamp != null && (params.max_timestamp = settings.search.max_timestamp);
        settings.search.min_timestamp != null && (params.min_timestamp = settings.search.min_timestamp);
        settings.search.distance != null && (params.distance = settings.search.distance);
      }
      else if(settings.userId != null) {
        url += "/users/" + settings.userId + "/media/recent";
      }
      else if(settings.locationId != null) {
        url += "/locations/" + settings.locationId + "/media/recent";
      }
      else {
        url += "/media/popular";
      }

      settings.accessToken != null && (params.access_token = settings.accessToken);
      settings.clientId != null && (params.client_id = settings.clientId);
      settings.minId != null && (params.min_id = settings.minId);
      settings.maxId != null && (params.max_id = settings.maxId);

      url += "?" + $.param(params)

      return url;
    }

		that.append(createPhotoTitle());
		for(var i = 0; i < settings.show; i++) {
			that.append(createPhotoPlaceholder());
		}

    settings.onLoad != null && typeof settings.onLoad == 'function' && settings.onLoad();

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: composeRequestURL(),
      success: function(res) {
        var length = typeof res.data != 'undefined' ? res.data.length : 0;
        var limit = settings.show != null && settings.show < length ? settings.show : length;
        that.html('');
				that.append(createPhotoTitle());
        for(var i = 0; i < limit; i++) {
          that.append(createPhotoElement(res.data[i]));
        }

        settings.onComplete != null && typeof settings.onComplete == 'function' && settings.onComplete(res.data, res);
      }
    });

    return this;
  };

	$(document).ready(function() {
		// make sure the instgram settings variable is set
		if(typeof instagramSettings == 'undefined' || !instagramSettings) return;

		// hold up a sec for iphone menu to go away
		window.setTimeout(function() {
			$("#instafeed").instagram({
				hash: instagramSettings.hash,
				clientId: instagramSettings.clientId,
				show: instagramSettings.show,
				resolution: instagramSettings.resolution,
				placeholders: instagramSettings.placeholders
			});
		}, 500);
	});
})(jQuery);