/**
 * jQuery Plugin view / hide loading message.
 * @author	Luigi Mozzillo <luigi@innato.it>
 * @link	http://innato.it
 * @version 1.0.4
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
 ! function($) {

	'use strict';

	var Loading = function(element, options) {
		this.init(element, options)
	}

	// --------------------------------------------------------------------------

	Loading.prototype = {

		/**
		 * Constructor.
		 *
		 */
		constructor: Loading

		// -------------------------------------

		/**
		 * Initialize item.
		 *
		 * @param  string element
		 * @param  object options
		 * @return void
		 */
		, init: function(element, options) {
			if ( ! $(element).length) {
				element = document;
			}

			this.element	= element;
			this.$element	= $(element);

			if ( ! options) {
				this.inherit();
			}

			if ( ! this.options) {
				this.options = $.extend({}, $.fn.loading.defaults, options)
			}

			if (this.options.show) {
				this.show();
			}

			this.$div = $('<div />')
				.addClass(this.options.class
					? this.options.class
					: ''
				)
				.css({
					'z-index': this.options.zIndex
				});
		}

		// -------------------------------------

		/**
		 * Show loading spinner.
		 *
		 * @return void
		 */
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
					top:		this.$element.offset().top
					, left:		this.$element.offset().left
					, mtop:		parseInt(this.$element.css('marginTop'))
					, mleft:	parseInt(this.$element.css('marginLeft'))
					, width:	this.$element.outerWidth()
					, height:	this.$element.outerHeight()
				};
			}

			// Define CSS
			this.$div.css({
					position:				'absolute'
					, display:				'block'
					, top:					(this.info.top + this.info.mtop)
					, left:					(this.info.left + this.info.mleft)
					, width:				this.info.width
					, height:				this.info.height
	                , opacity: 				this.options.opacity
	                , background:			this.options.color
	                						+' url('+ this.options.image +')'
	                , backgroundPosition:	this.options.imagePosition
	                , backgroundRepeat:		this.options.imageRepeat
				})
				.appendTo('body')
				.show();
		}

		// -------------------------------------

		/**
		 * Hide loading.
		 *
		 * @return void
		 */
		, hide: function() {
			var that = this;
			this.$div.fadeOut(this.options.fadeoutSpeed, function() {
				that.$div.remove()
			});
		}

		// -------------------------------------

		/**
		 * Hide loading (alias).
		 *
		 * @return void
		 */
		, close: function() {
			this.hide();
		}

		// -------------------------------------

		/**
		 * Inherit stored options (if exists).
		 *
		 * @return void
		 */
		, inherit: function() {
			var options = $(document).data('loadingOptions');
			this.options = ! options ? this.options : options;
		}

		// -------------------------------------

		/**
		 * Store options (with inherit option = true).
		 *
		 * @return void
		 */
		, store: function() {
			$(document).data('loadingOptions', $.extend(this.options, {
				inherit: true
			}));
		}

	}

	// --------------------------------------------------------------------------

	/**
	 * Create plugin.
	 *
	 * @param  object option
	 * @return object
	 */
	$.fn.loading = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('loading')
				, options = typeof option == 'object' && option
			if ( ! data) $this.data('loading', (data = new Loading(this, options)))
			if (typeof option == 'string') data[option]();
			return $(this);
		})
	};

	$.fn.loading.Constructor = Loading
	$.fn.loading.defaults = {
		image:		 		'images/loading.gif'
		, imagePosition:	'50% 50%'
		, imageRepeat:		'no-repeat'
		, color:			'white'
		, opacity:			0.8
		, class:			''
		, fadeoutSpeed:	'fast'
		, inherit:			false
		, show:				false
		, zIndex:			999
	}

	// --------------------------------------------------------------------------

	/**
	 * Empty call document item.
	 *
	 * @param  object options
	 * @return void
	 */
	$.loading = function(options) {
		$(document).loading(options);
	};

}(window.jQuery);