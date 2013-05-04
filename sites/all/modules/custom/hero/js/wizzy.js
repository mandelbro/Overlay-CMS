var nicEditors = nicEditors || false;
if(nicEditors) {
	/* START CONFIG */
	nicColorOptions.buttons['forecolor'] = {name : __('Change Text Color'), type : 'nicEditorColorButton', noClose : true};
	/* END CONFIG */

	var nicEditorColorButton = nicEditorAdvancedButton.extend({
		addPane : function() {
				var self = this;
				var colorItems = new bkElement('DIV').setStyle({width: '270px'});
				var colorForm = new bkElement('DIV').setStyle();
				this.ne.selectedInstance.saveRng();
				// set the color of the text

				this.colorSquare = new bkElement('DIV').setStyle({
						'height' : '100px',
						'margin' : '0 0 5px',
						'background-color' : '#000',
						'-webkit-transition' : 'background .3s ease',
						'-moz-transition' : 'background .3s ease',
						'-ms-transition' : 'background .3s ease',
						'transition' : 'background .3s ease',
					})
					.appendTo(colorItems);

				this.pane.append(colorItems.noSelect());

				this.addForm({
					'colorhex' : {type : 'text', txt : 'Color #', value : '000000', style : {'float' : 'right'}},
				});

				this.colorInput = $BK('colorhex');
				// set attributes
				this.colorInput.setAttribute('maxlength', 6);
				// add events
				this.colorInput.addEvent('keyup', this.colorSelect.closure(this));

				/*
				var colorInput = new bkElement('INPUT')
				.setStyle({
						'width' : '100px',
						'float' : 'right',
						'margin' : '5px 5px 0px 2px',
						'padding' : '5px',
						'height' : '15px',
						'font-size' : '12px',
						'border' : '1px solid #666'
					}).noSelect();

					colorInput.setAttribute('maxlength', 6);
					colorInput.setAttribute('type', 'text');
					colorInput.setAttribute('name', 'colorhex');

					// add events
					colorInput.addEvent('keyup', this.colorSelect.closure(this, colorSquare));

					colorInput.appendTo(colorItems);

				var colorInputLabel = new bkElement('LABEL').setStyle({
						'float' : 'right',
						'margin-top' : '5px',
						'padding' : '5px',
						'font-size' : '14px'
					});

				colorInputLabel.innerHTML = 'Color Hex #';

				colorInputLabel.appendTo(colorItems);
				*/
				if(!window.opera) {
					//colorSquare.onmousedown = colorInner.onmousedown = bkLib.cancelEvent;
				}
		},

		colorSelect : function(event) {
			// set the color of the text
			var hex = '#'+ event.target.value;
			if(hex.length < 3) return;
			this.colorSquare.setStyle({'background-color' : hex});
			//this.removePane();
		},

		submit : function(event) {
			// set the color of the text
			var hex = '#'+ this.colorInput.value;
			// set the color of the color square
			this.ne.selectedInstance.restoreRng();
			this.ne.nicCommand('foreColor', hex);
		},

		on : function(colorBorder) {
			colorBorder.setStyle({border : '2px solid #000'});
		},

		off : function(colorBorder,colorCode) {
			colorBorder.setStyle({border : '2px solid '+colorCode});
		}
	});

	var nicEditorBgColorButton = nicEditorColorButton.extend({
		colorSelect : function(c) {
			this.ne.nicCommand('hiliteColor',c);
			this.removePane();
		}
	});


}