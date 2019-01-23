var UISlider = function(element){
	this.value = null;
	this.min = null;
	this.max = null;
	this.step = null;
	this.ticks = null;
	this.slider = null;
	
	this.el = null;
	this.grid = null;
	this.bar = null;
	
	this.handle = {
		el: null,
		position: 0,
		isDragged: false
	};
	
	this.spacer = {
		size: 20,
		total: 0
	};
	
	this.pointerDown = function(){
		this.handle.isDragged = true;
	};
	
	this.pointerMove = function(e){
		if (this.handle.isDragged)
		{
			var 
				diff = (e.touches && e.touches.length) ? e.touches[0].pageX - this.handle.el.parent().offsetLeft : e.pageX - this.handle.el.parent().offsetLeft,
				percent = diff * 100 / this.el.offsetWidth,
				value = (this.min + (percent * (this.max - this.min) / 100)).round(2);

			if ((value >= this.min) && (value <= this.max))
			{
				this.value = value;
				this.updateValue();
			}
		}
	};
	
	this.pointerUp = function(){
		this.handle.isDragged = false;
	};
	
	this.setup = function(){
		//lg('slider > set up started; spacers [' + this.spacer.total + ']; width [' + this.el.offsetWidth + ']; min [' + this.min + ']; max [' + this.max + ']; value [' + this.value + ']');

		// create grid
		this.grid.html('<div class="horizontal"></div>');

		for (var i = 0; i <= this.spacer.total; i++)
		{
			this.grid.append('<div class="vertical" style="left: ' + (i * this.spacer.size) + 'px"></div>');
		}

		// adjust slider width
		this.el.style.width = (this.spacer.total * this.spacer.size) + 'px';
		
		// position the handle and attach event listeners
		this.updateValue();
		
		this.handle.el.on('mousedown', this.pointerDown.bind(this));
		this.handle.el.on('touchstart', this.pointerDown.bind(this));
		$('body').on('mousemove', this.pointerMove.bind(this));		
		$('body').on('touchmove', this.pointerMove.bind(this));		
		$('body').on('mouseup', this.pointerUp.bind(this));
		$('body').on('touchend', this.pointerUp.bind(this));
		
		//lg('slider > setup finished');
	};
	
	this.updateBar = function(){
		var width = null; 
		
		if (this.min < 0)
		{	
			// negative slider
			width = Math.abs(this.value) * 100 / (this.max - this.min);
			
			if (this.value < 0)
			{
				this.bar.removeClass('positive').addClass('negative');

				var 
					q = (Math.abs(this.min) - Math.abs(this.value)) * 100 / Math.abs(this.min),
					w = q * Math.abs(this.min) / (this.max - this.min);
				
				this.bar.style.left = w + '%';
				this.bar.style.width = width + '%';
			}
			else
			{
				this.bar.removeClass('negative').addClass('positive');

				this.bar.style.left = Math.abs(this.min) * 100 / (this.max - this.min) + '%';
				this.bar.style.width = width + '%';
			}
		}
		else
		{
			// positive only slider
			this.bar.removeClass('negative').addClass('positive');

			width = Math.abs(this.value - this.min) * 100 / (this.max - this.min);
			this.bar.style.width = width + '%';
		}
	};
	
	this.updateHandlePosition = function(){
		var value = (this.value < 0) ? this.max + this.value : this.value;
		value = this.value - this.min;
		
		this.handle.el.style.left = (value * 100 / (this.max - this.min)) + '%';
		this.updateBar();
	};
	
	this.updateValue = function(){
		this.value = this.slider.get();
		this.el.parent().find('.value').html(this.value);
		this.updateBar();
	};
	
	this.init = function(){
		this.el = element;
		this.grid = this.el.find('.grid');
		this.bar = this.el.find('.bar');
		this.handle.el = this.el.find('.handle');
		this.value = parseFloat(this.el.attr('data-value'));
		this.min = parseFloat(this.el.attr('data-min'));
		this.max = parseFloat(this.el.attr('data-max'));
		this.step = parseFloat(this.el.attr('data-step'));
		this.ticks = parseFloat(this.el.attr('data-ticks'));
		
		this.el.style.width = 'calc(100% - 55px)';
		this.spacer.total = Math.floor(this.el.offsetWidth / this.spacer.size);
		this.grid.html('<div class="horizontal"></div>');
		
		this.slider = noUiSlider.create(this.el, {
			start: [this.value],
			step: this.step,
			range: {
				'min': this.min,
				'max': this.max
			},
			pips: {
				mode: 'count',
				values: this.ticks + 1
			},
			tooltips: false
		});
		
		this.slider.on('slide', this.updateValue.bind(this));

		this.updateValue();
		//this.setup();
	};
	
	this.init();
};

