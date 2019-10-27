var MenuScreen, start, mode, ModeScreen;
var intro, intro_s, cine_bounce;
var ball = [];
var mute, unmute;
var b1, b2, b3;
var mode1, mode2, mode3;
var ModeNum = 2;

var MainMenu = {

    preload : function() {
        settingCanvas();
        
        // Loading Static Images
        game.load.image('MenuScreen', './assets/screen/main_menu.png');
        
        // Loading Start Button
        game.load.image('start', 'img/pad1.png');
        game.load.image('mode', 'img/pad1.png');
        game.load.image('m1', 'img/pad1.png');
        game.load.image('m2', 'img/pad2.png');
        game.load.image('m3', 'img/minus1.png');

        loadPageAsset();
    },

    create : function() {
    	// Enabling Phaser Framework
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	
    	// Adding Menu Screen
    	MenuScreen = game.add.sprite(game.world.width*0, game.world.height*0, 'MenuScreen');
    	MenuScreen.scale.setTo(0.75 ,0.75);

    	// Adding Start Button
    	start = game.add.sprite(game.world.width*(0.5), game.world.height*(0.7), 'start');
    	start.anchor.set(0.5,1);
        game.physics.enable(start, Phaser.Physics.ARCADE);
        start.body.immovable = true;
        b1 = game.add.button(game.world.width*(0.5), game.world.height*(0.7), 'start', startGame, game);
    	b1.anchor.set(0.5,1);

    	// Adding Mode Select
    	settingMode();
    	mode.anchor.set(0.5,1);
        game.physics.enable(mode, Phaser.Physics.ARCADE);
        mode.body.immovable = true;
    	b2.anchor.set(0.5,1);

    	AddMute();
    	
    	loadSounds();
    	
    	playSounds();
    	
    	ballAnimate();
    },

    update : function() {
    	setCollidePara();
    }

};


var SelectMode = {
	preload : function() {
		settingCanvas();

		// Loading Mode Screen
        game.load.image('ModeScreen', './assets/screen/game_mode_select.png');

        // Loading Mode Buttons
        game.load.image('mode1', 'img/pad1.png');
        game.load.image('mode2', 'img/pad1.png');

        loadPageAsset();
    },

    create: function () {
    	// Enabling Phaser Framework
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	
    	// Adding Menu Screen
    	ModeScreen = game.add.sprite(game.world.width*0, game.world.height*0, 'ModeScreen');
    	ModeScreen.scale.setTo(0.75 ,0.75);

    	// Adding Mode Button
    	mode1 = game.add.sprite(game.world.width*(0.5), game.world.height*(0.48), 'mode1');
    	mode1.anchor.set(0.5,1);
        game.physics.enable(mode1, Phaser.Physics.ARCADE);
        mode1.body.immovable = true;
        b1 = game.add.button(game.world.width*(0.5), game.world.height*(0.48), 'mode1', getMainMenu1, game);
    	b1.anchor.set(0.5,1);

    	mode2 = game.add.sprite(game.world.width*(0.5), game.world.height*(0.56), 'mode2');
    	mode2.anchor.set(0.5,1);
        game.physics.enable(mode2, Phaser.Physics.ARCADE);
        mode2.body.immovable = true;
        b2 = game.add.button(game.world.width*(0.5), game.world.height*(0.56), 'mode2', getMainMenu2, game);
    	b2.anchor.set(0.5,1);

    	
    	AddMute();
    	
    	loadSounds();
    	
    	playSounds();
    	
    	ballAnimate();
    },

    update : function() {
    	setCollidePara();
    }
};

function settingCanvas() {
	// Load all the needed resources for the menu.
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
};

function loadPageAsset() {
	// Loading Icons
    game.load.image('mute', 'img/intro_icons/mute.png');
    game.load.image('unmute', 'img/intro_icons/unmute.png');

    // Loading Balls (Animation Only)
    game.load.image('ball1', './img/intro_images/ball1.png');
    game.load.image('ball2', './img/intro_images/ball2.png');
    game.load.image('ball3', './img/intro_images/ball3.png');
    game.load.image('hball1', './img/intro_images/hball1.png');
    game.load.image('hball2', './img/intro_images/hball2.png');
    game.load.image('hball3', './img/intro_images/hball3.png');

    // Loading Game Sounds
    game.load.audio('intro', ['assets/sound/intro.mp3','assets/sound/intro.ogg']);
    game.load.audio('intro_s', ['assets/sound/intro_s.mp3','assets/sound/intro_s.ogg']);
    game.load.audio('cine_bounce', ['assets/sound/cine_bounce.mp3','assets/sound/cine_bounce.ogg']);
};

