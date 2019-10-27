var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '');

game.state.add('MainMenu', MainMenu);
game.state.add('SelectMode', SelectMode);
game.state.add('gameMode1', gamemode1);
game.state.add('gameMode2', gamemode2);
game.state.add('GameOverLost',GameOverLost);
game.state.add('GameOverP1', GameOverP1);
game.state.add('GameOverP2', GameOverP2);
game.state.add('GameOverTied', GameOverTied);




game.state.start('MainMenu');



