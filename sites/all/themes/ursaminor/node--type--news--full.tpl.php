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

<div id="news-node-page" class="<?php print $classes; ?>"<?php print $attributes; ?>>
	<div class="news-node-content">
		<div class="news-date title"><?php print $node->publish_date; ?></div>
		<div class="news-title title grey"><?php print $title; ?></div>
		<div class="news-node-image-wrapper">
			<?php if(!empty($display_image)) print $display_image; ?>
			<div class="news-node-social-links">
				<iframe id="f125f8a35" name="f3834c2744" scrolling="no" style="border: none; overflow: hidden; height: 20px; width: 88px; " title="Like this content on Facebook." class="fb_ltr " src="https://www.facebook.com/plugins/like.php?extended_social_context=false&amp;href=<?php print $node_url; ?>&amp;layout=button_count&amp;locale=en_US&amp;node_type=link&amp;send=false&amp;show_faces=false&amp;width=90"></iframe>
				<a href="https://twitter.com/share?url=<?php print $node_url; ?>" class="twitter-share-button" data-lang="en">Tweet</a>
				<script type="IN/Share" data-counter="right" data-url="<?php print $node_url; ?>" data-showzero="true"></script>
			</div>
		</div>
		<?php if(empty($display_image)) : ?><div class="clear"></div><?php endif; ?>
		<div class="news-body"<?php print $content_attributes; ?>>
			<?php print $node->body; ?>
		</div>
	</div>
</div> <!-- /.node -->
<div class="clear"></div>
<a class="polaris-arrow-link medium no-hover purple" href="/company/news-and-events">back<span class="polaris-arrow purple back"></span></a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>