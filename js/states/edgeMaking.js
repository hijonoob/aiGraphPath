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
                // nao salva nada onde nao ha aresta
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
        // pinta um retangulo para tampar os textos anteriores
        var shape = this.game.add.graphics(0, 0); // inicia o retangulo
        shape.lineStyle(0, 0x000000, 0); // largura, cor, alfa
        shape.beginFill(0xEEEEEE, 1); // cor, alfa
        shape.drawRect(445, 155, 330, 200); // x, y, largura, altura
        shape.endFill();
        
        Prim(); // roda o algoritmo para atualizar variáveis
    
        var style = { font: "14px Arial", fill: "#FF0000", align: "center" };
        this.game.add.text(450, 160 ,"Vértice inicial: " + init, style);
        this.game.add.text(450, 180 ,"Vértice final: " + final, style);
        var distManhattan = Math.abs(initCol - finalCol) + Math.abs(initLin - finalLin);
        this.game.add.text(450, 200 ,"Distância Manhattan: " + distManhattan, style);
        this.game.add.text(450, 220 ,"Algoritmo escolhido: Prim", style);
        this.game.add.text(450, 240 ,"Número de passos entre os vértices: " + this.game.qtdadePassos, style);
        this.game.add.text(450, 260 ,"Soma de pesos percorido: " + this.game.pesoTotal, style);
        this.game.add.text(450, 300 ,"Caminho percorrido pelo algoritmo: ", style);
        this.game.add.text(450, 320 , this.game.caminhoPercorrido, style);

    }

    
    function Prim() {
        // define variaveis para uso no algotimo
        this.game.caminhoPercorrido = []; // caminho percorrido
        this.game.qtdadePassos = 0;
        var vizinhos = []; // vizinhos a percorrer
        this.game.pesoTotal = 0;
        var deadend = []; // vertices que nao chegam no verticefinal

        // Coloca na lista o vertice inicial e o define como usado
        this.game.caminhoPercorrido.push(init);
    
        // Encontra vizinhos
        function encontraVizinho(vertice) {
          for(var i=0; i<this.game.numNodesLocal;i++) {
            if( vizinhos.indexOf(i) == -1 && this.game.caminhoPercorrido.indexOf(listaNome[i]) == -1 && deadend.indexOf(i) == -1) {
            //if( vizinhos.indexOf(i) == -1 && this.game.caminhoPercorrido.indexOf(listaNome[i]) == -1) {
                if (this.game.matriz[vertice][i] == Math.sqrt(2) || this.game.matriz[vertice][i] == 1) {
                    vizinhos.push(i);
                }
                // faz o inverso caso esteja voltando pela matriz ter só a metade
                if (this.game.matriz[i][vertice] == Math.sqrt(2) || this.game.matriz[i][vertice] == 1) {
                    vizinhos.push(i);
                }
            }
          }
        }
        var indiceLoop = initIndex;
        while(indiceLoop != finalIndex && this.game.qtdadePassos <= 2000) { // limita quando chega no final ou passa a quantidade maxima de iteracoes
            encontraVizinho(indiceLoop); // encontra os vizinhos do vertice atual
            
            var indiceLoopNovo = vizinhos.pop(); // escolhe um caminho a percorrer
            vizinhos = [];
            if (indiceLoopNovo == undefined) {
                if(indiceLoop != initIndex && indiceLoop != finalIndex && deadend.indexOf(indiceLoop) == -1) {
                    deadend.push(indiceLoop);
                }
                // reseta variaveis para procurar outro caminho
                this.game.caminhoPercorrido = []; // caminho percorrido
                this.game.pesoTotal = 0;
                // Coloca na lista o vertice inicial e o define como usado
                this.game.caminhoPercorrido.push(init);
                indiceLoopNovo = initIndex;
            } else {
                // soma os pesos totais percorridos
                this.game.pesoTotal += (this.game.matriz[indiceLoop][indiceLoopNovo] == undefined ? this.game.matriz[indiceLoopNovo][indiceLoop] : this.game.matriz[indiceLoop][indiceLoopNovo]);

                this.game.caminhoPercorrido.push(listaNome[indiceLoopNovo]); // coloca esse vertice como caminho percorrido
            }
            if (this.game.qtdadePassos >= 2000 ) {
                this.game.caminhoPercorrido = "Caminho não fechado";
                this.game.qtdadePassos = 0;
                break; // se terminar de varrer os vizinhos termina o loop
            }
            indiceLoop = indiceLoopNovo;
            this.game.qtdadePassos++; // aumenta o contador

        }

        
        //function findMin(g) {
        //    var min = [999,null];
        //    for(var i=0;i<resultado.length;i++) 
        //        for(var n=0;n<g.edges[result[i]].length;n++) 
        //            if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
        //                min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink];
        //    return min[1];
        //}
        

        
        //var min = findMin(g);
        //while(min != null) {
        //    result.push(min);
        //    usedNodes[min] = true;
        //    min = findMin(g);
        //}
    };
};