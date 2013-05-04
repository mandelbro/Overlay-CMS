<?php
 // flush output buffer
 print json_encode(array(
 	'variables' => $variables,
 	'page' => $page,
 	'content' 	=> render($page['content']),
 	'messages' => $messages,
 ));
?>