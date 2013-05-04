<div class="client-showcase-cinderblock"><div class="client-showcase-cinderblock-inner">
	<div class="client-showcase-title">Some of our clients are the leading companies in the following industries:</div>
	<div class="client-showcase-list">
		<ul class="strip">
		<?php foreach($vocab as $term) : ?>
		<li id="client-showcase-list-item<?php print $term->tid; ?>" class="client-showcase-list-item">
			<?php if(!empty($term->link_path)) : ?>
			<a class="client-showcase-list-link black no-hover" href="<?php print $term->link_path; ?>"><?php print $term->name; ?></a>
			<?php else : ?>
			<span class="client-showcase-list-link"><?php print $term->name; ?></span>
			<?php endif; ?>
		</li>
		
		<?php endforeach; ?>
		</ul>
	</div>
</div></div>