jQuery(document).ready(function($){
	
	// Remove Person thing
	// Yo Dawg, I heard you like callbacks
	$('.remove-person').click(function(e){
		e.preventDefault();
		var button = $(this);
		var parent = button.parents('li');
		var areYouSure = '<span class="pull-right are-you-sure"> Are you sure? <a href="javascript:" class="sure">Yes</a> / <a href="javascript:" class="no">No</a> </span>';
		button.fadeOut(250, function(){
			parent.append(areYouSure);
			$('.are-you-sure').fadeIn(250);

			// Are you sure: no
			$('.are-you-sure .no').click(function(e){
				e.preventDefault();
				$('.are-you-sure').fadeOut(250, function(){
					$(this).remove();
					$(button).show();
				});
			});

			// Are you sure: yes
			$('.are-you-sure .sure').click(function(e){
				e.preventDefault();
				$(parent).fadeOut(250, function(){
					$(this).remove();
				});
			});
		});
	});
});