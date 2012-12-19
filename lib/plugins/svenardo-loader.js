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


		var offset_x = 175;
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

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(51.9, 3.0);
      ctx.bezierCurveTo(51.1, 4.0, 49.4, 4.9, 48.1, 5.1);
      ctx.bezierCurveTo(48.1, 5.1, 48.1, 5.1, 47.1, 5.3);
      ctx.bezierCurveTo(46.2, 5.4, 45.1, 5.6, 43.9, 5.9);
      ctx.bezierCurveTo(42.5, 6.3, 41.3, 6.9, 40.4, 7.7);
      ctx.bezierCurveTo(39.5, 8.6, 38.8, 9.6, 38.1, 10.7);
      ctx.bezierCurveTo(31.6, 18.9, 29.5, 29.2, 30.5, 39.4);
      ctx.bezierCurveTo(30.6, 45.2, 32.8, 53.0, 34.5, 56.6);
      ctx.bezierCurveTo(34.5, 56.6, 34.5, 56.6, 35.0, 59.5);
      ctx.bezierCurveTo(35.4, 62.3, 35.2, 64.7, 34.1, 66.5);
      ctx.bezierCurveTo(32.9, 68.3, 31.1, 69.6, 28.6, 70.6);
      ctx.bezierCurveTo(26.2, 71.5, 23.2, 71.9, 19.9, 71.9);
      ctx.bezierCurveTo(14.0, 71.9, 8.9, 70.5, 5.4, 67.6);
      ctx.bezierCurveTo(1.8, 64.7, 0.4, 60.7, 0.4, 55.6);
      ctx.bezierCurveTo(0.4, 52.7, 0.8, 50.2, 1.8, 48.2);
      ctx.bezierCurveTo(2.8, 46.3, 4.2, 45.3, 6.0, 45.4);
      ctx.bezierCurveTo(7.7, 45.4, 9.1, 46.3, 10.3, 48.0);
      ctx.bezierCurveTo(11.4, 49.7, 12.7, 51.7, 13.3, 54.1);
      ctx.bezierCurveTo(13.8, 56.2, 13.8, 58.1, 13.1, 59.8);
      ctx.bezierCurveTo(12.5, 61.5, 11.5, 63.1, 10.2, 64.5);
      ctx.lineTo(10.2, 64.5);
      ctx.bezierCurveTo(10.3, 64.9, 10.8, 65.7, 11.4, 66.3);
      ctx.bezierCurveTo(11.4, 66.3, 11.4, 66.3, 12.3, 66.8);
      ctx.bezierCurveTo(13.3, 67.2, 14.2, 67.5, 15.1, 67.5);
      ctx.bezierCurveTo(18.6, 67.5, 20.9, 66.2, 21.7, 63.5);
      ctx.bezierCurveTo(22.5, 60.8, 21.6, 56.7, 19.6, 51.1);
      ctx.bezierCurveTo(17.9, 41.3, 17.9, 31.2, 19.6, 21.4);
      ctx.bezierCurveTo(21.6, 15.9, 23.8, 10.5, 24.2, 9.4);
      ctx.bezierCurveTo(24.2, 9.4, 24.2, 9.4, 24.2, 8.6);
      ctx.bezierCurveTo(24.2, 7.9, 23.8, 7.2, 22.8, 6.7);
      ctx.bezierCurveTo(22.1, 6.3, 21.2, 5.9, 20.1, 5.7);
      ctx.bezierCurveTo(19.0, 5.4, 18.0, 5.2, 17.2, 5.1);
      ctx.lineTo(17.2, 5.1);
      ctx.bezierCurveTo(17.9, 3.1, 22.8, 1.4, 28.2, 1.4);
      ctx.bezierCurveTo(34.3, 1.4, 37.3, 1.4, 43.5, 1.4);
      ctx.bezierCurveTo(48.9, 1.4, 52.7, 2.1, 51.9, 3.0);
      ctx.closePath();
      ctx.fillStyle = "rgb(246, 146, 29)";
      ctx.fill();
      ctx.lineWidth = 0.8;
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4.0;
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(108.0, 8.7);
      ctx.bezierCurveTo(103.2, 13.1, 99.2, 17.2, 98.2, 17.2);
      ctx.bezierCurveTo(97.3, 17.2, 97.4, 14.8, 98.8, 12.1);
      ctx.bezierCurveTo(98.8, 12.1, 98.7, 12.0, 99.1, 9.5);
      ctx.bezierCurveTo(99.6, 7.1, 99.0, 5.8, 97.4, 5.3);
      ctx.bezierCurveTo(96.8, 5.2, 95.6, 5.0, 94.0, 5.0);
      ctx.bezierCurveTo(92.5, 5.0, 91.1, 5.0, 90.1, 5.0);
      ctx.lineTo(90.1, 5.0);
      ctx.bezierCurveTo(84.9, 5.0, 76.3, 9.1, 71.7, 14.5);
      ctx.bezierCurveTo(69.6, 17.1, 68.6, 18.4, 66.7, 21.1);
      ctx.bezierCurveTo(62.6, 26.8, 65.8, 31.9, 67.5, 31.9);
      ctx.bezierCurveTo(69.2, 31.9, 71.9, 31.8, 73.5, 31.6);
      ctx.bezierCurveTo(73.5, 31.6, 73.5, 31.6, 74.9, 31.1);
      ctx.bezierCurveTo(76.2, 30.7, 77.4, 29.8, 78.6, 28.4);
      ctx.bezierCurveTo(79.4, 27.6, 80.2, 26.2, 81.2, 24.1);
      ctx.bezierCurveTo(82.2, 22.0, 84.3, 20.4, 85.7, 18.9);
      ctx.lineTo(85.7, 18.9);
      ctx.bezierCurveTo(87.5, 18.9, 85.7, 23.6, 85.2, 29.7);
      ctx.bezierCurveTo(84.9, 33.6, 84.8, 35.6, 85.0, 39.4);
      ctx.bezierCurveTo(85.3, 45.6, 86.0, 50.5, 85.1, 50.5);
      ctx.bezierCurveTo(84.1, 50.5, 82.4, 49.0, 81.7, 47.2);
      ctx.bezierCurveTo(81.7, 47.2, 81.7, 47.2, 80.7, 44.9);
      ctx.bezierCurveTo(79.8, 42.6, 79.0, 41.0, 78.3, 40.2);
      ctx.bezierCurveTo(77.3, 38.9, 76.2, 38.0, 74.9, 37.5);
      ctx.bezierCurveTo(73.6, 37.0, 72.1, 36.8, 70.4, 36.8);
      ctx.lineTo(70.4, 36.8);
      ctx.bezierCurveTo(67.1, 36.8, 64.3, 41.7, 65.1, 47.6);
      ctx.bezierCurveTo(65.8, 53.5, 73.1, 59.5, 75.0, 61.4);
      ctx.bezierCurveTo(75.0, 61.4, 74.9, 61.4, 76.3, 62.6);
      ctx.bezierCurveTo(77.7, 63.8, 79.1, 64.6, 80.4, 65.2);
      ctx.bezierCurveTo(81.8, 65.8, 83.2, 66.2, 84.7, 66.4);
      ctx.bezierCurveTo(86.2, 66.5, 88.1, 66.6, 90.3, 66.7);
      ctx.bezierCurveTo(91.4, 66.7, 92.7, 66.7, 94.1, 66.7);
      ctx.bezierCurveTo(95.6, 66.6, 96.8, 66.6, 97.7, 66.4);
      ctx.bezierCurveTo(98.8, 66.3, 99.8, 66.1, 100.6, 65.8);
      ctx.bezierCurveTo(101.4, 65.6, 101.7, 65.1, 101.7, 64.6);
      ctx.bezierCurveTo(101.5, 63.2, 100.8, 60.9, 99.8, 57.7);
      ctx.bezierCurveTo(98.7, 54.5, 98.0, 52.0, 97.4, 50.2);
      ctx.lineTo(97.4, 50.2);
      ctx.bezierCurveTo(99.3, 50.3, 103.8, 55.2, 108.6, 60.5);
      ctx.bezierCurveTo(109.1, 61.0, 109.3, 61.3, 109.8, 61.8);
      ctx.bezierCurveTo(114.8, 67.0, 115.3, 70.5, 109.9, 70.5);
      ctx.bezierCurveTo(95.9, 70.5, 82.0, 70.4, 68.0, 70.3);
      ctx.bezierCurveTo(62.6, 70.3, 57.5, 69.5, 56.7, 68.6);
      ctx.bezierCurveTo(55.9, 67.7, 56.0, 66.8, 57.0, 66.7);
      ctx.bezierCurveTo(57.0, 66.7, 57.0, 66.7, 58.3, 66.5);
      ctx.bezierCurveTo(59.5, 66.4, 60.4, 66.2, 60.7, 66.0);
      ctx.bezierCurveTo(61.4, 65.5, 61.6, 64.9, 61.4, 64.2);
      ctx.bezierCurveTo(61.1, 63.4, 60.5, 62.5, 59.5, 61.3);
      ctx.bezierCurveTo(49.1, 47.1, 48.9, 37.8, 52.4, 20.8);
      ctx.bezierCurveTo(56.2, 15.2, 60.5, 9.9, 61.3, 8.8);
      ctx.bezierCurveTo(61.3, 8.8, 61.3, 8.8, 61.6, 8.1);
      ctx.bezierCurveTo(61.9, 7.4, 61.7, 6.8, 61.0, 6.2);
      ctx.bezierCurveTo(60.5, 5.9, 59.7, 5.6, 58.6, 5.3);
      ctx.bezierCurveTo(57.5, 5.0, 56.6, 4.8, 55.9, 4.7);
      ctx.lineTo(55.9, 4.7);
      ctx.bezierCurveTo(57.6, 2.8, 63.4, 1.3, 68.8, 1.3);
      ctx.bezierCurveTo(81.7, 1.3, 94.6, 1.2, 107.5, 1.2);
      ctx.bezierCurveTo(113.0, 1.2, 112.8, 4.2, 108.0, 8.7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(180.1, 8.8);
      ctx.bezierCurveTo(175.6, 13.7, 172.5, 18.7, 171.4, 18.7);
      ctx.bezierCurveTo(170.3, 18.7, 169.6, 15.7, 170.7, 12.4);
      ctx.bezierCurveTo(170.7, 12.4, 170.5, 12.3, 171.1, 9.3);
      ctx.bezierCurveTo(171.7, 6.2, 171.7, 4.8, 170.1, 4.6);
      ctx.bezierCurveTo(169.2, 4.5, 168.1, 4.4, 166.7, 4.4);
      ctx.bezierCurveTo(165.3, 4.3, 164.1, 4.3, 163.0, 4.3);
      ctx.lineTo(163.0, 4.3);
      ctx.bezierCurveTo(161.8, 4.3, 155.9, 7.9, 151.5, 13.4);
      ctx.bezierCurveTo(143.7, 25.7, 141.2, 37.3, 146.4, 51.6);
      ctx.bezierCurveTo(149.8, 57.6, 154.9, 62.8, 156.1, 63.9);
      ctx.bezierCurveTo(156.1, 63.9, 156.1, 63.9, 157.4, 64.7);
      ctx.bezierCurveTo(158.6, 65.5, 160.1, 66.1, 161.9, 66.6);
      ctx.bezierCurveTo(162.9, 66.8, 164.3, 67.1, 166.2, 67.4);
      ctx.bezierCurveTo(168.0, 67.6, 169.6, 67.8, 170.8, 67.9);
      ctx.lineTo(170.8, 67.9);
      ctx.bezierCurveTo(172.9, 69.6, 170.3, 70.8, 164.8, 70.7);
      ctx.bezierCurveTo(157.9, 70.7, 154.5, 70.7, 147.7, 70.7);
      ctx.bezierCurveTo(142.2, 70.6, 136.7, 70.0, 135.5, 69.2);
      ctx.bezierCurveTo(134.3, 68.3, 134.3, 67.5, 135.3, 67.4);
      ctx.bezierCurveTo(135.3, 67.4, 135.3, 67.4, 136.8, 67.3);
      ctx.bezierCurveTo(138.2, 67.2, 139.1, 67.0, 139.4, 66.8);
      ctx.bezierCurveTo(140.1, 66.3, 140.2, 65.8, 139.7, 65.0);
      ctx.bezierCurveTo(139.3, 64.2, 138.4, 63.3, 137.3, 62.1);
      ctx.bezierCurveTo(124.1, 45.9, 122.7, 31.2, 134.3, 13.6);
      ctx.bezierCurveTo(139.0, 8.1, 143.6, 4.4, 142.9, 4.4);
      ctx.bezierCurveTo(142.3, 4.4, 140.8, 4.5, 139.5, 4.5);
      ctx.bezierCurveTo(139.5, 4.5, 139.5, 4.5, 137.9, 4.6);
      ctx.bezierCurveTo(136.3, 4.7, 135.0, 4.8, 133.8, 4.9);
      ctx.bezierCurveTo(131.8, 5.1, 127.7, 6.6, 122.4, 9.8);
      ctx.bezierCurveTo(117.0, 13.0, 112.7, 16.2, 109.4, 19.3);
      ctx.lineTo(109.4, 19.3);
      ctx.bezierCurveTo(107.4, 19.3, 109.2, 14.6, 114.5, 9.5);
      ctx.bezierCurveTo(119.8, 4.5, 129.6, 1.1, 135.1, 1.1);
      ctx.bezierCurveTo(149.9, 1.1, 164.7, 1.1, 179.6, 1.0);
      ctx.bezierCurveTo(185.1, 1.0, 184.5, 3.9, 180.1, 8.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(285.3, 68.2);
      ctx.bezierCurveTo(285.6, 69.8, 281.3, 70.9, 275.7, 70.9);
      ctx.bezierCurveTo(269.1, 70.9, 265.8, 70.9, 259.2, 70.9);
      ctx.bezierCurveTo(253.6, 70.9, 248.5, 70.3, 247.9, 69.6);
      ctx.bezierCurveTo(247.4, 68.8, 248.0, 68.1, 249.3, 68.0);
      ctx.bezierCurveTo(249.3, 68.0, 249.3, 68.0, 250.9, 67.8);
      ctx.bezierCurveTo(252.4, 67.6, 253.4, 67.4, 253.9, 67.2);
      ctx.bezierCurveTo(254.9, 66.8, 255.6, 66.3, 255.8, 65.6);
      ctx.bezierCurveTo(256.0, 64.8, 255.9, 63.9, 255.5, 62.7);
      ctx.bezierCurveTo(250.3, 48.0, 250.2, 30.9, 253.7, 15.8);
      ctx.bezierCurveTo(255.1, 10.1, 253.5, 9.8, 249.7, 15.2);
      ctx.bezierCurveTo(241.1, 29.5, 233.2, 45.2, 233.8, 62.4);
      ctx.bezierCurveTo(234.0, 67.2, 234.0, 70.1, 232.3, 70.1);
      ctx.bezierCurveTo(230.6, 70.1, 227.7, 69.1, 225.9, 67.7);
      ctx.bezierCurveTo(225.9, 67.7, 225.9, 67.9, 222.7, 65.1);
      ctx.bezierCurveTo(219.5, 62.3, 217.2, 59.8, 215.6, 57.8);
      ctx.bezierCurveTo(205.7, 46.2, 198.8, 30.0, 200.4, 14.5);
      ctx.bezierCurveTo(201.1, 9.2, 199.2, 9.4, 196.3, 15.2);
      ctx.bezierCurveTo(191.7, 24.2, 190.8, 29.9, 191.6, 40.3);
      ctx.bezierCurveTo(192.2, 46.9, 195.3, 55.5, 197.8, 59.4);
      ctx.bezierCurveTo(197.8, 59.4, 197.7, 59.5, 199.6, 61.5);
      ctx.bezierCurveTo(201.6, 63.5, 203.6, 64.8, 205.6, 65.7);
      ctx.bezierCurveTo(206.9, 66.2, 208.9, 66.8, 211.6, 67.3);
      ctx.bezierCurveTo(214.2, 67.8, 215.9, 68.1, 216.9, 68.1);
      ctx.lineTo(216.9, 68.1);
      ctx.bezierCurveTo(218.5, 69.8, 215.4, 70.9, 209.7, 70.9);
      ctx.bezierCurveTo(206.2, 70.9, 204.5, 70.9, 201.0, 70.9);
      ctx.bezierCurveTo(195.4, 70.9, 189.9, 70.3, 188.9, 69.5);
      ctx.bezierCurveTo(187.8, 68.7, 187.8, 67.9, 188.8, 67.8);
      ctx.bezierCurveTo(188.8, 67.8, 188.8, 67.8, 190.3, 67.6);
      ctx.bezierCurveTo(191.8, 67.3, 192.7, 66.8, 193.2, 66.1);
      ctx.bezierCurveTo(193.7, 65.4, 193.4, 64.1, 192.4, 62.0);
      ctx.bezierCurveTo(191.3, 60.0, 189.6, 56.9, 188.0, 52.5);
      ctx.bezierCurveTo(184.6, 43.5, 184.2, 33.6, 186.6, 24.3);
      ctx.bezierCurveTo(188.2, 18.0, 192.0, 11.7, 193.4, 9.7);
      ctx.bezierCurveTo(193.4, 9.7, 193.3, 9.7, 193.8, 8.4);
      ctx.bezierCurveTo(194.3, 7.2, 194.4, 6.3, 194.1, 5.6);
      ctx.bezierCurveTo(193.7, 4.8, 193.0, 4.3, 191.9, 4.1);
      ctx.bezierCurveTo(190.9, 3.9, 189.7, 3.7, 188.4, 3.7);
      ctx.lineTo(188.4, 3.7);
      ctx.bezierCurveTo(190.5, 2.1, 196.9, 1.0, 202.4, 1.0);
      ctx.bezierCurveTo(206.8, 1.0, 208.9, 1.0, 213.2, 1.0);
      ctx.bezierCurveTo(218.8, 1.0, 221.2, 3.6, 220.1, 8.3);
      ctx.bezierCurveTo(218.0, 18.8, 220.7, 27.5, 223.7, 37.5);
      ctx.bezierCurveTo(226.0, 43.7, 229.8, 43.8, 232.0, 37.5);
      ctx.bezierCurveTo(235.1, 28.8, 237.2, 24.2, 242.5, 16.6);
      ctx.bezierCurveTo(246.3, 11.1, 250.9, 6.3, 252.2, 5.0);
      ctx.bezierCurveTo(252.2, 5.0, 252.2, 4.9, 253.5, 3.5);
      ctx.bezierCurveTo(254.9, 2.1, 255.8, 1.3, 256.1, 1.0);
      ctx.bezierCurveTo(264.0, 1.0, 268.0, 1.0, 275.9, 1.0);
      ctx.bezierCurveTo(281.5, 1.0, 285.9, 1.5, 285.7, 2.2);
      ctx.bezierCurveTo(285.5, 2.9, 284.4, 3.6, 283.2, 3.7);
      ctx.bezierCurveTo(283.2, 3.7, 283.2, 3.7, 282.0, 3.9);
      ctx.bezierCurveTo(280.8, 4.0, 279.6, 4.2, 278.5, 4.5);
      ctx.bezierCurveTo(277.1, 4.8, 276.0, 5.3, 275.4, 6.1);
      ctx.bezierCurveTo(274.8, 6.8, 274.3, 7.7, 274.1, 8.7);
      ctx.bezierCurveTo(270.8, 23.2, 271.3, 37.8, 272.2, 52.5);
      ctx.bezierCurveTo(272.9, 58.6, 274.1, 63.7, 274.5, 64.7);
      ctx.bezierCurveTo(274.5, 64.7, 274.5, 64.7, 275.1, 65.4);
      ctx.bezierCurveTo(275.7, 66.1, 276.8, 66.6, 278.2, 67.1);
      ctx.bezierCurveTo(278.9, 67.3, 280.1, 67.6, 281.7, 67.8);
      ctx.bezierCurveTo(283.2, 68.0, 284.5, 68.1, 285.3, 68.2);
      ctx.lineTo(285.3, 68.2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(369.5, 68.1);
      ctx.bezierCurveTo(368.2, 69.8, 362.4, 70.9, 356.8, 70.9);
      ctx.bezierCurveTo(350.1, 70.9, 346.8, 70.9, 340.1, 70.9);
      ctx.bezierCurveTo(334.5, 70.9, 330.1, 70.3, 330.4, 69.6);
      ctx.bezierCurveTo(330.7, 68.8, 332.8, 68.0, 335.0, 67.8);
      ctx.bezierCurveTo(335.0, 67.8, 335.0, 67.8, 337.6, 67.4);
      ctx.bezierCurveTo(340.2, 67.0, 341.6, 66.5, 341.9, 65.9);
      ctx.bezierCurveTo(342.0, 65.7, 342.0, 65.4, 342.1, 65.1);
      ctx.bezierCurveTo(342.1, 64.9, 342.1, 64.5, 342.1, 64.0);
      ctx.bezierCurveTo(341.8, 62.2, 341.6, 61.3, 341.2, 59.3);
      ctx.bezierCurveTo(340.0, 54.2, 333.0, 49.3, 326.4, 49.3);
      ctx.bezierCurveTo(325.0, 49.3, 324.3, 49.3, 322.9, 49.3);
      ctx.bezierCurveTo(316.3, 49.3, 310.2, 50.8, 309.4, 52.6);
      ctx.bezierCurveTo(309.4, 52.6, 309.4, 52.6, 308.6, 54.5);
      ctx.bezierCurveTo(307.8, 56.4, 307.1, 58.0, 306.6, 59.4);
      ctx.bezierCurveTo(305.8, 61.2, 305.4, 62.4, 305.3, 63.2);
      ctx.bezierCurveTo(305.1, 63.9, 305.1, 64.4, 305.1, 64.7);
      ctx.bezierCurveTo(305.0, 65.6, 305.9, 66.3, 307.5, 66.9);
      ctx.bezierCurveTo(309.1, 67.5, 311.7, 67.9, 315.5, 68.2);
      ctx.lineTo(315.5, 68.2);
      ctx.bezierCurveTo(315.2, 69.8, 310.3, 70.9, 304.7, 70.9);
      ctx.bezierCurveTo(301.7, 70.9, 300.2, 70.9, 297.2, 70.9);
      ctx.bezierCurveTo(291.6, 70.9, 286.8, 70.3, 286.7, 69.6);
      ctx.bezierCurveTo(286.5, 68.8, 287.4, 68.1, 288.7, 68.0);
      ctx.bezierCurveTo(288.7, 68.0, 288.7, 68.0, 290.0, 67.8);
      ctx.bezierCurveTo(291.4, 67.6, 292.4, 67.2, 293.2, 66.9);
      ctx.bezierCurveTo(294.5, 66.2, 295.7, 65.4, 296.6, 64.4);
      ctx.bezierCurveTo(297.5, 63.4, 298.3, 62.2, 299.0, 60.7);
      ctx.bezierCurveTo(303.5, 50.4, 307.9, 39.8, 312.0, 29.3);
      ctx.bezierCurveTo(315.7, 19.8, 319.5, 10.2, 322.5, 0.4);
      ctx.lineTo(322.5, 0.4);
      ctx.bezierCurveTo(327.6, 0.4, 335.0, 2.8, 338.7, 7.3);
      ctx.bezierCurveTo(346.2, 16.2, 351.6, 26.7, 355.7, 37.6);
      ctx.bezierCurveTo(359.7, 48.5, 361.2, 57.0, 361.5, 62.6);
      ctx.bezierCurveTo(361.5, 63.5, 361.7, 64.2, 362.0, 64.9);
      ctx.bezierCurveTo(362.3, 65.6, 362.9, 66.3, 363.8, 66.8);
      ctx.bezierCurveTo(364.5, 67.3, 365.3, 67.6, 366.4, 67.8);
      ctx.bezierCurveTo(367.5, 68.0, 368.5, 68.1, 369.5, 68.1);
      ctx.lineTo(369.5, 68.1);
      ctx.closePath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(324.9, 43.6);
      ctx.bezierCurveTo(331.3, 43.6, 334.7, 38.5, 332.2, 32.3);
      ctx.bezierCurveTo(331.0, 29.3, 330.3, 27.8, 329.0, 24.9);
      ctx.bezierCurveTo(326.3, 18.9, 322.5, 18.9, 320.3, 24.9);
      ctx.bezierCurveTo(319.3, 27.8, 318.8, 29.3, 317.7, 32.3);
      ctx.bezierCurveTo(315.3, 38.5, 318.5, 43.6, 324.9, 43.6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(446.2, 2.4);
      ctx.bezierCurveTo(447.4, 3.2, 447.5, 4.0, 446.5, 4.1);
      ctx.bezierCurveTo(446.5, 4.1, 446.5, 4.1, 445.1, 4.3);
      ctx.bezierCurveTo(443.7, 4.5, 442.9, 5.0, 442.6, 5.8);
      ctx.bezierCurveTo(442.3, 6.5, 442.9, 7.8, 444.3, 9.8);
      ctx.bezierCurveTo(445.6, 11.8, 448.0, 14.8, 450.5, 19.2);
      ctx.bezierCurveTo(457.2, 33.6, 454.9, 51.6, 443.4, 62.8);
      ctx.bezierCurveTo(438.6, 67.9, 431.4, 71.0, 429.1, 71.0);
      ctx.bezierCurveTo(426.8, 71.0, 426.2, 68.7, 426.5, 64.9);
      ctx.bezierCurveTo(427.1, 48.0, 414.0, 34.6, 403.5, 23.3);
      ctx.bezierCurveTo(398.3, 18.3, 395.6, 19.3, 396.8, 25.7);
      ctx.bezierCurveTo(397.8, 31.4, 398.0, 34.4, 397.6, 40.3);
      ctx.bezierCurveTo(397.2, 46.9, 394.6, 55.6, 392.8, 59.5);
      ctx.bezierCurveTo(392.8, 59.5, 392.8, 59.5, 392.2, 61.5);
      ctx.bezierCurveTo(391.6, 63.5, 391.4, 64.8, 392.0, 65.7);
      ctx.bezierCurveTo(392.4, 66.3, 393.4, 66.8, 394.9, 67.2);
      ctx.bezierCurveTo(396.4, 67.7, 397.7, 68.0, 398.7, 68.1);
      ctx.lineTo(398.7, 68.1);
      ctx.bezierCurveTo(396.9, 69.7, 390.7, 70.9, 385.0, 70.9);
      ctx.bezierCurveTo(381.5, 70.9, 379.8, 70.9, 376.2, 70.9);
      ctx.bezierCurveTo(370.6, 70.9, 366.6, 70.3, 367.3, 69.6);
      ctx.bezierCurveTo(367.9, 68.8, 369.8, 68.0, 371.4, 67.9);
      ctx.bezierCurveTo(371.4, 67.9, 371.4, 67.9, 373.3, 67.6);
      ctx.bezierCurveTo(375.2, 67.3, 377.0, 66.8, 378.7, 66.2);
      ctx.bezierCurveTo(380.6, 65.4, 382.4, 64.2, 383.9, 62.4);
      ctx.bezierCurveTo(385.5, 60.6, 387.4, 57.5, 389.0, 52.6);
      ctx.bezierCurveTo(392.1, 42.7, 392.1, 36.5, 390.4, 26.0);
      ctx.bezierCurveTo(389.3, 19.5, 386.4, 13.4, 385.3, 11.7);
      ctx.bezierCurveTo(385.3, 11.7, 385.3, 11.7, 384.0, 10.3);
      ctx.bezierCurveTo(382.7, 9.0, 381.1, 7.9, 379.4, 7.0);
      ctx.bezierCurveTo(377.5, 6.0, 375.6, 5.3, 373.7, 4.8);
      ctx.bezierCurveTo(371.8, 4.3, 369.8, 3.9, 367.6, 3.7);
      ctx.lineTo(367.6, 3.7);
      ctx.bezierCurveTo(366.3, 2.1, 369.7, 1.0, 375.2, 1.0);
      ctx.bezierCurveTo(377.3, 1.0, 378.3, 1.0, 380.3, 1.0);
      ctx.bezierCurveTo(385.9, 1.0, 396.7, 3.2, 403.8, 7.0);
      ctx.bezierCurveTo(418.6, 16.0, 431.6, 25.8, 441.1, 40.7);
      ctx.bezierCurveTo(444.4, 45.8, 447.8, 44.7, 448.0, 38.1);
      ctx.bezierCurveTo(448.2, 35.3, 448.1, 33.9, 447.8, 31.1);
      ctx.bezierCurveTo(447.2, 24.6, 442.9, 16.1, 439.6, 12.2);
      ctx.bezierCurveTo(439.6, 12.2, 439.7, 12.2, 437.4, 10.3);
      ctx.bezierCurveTo(435.2, 8.3, 432.9, 7.0, 430.8, 6.2);
      ctx.bezierCurveTo(429.2, 5.6, 427.2, 5.0, 424.9, 4.6);
      ctx.bezierCurveTo(422.5, 4.2, 420.7, 3.9, 419.4, 3.7);
      ctx.lineTo(419.4, 3.7);
      ctx.bezierCurveTo(417.3, 2.1, 419.9, 1.0, 425.4, 1.0);
      ctx.bezierCurveTo(428.9, 1.0, 430.6, 1.0, 434.0, 1.1);
      ctx.bezierCurveTo(439.5, 1.1, 445.0, 1.7, 446.2, 2.4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(525.6, 2.9);
      ctx.bezierCurveTo(526.6, 3.8, 526.5, 4.7, 525.5, 4.8);
      ctx.bezierCurveTo(525.5, 4.8, 525.5, 4.8, 524.8, 4.9);
      ctx.bezierCurveTo(524.1, 5.1, 523.4, 5.3, 522.6, 5.5);
      ctx.bezierCurveTo(521.7, 5.8, 521.5, 6.4, 522.0, 7.2);
      ctx.bezierCurveTo(522.6, 8.0, 523.4, 9.0, 524.4, 10.1);
      ctx.bezierCurveTo(532.5, 19.6, 537.6, 26.4, 535.9, 39.5);
      ctx.bezierCurveTo(535.7, 45.6, 531.7, 53.6, 528.3, 57.3);
      ctx.bezierCurveTo(528.3, 57.3, 528.4, 57.4, 524.5, 60.2);
      ctx.bezierCurveTo(520.7, 63.0, 516.5, 65.3, 512.2, 67.1);
      ctx.bezierCurveTo(507.9, 68.8, 503.7, 70.0, 499.6, 70.8);
      ctx.bezierCurveTo(495.6, 71.6, 491.9, 72.0, 488.5, 72.0);
      ctx.bezierCurveTo(482.6, 72.0, 479.7, 71.0, 479.4, 68.6);
      ctx.bezierCurveTo(479.1, 66.3, 481.5, 62.8, 485.9, 57.7);
      ctx.bezierCurveTo(488.5, 54.7, 492.1, 52.0, 494.2, 49.9);
      ctx.bezierCurveTo(496.4, 47.7, 498.8, 46.5, 501.7, 46.5);
      ctx.bezierCurveTo(504.4, 46.5, 506.4, 47.4, 507.6, 49.2);
      ctx.bezierCurveTo(508.8, 51.0, 507.5, 53.1, 505.4, 55.6);
      ctx.bezierCurveTo(503.7, 57.7, 501.3, 59.6, 498.2, 61.3);
      ctx.bezierCurveTo(495.2, 63.0, 492.0, 64.5, 488.7, 65.8);
      ctx.lineTo(488.7, 65.8);
      ctx.bezierCurveTo(488.4, 66.1, 487.9, 66.9, 487.7, 67.4);
      ctx.bezierCurveTo(487.7, 67.4, 487.7, 67.4, 488.1, 67.8);
      ctx.bezierCurveTo(488.5, 68.2, 489.2, 68.3, 490.2, 68.3);
      ctx.bezierCurveTo(493.9, 68.3, 498.4, 67.2, 503.3, 64.6);
      ctx.bezierCurveTo(508.1, 62.0, 513.2, 58.0, 517.6, 52.1);
      ctx.bezierCurveTo(522.0, 42.7, 522.0, 29.8, 517.7, 20.3);
      ctx.bezierCurveTo(513.3, 14.6, 508.0, 9.4, 506.7, 8.3);
      ctx.bezierCurveTo(506.7, 8.3, 506.7, 8.3, 505.6, 7.6);
      ctx.bezierCurveTo(504.5, 6.9, 503.0, 6.3, 501.1, 5.8);
      ctx.bezierCurveTo(499.7, 5.4, 498.2, 5.1, 496.6, 4.8);
      ctx.bezierCurveTo(495.0, 4.6, 493.7, 4.4, 492.7, 4.3);
      ctx.lineTo(492.7, 4.3);
      ctx.bezierCurveTo(490.4, 2.5, 492.9, 1.2, 498.4, 1.2);
      ctx.bezierCurveTo(504.6, 1.2, 507.7, 1.2, 513.8, 1.2);
      ctx.bezierCurveTo(519.3, 1.3, 524.6, 2.0, 525.6, 2.9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // layer1/Envelope/Group/Compound Path
      ctx.beginPath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(604.5, 66.3);
      ctx.bezierCurveTo(604.5, 68.3, 600.2, 70.1, 594.9, 70.1);
      ctx.bezierCurveTo(592.8, 70.1, 591.7, 70.1, 589.6, 70.1);
      ctx.bezierCurveTo(584.3, 70.1, 579.1, 66.6, 578.6, 62.1);
      ctx.bezierCurveTo(578.6, 62.1, 578.2, 58.1, 577.8, 54.0);
      ctx.bezierCurveTo(577.4, 49.9, 575.6, 45.0, 572.4, 39.3);
      ctx.lineTo(572.4, 39.3);
      ctx.bezierCurveTo(571.3, 39.3, 572.5, 44.3, 569.4, 49.9);
      ctx.bezierCurveTo(569.2, 50.2, 569.1, 50.4, 569.0, 50.7);
      ctx.bezierCurveTo(565.9, 56.3, 562.4, 61.7, 561.8, 62.8);
      ctx.bezierCurveTo(561.8, 62.8, 561.8, 62.8, 561.6, 63.6);
      ctx.bezierCurveTo(561.5, 64.3, 561.8, 65.0, 562.5, 65.5);
      ctx.bezierCurveTo(562.9, 65.7, 563.6, 66.0, 564.6, 66.2);
      ctx.bezierCurveTo(565.6, 66.4, 566.5, 66.6, 567.3, 66.7);
      ctx.lineTo(567.3, 66.7);
      ctx.bezierCurveTo(566.1, 68.7, 560.6, 70.2, 555.3, 70.3);
      ctx.bezierCurveTo(549.2, 70.3, 546.2, 70.3, 540.1, 70.3);
      ctx.bezierCurveTo(534.7, 70.4, 531.1, 69.6, 532.0, 68.7);
      ctx.bezierCurveTo(533.0, 67.8, 534.8, 66.9, 536.0, 66.8);
      ctx.bezierCurveTo(536.0, 66.8, 536.0, 66.8, 537.6, 66.6);
      ctx.bezierCurveTo(539.1, 66.4, 540.3, 66.2, 541.1, 66.0);
      ctx.bezierCurveTo(542.7, 65.5, 544.0, 64.9, 545.0, 64.1);
      ctx.bezierCurveTo(546.0, 63.4, 547.0, 62.4, 547.9, 61.2);
      ctx.bezierCurveTo(557.2, 48.3, 559.8, 36.6, 554.9, 20.9);
      ctx.bezierCurveTo(551.2, 15.2, 546.8, 10.0, 545.8, 8.8);
      ctx.bezierCurveTo(545.8, 8.8, 545.8, 8.8, 544.9, 8.1);
      ctx.bezierCurveTo(543.9, 7.4, 542.6, 6.7, 540.9, 6.2);
      ctx.bezierCurveTo(539.6, 5.8, 538.1, 5.5, 536.6, 5.2);
      ctx.bezierCurveTo(535.0, 4.9, 533.8, 4.7, 532.9, 4.6);
      ctx.lineTo(532.9, 4.6);
      ctx.bezierCurveTo(531.0, 2.7, 533.9, 1.3, 539.3, 1.3);
      ctx.bezierCurveTo(546.2, 1.3, 549.6, 1.3, 556.4, 1.4);
      ctx.bezierCurveTo(561.8, 1.4, 570.9, 1.8, 576.4, 2.3);
      ctx.bezierCurveTo(576.4, 2.3, 581.4, 2.7, 586.2, 5.3);
      ctx.bezierCurveTo(591.1, 8.0, 593.7, 12.0, 594.8, 17.5);
      ctx.bezierCurveTo(595.8, 22.3, 595.3, 26.2, 593.6, 29.1);
      ctx.bezierCurveTo(591.9, 32.1, 585.7, 35.3, 585.4, 36.1);
      ctx.bezierCurveTo(585.1, 37.0, 588.5, 42.5, 590.3, 46.3);
      ctx.bezierCurveTo(592.1, 50.1, 592.8, 53.8, 594.3, 57.7);
      ctx.bezierCurveTo(594.8, 58.9, 595.5, 60.4, 596.7, 62.2);
      ctx.bezierCurveTo(597.8, 64.0, 598.9, 65.1, 600.0, 65.5);
      ctx.bezierCurveTo(600.6, 65.7, 601.4, 65.9, 602.4, 66.0);
      ctx.bezierCurveTo(603.4, 66.2, 604.1, 66.2, 604.5, 66.3);
      ctx.lineTo(604.5, 66.3);
      ctx.closePath();

      // layer1/Envelope/Group/Compound Path/Path
      ctx.moveTo(581.4, 18.5);
      ctx.bezierCurveTo(579.5, 13.9, 576.9, 10.6, 573.6, 8.6);
      ctx.bezierCurveTo(570.3, 6.5, 566.4, 5.5, 562.1, 5.4);
      ctx.lineTo(562.1, 5.4);
      ctx.bezierCurveTo(560.2, 5.4, 561.7, 9.6, 565.1, 15.1);
      ctx.bezierCurveTo(567.2, 18.5, 569.6, 20.2, 569.9, 23.9);
      ctx.bezierCurveTo(570.4, 29.6, 571.1, 34.5, 571.8, 34.5);
      ctx.bezierCurveTo(572.6, 34.5, 576.0, 33.9, 579.3, 33.2);
      ctx.bezierCurveTo(579.3, 33.2, 579.3, 33.2, 581.0, 30.6);
      ctx.bezierCurveTo(582.8, 28.0, 583.7, 23.9, 581.4, 18.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
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