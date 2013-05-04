
<div class="solutions-carousel"><div class="solutions-carousel-inner polaris-carousel carousel">
	<div class="solutions-carousel-title">Check out our solutions</div>
	<div class="polaris-carousel-list"><ul class="strip">
		<?php foreach($solutions as $index => $solution) : ?>
			<li class="polaris-carousel-item" style="left: <?php print (33 * ($index+1)); ?>%;">
				<a class="polaris-carousel-link solutions-carousel-item-link" href="<?php print $solution->url; ?>">
					<span class="solutions-carousel-item-icon">
						<img class="solutions-carousel-item-icon-image" src="/<?php print drupal_get_path('module', 'cinder') ."/images/solutions/solution-{$solution->icon_name}-inactive.png"; ?>">
						<img class="solutions-carousel-item-icon-image active-icon" src="/<?php print drupal_get_path('module', 'cinder') ."/images/solutions/solution-{$solution->icon_name}.png"; ?>">
					</span>
					<span class="solutions-carousel-item-title"><?php print $solution->title; ?></span>
					<span class="solutions-carousel-item-teaser"><?php print $solution->teaser; ?></span>
					<span class="polaris-carousel-direct-link polaris-plus-link purple small">learn more <span class="polaris-plus small purple"></span></span>
				</a>
			</li>
		<?php endforeach; ?>
	</ul></div>
	<div class="curved-border solutions-carousel-curved-border"></div>
</div></div>