class Feux extends Objet{
    constructor(img,taille,pos){
        super(img,taille,pos);
        this.speed = 5;
        this.r = 0;
        this.state = 0; // Etat repos : 0  apparition : 1  missile : 2  disparition : 3  ou  4
        this.vect = [];
        this.n = 0;
        this.fadeTime = 50;
        this.missileTime = 120;
        this.targetDistance = 200; // Distance à la victime
        this.trans = 1;
        this.target = 0;
    }

    activate(target){
        this.state = 3;
        this.target = target;
    }

    deActivate(){
        this.state = 4;
    }

    draw(Painter){
        //Painter.rectangle(this.position[0],this.position[1],this.size[0],this.size[1],"rgb(0,0,0)");
        Painter.imgObjTrans(this.img,this.position[0],this.position[1],this.trans);
    }
    
    act(t,KeyBoard,elem,i){
        if (this.state == 0) this.actNone();
        else if (this.state == 1) this.actFadeIn(t,KeyBoard,elem,i);
        else if (this.state == 3 || this.state == 4) this.actFadeOut(t,KeyBoard,elem,i);
        else this.actMissile(t,KeyBoard,elem,i);
    }

    actNone(){}

    actMissile(t,KeyBoard,elem,i){
        this.n -= 1;
        this.position[0] += this.vect[0];
        this.position[1] += this.vect[1];
        if (this.bonking(elem,i) || this.n <= 0){
            this.n = 0;
            this.position[0] -= this.vect[0];
            this.position[1] -= this.vect[1];
            this.vect[0] *= -0.5;
            this.vect[1] *= -0.5;
            this.state = 3;
        }
    }

    actFadeIn(t,KeyBoard,elem,i){
        this.n += 1;
        this.trans = this.n/this.fadeTime;
        if (this.n >= this.fadeTime){
            this.n = 0;
            let targetPos = this.getTarget(elem).pos();
            this.vect = this.getVectTo(targetPos[0],targetPos[1]);
            this.vect[0] *= this.speed; this.vect[1] *= this.speed;
            this.state = 2;
            this.n = this.missileTime;
        }
    }
    
    actFadeOut(t,KeyBoard,elem,i){
        this.n += 1;
        this.trans = 1 - this.n/this.fadeTime;
        if (this.n >= this.fadeTime){
            this.n = 0;
            if (this.state == 4){
                this.state = 0;
                this.position = [-10000,-10000];
            }
            else {
                this.state = 1;
                let targetPos = this.getTarget(elem).pos();
                this.position = this.getCirclingPos(targetPos[0],targetPos[1]);
            }
        }
    }

    getVectTo(x,y){
        let result = [x - this.position[0],y - this.position[1]];
        let taille = 1/Math.sqrt(result[0]**2 + result[1]**2);
        return [result[0] * taille,result[1] * taille];
    }
    
    getCirclingPos(x,y){
        let theta = Math.random()*6.2;
        let result = [];
        result[0] = x + Math.cos(theta) * this.targetDistance;
        result[1] = y + Math.sin(theta) * this.targetDistance;
        return result;
    }
    
    getTarget(elem){
        for (let i = 0;i < elem.length; i++){
            if (elem[i].getId() == this.target) return elem[i];
        }
    }
    
};
