<div class="no-content">
	<?php switch($type->type) :
	
			case 'event' : ?>
			There are no events scheduled
		<?php
				break;
			case 'news' : ?>
			There are no current news stories
		<?php
				break;
			case 'career' : ?>
			There are no career opportunities at this time
		<?php
				break;
			default : ?>
			There are no <?php print $type->name; ?> items
	<?php endswitch; ?>
</div>