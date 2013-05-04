
<div class="link-menu-list"><ul class="strip">
	<?php foreach($links as $link) : ?>
	
	<li class="link-menu-list-item<?php print $link['parent']; ?><?php print $link['active']; ?>">
		<a class="link-menu-list-link" href="<?php print $link['url']; ?>"><?php print $link['title']; ?></a>
	</li>
	
	<?php endforeach; ?>
</ul><div class="clear"></div></div>