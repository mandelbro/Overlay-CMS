
(function($) {

	function HeroMultifield(button) {
		this.button = button;
		this.field = button.siblings('.form-item:first');
		this.fieldData = button.siblings('.hero-add-another-data');
		this.fields = this.field.parents('.fieldset-wrapper:first').children('.form-item');
		this.templates = {
			'field' : $('<div>').append(this.field.clone()).html()
		};
		// setup event handlers
		this.buildHandlers();
		// add submit button
		this.addSubmit();
		// break up csv into fields
		this.initFields();
	}

	HeroMultifield.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'addAnotherField' : function(event) {
				event.preventDefault();
				// update the id with the value id
				self.addField();
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
				// re-calculate the data input
				self.getData();
			}
		}

	};

	HeroMultifield.prototype.addSubmit = function() {

		// apply submit button handler
		this.button.on('click', this.handlers.addAnotherField);

	};

	HeroMultifield.prototype.initFields = function() {
		var self = this;
		// setup listener for form (to remove fields on submit)
		this.field.parents('form:first').on('submit', this.handlers.formSubmit);
	};

	HeroMultifield.prototype.addField = function(value) {
		// create the index
		var index = this.fields.length,
				newField;
		// create the new field and update the id and value
		newField = $(this.templates.field.replaceAll('0', index));
		// clear all possible values
		newField.find('input, textarea, select').val('');
		// add the new field to the fields array
		this.fields = this.fields.add(newField);
		// re-calculate the data input
		this.getData();
		// append the textfield to the form-item element
		return newField.insertBefore(this.field.siblings(':last')).find('textarea').focus();

	};

	HeroMultifield.prototype.getData = function() {
		var field_values = new Array();
		$.each(this.fields, function(i) {
			field_values[i] = {};
			$(this).find('input, textarea, select').each(function(j){
				var field = $(this);
				field_values[i][field.attr('name')] = field.val();
			});
		});

		this.fieldData.val(JSON.stringify(field_values));
	};

	var multifield_init = function() {
		// select all multifield fields
		var elements = $('.hero-add-another-field'),
				fields = new Array();
		// process each field
		elements.each(function(index) {
			// create a new instance of multifield for each field
			fields[index] = new HeroMultifield($(this));
		});
	};

	$(multifield_init);

	/*
	// fix for pathauto form issue
	var hero_pathauto_fix = function(){
		var fixPathauto = function(event) {
			$('#edit-path-alias').removeAttr('disabled');
		};

		$('#edit-path-pathauto').on('click', fixPathauto);
		$(window).on('load', fixPathauto);
	};

	$(hero_pathauto_fix);
	*/

})( jQuery );

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}