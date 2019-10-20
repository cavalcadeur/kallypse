class EffFall extends Effect {
    
    constructor(data){
        super();
        this.pos = [data[0],data[1]];
        this.v = [data[2],data[3]];
        this.img = data[4];
        this.dispo = false;
        this.g = 0;
    }

    draw(Painter){
        Painter.imgObj(this.img,this.pos[0],this.pos[1]);
    }

    act(){
        
        this.pos[0] += this.v[0];
        this.pos[1] += this.v[1] + this.g/4;
        this.v[0] *= 0.95; this.v[1] *= 0.95;
        this.g += 0.8;
            
    }

};
