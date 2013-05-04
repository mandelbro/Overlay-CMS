<?php
 // flush output buffer
 die(json_encode(array(
 	'variables' => $variables,
 	'content' 	=> render($page['content']) . render($page['content_bottom']),
 )));
?>