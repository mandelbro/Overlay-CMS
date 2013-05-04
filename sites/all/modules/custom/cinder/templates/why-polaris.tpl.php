<?php
	// define an iterator to keep track of the total term count between columns
	$i = 0;

?>
<div class="why-polaris-title title">
	Why do top global mobility programs choose Polaris?
</div>

<? foreach($columns as $terms) : ?>
<div class="why-polaris-column"><ul class="strip">
	<?php foreach($terms as $term) : ?>
		<li class="why-polaris-column-item item-<?php print $i; ?>">
			<span class="column-count-icon"></span>
			<div class="column-item-title title"><?php print $term->name; ?></div>
			<div class="column-item-description"><?php print $term->description; ?></div>
			<div class="clear"></div>
		</li>
		<?php $i++; ?>
	<?php endforeach; ?>
</ul><div class="clear"></div></div>
<?php endforeach; ?>
<div class="clear"></div>