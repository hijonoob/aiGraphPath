function initOKButton(){
    var numNodes = document.getElementById("numnodes").value;
    
    if (isNaN(numNodes) || numNodes < 2 || numNodes > 10) {
        alert("O numero de vertices precisa estar entre 2 e 10");
    }else { 
        this.game.state.start('edges');
        //esconde o espaco para entrada de texto por enquanto, ja que nao vai ser necessario
        document.getElementById("numnodes").style.visibility = "hidden";
        document.getElementById("okbutton").style.visibility = "hidden";
    }
}