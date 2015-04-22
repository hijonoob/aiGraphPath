var edges_state = {
    //nesse estado, o usuario ja pode visualizar os vertices do grafo
    //e pode clicar e arrastar de um vertice para outro para formar uma aresta entre eles
    //(ele deve fornecer algum modo de desfazer uma aresta tambem)
    //assim que o usuario disser que terminou de fazer as arestas,
    //vamos para o estado de pathfind
    
    create: function () {
        console.log("edgez");
        var numNodesLocal = document.getElementById("numnodes").value;
        var listaNome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","w","x","y","z"];
        var style = { font: "14px Arial", fill: "#000000", align: "left" };
        var i = 0;
        while(i < numNodesLocal) {
            console.log(numNodesLocal);
            this.game.add.sprite(128 * Math.round(i / 2) - ( (i % 2) ? 128 : 0), 128 * (i % 2) , 'graphNode');
            this.game.add.text(128 * Math.round(i / 2) + 60  - ( (i % 2) ? 128 : 0), 128 * (i % 2) + 54, listaNome[i], style);
            i++;
        }
    },
    
}