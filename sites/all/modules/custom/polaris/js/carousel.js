
(function($) {

	// start the Carousel class
	var Carousel = {
		'templates' : {
			'next' : function(shade) {
				shade = shade || 'transparent';
				return '<a class="polaris-carousel-control next '+ shade +'" href="#"><span class="polaris-carousel-control-button"></span></a>';
			},
			'previous' : function(shade) {
				shade = shade || 'transparent';
				return '<a class="polaris-carousel-control previous '+ shade +'" href="#"><span class="polaris-carousel-control-button"></span></a>';
			},
			'bullet' : function(rel, color) {
				color = color || 'white';
				return '<a rel="'+ rel +'" class="polaris-carousel-bullet '+ color +'" href="#"></a>';
			}
		}
	};

	function PolarisFader(element) {
		// setup the initial elements
		this.carousel = element;
		this.currentSlide = this.carousel.find('.polaris-carousel-slide:first').addClass('active first');

		// configuration variables
		this.speed = 800; // transition speed
		this.interval = parseInt(this.carousel.attr('data-carousel-interval')) || 10000; // timed interval speed

		// build event handlers
		this.buildHandlers();
		// build controls
		this.buildControls();
	}

	PolarisFader.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'nextSlide' : function(event) {
				if(event) event.preventDefault();
				// clear the timer if necessary
				if(self.timer) {
		      window.clearInterval(self.timer);
		      delete self.timer;
      	}
				// make sure this isn't the last element
				if(!self.currentSlide.next('.polaris-carousel-slide').length) {
					// do the fade animation
					self.doFade(self.currentSlide.siblings('.polaris-carousel-slide:first'));
					//update the bullets
					self.bullets.find('.polaris-carousel-bullet:first').addClass('active').siblings().removeClass('active');
				}
				else {
					// do the fade animation
					self.doFade(self.currentSlide.next('.polaris-carousel-slide'));
					//update the bullets
					self.bullets.find('.active').next().addClass('active').siblings().removeClass('active');
				}

			},
			'previousSlide' : function(event) {
				event.preventDefault();
				// clear the timer if necessary
				if(self.timer) {
		      window.clearInterval(self.timer);
		      delete self.timer;
      	}
				// make sure this isn't the first element
				if(!self.currentSlide.prev('.polaris-carousel-slide').length) {
					// do the fade animation
					self.doFade(self.currentSlide.siblings('.polaris-carousel-slide:last'));
					//update the bullets
					self.bullets.find('.polaris-carousel-bullet:last').addClass('active').siblings().removeClass('active');
				}
				else {
					// do the fade animation
					self.doFade(self.currentSlide.prev('.polaris-carousel-slide'));
					//update the bullets
					self.bullets.find('.active').prev().addClass('active').siblings().removeClass('active');
				}
			},
			'timerSwitch' : function() {
				// make sure this isn't the last element
				if(!self.currentSlide.next('.polaris-carousel-slide').length) {
					// do the fade animation
					self.doFade(self.currentSlide.siblings('.polaris-carousel-slide:first'));
					//update the bullets
					self.bullets.find('.polaris-carousel-bullet:first').addClass('active').siblings().removeClass('active');
				}
				else {
					// do the fade animation
					self.doFade(self.currentSlide.next('.polaris-carousel-slide'));
					//update the bullets
					self.bullets.find('.active').next().addClass('active').siblings().removeClass('active');
				}

			},
			'jumpToSlide' : function(event) {
				event.preventDefault();
				// clear the timer if necessary
				if(self.timer) {
		      window.clearInterval(self.timer);
		      delete self.timer;
      	}
				var clicked = $(event.target).addClass('active');
				clicked.siblings().removeClass('active');
				var target = self.carousel.find(clicked.attr('rel'));
				// do the fade animation
				self.doFade(target);
			}
		};
	};

	PolarisFader.prototype.doFade = function(on) {
		var self = this,
				current = this.currentSlide;

		if(on.get(0) == this.currentSlide.get(0)) return;

		if(!Modernizr.csstransitions) {
			// hide the current slide and show the next
			this.currentSlide.find('*').css('z-index', function(index){index - 10}).animate({opacity : 0 }, {
				duration : self.speed,
				complete : function() {
					self.currentSlide.removeClass('active first');
				}
			});
			on.addClass('active').find('*').css('z-index', function(index){index + 10}).animate({opacity : 1 }, {
				duration : self.speed,
				complete : function() {
					self.currentSlide = on;
				}
			});
		}
		else {
			// hide the current slide and show the next
			this.currentSlide.removeClass('active');
			this.currentSlide = on.addClass('active');
		}
	};

	PolarisFader.prototype.buildControls = function() {
		var self = this,
				carouselLoaded = function() {
					// if it's already showing don't need to proceed
					if(self.carousel.is(':visible')) return;
					self.carousel.show().removeClass('loading');
				};
		// hide on load
		this.carousel.hide();
		// first run when the image is loaded, loads faster on first load
		this.currentSlide.find('img').load(carouselLoaded);
		// run again when the whole page has loaded, workaround for jQuery derpage
		// @see http://api.jquery.com/load-event/
		$(document).on('carouselJS.loaded', carouselLoaded);

		if(this.carousel.hasClass('no-controls') && this.carousel.hasClass('no-bullets')) return;
		this.next = $(Carousel.templates.next());
		this.previous = $(Carousel.templates.previous());
		this.bullets = $('<div class="polaris-carousel-bullet-list"></div>');

		// add handlers to the next/prev elements
		this.previous.on('click touchend', this.handlers.previousSlide);
		this.next.on('click touchend', this.handlers.nextSlide);

		// add the control elements and bullets
		if(!this.carousel.hasClass('no-controls')) {
			this.carousel
				.append(this.previous)
				.append(this.next)
		}

		if(!this.carousel.hasClass('no-bullets')) {
			this.carousel
				.append(this.bullets);
		}

		// add the breadcrumbs
		this.carousel.find('.polaris-carousel-slide').each(function(index, slide) {
			slide = $(slide);
			// add a unique class to select the element with the bullet's rel attribute
			slide.addClass('polaris-carousel-slide-'+ index);
			// build the array of bullet elements
			self.bullets.append(Carousel.templates.bullet('.polaris-carousel-slide-'+ index));
		});

		// set the first bullet as active
		this.bullets.find('.polaris-carousel-bullet:first').addClass('active');
		// add handlers to the bullet elements
		this.bullets.find('.polaris-carousel-bullet').on('click touchend', this.handlers.jumpToSlide);

		// set the timed slide switcher
		this.timer = window.setInterval(self.handlers.timerSwitch, self.interval);

	};

	/**
	 * PolarisSlider
	 * Object to handle the controls and transitions of a carousel slider
	 */
	function PolarisSlider(element) {

		// setup the initial elements
		this.carousel = element;
		//configuration variables
		this.speed = parseInt(this.carousel.attr('data-carousel-speed')) || 800; // timed interval speed
		this.interval = parseInt(this.carousel.attr('data-carousel-interval')) || 10000; // timed interval speed
		this.autoplay = this.carousel.is('[data-carousel-autoplay]');
		this.fadeSlide = this.carousel.is('[data-carousel-fadeslide]');
		this.rail = this.carousel.find('.polaris-carousel-slide-wrapper');
		this.index = 0;
		this.count = this.carousel.find('.polaris-carousel-slide').length;

		// status variables
		this.userIsTouchingSlider = false; // ensures we only act if user started in the slider
		this.userIsSwipingSlider = false; // ensures slider doesn't take over user scroll attempts

		// build event handlers
		this.buildHandlers();
		// build controls
		this.buildControls();
	}

	PolarisSlider.prototype.buildHandlers = function() {
		var self = this,
				lastTouch;
		this.handlers = {
			'nextSlide' : function(event) {
				event.preventDefault();
				// make sure this isn't the last element
				if(self.index == (self.count - 1)) return;
				// clear the timer if necessary
				if(self.timer) {
		      window.clearInterval(self.timer);
		      delete self.timer;
      	}
				// update the current index
				self.index++;
				self.moveSlides('forward');
				//update the bullets
				self.bullets.find('.active').next().addClass('active').siblings().removeClass('active');
			},
			'previousSlide' : function(event) {
				event.preventDefault();
				// make sure this isn't the first element
				if(self.index == 0) return;
				// update the current index
				self.index--;
				self.moveSlides('back');
				//update the bullets
				self.bullets.find('.active').prev().addClass('active').siblings().removeClass('active');
				if(self.timer) {
		      window.clearInterval(self.timer);
		      self.timer = true; // stop the timer from starting again on future clicks
				}
			},
			'swipeSlide' : function(event) {
				event.preventDefault();
				// make sure this isn't the first element
				if(self.index == 0) return;
				// update the current index
				self.index--;
				self.moveSlides('back');
				//update the bullets
				self.bullets.find('.active').prev().addClass('active').siblings().removeClass('active');
				if(self.timer) {
		      window.clearInterval(self.timer);
		      self.timer = true; // stop the timer from starting again on future clicks
				}
			},
			'timerSwitch' : function() {
				// make sure this isn't the last element
				if(self.index == (self.count - 1)) {
		      window.clearInterval(self.timer);
		      self.timer = true; // stop the timer from starting again on future clicks
		      return; // don't move it forward any further
				}
				// update the current index
				self.index++;
				self.moveSlides('forward');
				//update the bullets
				self.bullets.find('.active').next().addClass('active').siblings().removeClass('active');
			},
			'jumpToSlide' : function(event) {
				event.preventDefault();
				var clicked = $(event.target).addClass('active'),
						direction = self.index > clicked.attr('rel') ? 'back' : 'forward';
				clicked.siblings().removeClass('active');
				self.index = clicked.attr('rel');
				self.moveSlides(direction);
				if(self.timer) {
		      window.clearInterval(self.timer);
		      self.timer = true; // stop the timer from starting again on future clicks
				}
				self.railX = -(self.index * self.carousel.find('.polaris-carousel-slide').width());
			},
			'touchSwipe' : function(e) {
				var touch = e.originalEvent;
				if(e.type == 'touchstart') {
					self.userIsTouchingSlider = true;
					// record the touch
					lastTouch = event;
					// disable the transition
					self.rail.css3('transition-duration', '0s');
				}
				if(e.type == 'touchmove' && self.userIsTouchingSlider) {
					// determine if the user is swiping
					self.userIsSwipingSlider = self.userIsSwipingSlider || isTouchMoveASwipe(lastTouch, touch);
					// user isn't trying to swipe, let them be
					if(!self.userIsSwipingSlider) {
						self.userIsTouchingSlider = false;
						return;
					}
					e.preventDefault();
					var motion = getSwipeMotion(lastTouch, touch),
							// get the method if this is the last move
							method = motion.x > 0 ? 'floor' : 'ceil';
					// user is swiping, do mobile move
					self.moveSlidesMobile(motion);
					// get the momentum if this is the last move
					momentum = {
						'distance' : motion.x
					};
					// move the touch pointer
					lastTouch = touch;
					// update the index
					if(self.railX > 0) {
						self.index = 0;
					}
					else {
						self.index = Math[method](self.count * ((Math.abs(self.railX - (self.rail.width()/3))) / (self.rail.width() * self.count)));
						// do a final check on the index, the floor/ceiling thing can get rowdy
						self.index = self.index <= self.count - 1 ? self.index : self.count - 1;
					}
					// update the bullets
					self.bullets.find('a:nth-child(' + (self.index + 1) + ')').addClass('active').siblings().removeClass('active');
				}
				else if(self.userIsSwipingSlider && e.type == 'touchend') {
					var motion = getSwipeMotion(lastTouch, touch.changedTouches[0]);
							// get the momentum if this is the last move
							momentum.time = touch.timeStamp - lastTouch.timeStamp;
					// determine which index to snap to
					if(self.railX > 0) {
						self.index = 0;
					}
					else if (Math.abs(self.railX) > (self.rail.width() * (self.count - 1))) {
					}
					else {
					}
					// reset the touch indicators
					self.userIsTouchingSlider = false;
					self.userIsSwipingSlider = false;
					self.doMomentumMove(momentum, function() {
						self.rail.css3('transition-duration', self.railTransitionDuration);
						// move the slider
						self.moveSlides();
						self.railX = -(self.index * self.carousel.find('.polaris-carousel-slide').width());
						window.setTimeout(function() {
							// enable the transition
							self.rail.css3('transition-duration', (self.railTransitionDuration * 2));
						}, self.railTransitionDuration);
					});
				}
			}
		};
	};

	PolarisSlider.prototype.moveSlides = function(direction) {
		var self = this;
		if(Modernizr.csstransitions) {
			if(Modernizr.csstransforms3d) {
				// move the rail to the index space
				this.rail.css3({ 'transform' : 'translate3d('+ -(this.index * 100) +'%, 0, 0)' });
				if(this.fadeSlide) {
					self.rail.find('.polaris-carousel-slide-'+ self.index).css3({ 'transform' : 'translate3d(0, 0, 0)' }).css('opacity', 1);
					if(direction == 'forward') {
						self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().css3({ 'transform' : 'translate3d(-75%, 0, 0)' }).css('opacity', 0);
						self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().css3({ 'transform' : 'translate3d(75%, 0, 0)' }).css('opacity', 0);
					}
					else {
						self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().css3({ 'transform' : 'translate3d(-75%, 0, 0)' }).css('opacity', 0);
						self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().css3({ 'transform' : 'translate3d(75%, 0, 0)' }).css('opacity', 0);
					}
				}
			}
			else if(Modernizr.csstransforms) {
				// move the rail to the index space
				this.rail.css3({ 'transform' : 'translate('+ -(this.index * 100) +'%, 0, 0)' });
				if(this.fadeSlide) {
					self.rail.find('.polaris-carousel-slide-'+ self.index).css3({ 'transform' : 'translate(0, 0, 0)' }).css('opacity', 1);
					if(direction == 'forward') {
						self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().css3({ 'transform' : 'translate(-75%, 0, 0)' }).css('opacity', 0);
						self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().css3({ 'transform' : 'translate(75%, 0, 0)' }).css('opacity', 0);
					}
					else {
						self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().css3({ 'transform' : 'translate(-75%, 0, 0)' }).css('opacity', 0);
						self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().css3({ 'transform' : 'translate(75%, 0, 0)' }).css('opacity', 0);
					}
				}
			}
			else {
				// move the rail to the index space
				this.rail.css({ left : -(this.index * 100) +'%' });
				if(this.fadeSlide) {
					self.rail.find('.polaris-carousel-slide-'+ self.index).css({ 'left' : '0', 'opacity' : 1 });
					if(direction == 'forward') {
						self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().css({ 'left' : '-75%', 'opacity' : 0 });
						self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().css({ 'left' : '75%', 'opacity' : 0 });
					}
					else {
						self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().css({ 'left' : '-75%', 'opacity' : 0 });
						self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().css({ 'left' : '75%', 'opacity' : 0 });
					}
				}
			}
		}
		else {
			// hide the current slide and show the next
			this.rail.animate({ left : -(this.index * 100) +'%' }, this.speed);
			if(this.fadeSlide) {
				self.rail.find('.polaris-carousel-slide-'+ self.index).animate({ 'left' : '0', 'opacity' : 1 }, this.speed);
				if(direction == 'forward') {
					self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().animate({ 'left' : '-75%', 'opacity' : 0 }, this.speed);
					self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().animate({ 'left' : '75%', 'opacity' : 0 }, this.speed);
				}
				else {
					self.rail.find('.polaris-carousel-slide-'+ self.index).prevAll().animate({ 'left' : '-75%', 'opacity' : 0 }, this.speed);
					self.rail.find('.polaris-carousel-slide-'+ self.index).nextAll().animate({ 'left' : '75%', 'opacity' : 0 }, this.speed);
				}
			}
		}
	};

	PolarisSlider.prototype.moveSlidesMobile = function(motion) {
		this.railX = this.railX + motion.x;
		this.rail.css3('transform', 'translate3d(' + this.railX + 'px, 0, 0)');
	};

	PolarisSlider.prototype.doMomentumMove = function(momentum, afterMove) {
		var self = this,
				v = (momentum.distance/momentum.time),
				inertialDistance = v * momentum.distance,
				timeoutDuration = Math.abs(200/v * v),
				intervalDuration = 1,
				interval, inertia = 0;

		// normalize v (speed limit)
		//v = v > 1 ? 1 : v;
		// get the timeout
		if(Math.abs(v) >= 0.5) {
			interval = window.setInterval(function() {
				inertia = inertia + 1.5;
				self.railX = self.railX + (momentum.distance/inertia);
				self.rail.css3('transform', 'translate3d(' + self.railX + 'px, 0, 0)');
			}, 1);

			window.setTimeout(function() {
				window.clearInterval(interval);
				afterMove();
			}, timeoutDuration);
		}
		else {
			afterMove();
		}
	};

	/*
	PolarisSlider.prototype.doMomentumMove = function(momentum, afterMove) {
		var self = this,
				velocity = momentum.distance / momentum.time, // pixels per milisecond
				inertialDuration = Math.abs(velocity * momentum.time), // how far it would go at constant speed
				inertialDistance = getElementInertia(this.rail, velocity) * 5; // movement at current velocity, times the inertia of the element

		this.railX = this.railX + inertialDistance;
		// setup the inertial easing function
		this.rail.css3('transition-easing', "cubic-bezier(0.100, 1.000, 0.000, 0.000)");
		// setup the duraion of the momentum move
		this.rail.css3('transition-duration', inertialDuration + 'ms');
		// execute the move
		this.rail.css3('transform', 'translate3d(' + this.railX + 'px, 0, 0)');
		window.setTimeout(function() {
			// afterMove();
		}, inertialDuration);
	};
	*/

	PolarisSlider.prototype.buildControls = function() {
		var self = this;
		// apply loading class
		this.carousel.addClass('loading').hide();
		$(window).load(function() {
			self.carousel.show();
			this.setTimeout(function() {self.carousel.removeClass('loading');}, 200);
		});
		// @TODO probably want to run a timer instead or something
		if(this.carousel.hasClass('no-controls') && this.carousel.hasClass('no-bullets')) return;
		this.next = $(Carousel.templates.next()),
		this.previous = $(Carousel.templates.previous());
		this.bullets = $('<div class="polaris-carousel-bullet-list"></div>')

		// add the control elements and bullets
		if(!this.carousel.hasClass('no-controls')) {
			this.carousel
				.append(this.next)
				.append(this.previous);
		}

		if(!this.carousel.hasClass('no-bullets')) {
			this.carousel
				.append(this.bullets);
		}

		// add handlers to the next/prev elements
		this.previous.on('click touchend', this.handlers.previousSlide);
		this.carousel.find('.polaris-carousel-control.next').on('click touchend', this.handlers.nextSlide);

		if(Modernizr.touch) {
			// get original transition
			this.railTransitionDuration = (parseFloat(this.rail.css3('transition-duration'))/1.5) + 's';
			// add the touch handler to the rail
			this.rail.on('touchstart touchend touchmove', this.handlers.touchSwipe);
			// setup the railX property
			this.railX = 0;
		}

		// add the breadcrumbs
		this.carousel.find('.polaris-carousel-slide').each(function(index, slide) {
			slide = $(slide);
			// add a unique class to select the element with the bullet's rel attribute
			slide.addClass('polaris-carousel-slide-'+ index);
			// build the array of bullet elements
			self.bullets.append(Carousel.templates.bullet(index, 'purple'));

		});

		// set the first bullet as active
		this.bullets.find('.polaris-carousel-bullet:first').addClass('active');
		// add handlers to the bullet elements
		this.bullets.find('.polaris-carousel-bullet').on('click touchend', this.handlers.jumpToSlide);
		// set the timed slide switcher
		if(this.autoplay) this.timer = window.setInterval(self.handlers.timerSwitch, self.interval);
		// z-order the slides
		this.carousel.find('.polaris-carousel-slide').zOrder();
		if(this.fadeSlide) {
			if(Modernizr.csstransforms3d) {
				this.carousel.find('.polaris-carousel-slide:not(.polaris-carousel-slide:first)').css('opacity', 0).css3({ 'transform' : 'translate3d(75%, 0, 0)' });
				this.rail.css3('transition-duration', '.8s');
			}
			else if(Modernizr.csstransforms) {
				this.carousel.find('.polaris-carousel-slide:not(.polaris-carousel-slide:first)').css('opacity', 0).css3({ 'transform' : 'translate(75%, 0, 0)' });
				this.rail.css3('transition-duration', '.8s');
			}
			else {
				this.rail.css3('transition-duration', '.8s');
				this.speed = this.speed + 200;
				this.carousel.find('.polaris-carousel-slide:not(.polaris-carousel-slide:first)').css({ 'opacity' : 0, 'left' : '75%' });
			}
		}
	};

	var isTouchMoveASwipe = function(eventStart, eventEnd) {
		// here we want to determine based on the start and end coordinates, whether this was a horizontal swipe
		// what we want to know is if this was a mostly sideways movement
		var motion = getSwipeMotion(eventStart, eventEnd);
		// if the ratio between the x and y movements is between -1 and 1, we have a sideways swipe
		return (motion.y == 0 || Math.abs(motion.y/motion.x) < 1);
	};

	var getSwipeMotion = function(eventStart, eventEnd) {
		return {
			x : eventEnd.pageX - eventStart.pageX, // how much did this swipe move left or right?
			y : eventEnd.pageY - eventStart.pageY // how much did this swipe move up or down?
		};
	};

	var getElementInertia = function(element, velocity) {
		// inertia is a function of mass, velocity, and the friction of the medium an element is on
		// so what we need is a proxy for mass, I propose the area of the element, the velocity, a
		// parameter, and a constant for friction, which I'm going to tweak a bit
		var mass = element.width() * element.height(),
				friction = 1;
		return velocity * (mass / (friction * mass)); // inertial velocity is lowered by friction and mass, so we can increase friction to slow the sucker down
	};

	/**
	 * PolarisCarousel
	 * Object to handle the controls and transitions of a carousel slider
	 */
	function PolarisCarousel(element) {
		//configuration variables
		// setup the initial elements
		this.carousel = element;
		this.group = this.carousel.find('.polaris-carousel-list ul');
		this.listEnd = ((this.group.find('.polaris-carousel-item').length) * 20);
		// activates the 1st slide
		this.currentSlide = this.carousel.find('.polaris-carousel-item:first').addClass('active');
		// build event handlers
		this.buildHandlers();
		// build controls
		this.buildControls();
	}

	PolarisCarousel.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'nextSlide' : function(event) {
				event.preventDefault();
				// make sure this isn't the last element
				if(!self.currentSlide.next('.polaris-carousel-item').length) return;
				// move the elements
				self.moveSlides(self.currentSlide.next('.polaris-carousel-item'));
			},
			'previousSlide' : function(event) {
				event.preventDefault();
				// make sure this isn't the first element
				if(!self.currentSlide.prev('.polaris-carousel-item').length) return;
				// move the elements
				self.moveSlides(self.currentSlide.prev('.polaris-carousel-item'));
			},
			'jumpToSlide' : function(event) {
				event.preventDefault();
				var currentIndex = self.bullets.find('.active').index();
				var clicked = $(event.target).addClass('active');
				if(currentIndex == clicked.index()) return;

				clicked.siblings().removeClass('active');
				var target = clicked.data('slide');
				var i = 0
				// apply classes to the main carousel element
				self.carousel.addClass('jump-slides');
				self.jumpSlides(target, (currentIndex > clicked.index() ? 'left' : 'right'));
			},
			'slideClickedJump' : function(event) {
				if($(this).parent().hasClass('active') || $(event.target).hasClass('polaris-carousel-direct-link')) return;
				event.preventDefault();
				var target = $(this).parent();
				// move the elements
				self.moveSlides(target);
			}
		};

	};

	PolarisCarousel.prototype.jumpSlides = function(target, direction) {
		var self = this,
				bullet = target.data('bullet');
		if(direction == 'right') {
			// move the elements forward
			this.moveSlides(this.currentSlide.next('.polaris-carousel-item'), { noactive : true, speed : 300, easing : 'linear' });
		}
		else {
			// move the elements back
			this.moveSlides(this.currentSlide.prev('.polaris-carousel-item'), { noactive : true, speed : 300, easing : 'linear' });
		}
		window.setTimeout(function(){
			if(target.index() != 2) self.jumpSlides(target, direction);
			else target.addClass('active');
		}, 300);
	};

	PolarisCarousel.prototype.moveSlides = function(target, options) {
		// reset the current slide
		this.currentSlide = target;
		// deactivate all other slides
		this.currentSlide.siblings().removeClass('active');
		// get the diff between the current slide an the needed location (33%)
		options = options || {};
		var self = this,
				windowWidth = $('body').width(),
				speed = options.speed || 800,
				easingfn = options.easing || 'swing',
				offset = Math.round(((this.currentSlide.position().left / windowWidth)*100)/33);
		/**
		 * carousels have the ability (unique from faders and sliders) to go around and around forever,
		 * so we need to setup one of two scenarios:
		 * 	- if a positive movement occurs, move the first element to the end AFTER the animation
		 *  - if a negative movement occurs, move the last element to the beginning BEFORE the animation
		 */
		if(offset > 0) { // we're moving next setup the timed callback
			// move the first slide to the end
			self.group.append(this.group.find('.polaris-carousel-item:first').detach().css({ left :  this.listEnd +'%' }));
		}
		if(offset <= 0) {
			var nextLeft = (Math.round((this.group.find('.polaris-carousel-item:first').position().left / windowWidth)*100));
			// move the last slide to the beginning
			this.group.prepend(this.group.find('.polaris-carousel-item:last').detach().css({ left : nextLeft+'%' }));
		}
		if(!options.showAll) {
			// tell the next and previous siblings to be visible and all else invisible
			this.currentSlide.addClass('carousel-visible').next().addClass('carousel-visible').nextAll().removeClass('carousel-visible');
			this.currentSlide.prev().addClass('carousel-visible').prevAll().removeClass('carousel-visible');
		}
		else {
			this.carousel.find('.polaris-carousel-item').each(function() {
				if(!$(this).hasClass('carousel-visible')) {
					$(this).addClass('carousel-visible');
				}
			});
		}
		// loop through all items and subtract the offset from it's current left
		self.carousel.find('.polaris-carousel-item').each(function(index, slide) {
			slide = $(slide);
			var left = ((slide.index()-1)*33);
			// add a unique class to select the element with the bullet's rel attribute
			if(!Modernizr.csstransitions) {
				slide.stop().animate({ 'left' : left +'%' }, {
					'duration' : speed,
					'easing' : easingfn,
					'complete' : function() {
						if(this == target[0]) {
							if(options.noactive) return;
							// activate the slide
							$(this).addClass('active');
							// change the bullet
							target.data('bullet').addClass('active').siblings().removeClass('active');
						}
					}
				});
			}
			else {
				if(this == target[0]) {
					if(!options.noactive) $(this).addClass('active');
					// change the bullet
					target.data('bullet').addClass('active').siblings().removeClass('active');
				}
				// move the slide
				slide.css({ 'left' : left +'%' });
			}
		});

	}

	PolarisCarousel.prototype.buildControls = function() {
		var self = this,
				list = this.group.find('.polaris-carousel-item');
		// apply loading class
		this.next = $(Carousel.templates.next()),
		this.previous = $(Carousel.templates.previous());
		this.bullets = $('<div class="polaris-carousel-bullet-list"></div>')

		// add handlers to the next/prev elements
		this.previous.on('click touchend', this.handlers.previousSlide);
		this.next.on('click touchend', this.handlers.nextSlide);

		// add the control elements
		this.carousel
			.append(this.next)
			.append(this.previous)
			.append(this.bullets);

		// add the breadcrumbs
		list.each(function(index, slide) {
			var bullet = $(Carousel.templates.bullet('.polaris-carousel-item-'+ index, 'purple'));
			slide = $(slide);
			// build the array of bullet elements
			self.bullets.append(bullet);
			// add the slide to the bullet's data object
			bullet.data('slide', slide);
			// add the bullet to the slide's data object
			slide.data('bullet', bullet);
			// add the visible class to the first two and last element in the list
			if(index < 2 || index == list.length - 1) {
				slide.addClass('carousel-visible');
			}
		});

		// move the last two slides to the beginning
		this.group.prepend(this.group.find('.polaris-carousel-item:last').detach().css({ left : '0%' }));

		// move the last two slides to the beginning
		this.group.prepend(this.group.find('.polaris-carousel-item:last').detach().css({ left : '-33%' }));

		// set the first bullet as active
		this.bullets.find('.polaris-carousel-bullet:first').addClass('active');
		// add handlers to the bullet elements
		this.bullets.find('.polaris-carousel-bullet').on('click touchend', this.handlers.jumpToSlide);
		// add the jump to handler to the slides themselves
		this.carousel.find('.polaris-carousel-item .polaris-carousel-link').on('click touchend', this.handlers.slideClickedJump);

	};

	/**
	 * PolarisCarousel
	 * Object to slide a block of multiple slides
	 */
	function PolarisBlockSlider(element) {
		//configuration variables
		// setup the initial elements
		this.carousel = element;
		this.block = this.carousel.find('.polaris-carousel-list');
		// get number of list elements per block
		this.blockCount = this.carousel.data('block-count') || 5;
		this.perMove = this.carousel.data('per-move') || 1;
		this.itemWidth = this.carousel.find('li:last').outerWidth() + parseInt(this.carousel.find('li:last').css('margin-left'));
		this.moveDistance = this.perMove * this.itemWidth;
		//use this number instead for responsive layout
		this.moveDistPercent = Math.round(this.itemWidth / this.carousel.outerWidth() * 1000) / 10;

		this.blockWidth = this.carousel.find('li:not(li li)').length * this.itemWidth;
		// set indicators
		this.distance = 0;
		this.start = true;
		this.itemCount = this.carousel.find('li:not(li li)').length;
		this.index = 1;
		this.end = (this.blockCount >= this.itemCount);
		this.duration = this.carousel.data('transtion-duration') || 500;
		// build event handlers
		this.buildHandlers();
		// build controls
		this.buildControls();
	}

	PolarisBlockSlider.prototype.buildHandlers = function() {
		var self = this;
		this.handlers = {
			'nextBlock' : function(event) {
				event.preventDefault();
				// check if there are any next moves left
				if(self.end) return;
				// move the elements
				self.moveBlock('next');
			},
			'previousBlock' : function(event) {
				event.preventDefault();
				// check if there are any next moves left
				if(self.start) return;
				// move the elements
				self.moveBlock('previous');
			}
		};

	};

	PolarisBlockSlider.prototype.moveBlock = function(direction) {
		// set vars
		var self = this,
				//distance = direction == 'previous' ? this.moveDistance : -this.moveDistance,
				distance = direction == 'previous' ? this.moveDistPercent : -this.moveDistPercent,
				easingfn = 'swing',
				css;
		// update the index
		direction == 'previous' ? this.index-- : this.index++;
		// update the distance moved;
		this.distance = this.distance + distance;
		// do the move
		if(Modernizr.csstransitions) {
			if(Modernizr.csstransforms3d) {
				//this.block.css3('transform', 'translate3d('+ this.distance +'px, 0, 0)');
				this.block.css3('transform', 'translate3d('+ this.distance +'%, 0, 0)');
			}
			else if(Modernizr.csstransforms) {
				//this.block.css3('transform', 'translate('+ this.distance +'px, 0)');
				this.block.css3('transform', 'translate('+ this.distance +'%, 0)');
			}
			else {
				//this.block.css('left', distance +'px');
				this.block.css('left', distance +'%');
			}

			// change the bullet
			// @TODO add bullet support
			// target.data('bullet').addClass('active').siblings().removeClass('active');
		}
		else {
			this.block.animate({
		    //left: this.distance
				left: this.distance + '%'
		  }, {
		    duration: 500,
				easing: easingfn
		  });
		}
		// check the start status
		if(this.index == 1) {
			this.start = true; // at the start
			this.previous.removeClass('active');
		}
		else {
			this.start = false; // not at the start
			!this.previous.hasClass('active') ? this.previous.addClass('active') : null;
		}
		// check the end status
		if(this.itemCount < ((this.perMove*this.index) + this.blockCount)) {
			this.end = true; // at the start
			this.next.removeClass('active');
		}
		else {
			this.end = false; // not at the start
			!this.next.hasClass('active') ? this.next.addClass('active') : null;
		}

	};

	PolarisBlockSlider.prototype.buildControls = function() {
		var self = this;
		// apply loading class
		this.next = $(Carousel.templates.next()),
		this.previous = $(Carousel.templates.previous());

		// add handlers to the next/prev elements
		this.previous.on('click touchend', this.handlers.previousBlock);
		this.next.on('click touchend', this.handlers.nextBlock);
		// check the start status
		if(this.start) {
			this.previous.removeClass('active');
		}
		else {
			!this.previous.hasClass('active') ? this.previous.addClass('active') : null;
		}
		if(this.end) {
			this.next.removeClass('active');
		}
		else {
			!this.next.hasClass('active') ? this.next.addClass('active') : null;
		}
		// add the control elements
		this.carousel
			.append(this.next)
			.append(this.previous);
		// add css elements
		this.block.css({
			'-webkit-transition' : '-webkit-transform '+ (this.duration/1000) +'s ease, left '+ (this.duration/1000) +'s ease',
			'-moz-transition' : '-moz-transform '+ (this.duration/1000) +'s ease, left '+ (this.duration/1000) +'s ease',
			'-ms-transition' : '-ms-transform '+ (this.duration/1000) +'s ease, left '+ (this.duration/1000) +'s ease',
			'-o-transition' : '-o-transform '+ (this.duration/1000) +'s ease, left '+ (this.duration/1000) +'s ease',
			'transition' : 'transform '+ (this.duration/1000) +'s ease, left '+ (this.duration/1000) +'s ease',
		});

	};

	var carousel_init = function() {
		var carousels = new Array();
		// select all carousel elements
		elements = $('.polaris-carousel');

		// determine which carousel object to run
		$.each(elements, function(index, element) {
			element = $(element);
			// fader class detected
			if(element.hasClass('fader')) {
				carousels[index] = new PolarisFader($(element));
				return;
			}
			// slider class detected
			if(element.hasClass('slider')) {
				carousels[index] = new PolarisSlider($(element));
				return;
			}
			// carousel class detected
			if(element.hasClass('carousel')) {
				carousels[index] = new PolarisCarousel($(element));
				return;
			}
			// block slider class detected
			if(element.hasClass('block-slider')) {
				carousels[index] = new PolarisBlockSlider($(element));
				return;
			}
		});

		// trigger the carouselJS.loaded event
		$(document).trigger('carouselJS.loaded');

	};

	$(carousel_init);

	/**
	 * jQuery.polarisCarousel
	 * Retrievs the total amount of time, in miliseconds that
	 * an element will be transitioned
	 */
	$.fn.polarisCarousel = function() {
		var carousel;

		// determine which carousel object to run
		// fader class detected
		if(this.hasClass('fader')) {
			return new PolarisFader(this);
		}
		// slider class detected
		if(this.hasClass('slider')) {
			return new PolarisSlider(this);
		}
		// carousel class detected
		if(this.hasClass('carousel')) {
			return new PolarisCarousel(this);
		}
		// block slider class detected
		if(this.hasClass('block-slider')) {
			return new PolarisBlockSlider(this);
		}

		return this;
	};

})( jQuery );

