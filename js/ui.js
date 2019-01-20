$('.dd .header').on('click', function(){
	var state = (this.parent().attr('data-state'));
	
	if (state === 'open')
	{
		this.parent().attr('data-state', '');
		this.find('.fa-caret-down').className = 'fas fa-caret-right';
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