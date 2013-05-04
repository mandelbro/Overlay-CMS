
<div id="page-slideshow"><div id="page-slideshow-inner" class="polaris-carousel fader">
	<div id="page-slideshow-curved-border" class="curved-border"></div>
	<?php foreach($slides as $index => $slide) : ?>
		<div id="page-slideshow-slide-<?php print $index; ?>" class="page-slideshow-slide polaris-carousel-slide">
			<?php print $slide['image']; ?>
			<div class="page-slideshow-slide-text">
				<?php print $slide['text']; ?>
			</div>
			<?php if(!empty($slide['url'])) : ?>
				<a class="page-slideshow-learn-more-link" href="<?php print $slide['url']; ?>">Learn More<span class="polaris-arrow large"></span></a>
			<?php endif; ?>
		</div>
	<?php endforeach; ?>
</div></div>