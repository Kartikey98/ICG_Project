var P1Wins, P2Wins, Tied;
var retry, main_menu;
var ball = [];

var GameOverLost = {
	preload : function() {
		settingCanvas();

		// Loading Screens
		game.load.image('P1Wins', './assets/screen/player_lose.png');
		
		loadStaticImg();
	},
	
	create : function() {
		// Enabling Phaser Framework
    	game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding Winning Screeen
    	P1Wins = game.add.sprite(game.world.width*0, game.world.height*0, 'P1Wins');
    	P1Wins.scale.setTo(0.75 ,0.75);

    	settingReturnButton();

    	// Adding Animated Balls
    	ballAnimate();
	},
	
	update : function() {
		setCollide();
	},
};


var GameOverP1 = {
	preload : function() {
		settingCanvas();

		// Loading Screens
		game.load.image('P1Wins', './assets/screen/game_over_p1.png');
		
		loadStaticImg();
	},
	
	create : function() {
		// Enabling Phaser Framework
    	game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding Winning Screeen
    	P1Wins = game.add.sprite(game.world.width*0, game.world.height*0, 'P1Wins');
    	P1Wins.scale.setTo(0.75 ,0.75);

    	settingReturnButton();

    	// Adding Animated Balls
    	ballAnimate();
	},
	
	update : function() {
		setCollide();
	},
};

var GameOverP2 = {
	preload : function() {
		settingCanvas();

		// Loading Screens
		game.load.image('P2Wins', './assets/screen/game_over_p2.png');
		
		loadStaticImg();
	},
	
	create : function() {
		// Enabling Phaser Framework
    	game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding Winning Screeen
    	P2Wins = game.add.sprite(game.world.width*0, game.world.height*0, 'P2Wins');
    	P2Wins.scale.setTo(0.75 ,0.75);

    	settingReturnButton();

    	// Adding Animated Balls
    	ballAnimate();
	},
	
	update : function() {
		setCollide();
	},
};

var GameOverTied = {
	preload : function() {
		settingCanvas();

		// Loading Screens
		game.load.image('Tied', './assets/screen/game_over_tied.png');
		
		loadStaticImg();
	},
	
	create : function() {
		// Enabling Phaser Framework
    	game.physics.startSystem(Phaser.Physics.ARCADE);

		// Adding Winning Screeen
    	Tied = game.add.sprite(game.world.width*0, game.world.height*0, 'Tied');
    	Tied.scale.setTo(0.75 ,0.75);

    	settingReturnButton();

    	// Adding Animated Balls
    	ballAnimate();
	},
	
	update : function() {
		setCollide();
	},
};

function settingCanvas() {
	// Load all the needed resources for the menu.
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
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

function setCollide() {
	for(itr = 0; itr < 6; itr++)
		for(sitr = 0; sitr < 6; sitr++){
			game.physics.arcade.collide(ball[itr], ball[sitr], bounce_sound);
			game.physics.arcade.collide(ball[itr], start, bounce_sound);
			game.physics.arcade.collide(ball[itr], mute, bounce_sound);
			game.physics.arcade.collide(ball[itr], unmute, bounce_sound);
			game.physics.arcade.collide(ball[itr], retry, bounce_sound);
			game.physics.arcade.collide(ball[itr], main_menu, bounce_sound);
		}
	};

function loadStaticImg() {
	// Loading Buttons
	game.load.image('retry', 'img/pad1.png');
    game.load.image('main_menu', 'img/pad2.png');

	// Loading Balls (Animation Only)
    game.load.image('ball1', './img/intro_images/ball1.png');
    game.load.image('ball2', './img/intro_images/ball2.png');
    game.load.image('ball3', './img/intro_images/ball3.png');
    game.load.image('hball1', './img/intro_images/hball1.png');
    game.load.image('hball2', './img/intro_images/hball2.png');
    game.load.image('hball3', './img/intro_images/hball3.png');
};

function settingReturnButton() {
	retry = game.add.sprite(game.world.width*(0.5), game.world.height*(0.70), 'retry');
	retry.anchor.set(0.5,1);
    game.physics.enable(retry, Phaser.Physics.ARCADE);
    retry.body.immovable = true;
    s1 = game.add.button(game.world.width*(0.5), game.world.height*(0.70), 'retry', returntoGame, game);
	s1.anchor.set(0.5,1);

	main_menu = game.add.sprite(game.world.width*(0.5), game.world.height*(0.78), 'main_menu');
	main_menu.anchor.set(0.5,1);
    game.physics.enable(main_menu, Phaser.Physics.ARCADE);
    main_menu.body.immovable = true;
    s2 = game.add.button(game.world.width*(0.5), game.world.height*(0.78), 'main_menu', returntoMenu, game);
	s2.anchor.set(0.5,1);
};

function returntoGame() {
	if(ModeNum == 1)
		game.state.start('gameMode1');
	else if(ModeNum == 2)
		game.state.start('gameMode2');

};


function returntoMenu() {
	game.state.start('MainMenu');
}

