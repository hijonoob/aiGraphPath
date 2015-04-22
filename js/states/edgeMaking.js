var edges_state = {
    //nesse estado, o usuario ja pode visualizar os vertices do grafo
    //e pode clicar e arrastar de um vertice para outro para formar uma aresta entre eles
    //(ele deve fornecer algum modo de desfazer uma aresta tambem)
    //assim que o usuario disser que terminou de fazer as arestas,
    //vamos para o estado de pathfind
    
    create: function () {
        var tileSize = 80;
        console.log("edgez");
        var numNodesLocal = document.getElementById("numnodes").value;
        var listaNome = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","w","x","y","z"];
        var style = { font: "14px Arial", fill: "#000000", align: "left" };
        var i = 0;
        while(i < numNodesLocal) {
            console.log(numNodesLocal);
            //this.game.add.sprite(128 * Math.round(i / 2) - ( (i % 2) ? 128 : 0), 128 * (i % 2) , 'graphNode');
            
            this.game.verticeButton = this.game.add.button(tileSize * Math.round(i / 2) - ( (i % 2) ? tileSize : 0), tileSize * (i % 2) , 'graphNode', this.start, this, 1, 0, 1);
            this.game.verticeButton.scale.set(0.5);
            //this.game.verticeButton.anchor.setTo(0.5, 0.5);
            
            this.game.add.text(tileSize * Math.round(i / 2) + tileSize/3  - ( (i % 2) ? tileSize : 0), tileSize * (i % 2) + tileSize/3, listaNome[i], style);
            i++;
        }
        document.getElementById("prompt").textContent = "Clique nos vertices que deseja conectar e digite de alguma forma seu peso";

    },
    
}