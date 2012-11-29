ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.sound',
    'game.entities.trigger',
    'game.entities.horizontalwall',
    'game.entities.trigger',
    'game.entities.levelcomplete',
    'game.levels.menu',

// LEVEL 1 AND BONUS
    'game.levels.level0',
    'game.levels.level1',
    'game.levels.level12',
    'game.levels.level13',
    'game.levels.level16',

// MAIN BRANCH HUB    
    'game.levels.level14',

// LEVEL 4
    'game.levels.level41',
    'game.levels.level42',

// LEVEL 5. Should be Level 5
    'game.levels.level5',

// LEVEL 6 
    'game.levels.level6',

// LEVEL 7
    'game.levels.level7',
    'game.levels.level71',

// LEVEL 8
    'game.levels.level8',
    'game.levels.level81',
    'game.levels.level82',
    'game.levels.level83',
    'game.levels.level84',

// LEVEL 9. Just a really long level.
    'game.levels.level9',

    
	'game.camera',
	'impact.collision-map', 
	'impact.background-map', 
	'game.entities.blob',
	'game.entities.displaymessage',
//	'game.entities.test-tube',
	'game.entities.grunt', 
	'game.entities.dropper', 
	'game.entities.frosk', 
	'game.entities.spike', 
	'game.entities.mine', 
	'game.entities.spewer', 
	'game.entities.mover', 
	'game.entities.debris', 
	'game.entities.delay', 
	'game.entities.void',  
	'game.entities.kill',
	'game.entities.hurt', 
	'game.entities.levelchange', 
//	'game.entities.respawn-pod',  
	'game.entities.glass-dome', 
	'game.entities.endhub',
    'game.entities.earthquake',
    'game.math',