function $(selector){
	var nodes = document.querySelectorAll(selector);
	return (nodes.length > 1) ? nodes : nodes[0];
};

function setupSliders(){
	var	sliders = $('.slider');
	
	if (sliders && (sliders.length > 0))
	{
		lg('slider > found [' + sliders.length + ']');
	
		for (var i = 0; i < sliders.length; i++)
		{
			new UISlider(sliders[i]);
		}
	}
	else if (sliders)
	{
		lg('slider > found [1]');
		new UISlider(sliders);
	}
	else
	{
		lg('slider > found [0]');
	}
}

function buildButtons(buttons){
	var out = '';
	
	for (var i = 0; i < buttons.length; i++)
	{
		out += '<button id="btn-' + i + '">' + buttons[i].label + '</button>';
	}
	
	return out;
};

function notification(options){
	var html = 
		'<div class="backdrop"></div>' +
		'<div class="modal">' +
			'<h3>{MESSAGE}</h3>' +
			'<div class="divider"></div>' +
			'<div class="action">{BUTTONS}</div>' +
		'</div>'
	;
	
	html = html.replace('{MESSAGE}', options.message).replace('{BUTTONS}', buildButtons(options.buttons));

	$('body').append(html);


	if (typeof options.buttons !== 'undefined')
	{
		for (var i = 0; i < options.buttons.length; i++)
		{
			var btn = options.buttons[i];
			
			$('#btn-' + i).on('click', function(){
				$('.backdrop').remove();
				$('.modal').remove();
				if (typeof btn.callback === 'function') btn.callback();
			});
		}
	}
};

HTMLElement.prototype.on = function(type, callback){
	this.addEventListener(type, callback);
};

HTMLElement.prototype.attr = function(){
	if (arguments.length === 1)
	{
		return this.getAttribute(arguments[0]);
	}
	else
	{
		this.setAttribute(arguments[0], arguments[1]);
	}
};

HTMLElement.prototype.parent = function(){
	return this.parentElement;
};

HTMLElement.prototype.find = function(selector){
	var nodes = this.querySelectorAll(selector);
	return (nodes.length > 1) ? nodes : nodes[0];
};

HTMLElement.prototype.append = function(html){
	this.innerHTML += html;
};

HTMLElement.prototype.html = function(html){
	this.innerHTML = html;
};

HTMLElement.prototype.addClass = function(cls){
	var 
		has = false,
		temp = this.className.split(' ');
	
	for (var i = 0; i < temp.length; i++)
	{
		if (cls.toLowerCase() === temp[i].toLowerCase()) has = true;
	}
	
	if (!has) temp.push(cls);
	this.className = temp.join(' ');
	
	return this;
};

HTMLElement.prototype.removeClass = function(cls){
	var temp = this.className.split(' ');
	
	for (var i = 0; i < temp.length; i++)
	{
		if (cls.toLowerCase() === temp[i].toLowerCase()) temp.splice(i, 1);
	}
	
	this.className = temp.join(' ');
	
	return this;
};

HTMLElement.prototype.hasClass = function(cls){
	return this.className.toLowerCase().indexOf(cls.toLowerCase()) > -1;
};

NodeList.prototype.on = function(type, callback){
	for (var i = 0; i < this.length; i++)
	{
		this[i].addEventListener(type, callback);
	}
};

Number.prototype.round = function(decimals){
    return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
};