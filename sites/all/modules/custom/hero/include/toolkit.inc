<?php
/**
 * New Toolkit Functions, start switching to these
 */

/**
 *  _mySQL_time()
 *  Created by: mandelbro
 *    Helper to get a properly formandelbroed mySQL timestamp
 */
function _mySQL_time($base_time = FALSE) {
  if ($base_time) {
    return date('Y-m-d H:i:s', strtotime($base_time));
  }
  else {
    return date('Y-m-d H:i:s');
  }
}


/**
 *  _time_elapsed()
 *  Created by: mandelbro
 *    Generate a time elapsed string (ie. given a timestamp, returns string representing the elapsed time "5 days [ago]")
 *  @param $time
 *    UNIX timestamp
 */
function _time_elapsed($time) {
  $elapsed = time() - $time;

  if ($elapsed < 1) {
    return '0 seconds';
  }

  $labels = array(
    12*4*7*24*60*60 => 'year',
    4*7*24*60*60    => 'month',
    7*24*60*60      => 'week',
    24*60*60        => 'day',
    60*60           => 'hour',
    60              => 'minute',
    1               => 'second',
  );

  // iterate through the labels and test against our label breakpoints
  foreach ($labels as $seconds => $label) {
    $check = $elapsed / $seconds;

    if ($check >= 1) {
      $round = round($check);
      return $round . ' ' . $label . (($round > 1) ? 's' : ''); // return a well-formed label
    }
  }

}


/**
 *  _int2vancode()
 *  Created by: Drupal Team
 *    Generate vancode (used for storing an accurate representation of comment threads)
 *
 *  @see http://api.drupal.org/api/drupal/modules--comment--comment.module/function/comment_render/6
 */
function _int2vancode($i = 0) {
  $num = base_convert((int) $i, 10, 36);
  $length = strlen($num);

  return chr($length + ord('0') - 1) . $num;
}

/**
 *  _vancode2int()
 *  Created by: Drupal Team
 *    Decode vancode back to an integer.
 */
function _vancode2int($c = '00') {
  return base_convert(substr($c, 1), 36, 10);
}

/**
 *  _flatten()
 *  Created by: mandelbro
 *    Flatten a nested array
 *
 *  example:
 *    $input = array(
 *      'blah' => array('foo', 'bar', 'baz'),
 *      'mah'  => array('loo', 'jar', 'haz'),
 *    );
 *    $output = _flatten($input);
 *
 *    $output now equals: array('foo', 'bar', 'baz', 'loo', 'jar', 'haz');
 *
 */
function _flatten($array) {
	$return = array();
	array_walk_recursive($array, function($a) use (&$return) { $return[] = $a; });
	return $return;
}

/**
 * Convert an associative array into an object
 * @param array - required
 * @return - object data, false if the array is empty
 */
function _toObject($array = array()) {

    if (!empty($array)) {
        $object = false;
        foreach ($array as $akey => $aval) {
            $object -> {$akey} = $aval;
        }
        return $object;
    }

    return false;
}

/**
 * _isLive
 * Returns a boolean value depending on whether the site is live or in development
 * for now let's just manually set the return item to true, later we'll have it in the backend
 *
 * @example if(!_isLive) {
 *            echo 'there is an error with $function_name';
 *          }
 *          else {
 *            echo 'Oops, You broke the site! No biggie we're looking into it right now :)';
 *          }
 *
 * @return true if the site is live, false if the site is in development
 */
function _isLive() {

  if(!SITE_IS_ALIVE) return FALSE;

  return TRUE;

}

/**
 * _printList
 * accepts an array of values and returns a formatted HTML ul element
 * each array line may spe
 *
 * Print List Guidelines:
 * Each item in your array should contain an array of values which will be used to create an html ul list.
 * Possible array keys your array may contain:
 * - 'content' : The content that will be echoed into the list
 * - 'id' : The element id of the individual list item, should be unique to maintain W3C standards compliance
 * - 'class' : A string of element classes separated by spaces
 * - that's all for now, more to come probably...
 * @return the HTML ul element
 */
