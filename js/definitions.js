var UISlider = function(element){
	this.value = null;
	this.min = null;
	this.max = null;
	
	this.el = null;
	this.grid = null;
	
	this.handle = {
		el: null,
		position: 0,
		origin: 0,
		isDragged: false
	};
	
	this.spacer = {
		size: 20,
		total: 0
	};
	
	this.setup = function(){
		lg('slider > set up started; width [' + this.el.offsetWidth + ']; min [' + this.min + ']; max [' + this.max + ']; value [' + this.value + ']');

		// create grid
		this.grid.append('<div class="horizontal"></div>');

		for (var i = 0; i <= this.spacer.total; i++)
		{
			this.grid.append('<div class="vertical" style="left: ' + (i * this.spacer.size) + 'px"></div>');
		}

		// adjust slider width
		this.el.style.width = (this.spacer.total * this.spacer.size) + 'px';
		
		// position the handle and attach event listeners
		this.updateHandlePosition(this.value);
		
		this.handle.el.on('mousedown', function(e){
			this.handle.isDragged = true;
			this.handle.origin = e.clientX;
		}.bind(this));
		
		$('body').on('mousemove', function(e){
			if (this.handle.isDragged)
			{
				var 
					diff = e.clientX - this.handle.origin,
					percent = diff * 100 / this.el.offsetWidth,
					value = (this.min + (percent * (this.max - this.min) / 100)).round(2);
				
				lg(e.clientX);
				lg('diff = ' + diff);
				lg('percent = ' + percent);
				lg('value = ' + value);
				this.updateValue(value);
			}
		}.bind(this));
		
		$('body').on('mouseup', function(e){
			this.handle.isDragged = false;
		}.bind(this));
		
		lg('slider > setup finished');
	};
	
	this.updateHandlePosition = function(value){
		this.handle.el.style.left = ((this.max + value) * 100 / (this.max - this.min)) + '%';
	};
	
	this.updateValue = function(value){
		this.el.parent().find('.value').html(value);
		this.updateHandlePosition(value);
	};
	
	this.init = function(){
		this.el = element;		
		this.grid = this.el.find('.grid');
		this.handle.el = this.el.find('.handle');
		this.spacer.total = Math.floor(this.el.offsetWidth / this.spacer.size);
		this.value = parseFloat(this.el.attr('data-value'));
		this.min = parseFloat(this.el.attr('data-min'));
		this.max = parseFloat(this.el.attr('data-max'));
		
		this.setup();
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

NodeList.prototype.on = function(type, callback){
	for (var i = 0; i < this.length; i++)
	{
		this[i].addEventListener(type, callback);
	}
};

Number.prototype.round = function(decimals){
    return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
};