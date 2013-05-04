<!-- div to be populated via JS for Instagram images -->
<script type="text/javascript">
	var instagramSettings = {
		hash : "<?php print $hashtag; ?>",
		clientId : "<?php print $client_id; ?>",
		placeholders : {
			'title' : "<?php print $title_image; ?>",
			'blank' : "<?php print $blank_image; ?>"
		},
		resolution : 'low',
		show : 9
	};

	if(window.outerWidth > 960) {
		if(window.outerWidth > 1440) {
			instagramSettings.resolution = 'standard';
			instagramSettings.show = 11;
		}
	}
	else {
		instagramSettings.show = 7;
		if(window.outerWidth < 480) {
			instagramSettings.show = 5;
		}
	}
</script>

<div id="instafeed">
</div>