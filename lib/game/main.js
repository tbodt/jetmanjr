/*
JETMAN JR
Use your jetpack to explore caverns! Destroy your enemies with lasers and dynamites. Your mission: to find the old git that got lost exploring the caverns looking for treasure. Find him, Jetman. Be the hero!

The idea behind this game is about branching. Very loosely of course. After the inital tutorial level, you are presented with a screen that branches away into three separate routes (and one that just leads to your untimely death). They all take you to a final level where you will eventually find "old man git".

License
The game code for Jetman jr is released under non-commercial BSD (http://opensource.org/licenses/BSD-3-Clause), which means you're free to fork it, develop and release new versions for non-commercial use. I reserve the commercial use of this game, which means that if any commercial entity wants to put up this game on their portal, they must acquire a commercial license from me. The game uses ImpactJS, which has a separate license. To run and compile this game, you need the impactjs game engine (which should be placed under lib/).

I strongly encourage and appreciate pull requests for the current game, and would be delighted to hear from anyone who decide to create a new version of the game.

Jetman jr is written by:
Sven Anders Robbestad, Professional web developer working at SOL.no, amateur game developer on the side
*/

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

// LEVEL 3
    'game.levels.level3',
    'game.levels.level31',
    'game.levels.level32',
    'game.levels.level33',

// LEVEL 7
    'game.levels.level7',

    
// LEVEL 8
    'game.levels.level8',
    'game.levels.level81',
    'game.levels.level82',
    'game.levels.level83',
    'game.levels.level84',
    'game.levels.level85',

// LEVEL 9. Just a really long level.
    'game.levels.level9',

