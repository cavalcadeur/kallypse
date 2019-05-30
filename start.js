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
    
    initGame();
}

function initGame(){    
    Scene.add(new Objet("tasse",[70,16],[100,50]));
    Scene.add(new Croissant("croissant",[70,16],[-100,-50]));
    Scene.add(new Feux("noisette",[45,16],[-50,100]));
    Scene.add(new Feux("noisette",[45,16],[-100,200]));    
    Scene.add(new Feux("noisette",[45,16],[-50,100]));
    Scene.add(new Feux("noisette",[45,16],[-100,200]));    
    Scene.add(new Objet("tasse",[70,16],[-200,-80]));    
    Scene.add(new Objet("tasse",[70,16],[-300,200]));
    Scene.elem[2].activate(1);
    Scene.elem[3].activate(1);
    Scene.elem[4].activate(1);
    Scene.elem[5].activate(1);
    Chef.setPainter(Painter);
    Chef.setScene(Scene);
    Chef.setKeyBoard(KeyBoard);
    Chef.start();
}
