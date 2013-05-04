
<ul class="strip">
	<?php foreach($items as $topic) : ?>
		<li><a href="<?= $topic['link'] ?>" target="_blank"><?= $topic['title'] ?></a></li>
	<?php endforeach; ?>
</ul>