// Fichier d'initialisation du jeu.

let W,H,ctx,canvas;

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
    initGame();
}

function initGame(){
    Scene.add(new Objet("croissant",[70,16],[100,50]));
    Chef.setPainter(Painter);
    Chef.setScene(Scene);
    Chef.start();
}