function _printList($array) {
  if(!is_array($array)) return $array;

  $list_id = isset($array['#id']) ? $array['#id'] : NULL;
  $list_classes = isset($array['#classes']) ? $array['#classes'] : NULL;

  $html = "<ul id='{$list_id}' class='strip {$list_classes}'>"; //Setup the HTML return values
  $i = 0; //declare counter
  $count = count($array); //get the full element count

  foreach(array_values($array) as $list_item) {

    $id = !isset($list_item['id']) ? NULL : 'id="' . $list_item['id'] . '"';
    $classes = !isset($list_item['class']) ? NULL : $list_item['class'];
    $content = !isset($list_item['content']) ? NULL : $list_item['content'];

    $classes .= $i == 0 ? ' first' : NULL;
    $classes .= ($i + 1) == $count ? ' last' : NULL;
    $classes .= !_isEven($i)? ' odd' : NULL;

    $html .= "<li {$id} class='{$classes}'>". $content ."</li>";

    $i++;
  }

  $html .= "</ul>";

  return $html;

}

/**
 * _checkAjax
 * Will check the uri to see if an AJAX request has been made
 * @return true if the process flag is present, false otherwise
 */
function _checkAjax() {

  //setup an array of navigation elements
  // Grab the name from the URL of the page requested
  // Strip the querystring
  $uri = explode('?',$_SERVER['REQUEST_URI']);
  // Break out the individual sections
  $nav_array = explode('/',$uri[0]);

  //check the nav_array and $_GET var to see if the process flag is present
  if(in_array('process', $nav_array) or isset($_GET['process'])) {
    return true; //the flag is present
  }

  //didn't return true so it must be false
  return false;

}

/**
 * _arrayEmpty
 * check recursively to see if the array and it's values are empty
 *
 * @example empty(array('item1' => '', 'item2' => '', 'item3' => ''));
 *          * this will return false, even though all the values are empty *
 *
 *          _arrayEmpty(array('item1' => '', 'item2' => '', 'item3' => ''));
 *          * this will return true since all the items are empty *
 *
 * @return true if the array is empty, false if at least one value is set
 */
function _arrayEmpty($array = NULL) {
  //Here we're checking to see if the array and it's values are empty
  //For example if we were to get an array with 4 defined keys of null values,
  //we want to let the script know that for our purposes, that array is empty

  //If we receive nothing, or an empty variable, return true
  if(empty($array)) return true;
  //If we don't receive an array, return true
  elseif(!is_array($array)) return true;

  //Here we'll iterate the array and return false if at least one value is set
  foreach(array_values($array) as $value) {

    if($value !== 0) { //0 is an acceptable value
      if(!empty($value)) return false; //now if it is anything but null or false, it's not empty, bail
    }

  }

  //If the loop makes it out without being returned false, we know it's empty
  return true;

}

/*_EncodeArray
 * accepts an array of values and returns a string that can be passed through a url
 * @return the encoded array string
 */
function _encodeArray($array) {

  $output = serialize($array);

  return base64_encode($output);
}


/**
 * _DecodeArray
 * accepts a base64_encoded, serialized string and returns an array of values
 * @return the decoded array
 */
function _decodeArray($serialized_array) {

  $output = base64_decode($serialized_array);

  return unserialize($output);
}

function _dbError() {
  global $active_db;
  return mysqli_error($active_db);
}


/**
 * _isEven
 * checks if integer is Even
 * @param $integer
 *    the integer you want to check
 * @return true if the integer is even, false otherwise
 */
function _isEven($integer) {
  if ($integer % 2 == 0 ) {
      //your number is even
      return true;
  } else {
      //your number is odd
      return false;
  }
}


/**
 *
 * @param $needle The value we're testing.
 * @param $lowerBound The lower boundary of the range.
 * @param $upperBound The upper boundary of the range.
 * @param $isExclusive Determines whether equality to the upper/lower boundary satisfies our condition.
 * @return TRUE if $needle is between $lowerBound and $upperBound, FALSE if not (or an error occurred).
 */
function _isBetween($needle,$lowerBound,$upperBound,$isExclusive = FALSE) {
  if(is_numeric($needle) && is_numeric($lowerBound) && is_numeric($upperBound)) {
    if ($isExclusive) {
      return (($needle > $lowerBound) && ($needle < $upperBound));
    }
    else {
      return (($needle >= $lowerBound) && ($needle <= $upperBound));
    }
  } else {
    //watchdog('error',"isBetween(): Passed values were invalid ($needle , $lowerBound, $upperBound)");
    return false;
  }
}

