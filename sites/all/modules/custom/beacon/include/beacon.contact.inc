<?php

/**
 * beacon.contact.inc
 * Code for generating the Sitewide Contact Beacon Form
 */

/**
 * drupal_get_form callback
 */
function beacon_contact_form_block() {
	$content = array();
	
	$content['main'] = drupal_get_form('contact_site_form');
	
	return $content;
}

/**
 * drupal_get_form validation function
 */
function beacon_contact_form(&$form, &$form_state) {
	$prefix = '';
	if(!empty($_GET['status']) && $_GET['status'] == 'sent') {
		$form['#attributes'] = array('class' => array('beacon-form-sent'));
		$prefix = '<p class="beacon-form-success-text">Thank you for your message. We will get back to you shortly.</p>';
	}
	// set the category for this form
	foreach($form['cid']['#options'] as $cid => $name) {
		if($name == 'Contact') {
			$form['cid'] = array(
				'#type'  	=> 'hidden',
				'#value'	=> $cid,
			);
		}
	}
	
	$form['title'] = array(
		'header' => array(
			'#markup' => '<div class="beacon-form-title-header">'. t('Have a question?') .'</div>',
		),
		'#weight' => -10,
	);
	
	// change the message field title to additional details
	$form['message']['#title'] = t('Additional details');
	$form['message']['#weight'] = 45;
	$form['message']['#resizable'] = FALSE;
	$form['message']['#attributes'] = array(
		'data-errormsg' => 'Please add a message',
	);
	
	// change the submit text to send request
	$form['actions']['submit']['#value'] = t('Send');
	$form['actions']['submit']['#weight'] = 50;
	
	// Change subject to 'Reason for Inquiry' Vocab dropdown
	$inquiry_options = _taxonomy_options_array('contact_inquiry_reasons');
	$form['inquiry_reason'] = array(
		'#type' => 'select',
		'#title' => t('Reason for inquiry'),
		'#options' => $inquiry_options,
	);
	
	// hidden value for subject
	$form['subject'] = array(
		'#type' => 'hidden',
		'#value' => 'Polaris General Contact Form Inquiry',
	);
	
	// hidden value for subject
	$form['beacon_form'] = array(
		'#type' => 'value',
		'#value' => 'contact',
	);
	
	// put all the left column fields into the left column
	$form['left_column'] = array(
		'#prefix' => '<div class="beacon-contact-form-left-column form-item">',
		'#suffix' => '<div class="clear"></div></div>',
		'name' => $form['name'],
		'mail' =>	$form['mail'],
		'inquiry_reason' => $form['inquiry_reason'],
	);
	
	unset($form['mail']);
	unset($form['name']);
	unset($form['inquiry_reason']);
	
	// wrap form in beacon div
	$form['#prefix'] = '<div class="beacon-contact-form contact">'. $prefix;
	$form['#suffix'] = '<div class="clear"></div></div>';
	
	// add the custom validation functions
	$form['#validation'][] = 'beacon_contact_form_validation';
	$form['#submit'][] = 'beacon_contact_form_submit';
}

/**
 * drupal_get_form validation function
 */
function beacon_contact_form_validation($form, &$form_state) {
}

/**
 * drupal_get_form submit function
 */
function beacon_contact_form_submit($form, &$form_state) {

	$form_state['redirect'] = array(arg(1, $form['#action']) .'/', array('query' => array('status' => 'sent', 'ajax' => (isset($_REQUEST['ajax']) ? $_REQUEST['ajax'] : 'false'))));
	drupal_get_messages(NULL, TRUE);
}

function beacon_contact_form_mail(&$message) {
	// get display variables
	$values = $message['params'];
	$inquiry_reason = taxonomy_term_load($values['inquiry_reason']);
	$text = t("Hello Admin,\n\n" .
						"{$values['name']} ({$values['mail']}) has sent a message from the Polaris \n" .
						"contact form located at http://polarisgm.com/contact. The message details are as follows:\n\n" .
						"Reason for inquiry: {$inquiry_reason->name}\n\n" .
						"Additional details:\n" .
						$values['message']);

	$message['body'] = array($text);
}