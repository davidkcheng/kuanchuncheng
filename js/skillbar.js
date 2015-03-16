jQuery(document).ready(function(){
	jQuery('.skillbar').each(function(){
		var percent = jQuery(this).attr('data-percent');
		px = Math.round(232*(percent/100)+110)+"px";
		console.log(px);
		jQuery(this).find('.skillbar-bar').animate({
			
			width: px
		},3000);
	});
});