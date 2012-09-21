/**
 * Library for CodeIgniter form validation in Ajax.
 * @author	Luigi Mozzillo <luigi@innato.it>
 * @link	http://innato.it
 * @version 1.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 */
!function($) {
	'use strict';

	var Loading = function(element, options) {
		this.init(element, options)
	}

	Loading.prototype = {

		constructor: Loading

		// Initialize item
		, init: function(element, options) {
			if (!$(element).length)
				element = document;
			this.element	= element;
			this.$element	= $(element);
			if (!options)	this.inherit();
			if (!this.options)
				this.options = $.extend({}, $.fn.loading.defaults, options)
			if (this.options.show)
				this.show();
			this.loadiv 	= $('<div'
				+ (this.options.class ? ' class="'+ this.options.class +'"' : '')
				+' />');
		}

		// Show loading
		, show: function() {
			if (this.element == document) {
				// Show in center of page
				this.info = {
					top:		0
					, left:		0
					, mtop:		0
					, mleft:	0
					, width:	'100%'
					, height:	'100%'
				};
			} else {
				// Show on item
				this.info = {
					top:		this.$element.position().top
					, left:		this.$element.position().left
					, mtop:		parseInt(this.$element.css('marginTop'))
					, mleft:	parseInt(this.$element.css('marginLeft'))
					, width:	this.$element.outerWidth() +'px'
					, height:	this.$element.outerHeight() +'px'
				};
			}
			// Define CSS
			this.loadiv.css({
					position:				'absolute'
					, display:				'block'
					, top:					(this.info.top + this.info.mtop) +'px'
					, left:					(this.info.left + this.info.mleft) +'px'
					, width:				this.info.width
					, height:				this.info.height
	                , opacity: 				0
	                , background:			this.options.color
	                						+' url('+ this.options.image +')'
	                , backgroundPosition:	this.options.image_position
	                , backgroundRepeat:		this.options.image_repeat
				})
				.appendTo('body')
				.fadeTo(this.options.fade_in_speed, this.options.opacity);
		}

		// Close loading
		, close: function() {
			var that = this;
			this.loadiv.fadeOut(this.options.fade_out_speed, function() {
				that.loadiv.remove()
			});
		}

		// Inherit stored options (if exists)
		, inherit: function() {
			var options = $(document).data('loading_options');
			this.options = !options ? this.options : options;
		}

		// Store options (with inherit option = true)
		, store: function() {
			$(document).data('loading_options', $.extend(this.options, {
				inherit: true
			}));
		}

	}

	// Create plugin
	$.fn.loading = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('loading')
				, options = typeof option == 'object' && option
			if (!data) $this.data('loading', (data = new Loading(this, options)))
			if (typeof option == 'string') data[option]();
			return $(this);
		})
	};
	$.fn.loading.Constructor = Loading
	$.fn.loading.defaults = {
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
	// Empty call document item
	$.loading = function(options) { $(document).loading(options); };

}(window.jQuery);