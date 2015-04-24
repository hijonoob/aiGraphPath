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
                // nao salva nada onde nao ha aresta para não ocupar espaço na matriz
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
        // pinta um retangulo para nao exibir os textos anteriores
        var shape = this.game.add.graphics(0, 0); // inicia o retangulo
        shape.lineStyle(0, 0x000000, 0); // largura, cor, alfa
        shape.beginFill(0xEEEEEE, 1); // cor, alfa
        shape.drawRect(445, 145, 330, 200); // x, y, largura, altura
        shape.endFill();
        shape.beginFill(0xFFFFFF, 1); // cor, alfa
        shape.drawRect(445, 345, 350, 350); // x, y, largura, altura
        shape.endFill();
        
        Prim(); // roda o algoritmo para atualizar variáveis
    
        var style = { font: "14px Arial", fill: "#FF0000", align: "center" };
        this.game.add.text(450, 160 ,"Vértice inicial: " + init, style);
        this.game.add.text(450, 180 ,"Vértice final: " + final, style);
        var distManhattan = Math.abs(initCol - finalCol) + Math.abs(initLin - finalLin);
        this.game.add.text(450, 200 ,"Distância Manhattan: " + distManhattan, style);
        this.game.add.text(450, 220 ,"Baseado em Busca por Profundidade", style);
        this.game.add.text(450, 240 ,"Número de passos entre os vértices: " + this.game.passos, style);
        this.game.add.text(450, 260 ,"Soma de pesos percorido: " + this.game.pesoTotal, style);
        this.game.add.text(450, 300 ,"Caminho percorrido pelo algoritmo: ", style);
        this.game.add.text(450, 320 , this.game.caminhoPercorrido, style);
        var style2 = { font: "10px Arial", fill: "#000000", align: "center" };
        this.game.add.text(450, 345 ,"  - Heurística que busca os vizinhos do vértice e escolhe o último repetindo", style2);
        this.game.add.text(450, 357 ,"o processo até chegar no vértice final.", style2);
        this.game.add.text(450, 369 ,"  - Caso o caminho não chegue ao final, o último vértice percorrido é", style2);
        this.game.add.text(450, 381 ,"incluso em uma black list a ser ignorado e nova busca é feita.", style2);
        this.game.add.text(450, 393 ,"  - Caso o algoritmo passe de 2000 passos, o ciclo é interrompido por", style2);
        this.game.add.text(450, 405 ,"ter um grafo não conectado entre os pontos inicial e final.", style2);
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
        this.game.passos = 0;
        while(indiceLoop != finalIndex && this.game.qtdadePassos <= 2000) { // limita quando chega no final ou passa a quantidade maxima de iteracoes - a qtdade é usada, pois podemos percorrer diversos caminhos sem encontrar o destino
            encontraVizinho(indiceLoop); // encontra os vizinhos do vertice atual
            var indiceLoopNovo = vizinhos.pop(); // escolhe um caminho a percorrer
            vizinhos = []; // limpa vizinhos, pois não estamos fazendo árvore e sim encontrando caminho
            if (indiceLoopNovo == undefined) {
                if(indiceLoop != initIndex && indiceLoop != finalIndex && deadend.indexOf(indiceLoop) == -1) {
                    deadend.push(indiceLoop); // inclui o vertice como linha que nao chega ao destino
                }
                // reseta variaveis para procurar outro caminho
                this.game.caminhoPercorrido = []; // caminho percorrido
                this.game.pesoTotal = 0;
                this.game.passos = 0;
                // Coloca na lista o vertice inicial e o define como usado
                this.game.caminhoPercorrido.push(init);
                indiceLoopNovo = initIndex;
            } else {
                // soma os pesos totais percorridos
                if(indiceLoop<indiceLoopNovo) {
                    var pesoLocal = this.game.matriz[indiceLoop][indiceLoopNovo];
                } else {
                    var pesoLocal = this.game.matriz[indiceLoopNovo][indiceLoop];
                }
                this.game.pesoTotal += pesoLocal;

                this.game.caminhoPercorrido.push(listaNome[indiceLoopNovo]); // coloca esse vertice como caminho percorrido
                this.game.qtdadePassos++; // aumenta o contador de passos
                this.game.passos++; // aumenta numero de passos
            }
            if (this.game.qtdadePassos >= 2000 ) {
                this.game.caminhoPercorrido = "Caminho não fechado"; // caso nao encontre em nenhum caminho existente, confirmar que caminho não está fechado
                this.game.qtdadePassos = 0; // zera número de passos, pois não há caminho
                break; // se terminar de varrer os vizinhos termina o loop
            }
            indiceLoop = indiceLoopNovo;

        }
    };
};