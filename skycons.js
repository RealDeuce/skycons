Application.prototype.minimize = async function() {
	if ( !this.popOut || [true, null].includes(this._minimized) ) return;
	this._minimized = null;

	if (this._skycons === undefined) {
		this._skycons = {};
	}
	this._skycons.maxpos = {'x':this.position.left, 'y':this.position.top};

	// Get content
	let window = this.element,
		header = window.find('.window-header'),
		content = window.find('.window-content');

	// Remove minimum width and height styling rules
	window.css({minWidth: 100, minHeight: 30});

	// Slide-up content
	content.slideUp(100);

	// Slide up window height
	return new Promise((resolve) => {
		window.animate({height: `${header[0].offsetHeight+1}px`}, 100, () => {
			header.children().not(".window-title").not(".close").hide();
			window.animate({width: MIN_WINDOW_WIDTH}, 100, () => {
				window.addClass("minimized");
				this._minimized = true;
				resolve(true);
			});
		});
		if (this._skycons.minpos !== undefined) {
			window.animate({left: this._skycons.minpos.x, top: this._skycons.minpos.y}, 250);
		}
	})
};

  /* -------------------------------------------- */

  /**
   * Maximize the pop-out window, expanding it to its original size
   * Take no action for applications which are not of the pop-out variety or are already maximized
   * @return {Promise}    A Promise which resolves to true once the maximization action has completed
   */
Application.prototype.maximize = async function() {
	if ( !this.popOut || [false, null].includes(this._minimized) ) return;
	this._minimized = null;

	// Get content
	let window = this.element,
		header = window.find('.window-header'),
		content = window.find('.window-content');

	if (this._skycons === undefined) {
		this._skycons = {};
	}
	this._skycons.minpos = {'x':this.position.left, 'y':this.position.top};

	// Expand window
	return new Promise((resolve) => {
		window.animate({width: this.position.width, height: this.position.height}, 100, () => {
		header.children().show();
		content.slideDown(100, () => {
			window.removeClass("minimized");
			this._minimized = false;
			window.css({minWidth: '', minHeight: ''});
				this.setPosition(this.position);
				resolve(true);
			});
		});
		if (this._skycons.maxpos !== undefined) {
			window.animate({left: this._skycons.maxpos.x, top: this._skycons.maxpos.y}, 250);
		}
	})
};
