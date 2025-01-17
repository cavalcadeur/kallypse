class Croissant extends Objet{
    constructor(img,taille,pos){
        super(img,taille,pos);
        this.keys = ["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"];
        this.actKey = " ";
        this.speed = 6;
        this.r = 0;
        this.state = 1; // Etat de base : 1  rolling : 2  crushed : 3
        this.vect = [];
        this.n = 0;
        this.nCr = 0; this.sX = 1; this.sY = 1;
        this.vulnerable = true;
        this.touched = false;
        this.oldPos = [0,0];
        this.shadowImg = new Image(); this.shadowImg.src = "images/" + img + "-shadow.png";
    }

    setKeys(newKeys,newActKey){
        this.keys = newKeys;
        if (newActKey != undefined) this.actKey = newActKey;
    }

    draw(Painter){
        //Painter.rectangle(this.position[0],this.position[1],this.size[0],this.size[1],"rgb(0,0,0)");
        if (this.activeBuffer == 0) {
            //Painter.imgObjRotScale(this.img,this.oldPos[0],this.oldPos[1],this.r,this.sX,this.sY);
            Painter.imgObjRotScale(this.img,this.position[0],this.position[1],this.r,this.sX,this.sY);
        }
    }
    
    act(t,KeyBoard,elem,i,sizu){
        this.oldPos[0] = this.position[0]; this.oldPos[1] = this.position[1];
        if (this.activeBuffer > 0) {
            this.activeBuffer -= 1;
            return false;
        }
        
        if (this.state == 1) return this.actNorm(t,KeyBoard,elem,i,sizu);
        else if (this.state == 3) this.actCrush(t,KeyBoard,elem,i);
        else if (this.state == 4) this.actPrep(t,KeyBoard,elem,i);
        else return this.actRoll(t,KeyBoard,elem,i,sizu);
    }

    actNorm(t,KeyBoard,elem,i,sizu){
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
            
            this.vect = [direction[0] * taille * 2.2,direction[1] * taille * 2.2];

            if (KeyBoard.isPressed(this.actKey)){
                this.state = 4;
                this.n = 7;
            }
            
            if (this.bonking(elem,i)){
                this.position[0] -= direction[0] * taille;
                this.position[1] -= direction[1] * taille * 0.5;
                if (this.bonking(elem,i)){
                    this.position[0] += direction[0] * taille;
                    this.position[1] -= direction[1] * taille * 0.5;
                    if (this.bonking(elem,i)) this.position[0] -= direction[0] * taille;
                }
            }
        }
        let elliptoide = (this.position[0] / sizu[0])**2 + (this.position[1] / sizu[1])**2;
        if (elliptoide > 1) return true;
        return false;
    }

    fall(){
        let data = [this.position[0],this.position[1],this.vect[0],this.vect[1],this.img];
        this.position = [0,0];
        this.activeBuffer = 40;
        return data;
    }

    actPrep(t,KeyBoard,elem,i){
        this.n -= 1;
        if (this.n >= 3){
            this.position[0] -= this.vect[0]*0.85;
            this.position[1] -= this.vect[1]*0.85;
            this.sX *= 1.03; this.sY *= 1.03;
        }
        if (this.n <= 0) {
            this.sX = 1; this.sY = 1;
            this.n = 20;
            this.state = 2;
        }
    }
    
    actRoll(t,KeyBoard,elem,i,sizu){
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
            this.vect[0] *= -1.2; this.vect[1] *= -1.2;
            this.state = 3; this.nCr = 0;
        }
        if (this.n <= 0){
            let elliptoide = (this.position[0] / sizu[0])**2 + (this.position[1] / sizu[1])**2;
            if (elliptoide > 1) return true;
            if (KeyBoard.isPressed(this.actKey)){
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
                    
                    this.vect = [direction[0] * taille * 2.2,direction[1] * taille * 2.2];
                    this.state = 2;
                    this.n = 20;
                }
                else{
                    this.n = 0; this.state = 1; this.r = 0;
                }
            }
            else{
                this.n = 0; this.state = 1; this.r = 0;
            }    
        }

    }

    actCrush(t,keyBoard,elem,i){
        let liste = [[-0.15,0.15],[0.15,-0.15],[-0.08,0.08],[0.08,-0.08]];
        let ii = Math.floor(this.nCr/4);
        this.sX += liste[ii][0];
        this.sY += liste[ii][1];
        this.nCr += 1;
        if (this.nCr == 16){
            this.state = 2; this.sX = 1; this.sY = 1;
        }
    }

    hurt(){
        this.touched = true;
    }

    heal(){
        this.touched = false;
    }
    
};
