
<div class="feeds-twitter-feed"><ul class="strip">
<?php foreach($items as $item) : ?>
	<li class="twitter-feed-item">
		<?php print $item['text']; ?>
		<span class="twitter-feed-item-date"><?php print $item['created']; ?></span>
	</li>
 <?php endforeach; ?>
 </ul></div>