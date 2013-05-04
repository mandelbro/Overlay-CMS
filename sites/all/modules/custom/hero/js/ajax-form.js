
(function($) {
	"use strict";

	function AjaxForm(form, callbacks) {
		this.form = $(form);
		// configurable options
		this.callbacks = $.extend(callbacks, {
			'async'					: true,
			'validate'			: {},
			'submitSuccess'	: function() {},
			'errorDuration' : 4000,
			'errorTransitionDuration' : 300
		});

		this.templates =  {
			'error' : function(message) {
				return $('<div class="form-error-message" style="display:none;"></div>').append(message);
			},
			'success' : function(message) {
				return $('<p class="ajax-form-success-text"></p>').append(message);
			}
		};
		// setup event handlers
		this.initForm();
	}

	AjaxForm.prototype.initForm = function() {
		var self = this;
		// setup event handlers
		this.buildHandlers();
		// setup listener for form (to remove fields on submit)
		this.form.on('submit', this.handlers.formSubmit);
		// add the ajaxForm argument to the query params
		this.addGetParams();
	};

	AjaxForm.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'formSubmit' : function(event) {
				// prevent the form from submitting
				event.preventDefault();
				// remove any existing error tags
				self.form.find('.form-error-message').remove();
				self.form.find('.error').removeClass('error');
				// disable the submit button
				self.form.find('input.form-submit, .form-button-submit').attr('disabled', 'disabled').addClass('disabled').css({
					'opacity' : '0.7'
				});
				// validate form, bail if an error was found
				if(!self.validateForm()) return;
				self.form.trigger('ajaxForm.successBeforeSubmit');
				// submit the form
				self.submitForm();
			}
		}
	};

	AjaxForm.prototype.addGetParams = function() {
		var action = this.form.attr('action');
		if(action.indexOf('?') >= 0) { // action already has a ?
			action += '&ajaxForm=true';
		}
		else {
			action += '?ajaxForm=true';
		}
		// update the form action
		this.form.attr('action', action);
	};

	AjaxForm.prototype.validateForm = function() {
		var self = this,
				status = true,
				$fields = this.form.find('input:not(input[type="submit"], input[type="hidden"]), textarea, select');

		$fields.each(function() {
		 	if(!status) return false;
			// get variables
			var $field = $(this),
					name = $field.attr('name'),
					fieldState;
			// run through any possible scenario where a field might represent the value of this field
			if(self.isRequired($field)) {
				// the concept of 'required' can apply directly to an input element, to a select element, or to a group of elements
				// the value of required can be anything from a string to a checked or selected state so we need to test for a few
				// cases to determine if this element satisfies the 'required' option
				var val;
				if($field.hasClass('required')) {
					val = $field.is('select') ? $field.find('option:selected').val() : $field.val();
				}
				else {
					val = $field.parents('.required:first').find('input:checkbox:checked, input, textarea, option:selected, input:radio:checked').val();
				}
				if(!val) {
					status = self.insertError($field);
					return false; // found an error no need to continue
				}
			}
			// otherwise call the custom validation callback for this element
			// for this we need to make sure only the active value for the input name is sent to the validation script
			if(typeof self.callbacks.validate[name] == 'function') { // make sure we actually have a custom validation function for this element
				fieldState = {
					'value' : self.getFormStateValue(name),
					'field' : $field,
					'message' : ''
				}
				if(self.callbacks.validate[name](fieldState) === false) { // a return of false will trigger the error
					status = self.insertError(fieldState.field, fieldState.message);
					return false; // found an error no need to continue
				}
			}
		});
		// get all required fields and return an error if they don't have an input
		return status;
	};

	AjaxForm.prototype.isRequired = function(field) {
		return (field.hasClass('required') || field.parents('.required')); // the field is required if it or a parent has the required class
	};

	AjaxForm.prototype.getFormStateValue = function(name) {
		var elements = $('[name="'+ name +'"]', this.form);
		if(!elements.length) return;

		if(elements.length > 1) {
			return elements.filter('input:checked').val();
		}
		else if(elements.is('select')) {
			return elements.find('option:selected').val();
		}
		else {
			return elements.val();
		}
	}

	AjaxForm.prototype.insertError = function(field, message) {
		var self = this,
				label = message || (field.attr('data-errormsg') ? field.attr('data-errormsg') : 'Please enter '+ field.find('label').text().replace('*', '').toLowerCase()),
				error = this.templates.error(label);

		// insert the form after the field
		error.insertAfter(field).maximize(this.callbacks.errorTransitionDuration, function() {
			field.addClass('error');
			// re-enable the submit
			self.form.find('input.form-submit, .form-button-submit').attr('disabled', '').removeClass('disabled').css({
				'opacity' : '1'
			});
		});
		// add a timer to hide after 2-3 seconds
		window.clearTimeout(field.data('errorTimer'));
		field.data('errorTimer', window.setTimeout(function() {
			error.minimize(self.callbacks.errorTransitionDuration, function() {
				$(this).remove();
				field.removeClass('error');
			});
		}, this.callbacks.errorDuration));
		// trigger the ajaxForm error event
		this.form.trigger('ajaxForm.error', { 'input' : field, 'form' : self.form, 'message' : error });
		return false;
	};

	AjaxForm.prototype.submitForm = function() {
		var self = this,
				ajax;
		// run the ajax
		ajax = $.ajax({
			url : this.form.attr('action'),
			method : this.form.attr('method'),
			data : this.form.serialize(),
			async : this.callbacks.async,
			type : this.form.attr('method')
		});

		// replace the content with a send message
		ajax.done(function(data, status, request) {
			var json = request.getResponseHeader('Content-type') == 'text/json' ? ($.parseJSON(data).ajaxForm || {})  : false,
					html = !json ? $(data) : false,
					messages = json ? $(json.messages || '').filter('messages.error') : html.find('.messages.error');
			console.log(json);
			console.log(request.getAllResponseHeaders());
			if(!messages.length) { // no errors
				self.form.addClass('ajax-form-sent');
					var form = $(this),
							message = form.attr('data-successmsg') || 'Thank you for your message. We will get back to you shortly';
					// run the custom callback if it's available
					if(self.callbacks.submitSuccess) {
						self.callbacks.submitSuccess(data, json);
					}
					// json redirect
					else if(json.redirect) {
						window.location.replace(json.redirect);
					}
					//
					else if(self.form.find('input[name="ajaxForm_redirect"]').length) {
						// if the ajaxForm_redirect input is specified, redirect dat mutha
						window.location.replace(self.form.find('input[name="ajaxForm_redirect"]').val());
					}
					else {
						self.form.animate({ 'opacity' : 0 }, 300, function() {
							// remove the form
							$(this).hide();
							// add the success message
							self.form.append(messages.hide());
						});
					}
					// trigger the ajaxFormSuccess event
					self.form.trigger('ajaxForm.success', { 'form' : self.form, 'data' : data, 'json' : json });
			}
			else { // errors
				self.form.find('input').addClass('error');
				self.form.append(messages.hide());
				Drupal.behaviors.formErrorMessages.attach();
				// re-enable the submit
				self.form.find('input.form-submit, .form-button-submit').attr('disabled', '').removeClass('disabled').css({
					'opacity' : '1'
				});
				// get rid of error messages
				window.clearTimeout(self.form.find('input.error:first').data('errorTimer'));
				self.form.find('input.error:first').data('errorTimer', window.setTimeout(function() {
					self.form.find('.form-error-message').animate({opacity : '0'}, 300, function(){
						$(this).remove();
						self.form.find('input.error').removeClass('error');
					});
				}, self.callbacks.errorDuration));
			}
		});

	};

	/**
	 * jQuery.ajaxForm
	 * Builds you a sweet ajax webform
	 */
	$.fn.ajaxForm = function(callbacks) {
		var $form = this.length > 1 ? $(this[0]) : this;
		$form.data('ajaxForm', new AjaxForm($form, callbacks || {}));
		return $form;
	};

})( jQuery );