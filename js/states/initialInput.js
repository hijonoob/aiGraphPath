var numNodes = 0;
var inputText;
var confirmButton;
var confirmKey; 

var init_state = {
    //nesse estado do programa, o usuario entra com a quantidade de vertices que ele deseja que o grafo tenha
    //(entre 2 e 20)
    //depois, confirma e o programa confere se a entrada foi valida
    //se for, vai para o estado de fazer as arestas
    
    
    
    create: function () {
    	confirmKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER); //define enter como tecla alternativa para confirmar
    	
        //quando esse estado iniciar, edita o prompt de entrada de texto
        document.getElementById("prompt").textContent = "Digite o numero de vertices (entre 2 e 20) do grafo:";
        inputText = document.getElementById("prompt").insertAdjacentHTML("afterEnd","<input type='text' id='numnodes' size='20'>");
        confirmButton = document.getElementById("prompt").insertAdjacentHTML("afterEnd","<button id='okbutton' onclick='initOKButton()'>OK</button>");
        this.game.input.keyboard.addCallbacks(this, null, this.keyPress, null);
        
        //define o que o enter faz nesse contexto
        confirmKey.onDown.add(this.OKFunction, this);
    },
    
    OKFunction : function () {
    	initOKButton();
    }
    
}