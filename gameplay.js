var ball;
var paddle1, paddle2;
var P1Life = 0, P2Life = 0;
var cursors;
var left, right;
var bricks, newBrick, brickInfo, brickHealth, brickPts, rand, brickCount = 0;
var sbricks;
var score_flag, score_text1, score_text2, score1 = 0, score2 = 0;
var life_text1, life_text2;
var goldApple;
var destroy,destroy_sp,impact,impact_sp,bounce,gotApple;

var gamemode1 = {
            preload : function() {
                settingCanvas();
                
                settingBG();
                
                loadGameAsset();

                P1Life = 0;
                P2Life = 0;
                
            },

            //Create Interactable resouces for the program
            create : function() {
                // Adding Phhysics within the Canvas
                game.physics.startSystem(Phaser.Physics.ARCADE);

                // Creating the Ball Element with the canvas
                LoadBall();
                
                // Setting Losing Parameters
                game.physics.arcade.checkCollision.down = false;
     
                // Adding Cursor Keys within the Program
                    // Paddle 1 controls
                    cursors = this.input.keyboard.createCursorKeys();
                                    
                // Initializing the Paddle
                getPaddle1();
            
                // Initializing the types of Bricks
                initsolobricks();

                             
                // Initializing the Scoring and Life Display Mechanism
                score_text2 = game.add.text(10, 540 - 535, 'Points: 0', { font: '30px Rockwell', fill: '#f06449' });

                setLives(2);

                // Initializing the Audio
                initAudio();

                score_flag = 2;
            },

            update : function() {
                // Brick Kill Mechanism
                game.physics.arcade.collide(ball, bricks, ballHitBrick);

                // Paddle 1 Controls
                if(cursors.left.isDown)
                    paddle1.body.velocity.set(-150,0);
                else if(cursors.right.isDown)
                    paddle1.body.velocity.set(150,0);
                else
                    paddle1.body.velocity.set(0,0);
                game.physics.arcade.collide(ball, paddle1);
                
                if(brickCount == 0)
                    GameOver();   
            }

};

var gamemode2 = {

            preload : function() {
                settingCanvas();
                
                settingBG();
                
                loadGameAsset();

                P1Life = 0;
                P2Life = 0;
                
            },

            //Create Interactable resouces for the program
            create : function() {
                // Adding Phhysics within the Canvas
                game.physics.startSystem(Phaser.Physics.ARCADE);

                // Creating the Ball Element with the canvas
                LoadBall();
                
                // Setting Losing Parameters
                game.physics.arcade.checkCollision.down = false;
                game.physics.arcade.checkCollision.up = false;
     
                // Adding Cursor Keys within the Program
                    // Paddle 1 controls
                    cursors = this.input.keyboard.createCursorKeys();
                    // Paddle 2 controls
                    this.left = this.input.keyboard.addKey(Phaser.Keyboard.A);
                    this.right = this.input.keyboard.addKey(Phaser.Keyboard.D);
                
                // Initializing the Two Paddles
                getPaddle1();
                getPaddle2();
                
            
                // Initializing the types of Bricks
                initbricks();

                // Initializing the Special Bricks
                initsbricks();

                // Initializing the Golden Apple
                initGoldApple();
                
                // Initializing the Scoring and Life Display Mechanism
                score_text1 = game.add.text(10, 540 + 500, 'Points: 0', { font: '30px Rockwell', fill: '#5bc3eb' });
                score_text2 = game.add.text(10, 540 - 535, 'Points: 0', { font: '30px Rockwell', fill: '#f06449' });

                setLives(1);
                setLives(2);

                // Initializing the Audio
                initAudio()
            },


            update : function() {
                // Brick Kill Mechanism
                game.physics.arcade.collide(ball, bricks, ballHitBrick);
                game.physics.arcade.collide(ball, sbricks, ballHitsBrick);
                game.physics.arcade.collide(ball, goldApple, goldAppleHit);

                // Paddle 1 Controls
                if(cursors.left.isDown)
                    paddle1.body.velocity.set(-150,0);
                else if(cursors.right.isDown)
                    paddle1.body.velocity.set(150,0);
                else
                    paddle1.body.velocity.set(0,0);
                game.physics.arcade.collide(ball, paddle1, setMainPlayer1);
                
                // Paddle 2 Controls
                if(this.left.isDown)
                    paddle2.body.velocity.set(-150,0);
                else if(this.right.isDown)
                    paddle2.body.velocity.set(150,0);
                else
                    paddle2.body.velocity.set(0,0);
                game.physics.arcade.collide(ball, paddle2, setMainPlayer2);

            }            
};

