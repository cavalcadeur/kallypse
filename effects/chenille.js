class EffChenille extends Effect {
    constructor(){
        super();
        this.pos = [[],[],[],[],[]];
        this.dispo = false;
    }

    init(){
        let xy = [(Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500];
        for (let i = 0; i < 5; i ++){
            this.pos[i] = [xy[0],xy[1]];
        }
        this.r = Math.random() * 2 * Math.PI; this.v = 4;
        this.rot = 0;
    }

    draw(Painter){
        for (let i = 0; i < 5; i ++){
            Painter.ellipse(this.pos[i][0],this.pos[i][1],11-i,10-i,"rgb(255,255,255)");
        }
    }

    act(){
        this.pos[0][0] += Math.cos(this.r) * this.v;
        this.pos[0][1] += Math.sin(this.r) * this.v;
        this.rot += (Math.random() - 0.5)/10;
        this.rot = Math.min(Math.max(this.rot,-0.05),0.05);
        this.r += this.rot;
        for (let i = 1; i < 5; i ++){
            this.pos[i][0] = (this.pos[i][0]*11 + this.pos[i-1][0])/12;
            this.pos[i][1] = (this.pos[i][1]*11 + this.pos[i-1][1])/12;
        }
        if (this.pos[0][0] > 1550){
            for (let i = 0; i < 5; i ++){
                this.pos[i][0] = -1500;
            }
        }
        if (this.pos[0][0] < -1550){
            for (let i = 0; i < 5; i ++){
                this.pos[i][0] = 1500;
            }
        }
        if (this.pos[0][1] > 1550){
            for (let i = 0; i < 5; i ++){
                this.pos[i][1] = -1500;
            }
        }
        if (this.pos[0][1] < -1550){
            for (let i = 0; i < 5; i ++){
                this.pos[i][1] = -1500;
            }
        }
    }    
};
