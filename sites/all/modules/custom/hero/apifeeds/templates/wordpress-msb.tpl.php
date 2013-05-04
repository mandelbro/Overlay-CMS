
<ul class="posts strip">
	<?php foreach($items as $post) : ?>
	<li class="post clearfix">
		<?php if($post['image']) : ?>
			<a class="image-link" href="<?= $post['link'] ?>"><img src="<?= $post['image'] ?>" alt="Blog Image"></a>
		<?php endif ?>
		<div class="post-title"><?= $post['title'] ?></div>
		<a class="more-link" href="<?= $post['link'] ?>"><?= i18n_string("Sitewide:more_link:blog:read", "Read More"); ?></a>
	</li>
	<?php endforeach ?>
</ul>