/**
 * a super ghetto replacement for __DIR__
 */
function _get_module_dir($module) {
	return $_SERVER['DOCUMENT_ROOT'] . '/' . drupal_get_path('module', $module);
}

/**
 * _include_folder
 * accepts a specified directory and includes all .inc files
 *
 * will run _fileFilter to filter any folders or files
 * prepended with a period or underscore

 * @param $directory
 * required, the directory you would like to include
 * @return true if the include was successful, false otherwise

 * @example
 *    to exclude certain files from being included simply add
 *    an underscore to the beginning.  Only .php files, not
 *    directories or other filetypes are allowed for now.
 *    /directory/
 *      example.inc (will be added)
 *      includes/ (will not be added since it's a directory)
 *      example.js (will not be added since it's not a .inc file)
 */
function _include_folder($directory = NULL) {

  if(!$directory) {
    //watchdog('error', 'No directory specified in ' . __FUNCTION__ . ' on line: ' . __LINE__);
    return false;
  }

  if ($handle = opendir($directory)) {

    //loop through all the files in the folder and run a php require to include them
    while (false !== ($file = readdir($handle))) {

      //check to ensure it a .inc file
      if(strpos($file, '.inc')) {
        include_once $directory . '/' . $file;
      }

    }

    unset($file);
    closedir($handle);

    return true; //everything worked as it should have, return true

  }

  return false; //it didn't find the directory, return false

}

/**
 * _scandir
 * Scans the specified directory and returns an array of all files
 *
 * @param $directory
 *		The root path to the directory
 * @param $ext
 * 		Optionally specifiy an appendix for files to add to the array
 */
function _scandir($directory, $ext = NULL) {
	//setup the files array
	$files = array();

  if ($handle = opendir($directory)) {

    //loop through all the files in the folder and run a php require to include them
    while (false !== ($dir = readdir($handle))) {

      if(is_dir($directory .'/'. $dir)) {
     		print_r($dir);
      }

    }

    unset($file);
    closedir($handle);

  }

  return $files;
}

/*
 * Simple string manipulation; returns the last segment of a
 * qualified file name using the period as a delimiter.
 * We may want to make this smarter in the future, but for now it's just a common string manip.
 */
function _get_extension($filename) {
  return end(explode('.',$filename));
}

/*
 *  _validateEmail
 *  Created by: mandelbro
 *    A thorough function to validate e-mail addresses cause Drupal's built-in (valid_email_address) is really really bad.
 *  @params $email
 *    A string containing an e-mail address
 *  @return
 *    TRUE if the e-mail passes all the validation checks, otherwise FALSE
 */
function _validateEmail($email) {
  //somebody far more awesome than I at regex wrote this. It's brilliant. It is worth noting that regular expressions generally aren't
  //very performance frinedly. And this is a gigantic regular expression so its probably pretty slow. So use this function very
  //sparingly (ie. single use, not in a loop) -mandelbro
  $magic_pattern = "/^(?!.{255,})(?!.{65,}@)(?:(?:\"[^\"]{1,62}\")|(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*))@(?:(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})\])|(?:(?!.*[^.]{64,})(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,127}(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*))$/i";

  if (!preg_match($magic_pattern, $email)) {
    return false;
  }

  return true;
}

/*
 * _safe_string
 * Created By: mandelbro
 * Replaces and removes unsafe characters from the specified string
 */
function _safe_string($string) {
  //start by trimming deadspace from title, and making all chars lowercase
  $string = trim(strtolower($string));
  //build array of invalid chars to remove
  $clean_array = array('!', '#', '/', '&amp;', '&', ',', '.', ':', ';', '=', '?', '@', '<', '>', '%', '{', '}', '[', ']', '\\', '^', '~', '`', "'", '"');
  //shorten any extra spaces to single space
  $string = str_replace('  ', ' ', $string);
  //remove all spaces and replace with - (dash)
  $string = str_replace(' ', '-', $string);
  //replace all underscores with a dash
  $string = str_replace('_', '-', $string);
  //remove all invalid characters
  return str_replace($clean_array, '', $string);
}

