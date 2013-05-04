<?php

/**
 * beacon.resources.inc
 * Code for generating the Resources Contact Beacon Form
 */

/**
 * drupal_get_form callback
 */
function beacon_resources_form_block() {
	$content = array();
	
	$content['main'] = drupal_get_form('contact_site_form');
	
	return $content;
}

/**
 * drupal_get_form validation function
 */
function beacon_resources_form(&$form, &$form_state) {
	$prefix = '';
	if(!empty($_GET['status']) && $_GET['status'] == 'sent') {
		$form['#attributes'] = array('class' => array('beacon-form-sent'));
		$prefix = '<p class="beacon-form-success-text">Thank you for submitting your request. We will get back to<br>you shortly.</p>';
	}
	// add the success message for javascript
	$form['#attributes']['data-successmsg'] = array('Thank you for submitting your request. We will get back to you shortly.');
	// set the category for this form
	foreach($form['cid']['#options'] as $cid => $name) {
		if($name == 'Resources') {
			$form['cid'] = array(
				'#type'  	=> 'hidden',
				'#value'	=> $cid,
			);
		}
	}
	
	$form['title'] = array(
		'header' => array(
			'#markup' => '<div class="beacon-form-title-header">'. t('What Solutions are you looking for?') .'</div>',
		),
		'#weight' => -10,
	);
	
	// change the message field title to additional details
	$form['message']['#title'] = t('Specific technical questions or document requests');
	$form['message']['#weight'] = 50;
	$form['message']['#resizable'] = FALSE;
	$form['message']['#required'] = FALSE;
	
	// change the submit text to send request
	$form['actions']['submit']['#value'] = t('Send');
	$form['actions']['submit']['#weight'] = 55;
	// add a title to the main info section
	$form['name']['#prefix'] = '<div class="beacon-form-title-header">'. t('Let us know a few more specifics and we’ll reply with answers shortly') .'</div>';
	
	// Change subject to 'Reason for Inquiry' Vocab dropdown
	$solutions = _taxonomy_options_array('resource_form_solutions');
	$form['solutions'] = array(
		'#type' => 'checkboxes',
		'#options' => $solutions,
		'#weight' => -10,
	);
	
	$form['name']['#weight'] = 0;
	$form['mail']['#weight'] = 6;
	// setup custom text fields
	$form['company_name'] = array(
		'#type' => 'textfield',
		'#title' => t('Your company\'s name'),
		'#weight' => 2,
		'#required' => TRUE,
	);
	
	// setup custom text fields
	$form['company_website'] = array(
		'#type' => 'textfield',
		'#title' => t('Your company\'s website'),
		'#weight' => 8,
		'#required' => TRUE,
	);
	
	// setup custom text fields
	$form['phone'] = array(
		'#type' => 'textfield',
		'#title' => t('Your phone number'),
		'#weight' => 10,
		'#required' => TRUE,
	);
	
	// setup custom text fields
	$form['assignees'] = array(
		'#type' => 'textfield',
		'#title' => t('Total number of moves per year'),
		'#weight' => 12,
		'#required' => TRUE,
	);
	
	// hidden value for subject
	$form['subject'] = array(
		'#type' => 'hidden',
		'#value' => 'Polaris Resource Contact Form Inquiry',
	);
	
	// hidden value for subject
	$form['beacon_form'] = array(
		'#type' => 'value',
		'#value' => 'resources',
	);
	
	// wrap form in beacon div
	$form['#prefix'] = '<div class="beacon-contact-form resources">'. $prefix;
	$form['#suffix'] = '</div>';
	
	// add the custom validation functions
	$form['#validation'][] = 'beacon_contact_form_validation';
	$form['#submit'][] = 'beacon_contact_form_submit';
}

/**
 * drupal_get_form validation function
 */
function beacon_resources_contact_form_validation($form, &$form_state) {
}

/**
 * drupal_get_form submit function
 */
function beacon_resources_form_submit($form, &$form_state) {

	$form_state['redirect'] = array(arg(1, $form['#action']) .'/', array('query' => array('status' => 'sent', 'ajax' => (isset($_REQUEST['ajax']) ? $_REQUEST['ajax'] : 'false'))));
	drupal_get_messages(NULL, TRUE);
}

function beacon_resources_form_mail(&$message) {
	// get display variables
	$values = $message['params'];
	$solutions = '';
	foreach($values['solutions'] as $solution) {
		if(!$solution) continue;
		$solution = taxonomy_term_load($solution);
		$solutions .= "  - {$solution->name}\n";
	}
	
	$text = t("Hello Admin,\n\n" .
						"{$values['name']} ({$values['mail']}) has sent a message from the Polaris \n" .
						"Request Resources contact form located at http://polarisgm.com/resources. The message details are as follows:\n\n" .
						"Company name: {$values['company_name']}\n\n" .
						"Company website: {$values['company_website']}\n\n" .
						"Total number of moves per year: {$values['assignees']}\n\n" .
						"Contact phone: {$values['phone']}\n\n" .
						"Selected solutions:\n" .
						$solutions. "\n".
						"Additional details:\n" .
						$values['message']);

	$message['body'] = array($text);
}