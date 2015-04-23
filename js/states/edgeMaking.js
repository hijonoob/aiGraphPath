/*globals  Phaser, Vertice */


var edges_state = {
    //nesse estado, o usuario ja pode visualizar os vertices do grafo
    //e pode clicar e arrastar de um vertice para outro para formar uma aresta entre eles
    //(ele deve fornecer algum modo de desfazer uma aresta tambem)
    //assim que o usuario disser que terminou de fazer as arestas,
    //vamos para o estado de pathfind


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
                //this.game.matriz[i][j] = "-";
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
    var final = document.getElementById("verticeFinal").value;
    var finalIndex = listaNome.indexOf(final);

    if (initIndex == -1 || initIndex > this.game.numNodesLocal) {
        alert("O valor inicial precisa ser uma letra em caixa baixa exibida no grafo");
    } else if (finalIndex == -1 || finalIndex > this.game.numNodesLocal || initIndex == finalIndex) {
        alert("O valor final precisa ser uma letra em caixa baixa exibida no grafo diferente da inicial");
    } else {
        // calcula algoritmo
    }
};