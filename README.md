#jQuery Loading Plugin

Show loading image in center of page or on target.

###Usage

Set plugin:
  
	$('#example').loading(options);

View loading:

	$('#example'').loading('show');

Close loading:

	$('#example').loading('close');

###Options

- `image`: (path) image path of loading image;
- `image_position`: (string) position of image background;
- `image_repeat`: (string) repeat of image background - repeat | no-repeat | repeat-x | repeat-y;
- `color`: (string) target background color;
- `opacity`: (number) opacity value - 0 to 1;
- `class`: (string) class for loading div;
- `fade_in_speed`: (string | number) speed of fade in effect - slow | fast | value in milliseconds;
- `fade_out_speed`: (string | number) speed of fade out effect - slow | fast | value in milliseconds;
- `inherit`: (bool) inherits options from a previous call;
- `show`: (bool) view loading after init.

Default options:

	var options = {
		image:		 		'images/loading.gif'
		, image_position:	'50% 50%'
		, image_repeat:		'no-repeat'
		, color:			'white'
		, opacity:			0.8
		, class:			''
		, fade_in_speed:	'slow'
		, fade_out_speed:	'fast'
		, inherit:			false
		, show:				false
	}


###Methods

######$.loading(options);

Set loading item for document page.

######.loading('store');

Save loading options for next item.

######.loading('close');

Close loading image.

######.loading('inherit');

Inherits options from a previous call.

###Examples

Config loading.

	$.loading({
		image:	'/assets/images/loading.gif'
		, color: '#f9f9f9'
	});
	$.loading('store');

Show loading at content item.

	$('#content').loading('show');

Close previous loading.
	
	$('#content').loading('close');

Show different loading at another item.

	$('#login_form').loading({
		image:				'/assets/images/loading_2.gif'
		, color:			'red'
		, class:			'class_name'
		, fade_in_speed:	0
		, fade_out_speed:	0
		, show: 			true
	});
	
Close loading after 3 seconds.

	setTimeout("$('#login_form').loading('close')", 3000);

Show different loading at another item yet (with previous options).

	$('#login_form').loading('store');
	$('#register_form').loading('show');
