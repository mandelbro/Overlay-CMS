
(function($) {

	function PolarisMultifield(field) {
		this.field = $(field);
		this.fields = new Array();
		this.textfield = this.field.find('.form-text:first');
		this.templates = {
			'textfield' : this.textfield.clone().addClass('multifield-form-element multifield-form-text').attr('value', ''),
			'submit' : $('<input type="button" class="form-submit multifield-form-element multifield-form-submit" value="Add Another">')
		};
		// setup event handlers
		this.buildHandlers();
		// add submit button
		this.addSubmit();
		// break up csv into fields
		this.initFields();
	}

	PolarisMultifield.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'addAnotherField' : function(event) {
				// update the id with the value id
				newField = self.addField();
			},
			'changeField' : function(event) {
				// get the target from the event object
				var target = $(event.target);
				// if the target had no value after the change, remove it (as long as there is more than one element of course)
				if(!target.attr('value') && self.fields.length > 1) {
					target.remove();
				}
				// if the target was the last element in the list, add a new one
				if(self.field.find('.multifield-form-text').last().get(0) == event.target) {
					self.addField();
				}
			},
			'formSubmit' : function(event) {
				// if there are no multifield elements on the DOM for this field, allow the form to submit
				if(!self.field.find('.multifield-form-element').length) return;
				// prevent the form from submitting
				event.preventDefault();
				var values = new Array();
				$.each(self.fields, function(i, field) {
					// compile the final value array
					var value = field.attr('value');
					if(!value) return;
					values = values.concat([value]);
				});
				// remove multifields before submit, as not to piss off Drupalz
				self.textfield.attr('value', values.join(',!'));
				self.field.find('.multifield-form-element').remove();
				// rerun the submit, if all the fields were removed, form submission should go off without a hitch
				this.submit();
			}
		}

	};

	PolarisMultifield.prototype.addSubmit = function() {

		// apply submit button handler
		this.templates.submit.on('click', this.handlers.addAnotherField);
		// add submit button to DOM
		this.field.find('.form-item').append(this.templates.submit);

	};

	PolarisMultifield.prototype.initFields = function() {
		var self = this;
		// hide the current input
		this.textfield.hide();
		// get the value of the input
		this.values = this.textfield.attr('value').split(',!');
		// generate new input fields
		$.each(this.values, function(index) {
			self.addField(this);
		});
		// setup listener for form (to remove fields on submit)
		this.field.parents('form:first').on('submit', this.handlers.formSubmit);
	};

	PolarisMultifield.prototype.addField = function(value) {
		// create the index
		var index = this.fields.length,
		// create the new id
		id = this.templates.textfield.attr('id') +'--'+ index,
		// create the new name
		id = this.templates.textfield.attr('name') +'['+ index +']',
		// create the new field and update the id and value
		newField = this.templates.textfield.clone().attr({
			'id' : id,
			'value' : value
		});
		// add the new field to the fields array
		this.fields = this.fields.concat([newField]);
		// setup listener for field changes
		newField.on('change', this.handlers.changeField);
		// append the textfield to the form-item element
		return newField.insertBefore(this.textfield.siblings(':last')).focus();

	};

	var multifield_init = function() {
		var fields;
		// select all multifield fields
		fields = $('.field-widget-polaris-widget-multifield');

		// process each field
		$.each(fields, function(index, field) {
			// create a new instance of multifield for each field
			fields[index] = new PolarisMultifield(field);
		});
	};

	$(multifield_init);

	// fix for pathauto form issue
	var polaris_pathauto_fix = function(){
		var fixPathauto = function(event) {
			$('#edit-path-alias').removeAttr('disabled');
		};

		$('#edit-path-pathauto').on('click', fixPathauto);
		$(window).on('load', fixPathauto);
	};

	if($('#edit-path-alias').length) {
		$(polaris_pathauto_fix);
	}

})( jQuery );