//	'game.entities.portal',
//	'game.entities.portalProjectile',
	'game.entities.impactcam',
  	'plugins.impact-splash-loader'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	gravity: 75, // All entities are affected by this
	
	// Load a font
	
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: '#0d0c0b',
        gravity: 75,
        player: null,
        autoSort: true,
        sortBy: ig.Game.SORT.POS_Y,
        mode: 0,
        lastCheckpoint: null,
        playerSpawnPos: {
            x: 0,
            y: 0
        },


        // important game counters
        deathCount: 0,
        livesLeft: 3,
        crystalCount: 0,
        jetGas:500,
        laserLeft:5,
        dynamitesLeft:3,
        debug:true,
        lastYvel:0,
        
        // level vars
        nextLevel: 1,
        nextLevelX: 0,
        OutputText: false,
                                 
        nextLevelY: 0,
        
        score:0,
        levelTime: null,
        levelTimeText: '0',
       	musicIntro: new ig.Sound('media/music/01-game.ogg', false),
        font: new ig.Font('media/04b03.font.png'),
        camera: null,
        lastTick: 0.016,
        realTime: 0,
        showFPS: false,


	init: function() {
	
		    this.camera = new Camera(ig.system.width / 4, ig.system.height / 3, 5);
            this.camera.trap.size.x = ig.system.width / 10;
            this.camera.trap.size.y = ig.system.height / 3;
            this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width / 6 : 0;
            ig.music.volume = 0.255;
            ig.music.add(this.musicIntro);
            ig.music.play();
            // INITIAL LEVEL:
            this.loadLevel(LevelLevel14,0,0,5);
            this.realTime = Date.now();
            this.lastTick = 0.016;
            this.score=0;
			// Bind keys
    		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
    		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
    		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		
		
		
        ig.input.bind( ig.KEY.Z, 'dropdynamite' );
        //ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.UP_ARROW, 'jetpack' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		if( ig.ua.mobile ) {
			ig.input.bindTouch( '#buttonLeft', 'left' );
			ig.input.bindTouch( '#buttonRight', 'right' );
			ig.input.bindTouch( '#buttonShoot', 'shoot' );
            ig.input.bindTouch( '#buttonDynamite', 'dropdynamite' );
            //ig.input.bindTouch( '#buttonJump', 'jump' );
		    ig.input.bindTouch( '#buttonJump', 'jetpack' );
		}
		       
            
	},
	

        loadLevel: function (level,xpos,ypos)
        {
              //console.log(extrainfo);
            this.OutputText=false;
            if (ig.ua.iPhone4 || ig.ua.android)
            {
                for (var i = 0; i < level.layer.length; i++)
                {
                    if (level.layer[i].name == 'background')
                    {
                        level.layer.erase(level.layer[i]);
                    }
                }
            }
            this.parent(level);
            this.player = this.getEntitiesByType(EntityPlayer)[0];
            this.lastCheckpoint = null;
            
            if(null!=xpos && "undefined"!=xpos && xpos>0){
                this.player.pos.x=xpos;
            }
            if(null!=ypos && "undefined"!=ypos && ypos>0){
                this.player.pos.y=ypos;
            }

            this.playerSpawnPos = {
                x: this.player.pos.x,
                y: this.player.pos.y
            };
            this.levelTime = new ig.Timer();
            this.mode = MyGame.MODE.GAME;
            this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
            this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;
            this.camera.set(this.player);
            if (ig.ua.mobile)
            {
                for (var i = 0; i < this.backgroundMaps.length; i++)
                {
                    this.backgroundMaps[i].preRender = true;
                }
            }
        },
        endLevel: function (nextLevel,xpos,ypos,extrainfo)
        {
            this.nextLevel = nextLevel;
            ig.game.nextLevel = nextLevel;
            this.levelTimeText = this.levelTime.delta().round(2).toString();
            this.loadLevel(ig.game.nextLevel,xpos,ypos,extrainfo);
        },
        end: function ()
        {
            ig.system.setGame(GameCredits);
        },
        respawnPlayerAtLastCheckpoint: function (x, y)
        {
            var pos = this.playerSpawnPos;
            if (this.lastCheckpoint)
            {
                pos = this.lastCheckpoint.getSpawnPos()
                this.lastCheckpoint.currentAnim = this.lastCheckpoint.anims.respawn.rewind();
            }
            this.player = this.spawnEntity(EntityPlayer, pos.x-8, pos.y-8);
            this.player.currentAnim = this.player.anims.spawn;
            this.deathCount++;
            if(this.livesLeft>0)
            	this.livesLeft--;
            this.jetGas=1000;
        },

	update: function() {		
		var player = this.getEntitiesByType( EntityPlayer )[0];
        if( player ) {
        	if (ig.ua.iPad)
			{
				this.screen.x = this.player.pos.x - ig.system.width/2;
				this.screen.y = this.player.pos.y - ig.system.height/2;
			}
			else if (ig.ua.iPhone4)
			{
				this.screen.x = this.player.pos.x - ig.system.width/2;
				this.screen.y = this.player.pos.y - ig.system.height/2;        
			}
			else if (ig.ua.mobile)
			{
				this.screen.x = this.player.pos.x - ig.system.width/2;
				this.screen.y = this.player.pos.y - ig.system.height/2;
			}
			else
			{
			this.camera.follow(this.player);
			}
        }
        //Finally, DRAW
        this.parent();
	},
	showStats: function ()
        {
            if (ig.input.pressed('shoot') || ig.input.pressed('jump'))
            {
            
               this.loadLevel(ig.game.nextLevel);
              
                return;
            }
            var mv = ig.ua.mobile ? 20 : 0;
            ig.system.clear(this.clearColor);
            this.font.draw('Level Complete!', ig.system.width / 2, 20, ig.Font.ALIGN.CENTER);
            this.font.draw('Time:', 98 - mv, 56, ig.Font.ALIGN.RIGHT);
            this.font.draw(this.levelTimeText + 's', 104 - mv, 56);
            this.font.draw('Tubes Collected:', 98 - mv, 68, ig.Font.ALIGN.RIGHT);
            this.font.draw(this.tubeCount + '/' + this.tubeTotal, 104 - mv, 68);
            this.font.draw('Deaths:', 98 - mv, 80, ig.Font.ALIGN.RIGHT);
            this.font.draw(this.deathCount.toString(), 104 - mv, 80);
            this.font.draw('Press X or C to Proceed', ig.system.width / 2, 140, ig.Font.ALIGN.CENTER);
        },
        run: function ()
        {
            var now = Date.now();
            this.lastTick = this.lastTick * 0.9 + ((now - this.realTime) / 1000) * 0.1;
            this.realTime = now;
            if (ig.input.pressed('fps'))
            {
                this.showFPS = !this.showFPS;
            }
            if (this.mode == MyGame.MODE.GAME)
            {
                this.update();
                this.draw();
            }
            else if (this.mode == MyGame.MODE.STATS)
            {
                this.showStats();
            }
        },

	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		
		if( !ig.ua.mobile ) {
			this.font.draw( 'SCORE: '+ig.game.score+" GAS: "+ig.game.jetGas+" LIVES: "+ig.game.livesLeft, 2, 2 );
		}

        if(ig.game.debug){
            this.font.draw( 'X: '+this.player.pos.x,2,10)
            this.font.draw( 'Y: '+this.player.pos.y,2,20)
            this.font.draw( 'vel: '+this.player.vel.y,2,30)
    
        }
        this.lastYvel=this.player.vel.y;

		if(this.OutputText){
         this.font.draw( this.OutputText, 50,50 );
        this.OutputText=false;	
        }

	}
});
 MyGame.MODE = {
        GAME: 1,
        STATS: 2
    };
    GameTitle = ig.Class.extend(
    {
        introTimer: null,
        noise: null,
        sound: new ig.Sound('media/music/01-intro.ogg', false),
        jetmanjr: new ig.Image('media/jetmanjunior.png'),
        player: new ig.Image('media/title-player.gif'),
        font: new ig.Font('media/04b03.font.png'),
        init: function ()
        {
           
            if (!GameTitle.initialized)
            {
                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.UP_ARROW, 'jump');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                ig.input.bind(ig.KEY.Z, 'dropdynamite' );
        
                
                ig.input.bind(ig.KEY.C, 'shoot');
                ig.input.bind(ig.KEY.SPACE, 'shoot');
                ig.input.bind(ig.KEY.F, 'fps');
                if (ig.ua.mobile)
                {
                    ig.input.bindTouch('#buttonFPS', 'fps');
                    ig.input.bindTouch('#buttonLeft', 'left');
                    ig.input.bindTouch('#buttonRight', 'right');
                    ig.input.bindTouch('#buttonShoot', 'shoot');
                    ig.input.bindTouch('#buttonJump', 'jetpack');
                }
                GameTitle.initialized = true;
            }
            this.introTimer = new ig.Timer(1);
        },
        run: function ()
        {
            if (ig.input.pressed('shoot') || ig.input.pressed('jump'))
            {
            	this.sound.stop();
           
                ig.system.setGame(MyGame);
                return;
            }
            var d = this.introTimer.delta();
            if (!this.soundPlayed && d > -0.3)
            {
                this.soundPlayed = true;
                this.sound.play();
            }
            if (ig.ua.mobile)
            {
                ig.system.clear('#0d0c0b');
                this.jetmanjr.draw((d * d * -d).limit(0, 1).map(1, 0, -160, 12), 6);
                this.disaster.draw((d * d * -d).limit(0, 1).map(1, 0, 300, 12), 46);
                this.player.draw((d * d * -d).limit(0, 1).map(0.5, 0, 240, 70), 56);
                if (d > 0 && (d % 1 < 0.5 || d > 2))
                {
                    this.font.draw('Press Button to Play', 80, 140, ig.Font.ALIGN.CENTER);
                }
            }
            else
            {
                ig.system.clear('#0d0c0b');
                this.jetmanjr.draw((d * d * -d).limit(0, 1).map(1, 0, -160, 44), 26);
              //  this.disaster.draw((d * d * -d).limit(0, 1).map(1, 0, 300, 44), 70);
                this.player.draw((d * d * -d).limit(0, 1).map(0.5, 0, 240, 166), 56);
                if (d > 0 && (d % 1 < 0.5 || d > 2))
                {
                    this.font.draw('Press SPACEBAR to Play', 120, 140, ig.Font.ALIGN.CENTER);
                }
            }
        }
    });
    GameTitle.initialized = false;