function settingCanvas() {
    // Load all the needed resources for the menu.
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
};

function settingBG() {
    // Setting the Background for the Program
    game.stage.backgroundColor = '#21211e';
};

function loadGameAsset() {
    // Loading the Ball Element
    game.load.image('ball', 'img/circle1.png');
    
    // Loading the Paddles
    game.load.image('paddle1', 'img/pad1.png');
    game.load.image('paddle2', 'img/pad2.png');
    
    // Loading the Bricks
    game.load.image('brick1', 'img/ruler1.png');
    game.load.image('brick2', 'img/ruler2.png');
    game.load.image('brick3', 'img/ruler3.png');

    // Loading the Special Bricks
    game.load.image('sbrick1', 'img/sbrick1.png');
    game.load.image('sbrick2', 'img/sbrick2.png');

    // Loading Golden Apple
    game.load.image('goldApple', 'img/goldApple.png');

    // Loading Hearts
    game.load.image('deathBlue', 'img/death1.png');
    game.load.image('deathRed', 'img/death2.png');

    // Loading Sound
    game.load.audio('destroy', ['assets/sound/destroy.mp3','assets/sound/destroy.ogg']);
    game.load.audio('destroy_sp', ['assets/sound/destroy_sp.mp3','assets/sound/destroy_sp.ogg']);
    game.load.audio('impact', ['assets/sound/impact.mp3','assets/sound/impact.ogg']);
    game.load.audio('impact_sp', ['assets/sound/impact_sp.mp3','assets/sound/impact_sp.ogg']);
    game.load.audio('bounce', ['assets/sound/bounce.mp3','assets/sound/bounce.ogg']);
    game.load.audio('gotApple', ['assets/sound/gotApple.mp3','assets/sound/gotApple.ogg']);
};

function getPaddle1() {
    paddle1 = game.add.sprite(game.world.width*(0.5), game.world.height*(0.985), 'paddle1');
    paddle1.anchor.set(0.5,1);
    game.physics.enable(paddle1, Phaser.Physics.ARCADE);
    paddle1.body.immovable = true;
};

function getPaddle2() {
    paddle2 = game.add.sprite(game.world.width*(0.5), game.world.height*(0.06), 'paddle2');
    paddle2.anchor.set(0.5,1);
    game.physics.enable(paddle2, Phaser.Physics.ARCADE);
    paddle2.body.immovable = true;
};

function initGoldApple() {
    goldApple = game.add.sprite(game.world.width*(0.5), game.world.height*(0.48), 'goldApple');
    goldApple.anchor.set(0.5,1);
    game.physics.enable(goldApple, Phaser.Physics.ARCADE);
    paddle2.body.immovable = true;
};

function initAudio() {
    destroy = game.add.audio('destroy');
    destroy_sp = game.add.audio('destroy_sp');
    impact = game.add.audio('impact');
    impact_sp = game.add.audio('impact_sp');
    bounce = game.add.audio('bounce');
    gotApple = game.add.audio('gotApple');
};

function setLives (n) {
    if(n == 2) {
        for(itr = 0; itr < P2Life; itr++) {
            life_text2 = game.add.image(1890 - (itr*30), 10, 'deathRed');
        }
    }

    else if(n == 1) {
        for(itr = 0; itr < P1Life; itr++) {
            life_text1 = game.add.image(1890 - (itr*30), 1050, 'deathBlue');
        }
    }
};

