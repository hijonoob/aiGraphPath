var load_state = {

  preload: function () {
    // Define que nao esta pronto
    this.ready = false;
    // Inicia o carregamento
    this.game.load.start();
    // Adiciona o sprite de loading
    this.loading = this.add.sprite(this.game.world.width / 2 - 50, this.game.world.height / 2 - 50, 'preloader');
    this.loading.anchor.setTo(0.5, 0.5);
    this.loading.scale.set(0.3);
    // Define o sprite como pre loader
    this.game.load.setPreloadSprite(this.loading);

    // Pinta o bg
    this.game.stage.backgroundColor = '#222222';

    // Carrega images sprites
    this.game.load.spritesheet('graphNode', '../../assets/sprites/graphNode.png', 128, 128, 3);

   
  },

  create: function () {
    // Ao terminar de carregar chamar o metodo loadComplete
    this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
  },

  update: function () {
    // todo frame verifica se ja esta pronto, qd estiver vai para o estado 'init'
    
      if (this.ready) {
        this.game.state.start('init');
      }
  },

  loadComplete: function () {
    // Assim que tudo estiver carregado, vai para o estado de 'init'
    this.ready = true;
  },

};
