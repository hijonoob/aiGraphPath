var numNodes = 0;
var inputText;
var confirmButton;
var confirmKey; 

var init_state = {

    create: function () {
    	confirmKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER); //define enter como tecla alternativa para confirmar
        //quando esse estado iniciar, edita o prompt de entrada de texto
        document.getElementById("prompt").textContent = "Digite o numero de vertices (entre 2 e 10) do grafo:";
        inputText = document.getElementById("prompt").insertAdjacentHTML("afterEnd","<input type='text' id='numnodes' size='10'>");
        confirmButton = document.getElementById("prompt").insertAdjacentHTML("afterEnd","<button id='okbutton' onclick='initOKButton()'>OK</button>");
        this.game.input.keyboard.addCallbacks(this, null, this.keyPress, null);
        //define o que o enter faz nesse contexto
        confirmKey.onDown.add(this.OKFunction, this);
    },

    OKFunction : function () {
    	initOKButton();
    }
}