function LoadBall () {
    if(Math.floor((Math.random() * 2) + 1) == 1){
        ball = game.add.sprite(game.world.width*0.5, game.world.height*0.942, 'ball');
        ball.anchor.set(0.5);
        ball_vel_x = (150 - Math.floor((Math.random() * 300) + 1));
        ball_vel_y = -(Math.floor((Math.random() * 50) + 1) + 100);
        score_flag = 1;
    }
    else{
        ball = game.add.sprite(game.world.width*0.5, game.world.height*0.055, 'ball');
        ball.anchor.set(0.5);
        ball_vel_x = (150 - Math.floor((Math.random() * 300) + 1));
        ball_vel_y = (Math.floor((Math.random() * 50) + 1) + 100);
        score_flag = 2;
    }
    // Enabling Physics on the Ball Element
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    // Setting the Traversal Parameters for the Ball
    ball.body.velocity.set(ball_vel_x,ball_vel_y); 

    // Boundry of the canvas is set as Wall with Bounce physics enabled
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    // Checking the Game End Parameters
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(GameLoseEvent, game);   
};

function initsolobricks() {
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 9,
            col: 29
        },
        offset: {
            top: 100,
            left: 52
        },
        padding_x: 15,
        padding_y: 10,
    };

    bricks = game.add.group();
    for(c=0; c<brickInfo.count.col; c+=2) {
        for(r=0; r<brickInfo.count.row; r+=2) {
            if(Math.floor((Math.random() * 2) + 1) == 1 ){
                var brickX = (c*(brickInfo.width+brickInfo.padding_x))+brickInfo.offset.left;
                var brickY = (r*(brickInfo.height+brickInfo.padding_y))+brickInfo.offset.top;
                // Randomizing the Brick Type
                rand = Math.floor((Math.random() * 3) + 1);
                if(rand == 1) {
                    newBrick = game.add.sprite(brickX, brickY, 'brick1');
                    newBrick.Health = 1;
                    newBrick.brickPts = 10;

                }
                if(rand == 2){
                    newBrick = game.add.sprite(brickX, brickY, 'brick2');
                    newBrick.Health = 2;
                    newBrick.brickPts = 20;
                }
                if(rand == 3){
                    newBrick = game.add.sprite(brickX, brickY, 'brick3');
                    newBrick.Health = 3;
                    newBrick.brickPts = 30;
                }

                game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                brickCount++;
                bricks.add(newBrick);
            }
        }
    }
};

function initbricks () {
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 9,
            col: 29
        },
        offset: {
            top: 385,
            left: 52
        },
        padding_x: 15,
        padding_y: 10,
    };

    bricks = game.add.group();
    for(c=0; c<brickInfo.count.col; c++) {
        for(r=0; r<brickInfo.count.row; r++) {
            if(Math.floor((Math.random() * 4) + 1) == 1 && ((c > 16) || (c < 12))){
                var brickX = (c*(brickInfo.width+brickInfo.padding_x))+brickInfo.offset.left;
                var brickY = (r*(brickInfo.height+brickInfo.padding_y))+brickInfo.offset.top;
                // Randomizing the Brick Type
                rand = Math.floor((Math.random() * 3) + 1);
                if(rand == 1) {
                    newBrick = game.add.sprite(brickX, brickY, 'brick1');
                    newBrick.Health = 1;
                    newBrick.brickPts = 10;

                }
                if(rand == 2){
                    newBrick = game.add.sprite(brickX, brickY, 'brick2');
                    newBrick.Health = 2;
                    newBrick.brickPts = 20;
                }
                if(rand == 3){
                    newBrick = game.add.sprite(brickX, brickY, 'brick3');
                    newBrick.Health = 3;
                    newBrick.brickPts = 30;
                }

                game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                bricks.add(newBrick);
            }
        }
    }
};

