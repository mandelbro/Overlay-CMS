
(function($) {

	function BeaconForm(form) {
		this.form = $(form);
		this.templates =  {
			'error' : function(message) {
				return $('<div class="beacon-form-error"></div>').append(message);
			},
			'success' : function(message) {
				return $('<p class="beacon-form-success-text"></p>').append(message);
			}
		};
		// setup event handlers
		this.buildHandlers();
		// setup event handlers
		this.initForm();
	}
	
	BeaconForm.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'formSubmit' : function(event) {
				// prevent the form from submitting
				event.preventDefault();
				// remove any existing error tags
				self.form.find('.beacon-form-error').remove();
				// validate form, bail if an error was found
				if(!self.validateForm(this)) return;
				// disable the submit button
				self.form.find('input.form-submit').attr('disabled', 'disabled').css({
					'opacity' : '0.7'
				});
				// submit the form
				self.submitForm();
			}
		}
		
	};
	
	BeaconForm.prototype.initForm = function() {
		var self = this;
		// setup listener for form (to remove fields on submit)
		this.form.on('submit', this.handlers.formSubmit);
	};
	
	BeaconForm.prototype.validateForm = function(form) {
		var self = this,
				status = true,
				fields = $(form).find('.form-required');
		
		 fields.each(function() { 
		 	if(!status) return;
			// get variables
			var field = $(this).closest('.form-item');
			// get any possiblethe value fo
			if(!field.find('input:checkbox:checked, input, textarea, option:selected, input:radio:checked').val()) {
				status = self.insertError(field);
			}
		});
		// get all required fields and return an error if they don't have an input
		return status;
	};

	BeaconForm.prototype.insertError = function(field) {
		var input = field.find('input, textarea, select'),
				label = input.attr('data-errormsg') ? input.attr('data-errormsg') : 'Please enter '+ field.find('label').text().replace('*', '').toLowerCase(),
				error = this.templates.error(label).css({ opacity : 'hide' });
				
		// insert the form after the input
		input.after(error.animate({ opacity : 'show' }, 300));
		// add a timer to hide after 2-3 seconds
		window.setTimeout(function() {
			error.animate({opacity : '0'}, 300, function(){
				$(this).hide();
			});
		}, 2000);
		return false;
	};
	
	BeaconForm.prototype.submitForm = function() {
		var self = this,
				leForm = this.form.find('form:first'),
				ajax;
				
		// run the ajax
		ajax = $.ajax({
			url : leForm.attr('action'),
			dataType : 'json',
			data : leForm.serialize() +'&ajax=true',
			type : leForm.attr('method')
		});
		
		// replace the content with a send message
		ajax.done(function(data) {
			var content = $(data.content),
					messages = $(data.variables.messages);
			if(!messages.length && !messages.hasClass('.error')) { // no errors
				self.form.addClass('beacon-form-sent');
				leForm.animate({ 'opacity' : 0 }, 300, function() {
					var form = $(this),
							message = form.attr('data-successmsg') || 'Thank you for your message. We will get back to you shortly';
					// remove the form
					$(this).hide();
					// add the success message
					self.form.prepend(self.templates.success(message))
				});
			}
			else { // errors
				leForm.remove();
				content.find('.beacon-contact-form .form-item:first').before(messages).before('<div class="clear"></div>');
				self.form.prepend(
					content.find('.beacon-contact-form form')
				);
			}
		});
		
	};

	var beaconForm_init = function() {
		var forms = new Array();
		// select all multifield fields
		// process each field
		$('.beacon-contact-form').each(function(index, form) {
			// create a new instance of multifield for each field
			forms[index] = new BeaconForm(form);
		});
	};
	
	$(beaconForm_init);
	
})( jQuery );