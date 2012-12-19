ig.module(
	'plugins.svenardo-loader'
)
.requires(
	'impact.loader'
)
.defines(function(){

ig.SvenardoLoader = ig.Loader.extend({

	endTime: 0,
	fadeToWhiteTime: 200,
	fadeToGameTime: 800,
	logoWidth: 340,
	logoHeight: 120,

	end: function() {
		this.parent();
		this.endTime = Date.now();

		// This is a bit of a hack - set this class instead of ig.game as the delegate.
		// The delegate will be set back to ig.game after the screen fade is complete.
		ig.system.setDelegate( this );
	},


	// Proxy for ig.game.run to show the screen fade after everything is loaded
	run: function() {	
		var t = Date.now() - this.endTime;
		var alpha = 1;
		if( t < this.fadeToWhiteTime ) {
			// Draw the logo -> fade to white
			this.draw();
			alpha = t.map( 0, this.fadeToWhiteTime, 0, 1);
		}
		else if( t < this.fadeToGameTime ) {
			// Draw the game -> fade from white
			ig.game.run();
			alpha = t.map( this.fadeToWhiteTime, this.fadeToGameTime, 1, 0);
		}
		else {
			// All done! Dismiss the preloader completely, set the delegate
			// to ig.game
			ig.system.setDelegate( ig.game );
			return;
		}

		// Draw the white rect over the whole screen
		ig.system.context.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ig.system.context.fillRect( 0, 0, ig.system.realWidth, ig.system.realHeight );
	},


	draw: function() {
		// Some damping for the status bar
		this._drawStatus += (this.status - this._drawStatus)/5;


		var ctx = ig.system.context;
		var w = ig.system.realWidth;
		var h = ig.system.realHeight;
		var scale = w / this.logoWidth / 3; // Logo size should be 1/3 of the screen width
		var center = (w - this.logoWidth * scale)/2;


		var offset_x = 200;
        var offset_y = 75;
        var fill_x = w; // could be canvas.width
        var fill_y = h; // could be canvas.height


		// Clear
		ctx.fillStyle = 'rgba(0,0,0,0.8)';
		ctx.fillRect( 0, 0, w, h );

        var w = ig.system.realWidth;
        var h = ig.system.realHeight;
        ig.system.context.fillStyle = '#000000';
        ig.system.context.fillRect( 0, 0, w, h );

        var percentage = (this.status * 100).round() + '%';
        ig.system.context.fillStyle = '#ffffff';
        ig.system.context.fillText( percentage, w/2,  h/2 );


      // layer1/Path
      ctx.save();
      // offset vars
        
      // offset
      ctx.translate(offset_x, offset_y);

      ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
      ctx.shadowOffsetX = 7.0;
      ctx.shadowOffsetY = 7.0;
      ctx.shadowBlur = 10.0;
      ctx.beginPath();
      ctx.moveTo(494.8, 139.1);
      ctx.lineTo(84.3, 139.1);
      ctx.lineTo(84.3, 29.2);
      ctx.lineTo(494.8, 29.2);
      ctx.lineTo(494.8, 139.1);
      ctx.closePath();
      ctx.fillStyle = "rgb(203, 203, 203)";
      ctx.fill();
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = "rgb(50, 50, 50)";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();


      // layer1/SVENARDO
	
      ctx.font = "Bold 34.3px 'Georgia'";
      ctx.fillStyle = "rgb(246, 146, 29)";
      ctx.fillText("SVENARDO.COM", 135.5, 74.2);
      ctx.lineWidth = 0.8;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 0.0;
      ctx.strokeText("SVENARDO.COM", 135.5, 74.2);

      // layer1/JETMAN JR
      ctx.font = "Bold 36.0px 'Georgia'";
      ctx.fillStyle = "rgb(192, 38, 44)";
      ctx.fillText("JETMAN JR", 177.3, 119.5);
      ctx.strokeStyle = "rgb(65, 32, 10)";
      ctx.strokeText("JETMAN JR", 177.3, 119.5);
      ctx.restore();


	},


});

ig.SvenardoLoader.OPS = {
	bp:'beginPath',
	cp:'closePath',
	f:'fill',
	m:'moveTo',
	l:'lineTo',
	bc:'bezierCurveTo'
};



});