function initsbricks() {
    sVertbrickInfo = {
        offset: {
            top: 630 - 125,
            left: 960 - (265/2)
        },
        final_offset: 265,
    };

    sHorbrickInfo = {
        width: 126,
        height: 50,
        count: {
            row: 2,
            col: 4
        },
        offset: {
            top: 540 - 125,
            left: 900
        },
        padding_x: 0,
        padding_y: 10,
    };

    sbricks = game.add.group();
    for(c=0; c<sHorbrickInfo.count.col; c++) {
        for(r=0; r<sHorbrickInfo.count.row; r++) {
            if(c==0 || c==3){
                var brickX = sHorbrickInfo.offset.left + (126 + sHorbrickInfo.padding_x)*r;
                var brickY = sHorbrickInfo.offset.top  + (50 + sHorbrickInfo.padding_y)*c;
                newBrick = game.add.sprite(brickX, brickY, 'sbrick2');
                newBrick.Health = 5;
                newBrick.brickPts = 0;
                game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                sbricks.add(newBrick);    
            }
            
        }
   }           
    for(c=0; c<2; c++){
        var brickX = sVertbrickInfo.offset.left + c*sVertbrickInfo.final_offset;
        var brickY = sVertbrickInfo.offset.top;
        newBrick = game.add.sprite(brickX, brickY, 'sbrick1');
        newBrick.Health = 5;
        newBrick.brickPts = 0;
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        sbricks.add(newBrick);
    }
        
};  

function ballHitBrick(ball, brick) {
    brick.Health--;
    if(brick.Health == 0) {
        destroy.play();
        brick.kill();
        if(score_flag == 1){
            brickCount--;
            score1 += brick.brickPts;
            score_text1.setText('Points: '+score1);
        }
        else{
            brickCount--;
            score2 += brick.brickPts;
            score_text2.setText('Points: '+score2);
        }    
    }
    else
        impact.play();
     
};

function ballHitsBrick(ball, brick) {
    brick.Health--;
    if(brick.Health == 0) {
        destroy_sp.play();
        brick.kill();
        if(score_flag == 1){
            score1 += brick.brickPts;
            score_text1.setText('Points: '+score1);
        }
        else{
            score2 += brick.brickPts;
            score_text2.setText('Points: '+score2);
        }    
    }
    else 
        impact.play();
};


function goldAppleHit(ball, apple) {
    apple.kill;
    if(score_flag == 1){
        score1 += 150;
        score_text1.setText('Points: '+score1);
    }
    else{
        score2 += 150;
        score_text2.setText('Points: '+score2);
    }
    gotApple.play();
    GameOver();
};

function vel_ball() {
    ball_vel_x = (150 - Math.floor((Math.random() * 300) + 1));
};


function setMainPlayer1() {
    bounce.play();
    score_flag = 1;
};

function setMainPlayer2() {
    bounce.play();
    score_flag = 2;
};


function GameLoseEvent(){
    if (ModeNum == 1) {
        P2Life++;
        setLives(2);
        score_text2.setText('Points: '+score2);
        if(P2Life == 3)
            GameOver();
    }
    
    else {
        if (ball.body.position.y > 600) {
            P1Life++;
            setLives(1);
            score_text1.setText('Points: '+score1);
            if(P1Life == 3)
                GameOver();
            
        }
        else if (ball.body.position.y < 100) {
            P2Life++;
            setLives(2);
            score_text2.setText('Points: '+score2);
            if(P2Life == 3)
                GameOver();
        }
    }
    
    LoadBall();
};

function GameOver(){
    if (ModeNum == 1){
        if(brickCount == 0)
            game.state.start('GameOverP1');
        else
            game.state.start('GameOverLost'); 
    }
    else {
        if(P1Life == 3 || P2Life == 3){
            if(P1Life == 3)
                game.state.start('GameOverP2');
            else if(P2Life == 3)
                game.state.start('GameOverP1');
        }
        
        else if(score1 > score2)
            game.state.start('GameOverP1');

        else if(score2 > score1)
            game.state.start('GameOverP2');

        else if(score1 == score2)
            game.state.start('GameOverTied');
    }     
};












