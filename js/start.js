var game = new Phaser.Game(800, 400, Phaser.AUTO, 'aiGraphPath');

// Define os estados
game.state.add('boot', boot_state);
game.state.add('preload', load_state);
game.state.add('init', init_state);
game.state.add('edges', edges_state);

// Inicia com o estado 'boot'
game.state.start('boot');
