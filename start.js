// Fichier d'initialisation du jeu.

let W,H,ctx,canvas;
let vecteurs = [[0,-1],[1,0],[0,1],[-1,0]];

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function start(){
    // Construction de ce qui sert pour toute la session de jeu.
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    resize();
    
    Painter.init(ctx,W,H,0,0);
    KeyBoard.init();
    Conteur.init("kallypse",Scene,initGame);
    
    initGame();
}

function initGame(){
    Conteur.load(1,Scene,initGame2);
}

function initGame2(){
    Chef.setVoiceChan([new AudioChan(),new AudioChan()],"kallypse");
    Chef.setConteur(Conteur);
    Chef.setPainter(Painter);
    Chef.setScene(Scene);
    Chef.setKeyBoard(KeyBoard);
    Chef.start();
}
