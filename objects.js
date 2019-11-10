class Objet {
    constructor(img,taille,pos){
        // Pour des raisons pratiques on utilisera des rectangles comme hitbox.
        this.img = new Image();
        this.img.src = "images/" + img + ".png";
        this.size = taille;
        this.position = pos; this.vect = [0,0]; this.z = 0; this.r = 0; this.rVit = 0;
        this.id = -1;
        this.vulnerable = false;
        this.activeBuffer = 0; this.elliptoide = 0;

        this.mode = ""; this.modeData;
    }

    getId(){
        return this.id;
    }

    pos(){
        return this.position;
    }

    goTo(pos){
        this.position = pos;
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

    fall(){
        let data = [this.position[0],this.position[1],this.vect[0],this.vect[1],this.img];
        this.position = [0,0];
        this.activeBuffer = 120;
        return data;
    }
    
    draw(Painter){
        //Painter.rectangle(this.position[0],this.position[1],this.size[0],this.size[1],"rgb(0,0,0)");
        if (this.activeBuffer == 0) Painter.imgObj(this.img,this.position[0],this.position[1] - this.z);
    }

    act(t,keyBoard,obj,i,sizu){
        if (this.activeBuffer > 0) {
            this.activeBuffer -= 1;
            return false;
        }
        if (this.mode != ""){
            if (this.mode == "fuite") this.actFuite(obj,sizu);
        }
        this.elliptoide = (this.position[0] / sizu[0])**2 + (this.position[1] / sizu[1])**2;
        if (this.elliptoide > 1) return true;
        return false;
    }

    fallOff(){
        if (this.pos[1] <= 0){
            
        }
    }
    
    actFuite(obj,sizu){
        let objy = this.getById(this.modeData,obj);
        let pos = objy.position; let vect = objy.vect;
        let direc = [this.position[0] - pos[0],this.position[1] - pos[1]];
        let dist = Math.hypot(direc[0], direc[1]);
        if (dist == 0){
            this.position[0] = pos[0] + Math.cos(this.r) * 50; this.position[1] = pos[1] + Math.sin(this.r) * 50;
            this.vect[0] = 0; this.vect[1] = 0;
        }
        else if (dist <= 50){
            direc[0] /= dist; direc[1] /= dist;
            direc[0] *= 50; direc[1] *= 50;
            this.position[0] = pos[0] + direc[0]; this.position[1] = pos[1] + direc[1];
            this.vect[0] = 0; this.vect[1] = 0;
        }
        else if (dist < 150){
            direc[0] *= 18/dist;
            direc[1] *= 18/dist;
            this.vect[0] = direc[0]; this.vect[1] = direc[1];
        }
        else{
            this.r += this.rVit; this.rVit += (Math.random()-0.5)/10; this.rVit = Math.min(Math.max(this.rVit,-0.1),0.1);
            this.vect[0] *= 0.9; this.vect[1] *= 0.9;
        }
        this.position[0] += Math.cos(this.r) * 2 + this.vect[0]; this.position[1] += Math.sin(this.r) * 2 + this.vect[1];
        this.elliptoide = ((this.position[0] + Math.cos(this.r) * 2 + this.vect[0]) / sizu[0])**2 + ((this.position[1] + Math.sin(this.r) * 2 + this.vect[1]) / sizu[1])**2;
        if (this.elliptoide > 1){
            this.r += Math.PI;
        }
    }

    getById(id,elem){
        for (let i = 0; i < elem.length; i ++){
            if (elem[i].getId() == id) return elem[i];
        }
        return undefined;
    }
    
    getY(){
        return this.position[1];
    }

    overlap(pos,size){
        if (this.activeBuffer > 0) return false;
        return Math.abs(this.position[0] - pos[0])*2 <= size[0] + this.size[0] &&
            Math.abs(this.position[1] - pos[1])*2 <= size[1] + this.size[1];
    }

    switchTo(mode,evt){
        this.mode = mode; this.modeData = evt;
    }
    
};
