/*globals  Phaser, Vertice */


var edges_state = {
    create: function () {
        // captura a quantidade de vertices
        this.game.numNodesLocal = document.getElementById("numnodes").value;
        
        // startAresta como nao definido
        this.game.startAresta == undefined;

        this.game.matriz = new Array( this.game.numNodesLocal );
        
    	this.game.roda = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER); //define enter como tecla alternativa para confirmar
    	this.game.rodarButton = document.getElementById("prompt").insertAdjacentHTML("afterEnd","<button id='rodarbutton' onclick='rodarFunction()'>Rodar o algoritmo</button> <br />");
        this.game.inputText = document.getElementById("prompt").insertAdjacentHTML("afterEnd","Vértice final <input type='text' id='verticeFinal' size='20'> <br/>");
        this.game.inputText = document.getElementById("prompt").insertAdjacentHTML("afterEnd","Vértice inicial <input type='text' id='verticeInicial' size='20'> <br/>");

        this.game.input.keyboard.addCallbacks(this, null, this.keyPress, null);
        
        //define o que o enter faz nesse contexto
        this.game.roda.onDown.add(this.rodar, this);
        

        // cria as vertices
        var i = 0;
        while(i <  this.game.numNodesLocal ) {
            this.game.matriz[i] = new Array( this.game.numNodesLocal );
            for(var j=0; j< this.game.numNodesLocal ; j++){
                //this.game.matriz[i][j] = "-"; // nao salva nada onde nao ha aresta
            }
            new Vertice(i);
            i++;
        }
        document.getElementById("prompt").textContent = "Para criar as arestas clique nos dois vértices que deseja conectar";

    },
    
    rodar : function () {
        rodarFunction();
    },
}

function rodarFunction(){
    var listaNome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u"];
    
    var init = document.getElementById("verticeInicial").value;
    var initIndex = listaNome.indexOf(init);
    var initCol =  Math.round(initIndex / 2) - ( (initIndex % 2) ? 1 : 0);
    var initLin =  initIndex % 2;
    
    var final = document.getElementById("verticeFinal").value;
    var finalIndex = listaNome.indexOf(final);
    var finalCol =  Math.round(finalIndex / 2) - ( (finalIndex % 2) ? 1 : 0);
    var finalLin =  finalIndex % 2;

    if (initIndex == -1 || initIndex > this.game.numNodesLocal) {
        alert("O valor inicial precisa ser uma letra em caixa baixa exibida no grafo");
    } else if (finalIndex == -1 || finalIndex > this.game.numNodesLocal || initIndex == finalIndex) {
        alert("O valor final precisa ser uma letra em caixa baixa exibida no grafo diferente da inicial");
    } else {
        // todo calcula algoritmo - exibir caminho, exibir passos - exibir manhattan
        
        // pinta um retangulo para tampar os textos anteriores
        var shape = this.game.add.graphics(0, 0); // inicia o retangulo
        shape.lineStyle(0, 0x000000, 0); // largura, cor, alfa
        shape.beginFill(0xEEEEEE, 1); // cor, alfa
        shape.drawRect(445, 155, 300, 200); // x, y, largura, altura
        shape.endFill();
    
        var style = { font: "14px Arial", fill: "#FF0000", align: "center" };
        this.game.add.text(450, 160 ,"Vértice inicial: " + init, style);
        this.game.add.text(450, 180 ,"Vértice final: " + final, style);
        var distManhattan = Math.abs(initCol - finalCol) + Math.abs(initLin - finalLin);
        this.game.add.text(450, 200 ,"Distância Manhattan: " + distManhattan, style);
        this.game.add.text(450, 220 ,"Algoritmo escolhido: Djikistra", style);
        var qtdadePassos = 10; // TODO rodar o algoritmo e verificar se consegue chegar e quantos passos demora
        this.game.add.text(450, 240 ,"Número de passos entre os vértices: " + qtdadePassos, style);
        var caminhoPercorrido = "A-Z-C-A-R-A-M-B-A" // TODO rodar o algoritmo e verificar se consegue chegar e o caminho percorrido
        this.game.add.text(450, 260 ,"Caminho percorrido pelo algoritmo: ", style);
        this.game.add.text(450, 280 ,caminhoPercorrido, style);
    }
};