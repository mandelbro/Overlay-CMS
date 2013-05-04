<?php

function ursaminor_form_system_theme_settings_alter(&$form, $form_state) {
	$form['custom_theme_settings'] = array(
		'#type'		=> 'fieldset',
		'#title'	=> 'Custom Theme Settings',
    '#description'   => t("Modify site information like service URL's and contact info."),
		'#weight'	=> -1,
	);
	
  $form['custom_theme_settings']['linkedin_link'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Linkedin URL'),
    '#default_value' => theme_get_setting('linkedin_link'),
    '#description'   => t("The link to your LinkedIn Page."),
  );
	
  $form['custom_theme_settings']['phone_number'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Phone Number'),
    '#default_value' => theme_get_setting('phone_number'),
    '#description'   => t("Displayed on the contact and request demo pages."),
  );
	
  $form['custom_theme_settings']['fax_number'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Fax Number'),
    '#default_value' => theme_get_setting('fax_number'),
    '#description'   => t("Displayed on the contact page."),
  );
	
  $form['custom_theme_settings']['info_email'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Info Email Address'),
    '#default_value' => theme_get_setting('info_email'),
    '#description'   => t("Displayed on the contact and request demo pages."),
  );
	
  $form['custom_theme_settings']['support_email'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Support Email Address'),
    '#default_value' => theme_get_setting('support_email'),
    '#description'   => t("Displayed on the contact page."),
  );
	
  $form['custom_theme_settings']['recruit_email'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Recruiting Email Address'),
    '#default_value' => theme_get_setting('recruit_email'),
    '#description'   => t("Displayed on the contact page."),
  );
}