/*globals  Phaser, Vertice */


var edges_state = {
    //nesse estado, o usuario ja pode visualizar os vertices do grafo
    //e pode clicar e arrastar de um vertice para outro para formar uma aresta entre eles
    //(ele deve fornecer algum modo de desfazer uma aresta tambem)
    //assim que o usuario disser que terminou de fazer as arestas,
    //vamos para o estado de pathfind


    create: function () {
        // captura a quantidade de vertices
        var numNodesLocal = document.getElementById("numnodes").value;
        
        // startAresta como nao definido
        this.game.startAresta == undefined;
        
        // cria grupo de vertices
        this.game.vertices = this.game.add.group();
        this.game.vertices.enableBody = true;
        this.game.physics.enable(this.game.vertices, Phaser.Physics.ARCADE);

        // cria as vertices
        var i = 0;
        while(i < numNodesLocal) {
            new Vertice(i);
            i++;
        }
        document.getElementById("prompt").textContent = "Para criar as arestas clique nos dois vértices que deseja conectar";

    },
    
}