function settingMode() {
	if(ModeNum == 1){
		mode = game.add.sprite(game.world.width*(0.5), game.world.height*(0.78), 'm1');
	    b2 = game.add.button(game.world.width*(0.5), game.world.height*(0.78), 'm1', selectMode, game);
	}
		
	else if(ModeNum == 2){
		mode = game.add.sprite(game.world.width*(0.5), game.world.height*(0.78), 'm2');
	    b2 = game.add.button(game.world.width*(0.5), game.world.height*(0.78), 'm2', selectMode, game);
	}
    	
};

function loadSounds() {
	// Loading Sounds
	intro = game.add.audio('intro');
	intro_s = game.add.audio('intro_s');
	cine_bounce = game.add.audio('cine_bounce');
};

function playSounds() {
	// Play Menu Sounds
	intro.loopFull();
	intro_s.loopFull();
};

function setCollidePara() {
	for(itr = 0; itr < 6; itr++)
		for(sitr = 0; sitr < 6; sitr++){
			game.physics.arcade.collide(ball[itr], ball[sitr], bounce_sound);
			game.physics.arcade.collide(ball[itr], start, bounce_sound);
			game.physics.arcade.collide(ball[itr], mode, bounce_sound);
			game.physics.arcade.collide(ball[itr], mute, bounce_sound);
			game.physics.arcade.collide(ball[itr], unmute, bounce_sound);
			game.physics.arcade.collide(ball[itr], mode1, bounce_sound);
			game.physics.arcade.collide(ball[itr], mode2, bounce_sound);
			game.physics.arcade.collide(ball[itr], mode3, bounce_sound);
		}
};	

function AddMute() {
	mute = game.add.sprite(game.world.width*(0.98), game.world.height*(0.05), 'mute');
	mute.anchor.set(0.5,1);
    game.physics.enable(mute, Phaser.Physics.ARCADE);
    mute.body.immovable = true;
    b1 = game.add.button(game.world.width*(0.98), game.world.height*(0.05), 'mute', MuteSound, game);
	b1.anchor.set(0.5,1);
};

function AddunMute() {
	unmute = game.add.sprite(game.world.width*(0.98), game.world.height*(0.05), 'unmute');
	unmute.anchor.set(0.5,1);
    game.physics.enable(unmute, Phaser.Physics.ARCADE);
    unmute.body.immovable = true;
    b2 = game.add.button(game.world.width*(0.98), game.world.height*(0.05), 'unmute', unMuteSound, game);
	b2.anchor.set(0.5,1);
};

function MuteSound() {
	game.sound.mute = true;
	b1.destroy();
	mute.destroy();
	AddunMute();
};

function unMuteSound() {
	game.sound.mute = false;
	b2.destroy();
	unmute.destroy();
	AddMute();
};

function startGame() {
	intro.stop();
	intro_s.stop();
	if(ModeNum == 1)
		game.state.start('gameMode1');
	else if(ModeNum == 2)
		game.state.start('gameMode2');
};

function selectMode() {
	intro.stop();
	intro_s.stop();
	game.state.start('SelectMode');
};

function getMainMenu1() {
	intro.stop();
	intro_s.stop();
	ModeNum = 1;
	game.state.start('MainMenu');
};
function getMainMenu2() {
	intro.stop();
	intro_s.stop();
	ModeNum = 2;
	game.state.start('MainMenu');
};

function ballAnimate(){
	ball[0] = game.add.sprite(game.world.width*((Math.floor((Math.random() * 90) + 10))/100), game.world.height*((Math.floor((Math.random() * 90) + 10))/100), 'ball1');
	ball[1] = game.add.sprite(game.world.width*((Math.floor((Math.random() * 90) + 10))/100), game.world.height*((Math.floor((Math.random() * 90) + 10))/100), 'ball2');
	ball[2] = game.add.sprite(game.world.width*((Math.floor((Math.random() * 90) + 10))/100), game.world.height*((Math.floor((Math.random() * 90) + 10))/100), 'ball3');
	ball[3] = game.add.sprite(game.world.width*((Math.floor((Math.random() * 90) + 10))/100), game.world.height*((Math.floor((Math.random() * 90) + 10))/100), 'hball1');
	ball[4] = game.add.sprite(game.world.width*((Math.floor((Math.random() * 90) + 10))/100), game.world.height*((Math.floor((Math.random() * 90) + 10))/100), 'hball2');
	ball[5] = game.add.sprite(game.world.width*((Math.floor((Math.random() * 90) + 10))/100), game.world.height*((Math.floor((Math.random() * 90) + 10))/100), 'hball3');
	
	for(itr = 0; itr < 6; itr++) {
		ball[itr].anchor.set(0.5);
		game.physics.enable(ball[itr], Phaser.Physics.ARCADE);
		ball[itr].body.velocity.set((Math.floor((Math.random() * 800) + 300)),(Math.floor((Math.random() * 800) + 300)));
		ball[itr].body.collideWorldBounds = true;
    	ball[itr].body.bounce.set(0.8);
	}

};

function bounce_sound(){
	cine_bounce.play();
};