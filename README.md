#jQuery Loading Plugin

Show loading image in center of page or on target.

###Usage

Set plugin:
  
	$('#example').loading(options);

View loading:

	$('#example').loading('show');

Close loading:

	$('#example').loading('hide');

###Options

- `image`: (path) image path of loading image;
- `imagePosition`: (string) position of image background;
- `imageRepeat`: (string) repeat of image background - repeat | no-repeat | repeat-x | repeat-y;
- `color`: (string) target background color;
- `opacity`: (number) opacity value - 0 to 1;
- `class`: (string) class for loading div;
- `fadeoutSpeed`: (string | number) speed of fade out effect - slow | fast | value in milliseconds;
- `inherit`: (bool) inherits options from a previous call;
- `show`: (bool) view loading after init.
- `zIndex`: (integer) z-index css value.

Default options:

	var options = {
		image:		 		'images/loading.gif'
		, imagePosition:	'50% 50%'
		, imageRepeat:		'no-repeat'
		, color:			'white'
		, opacity:			0.8
		, class:			''
		, fadeoutSpeed:		'fast'
		, inherit:			false
		, show:				false
		, zIndex:			999
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
	
	$('#content').loading('hide');

Show different loading at another item.

	$('#login_form').loading({
		image:				'/assets/images/loading_2.gif'
		, color:			'red'
		, class:			'class_name'
		, fadeoutSpeed:		0
		, show: 			true
	});
	
Close loading after 3 seconds.

	setTimeout("$('#login_form').loading('close')", 3000);

Show different loading at another item yet (with previous options).

	$('#loginForm').loading('store');
	$('#registerForm').loading('show');
