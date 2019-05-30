class Croissant extends Objet{
    constructor(img,taille,pos){
        super(img,taille,pos);
        this.keys = ["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];
        this.actKey = " ";
        this.speed = 5;
        this.r = 0;
        this.state = 1; // Etat de base : 1  rolling : 2
        this.vect = [];
        this.n = 0;
    }

    setKeys(newKeys,newActKey){
        this.keys = newKeys;
        if (newActKey != undefined) this.actKey = newActKey;
    }

    draw(Painter){
        //Painter.rectangle(this.position[0],this.position[1],this.size[0],this.size[1],"rgb(0,0,0)");
        Painter.imgObjRot(this.img,this.position[0],this.position[1],this.r);
    }
    
    act(t,KeyBoard,elem,i){
        if (this.state == 1) this.actNorm(t,KeyBoard,elem,i);
        else this.actRoll(t,KeyBoard,elem,i);
    }

    actNorm(t,KeyBoard,elem,i){
        let direction = [0,0];  
        this.vect = [0,0];
        for (let i = 0; i < this.keys.length; i ++){
            if (KeyBoard.isPressed(this.keys[i])){
                direction[0] += vecteurs[i][0];   
                direction[1] += vecteurs[i][1];             
            }
        }
        let taille = direction[0]**2 + direction[1]**2;
        if (taille != 0){
            taille = this.speed / Math.sqrt(taille);
            
            this.position[0] += direction[0] * taille;
            this.position[1] += direction[1] * taille;
            
            this.vect = [direction[0] * taille * 2,direction[1] * taille * 2];

            if (KeyBoard.isPressed(this.actKey)){
                this.state = 2;
                this.n = 20;
            }
            
            if (this.bonking(elem,i)){
                this.position[0] -= direction[0] * taille;
                this.position[1] -= direction[1] * taille;
            }
        }
    }

    actRoll(t,KeyBoard,elem,i){
        this.n -= 1;
        let taille = this.vect[0]**2 + this.vect[1]**2;
        let rotSpeed = 0.02*taille/Math.PI;
        if (this.vect[0] < 0) rotSpeed *= -1;
        this.r += rotSpeed;
        this.position[0] += this.vect[0];
        this.position[1] += this.vect[1];

        if (this.bonking(elem,i)){
            this.position[0] -= this.vect[0];
            this.position[1] -= this.vect[1];
            this.vect[0] *= -1.1; this.vect[1] *= -1.1;            
        }
        if (this.n <= 0){
            this.n = 0; this.state = 1; this.r = 0;
        }

    }
    
};
