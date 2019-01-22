setupSliders();

$('.mobile-menu').on('click', function(){
	if ($('.menu .right').style.display !== 'block')
	{
		$('.menu .right').style.display = 'block';
	}
	else
	{
		$('.menu .right').style.display = 'none';
	}
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
	var 
		parent = this.parent(),
		state = parent.attr('data-state'),
		collapsibles = parent.find('.collapsible'),
		sub = collapsibles.length ? collapsibles[0] : collapsibles;
	
	if (state === 'open')
	{
		parent.attr('data-state', '');
		this.find('.fa-caret-down').className = 'fas fa-caret-right';

		sub.style.display = 'none';
		
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
		parent.attr('data-state', 'open');
		this.find('.fa-caret-right').className = 'fas fa-caret-down';
		
		sub.style.display = 'block';
	}
});

window.onresize = function(){
	setupSliders();
};