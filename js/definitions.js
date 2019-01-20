function $(selector){
	var nodes = document.querySelectorAll(selector);
	return (nodes.length > 1) ? nodes : nodes[0];
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

NodeList.prototype.on = function(type, callback){
	for (var i = 0; i < this.length; i++)
	{
		this[i].addEventListener(type, callback);
	}
};

function buildButtons(buttons){
	var out = '';
	
	for (var i = 0; i < buttons.length; i++)
	{
		out += '<button id="btn-' + i + '">' + buttons[i].label + '</button>';
	}
	
	return out;
};

function notification(options)
{
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