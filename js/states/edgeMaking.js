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

        // cria as vertices
        var i = 0;
        while(i <  this.game.numNodesLocal ) {
            this.game.matriz[i] = new Array( this.game.numNodesLocal );
            for(var j=0; j< this.game.numNodesLocal ; j++){
                this.game.matriz[i][j] = " ";
            }
            new Vertice(i);
            i++;
        }
    //    console.log(this.game.matriz);
        document.getElementById("prompt").textContent = "Para criar as arestas clique nos dois vértices que deseja conectar";

    },
    
}