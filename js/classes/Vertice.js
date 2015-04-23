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
  this.indice = i;
  
  //console.log(this.name + " x" + this.linha + "y" + this.coluna);
  
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
            
};


Vertice.prototype.matriz = function () {
    var largura = 20;
    var altura = 12;
    var style = { font: "12px Arial", fill: "#000000", align: "left" };
    var listaNome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u"];


    for(var i=0; i < game.numNodesLocal; i++){
      for(var j=0; j < game.numNodesLocal; j++) {
        //console.log('i ' + i + ' j + ' + j);
        game.add.text(40 + i * largura, 160 + j * altura , game.matriz[i][j].toString(), style);
      }
    }
    
    for(var i=0; i < game.numNodesLocal; i++){
      game.add.text(40 + i * largura, 150, listaNome[i], style);
      game.add.text(30, 160 + i * altura, listaNome[i], style);
    }

}

Vertice.prototype.click = function (vertice) {
  if (game.startAresta == undefined) {
    game.startAresta = this;
    this.sprite.scale.set(0.55); 
  } else {
      // se for o proprio vertice ou nao vizinho ele reseta
      if (game.startAresta == this || ( Math.abs( game.startAresta.coluna - this.coluna) > 1) ) {
        // retorna ao padrao
        game.startAresta.sprite.scale.set(0.5);
        game.startAresta = undefined;
      } else {
        // caso seja vizinho ele cria a linha
        var graphics = game.add.graphics(30, 30);
        graphics.lineStyle(3, 0x33FF00);
        graphics.moveTo(game.startAresta.xPos,game.startAresta.yPos);
        graphics.lineTo(this.xPos, this.yPos);
        // verifica qual o menor indice para ter matriz pela metade
        if(this.indice < game.startAresta.indice) {
          var primeiroIndice = this.indice;
          var segundoIndice = game.startAresta.indice;
        } else {
          var segundoIndice = this.indice;
          var primeiroIndice = game.startAresta.indice;
        }
        // verifica se é reta ou diagonal para calcular peso
        if (this.coluna == game.startAresta.coluna || this.linha == game.startAresta.linha ) {
          var peso = 1;
        } else {
          var peso = Math.sqrt(2).toFixed(1);
        }
        // adiciona a aresta na matriz
        game.matriz[primeiroIndice][segundoIndice] = peso;
        
        // retorna ao padrao
        game.startAresta.sprite.scale.set(0.5);
        game.startAresta = undefined;
        this.matriz();
      }
  }
}