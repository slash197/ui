setupSliders();

$('.menu .fa-bars').on('click', function(){
	if ($('.sidebar').hasClass('collapsed'))
	{
		$('.sidebar').removeClass('collapsed');
		$('body > .menu').removeClass('extended');
		$('body > .content').removeClass('extended');
	}
	else
	{
		$('.sidebar').addClass('collapsed');
		$('body > .menu').addClass('extended');
		$('body > .content').addClass('extended');
	}
	
	window.setTimeout(function(){
		setupSliders();
	}, 300);
});

$('.sidebar .fa-times-circle').on('click', function(){
	$('.menu .fa-bars').click();
});

$('.header-menu .fa-bars').on('click', function(e){
	var state = (this.parent().attr('data-state'));
	
	if (state === 'open')
	{
		this.parent().attr('data-state', '');
	}
	else
	{
		this.parent().attr('data-state', 'open');
	}
	
	e.stopPropagation();
});

$('.dd .header').on('click', function(){
	var state = (this.parent().attr('data-state'));
	
	if (state === 'open')
	{
		this.parent().attr('data-state', '');
		this.find('.fa-caret-down').className = 'fas fa-caret-right';
		
		// find header menu items and close them
		var items = this.find('.header-menu[data-state="open"]');
		if (items)
		{
			if (items.length)
			{
				for (var i = 0; i < items.length; i++)
				{
					items[i].find('.fa-bars').click();
				}
			}
			else
			{
				items.find('.fa-bars').click();
			}
		}
	}
	else
	{
		this.parent().attr('data-state', 'open');
		this.find('.fa-caret-right').className = 'fas fa-caret-down';
	}
});

window.onresize = function(){
	setupSliders();
};

window.onscroll = function(){
	return false;
	var 
		padding = 0,
		parent = null,
		headers = $('.header');
	
	for (var i = 0; i < headers.length; i++)
	{
		parent = headers[i].parent();
		
		if (parent.attr('data-state') === 'open')
		{
			if ((window.pageYOffset > headers[i].offsetTop) && (window.pageYOffset < parent.offsetHeight))
			{
				padding = parseFloat(window.getComputedStyle($('body')).paddingTop.replace('px', ''));
				lg(padding);
				headers[i].addClass('sticky');
				$('body').style.paddingTop = (padding + headers[i].offsetHeight) + 'px';
			}
			else
			{
				padding = parseFloat(window.getComputedStyle($('body')).paddingTop.replace('px', ''));
				headers[i].removeClass('sticky');
				$('body').style.paddingTop = (padding - headers[i].offsetHeight) + 'px';
			}
		}
	}
};