/**
 * Required Plugins
 */

(function($) {

	/**
	 * jQuery.transitionend
	 * Retrievs the total amount of time, in miliseconds that
	 * an element will be transitioned
	 */
	$.fn.transitionend = function(index) {
		index = index || 0;
		// check the main transition duration property
		if(this.css('transition-duration')) {
			return Math.round(parseFloat(this.css('transition-duration').split(',')[index]) * 1000);
		}
		else {
			// check the vendor transition duration properties
			if(this.css('-webkit-transtion-duration')) return Math.round(parseFloat(this.css('-webkit-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-moz-transtion-duration')) return Math.round(parseFloat(this.css('-moz-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-ms-transtion-duration')) return Math.round(parseFloat(this.css('-ms-transtion-duration').split(',')[index]) * 1000);
			if(this.css('-o-transtion-duration')) return Math.round(parseFloat(this.css('-ms-transtion-duration').split(',')[index]) * 1000);
		}
		// if we're here, then no transition duration was found, return 0
		return 0;
	};

})( jQuery );


(function($) {

	/**
	 * jQuery.zOrder
	 * Applies Ascending or descending z-index to group of jQuery elements
	 */
	$.fn.zOrder = function(direction) {
		direction = direction || 'desc'; // default to desc, higher to lower z-order value
		this.each(function(index) {
			$element = $(this),
			position = $element.css('position');
			$element.css({
				'z-index' : (direction == 'asc' ? (index + 1) : -index),
				'position' : $(this).css('position', (position == 'static' ? 'relative' : position))
			});
		});
		return this;
	};

})( jQuery );


(function($) {
	/**
	 * Adds a CSS3 property (or map of properties) to an element
	 * @param p
	 * 	- CSS3 Property (non css3 properties are technically okay, it's just ... why?)
	 * @param v
	 * 	- Value to set CSS3 Property
	 */
	// automate the property generation process
	var methods = {
		'setProperty' : function(p,v) {
			var properties = {};

			properties['-webkit-'+ p] = v;
			properties['-moz-'+ p] = v;
			properties['-ms-'+ p] = v;
			properties['-o-'+ p] = v;
			properties[p] = v;
			this.css(properties);
		},
		'getProperty' : function(p) {
			var self = this,
					value,
					properties = [
						p,
						'-webkit-'+ p,
						'-moz-'+ p,
						'-ms-'+ p,
						'-o-'+ p
					];
			$.each(properties, function() {
				if(self.css(this)) {
					value = self.css(this);
					return false;
				}
			});
			return value;
		}
	};

	$.fn.css3 = function(p,v) {
		var self = this,
				css = false;
		// loop through all elements
		this.each(function() {
			var $element = $(this);
			// have a map of css3 properties
			if(typeof p == 'object') {
				$.each(p, function(p,v) {
					methods.setProperty.apply($element, [p,v]);
				});
			}
			else {
				if(!v) { // just return a property
					css = methods.getProperty.apply($element, [p]);
				}
				else { // just set a p and a v
					methods.setProperty.apply($element, [p,v]);
				}
			}

		});

		return css ? css : this; // if we have a css value, return it, otherwise return the object for chaining
	};

})( jQuery );