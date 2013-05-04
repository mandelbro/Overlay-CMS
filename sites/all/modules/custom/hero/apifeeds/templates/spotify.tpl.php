
<div class="feeds-spotify-feed"><ul class="strip">
<?php foreach($items as $item) : ?>
	<li class="spotify-feed-item">
		<a class="spotify-feed-link" href="<?php print $item['trackUrl']; ?>" target="_blank">
			<img class="spotify-feed-image" src="<?php print $item['cover']; ?>" />
			<span class="spotify-feed-info">
				<span class="spotify-feed-info-title"><?php print $item['title']; ?></span>
				<span class="spotify-feed-info-artist"><?php print $item['artist']; ?></span>
			</span>
		</a>
	</li>
 <?php endforeach; ?>
 </ul></div>