// AND WE'RE DONE


    
    'game.camera',
    'impact.collision-map', 
    'impact.background-map', 
    'game.entities.blob',
    'game.entities.displaymessage',
    'game.entities.dropper', 
    'game.entities.frosk', 
    'game.entities.mine', 
    'game.entities.spewer', 
    'game.entities.mover', 
    'game.entities.debris', 
    'game.entities.delay', 
    'game.entities.void',  
    'game.entities.kill',
    'game.entities.hurt', 
    'game.entities.levelchange', 
    'game.entities.glass-dome', 
    'game.entities.earthquake',
    'game.math',
    'game.entities.impactcam',
    'plugins.impact-splash-loader',
    'plugins.impact-storage',
    'plugins.webgl-2d',
    'game.entities.stars'


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
        storage: new ig.Storage(),
        lastCheckpoint: null,
        playerSpawnPos: {
            x: 0,
            y: 0
        },


        // important game counters
        deathCount: 0,
        livesLeft: 3,
        init_starfield:true,
        crystalCount: 0,
        jetGas:0,
        laserLeft:0,
        dynamitesLeft:0,
        debug:false,
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
            this.storage = new ig.Storage();
            this.storage.initUnset('jmhighScore', 0); 
            this.camera = new Camera(ig.system.width / 4, ig.system.height / 3, 5);
            this.camera.trap.size.x = ig.system.width / 10;
            this.camera.trap.size.y = ig.system.height / 3;
            this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width / 6 : 0;
            ig.music.volume = 1;
            ig.music.add(this.musicIntro);
            ig.music.play();
            // INITIAL LEVEL:
            this.loadLevel(LevelLevel1,0,0,5); 
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
        win: function ()
        {
            //console.log(this.score)
            this.storage.setHighest('jmhighScore',this.score); 

            ig.system.setGame(GameWin);
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
            //this.jetGas=1000;
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
        
        this.storage.setHighest('jmhighScore',this.score); 



        //lovely stars
            var maxX = ig.game.collisionMap.width * ig.game.collisionMap.tilesize;
            var maxY = ig.game.collisionMap.height * ig.game.collisionMap.tilesize;
        if(ig.game.getEntitiesByType(EntityStars).length<1){
       
            for(i=0;i<50;i++){
            //ig.game.spawnEntity(EntityStars, (Math.random() < 0.5 ? 1 : 2)*Math.random()*500, (Math.random() < 0.5 ? 1 : 2)*Math.random()*500, {});
            ig.game.spawnEntity(EntityStars,Math.floor( Math.random() * maxX ) ,Math.floor( Math.random() * maxY ) , {});
            ig.game.init_starfield=false
            }
        }
        if(ig.game.getEntitiesByType(EntityStars).length<50){
       
            ig.game.spawnEntity(EntityStars,Math.floor( Math.random() * maxX ) ,10, {});
        
         for(j=0;j<ig.game.getEntitiesByType(EntityStars).length;j++){
                ig.game.getEntitiesByType(EntityStars)[j].accel.y=8
                if(Math.floor( Math.random() * 2 )==1)
                ig.game.getEntitiesByType(EntityStars)[j].vel.x=-8
            else
                ig.game.getEntitiesByType(EntityStars)[j].vel.x=8
                      
            }
        }


        //Finally, DRAW
        this.parent();
    },

    draw: function() {
        // Draw all entities and BackgroundMaps
        if( !ig.ua.mobile ) {
             this.font.draw( 'SCORE: '+ig.game.score+" GAS: "+ig.game.jetGas+" TNT: "+ig.game.dynamitesLeft+" LASER: "+ig.game.laserLeft+" LIVES: "+ig.game.livesLeft, 2, 2 );
        
        //    this.font.draw( 'SCORE: '+ig.game.score+" GAS: "+ig.game.jetGas+" LIVES: "+ig.game.livesLeft, 2, 2 );
            this.font.draw('HIGHSCORE: '+this.storage.getInt('jmhighScore'),240,2);
        }  

/*
        if(ig.game.debug){
            
            this.font.draw( 'X: '+this.player.pos.x,2,10)
            this.font.draw( 'Y: '+this.player.pos.y,2,20)
            this.font.draw( 'vel: '+this.player.vel.y,2,30)
            this.jetGas=100
            this.dynamitesLeft=2
            this.laserLeft=5
            this.livesLeft=5
            
    
        }
    */    
        this.lastYvel=this.player.vel.y;

        if(this.OutputText){
         this.font.draw( this.OutputText, 50,50 );
        this.OutputText=false;  
        }


        this.parent();

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
                this.storage = new ig.Storage();
                this.storage.initUnset('jmhighScore', 0);
                this.jetmanjr.draw((d * d * -d).limit(0, 1).map(1, 0, -160, 44), 26);
              //  this.disaster.draw((d * d * -d).limit(0, 1).map(1, 0, 300, 44), 70);
                this.player.draw((d * d * -d).limit(0, 1).map(0.5, 0, 240, 166), 56);
                if (d > 0 && (d % 1 < 0.5 || d > 2))
                {
                    this.font.draw('Press SPACEBAR to Play', 120, 140, ig.Font.ALIGN.CENTER);
                }
                this.font.draw('HIGHSCORE: '+this.storage.getInt('jmhighScore'),240,10,ig.Font.ALIGN.CENTER);
    
            }
        },
    });
    GameTitle.initialized = false;
    GameWin =  ig.Class.extend(
    {
        introTimer: null,
        font: new ig.Font('media/04b03.font.png'),
        lineHeight: 12,
        scroll: 0,
        scrollSpeed: 10,
         credits: ['               WOW! You beat the game', '', '', 
        '               Thanks for Playing!', '', '', 
        'Concept, Graphics & Programming', '    Sven Anders Robbestad', '', 
        'Graphics', '    Graphics from opengameart.org', 
                    '    The Blob: Stephen Challener (Redshrike)',
                    '    Sven Anders Robbestad', 
                    '', 
        'Awesome music', '    Metaruka (http://opengameart.org/)', '', 
        'Awesome SFX', '    Made with CFXR for Mac', '',         
        '', '', '', '', '', ''],
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


    GameCredits = ig.Class.extend(
    {
        introTimer: null,
        font: new ig.Font('media/04b03.font.png'),
        lineHeight: 12,
        scroll: 0,
        scrollSpeed: 10,
         credits: [
        '               Thanks for Playing!', '', '', 
        'Concept, Graphics & Programming', '    Sven Anders Robbestad', '', 
        'Graphics', '    Graphics from opengameart.org', 
                    '    The Blob: Stephen Challener (Redshrike)',
                    '    Sven Anders Robbestad', 
                    '', 
        'Awesome music', '    Metaruka (http://opengameart.org/)', '', 
        'Awesome SFX', '    Made with CFXR for Mac', '',         
        '', '', '', '', '', ''],
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
            ig.main('#canvas', GameTitle, 60, 320, 180, 3, ig.ImpactSplashLoader);
        }
    
}

});
