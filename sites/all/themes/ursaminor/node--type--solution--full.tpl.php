<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: whether submission information should be displayed.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Nodetype Specific Variables:
 * - $body
 * - $header_text
 * - $content_header
 * - $layout
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */
?>

<section id="solution-node-page" class="<?php print $classes; ?> <?php print $attr_title; ?>"<?php print $attributes; ?>>
	<header id="solution-page-header"><div class="full-width">
		<div id="solution-page-header-inner" class="container">
			<h1 id="solution-page-header-title" class="title white"><?php print $title; ?></h1>
			<div id="solution-page-header-body" class="white"><?php print $node->body; ?></div>
		</div>
	</div></header>
	<div id="solution-page-features">
		<div id="solution-page-features-title" class="title">Features &amp; Benefits</div>
		<div id="solution-page-features-list"><ul class="strip">
			<?php foreach($features as $feature) : ?>
				<li class="solution-page-feature-item">
					<?php print $feature; ?>
				</li>
			<?php endforeach; ?>
		</ul><div class="clear"></div></div>
	</div>
	<div id="solution-page-content">
		<?php if(!empty($column_images)) : ?>
		<div class="solution-page-column right">
			<?php foreach($column_images as $index => $image) : ?>
			<div id="solution-page-column-image-<?php print $index; ?>" class="solution-page-column-image <?php print $index == 0 ? 'first' : ''; ?>">
				<?php print $image['small']; ?>
				<?php if($image['caption']) : ?><div class="caption purple"><?php print $image['caption']; ?></div><?php endif; ?>
				<a rel="#solution-page-column-image-<?php print $index; ?>" href="#" class="activelink active-callback--activelinkOverlay"></a>
				<div class="solution-page-column-large activelink-overlay-content">
					<?php print $image['large']; ?>
				</div>
			</div>
			<?php endforeach; ?>
		</div>
		<?php endif; ?>
		<div class="solution-page-column <?php print !empty($column_images) ? 'left' : 'full'; ?>">
			<?php print $column_left; ?>
		</div>
		<div class="clear"></div>
	</div>
	<footer id="solution-page-footer"><div class="full-width">
		<div id="solution-page-footer-inner" class="container">
			<div id="solution-page-footer-tagline" class="purple"><?php print $tagline; ?></div>
		</div>
	</div></footer>
</section> <!-- /.node -->