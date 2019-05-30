class Objet {
    constructor(img,taille,pos){
        // Pour des raisons pratiques on utilisera des rectangles en fait.
        this.img = new Image();
        this.img.src = "images/" + img + ".png";
        this.size = taille;
        this.position = pos;
        this.id = -1;
    }

    getId(){
        return this.id;
    }

    pos(){
        return this.position;
    }

    bonking(elem,i){
        for (let j = 0; j < elem.length; j++){
            if (j != i){
                if (elem[j].overlap(this.position,this.size)) return true;
            }
        }
        return false;
    }
    
    setId(elem){
        let max = 0;
        let couple;
        for (let i = 0; i < elem.length; i++){
            if (elem[i].getId() >= max) max = elem[i].getId() + 1;
        }
        this.id = max;
    }
    
    draw(Painter){
        //Painter.rectangle(this.position[0],this.position[1],this.size[0],this.size[1],"rgb(0,0,0)");
        Painter.imgObj(this.img,this.position[0],this.position[1]);
    }

    act(t,keyBoard){
        
    }

    getY(){
        return this.position[1];
    }

    overlap(pos,size){
        return Math.abs(this.position[0] - pos[0])*2 <= size[0] + this.size[0] &&
            Math.abs(this.position[1] - pos[1])*2 <= size[1] + this.size[1];
    }
    
};
