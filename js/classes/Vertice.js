/*globals game, Phaser */
var Vertice = function (i) {
  // definicoes estaticas
  var tileSize = 80;
  var listaNome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u"];
  var style = { font: "14px Arial", fill: "#000000", align: "left" };

          
  // variaveis do vertice
  this.linha = i % 2;
  this.coluna = Math.round(i / 2) - ( (i % 2) ? 1 : 0);
  this.xPos = tileSize * this.coluna;
  this.yPos = tileSize * this.linha;
  this.name = listaNome[i];
  
  console.log(this.name + " x" + this.linha + "y" + this.coluna);
  
  // desenha a sprite
  this.sprite = game.add.sprite(this.xPos, this.yPos, 'graphNode');
  this.sprite.scale.set(0.5);
  this.sprite.inputEnabled = true;
  this.sprite.input.useHandCursor = true; //if you want a hand cursor
  this.sprite.events.onInputDown.add(this.click, this);
    
  // desenha o texto
  game.add.text(tileSize * Math.round(i / 2) + tileSize/3  - ( (i % 2) ? tileSize : 0), tileSize * (i % 2) + tileSize/3, this.name, style);

  // adiciona no grupo de vertices  
  //game.vertices.add(this.sprite);
  
  
  // rascunhos
              //this.game.sprite.input.enableDrag();
            //this.game.sprite.events.onDragStop.add(onDown, this);
            
            // fazendo como botao
            //this.game.verticeButton = this.game.add.button( x , y , 'graphNode', this.start, this, 1, 0, 1);
            //this.game.verticeButton.scale.set(0.5);
            //this.game.verticeButton.anchor.setTo(0.5, 0.5);
            
            
};

Vertice.prototype.click = function (vertice) {
  if (game.startAresta == undefined) {
    game.startAresta = this;
    this.sprite.scale.set(0.55); 
  } else {
      console.log( Math.abs( game.startAresta.coluna - this.coluna));
      if (game.startAresta == this || ( Math.abs( game.startAresta.coluna - this.coluna) > 1) ) {
        // retorna ao padrao
        game.startAresta.sprite.scale.set(0.5);
        game.startAresta = undefined;
      } else {
        // TODO validar se não fecha o caminho

        var graphics = game.add.graphics(30, 30);
        graphics.lineStyle(3, 0x33FF00);
        graphics.moveTo(game.startAresta.xPos,game.startAresta.yPos);
        graphics.lineTo(this.xPos, this.yPos);
      
        // retorna ao padrao
        game.startAresta.sprite.scale.set(0.5);
        game.startAresta = undefined;
      }
  }
}