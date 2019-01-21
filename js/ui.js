setupSliders();

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

$('.fa-times-circle').on('click', function(e){
	e.stopPropagation();
	alert('close button');
});

$('.fa-check-circle').on('click', function(e){
	e.stopPropagation();
	alert('save button');
});