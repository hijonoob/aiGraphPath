function initOKButton(){
    console.log("okzou");
    
    numNodes = document.getElementById("numnodes").value;
    
    if (isNaN(numNodes) || numNodes < 2 || numNodes > 20) {
        alert("O numero de vertices precisa estar entre 2 e 20");
    }else { 
        game.state.start('edges');
        //esconde o espaco para entrada de texto por enquanto, ja que nao vai ser necessario
        document.getElementById("numnodes").style.visibility = "hidden";
    }
}