function predie($stuff) {
  die('<pre style="font-size: 10pt">'. print_r($stuff,true) .'</pre>');
}


function preprint_r($stuff) {
  echo('<pre style="font-size: 10pt">'. print_r($stuff,true) .'</pre>');
}


function precho($stuff) {

  echo "<!-- $stuff -->";
}

function _json_die($array) {
	header('Content-type: text/json');
	print json_encode($array);
	exit();
}

function array_filter_recursive($array, $callback = null) {
    foreach ($array as $key => & $value) {
        if (is_array($value)) {
            $value = array_filter_recursive($value, $callback);
        }
        else {
            if ( ! is_null($callback)) {
                if ( ! $callback($value)) {
                    unset($array[$key]);
                }
            }
            else {
                if ( ! (bool) $value) {
                    unset($array[$key]);
                }
            }
        }
    }
    unset($value);

    return $array;
}

function _make_attr_safe($string) {
  // Replace with dashes anything that isn't A-Z, numbers, dashes, or underscores.
  return strtolower(preg_replace('/[^a-zA-Z0-9-]+/', '-', $string));
}

function _plurlify($string) {
	// does it already end with an ?
	if(substr($string, -1, 1) == 's') return $string;
	// does it end with a y?
	if(substr($string, -1, 1) == 'y') {
		//replace it with ies
		return substr($string, 0, (strlen($string) - 1)) .'ies';
	}
	return $string .'s';
}

function _linkify($string) {
  return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a href="$1" target="_blank">$1</a>', $string);
}

/**
 * _bulletify
 * Takes a string formatted with linebreaks led by dashes and spits out <li> list elements
 */
function _bulletify($string) {
	$items = explode("\n", trim($string));
	$output = array();
	foreach($items as $item) {
		$output[] = '<li>'. trim(ltrim($item), '-') . '</li>';
	}
	return join("\n", $output);
}

/**
 * _menu_get_ancestors
 * Retrieves the menu ancestors of the specified parent
 */
function _menu_get_ancestors($menu, $parent) {
	$ancestors = array();

	if(!is_array($menu)) $menu = menu_load_links($menu);
	// get the parent
	foreach($menu as $link) {
		if($link['link_title'] == $parent) {
			$parent = $link;
			$mlid = $parent['mlid'];
			break;
		}
	}

	// add the mama cat
	$ancestors['parent'] = $parent;
	$ancestors['nested'] = array();

	// get the kittens
	foreach($menu as $link) {
		for($i=0; $i <= 8; $i++) {
			if($link['p'. ($i+1)] == $mlid) {
				if(!$link['p'. ($i+2)]) continue; // found the parent
				$ancestors['nested'][$i][] = $link;
				break;
			}
		}
	}

	return $ancestors;

}

/**
 * _get_nid_from_path
 */
function _get_nid_from_path($path = NULL, $language = NULL) {
	$path = $path ? $path : drupal_lookup_path('source');
	$nid = arg(1, $path);
	return $nid;
}

/**
 * convenience function to get the i18n_string from the context in all languages
 */
function _i18n_context($context) {

  $text = i18n_string_get_string($context);

  return i18n_string($context, $text->string);

}

/**
 * _get_options_array()
 * loads a drupal get form ready array of options
 */
function _get_options_array($array, $field, $key = NULL) {
	$options = array();
	foreach($array as $item) {
		if(is_object($item)) $item = (array) $item;
		$item_key = $key ? $item[$key] : '';
		$options[$item_key] = $item[$field];
	}

	return $options;

}

function _taxonomy_options_array($machine_name) {
  $v = taxonomy_vocabulary_machine_name_load($machine_name);
  $terms = taxonomy_get_tree($v->vid);

  return _get_options_array($terms, 'name', 'tid');
}

/**
 * _run_install
 * re-runs the specified install function to save from having to
 * uninstall and reinstall the module
 *
 * @param $module
 *     The name of the module who's install function is to be run
 */
function _run_install($module) {
	// make sure there is a .install file
	if(!is_file(_get_module_dir($module) ."/{$module}.install")) return;
	// include the install file
	include_once(_get_module_dir($module) ."/{$module}.install");
	// build run the install function
	$fn = "{$module}_install";
	$fn();
	return;
}