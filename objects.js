class Objet {
    constructor(img,taille,pos){
        this.img = new Image();
        this.img.src = "images/" + img + ".png";
        this.size = taille;
        this.position = pos;
    }

    draw(Painter){
        Painter.ellipse(this.position[0],this.position[1],this.size[0],this.size[1],"rgb(0,0,0)");
    }

};
