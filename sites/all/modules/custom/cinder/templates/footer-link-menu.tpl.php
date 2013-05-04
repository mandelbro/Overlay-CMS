
<div class="footer-link-list"><ul class="strip">
	<?php foreach($links as $index => $link) : ?>
	
	<li class="footer-link-list-item<?php print $index == 0 ? ' parent-item' : NULL; ?>">
		<a class="footer-link-list-link" href="<?php print $link['url']; ?>"><?php print $link['title']; ?></a>
	</li>
	
	<?php endforeach; ?>
</ul></div>