GameCredits = ig.Class.extend(
    {
        introTimer: null,
        font: new ig.Font('media/04b03.font.png'),
        lineHeight: 12,
        scroll: 0,
        scrollSpeed: 10,
        credits: ['          Thanks for Playing!', '', '', 
        'Concept, Graphics & Programming', '    Sven Anders Robbestad', '', 
        'Graphics', '    Sven Anders Robbestad', '    Graphics from opengameart.org', '', 
        'Music', '    Metaruka (http://opengameart.org/)', '', 
        
        'Beta Testing', '    Sven Anders Robbestad', '', '', '', '', '', ''],
        init: function ()
        {
            this.timer = new ig.Timer();
        },
        run: function ()
        {
            var d = this.timer.delta();
            var color = Math.round(d.map(0, 3, 255, 0)).limit(0, 255);
            ig.system.clear('rgb(' + color + ',' + color + ',' + color + ')');
            if ((d > 3 && ig.input.pressed('shoot') || ig.input.pressed('jump')) || (ig.system.height - this.scroll + (this.credits.length + 2) * this.lineHeight < 0))
            {
                ig.system.setGame(GameTitle);
                return;
            }
            var mv = ig.ua.mobile ? 0 : 32;
            if (d > 4)
            {
                this.scroll += ig.system.tick * this.scrollSpeed;
                for (var i = 0; i < this.credits.length; i++)
                {
                    var y = ig.system.height - this.scroll + i * this.lineHeight;
                    this.font.draw(this.credits[i], mv, y);
                }
            }
        }
    });


if( ig.ua.iPad ) {
	ig.Sound.enabled = false;
	ig.main('#canvas', MyGame, 60, 240, 160, 2);
}
else if( ig.ua.mobile ) {	
	ig.Sound.enabled = false;
	var width = 320;
	var height = 320;
	ig.main('#canvas', MyGame, 60, 160, 160, 1);
	
	var c = ig.$('#canvas');
	c.width = width;
	c.height = height;
	
	var pr = 2;//ig.ua.pixelRatio;
	if( pr != 1 ) {
		c.style.webkitTransformOrigin = 'left top';
		c.style.webkitTransform = 
			'scale3d(2,2, 0)' +
			'';
	}
}
else {
	
    if (ig.ua.iPad)
        {
            ig.Sound.enabled = false;
            ig.main('#canvas', GameTitle, 60, 240, 160, 2, ig.ImpactSplashLoader);
        }
        else if (ig.ua.iPhone4)
        {
            ig.Sound.enabled = false;
            ig.main('#canvas', GameTitle, 60, 160, 160, 4, ig.ImpactSplashLoader);
        }
        else if (ig.ua.mobile)
        {
            ig.Sound.enabled = false;
            ig.main('#canvas', GameTitle, 60, 160, 160, 2, ig.ImpactSplashLoader);
        }
        else
        {
            ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
			ig.Sound.enabled = true;
		    ig.main('#canvas', GameTitle, 60, 320, 180, 1, ig.ImpactSplashLoader);
        }
	
}

});
