window.Scene = function(){
    class Scene {
        constructor(){
            this.elem = [];
            this.size = [800,400];
            this.mains = [];
            this.mainSpeed = 6;
            
            this.backEffects = [];
            this.effects = [];
            this.frontEffects = [];
            for (let i = 0; i < 10; i ++){
                if (i < 4) {
                    this.backEffects[i] = new EffChenille();
                    this.backEffects[i].init();
                    this.frontEffects[i] = new EffChenille();
                    this.frontEffects[i].init();
                }
                else{
                    this.backEffects[i] = new Effect();
                    this.frontEffects[i] = new Effect();
                }
            }
        }

        add(obj){
            obj.setId(this.elem);
            this.elem.push(obj);
        }
        
        draw(Painter){  
            for (let i = 0; i < this.backEffects.length; i ++){
                this.backEffects[i].draw(Painter);
            }   
            Painter.ellipse(0,0,this.size[0],this.size[1],"rgb(140,140,140)");
            for (let i = 0; i < this.elem.length; i ++){
                this.elem[i].draw(Painter);
            }
            for (let i = 0; i < this.frontEffects.length; i ++){
                this.frontEffects[i].draw(Painter);
            } 
        }

        put(n,x,y){
            this.elem[n].position = [x,y];
        }

        act(t,keyBoard){
            // Faire agir ici les mains.
            let result = [0,0];
            for (let i = 0; i < this.mains.length; i ++){
                if (this.mains[i].length > 0){
                    let num = this.getById(this.mains[i][0][0]);
                    if (this.mains[i][0][3] == undefined){
                        let pos = this.elem[num].pos();
                        this.mains[i][0][3] = pos[0]; this.mains[i][0][4] = pos[1];
                        this.mains[i][0][5] = 0;
                        let dist = Math.hypot(pos[0] - this.mains[i][0][1],pos[1] - this.mains[i][0][2]);
                        this.mains[i][0][6] = 100 * this.mainSpeed / dist;
                    }
                    else{
                        this.mains[i][0][5] += this.mains[i][0][6];
                        if (this.mains[i][0][5] > 100) this.mains[i][0][5] = 100;
                        let pos = [
                            this.mains[i][0][3] + (this.mains[i][0][1] - this.mains[i][0][3]) * 0.01 * this.mains[i][0][5],
                            this.mains[i][0][4] + (this.mains[i][0][2] - this.mains[i][0][4]) * 0.01 * this.mains[i][0][5]
                        ];
                        this.elem[num].goTo(pos);

                        if (this.mains[i][0][5] == 100){
                            this.mains[i].shift();
                        }
                    }
                }
            }
            
            let fallOff;
            for (let i = 0; i < this.elem.length; i++){
                fallOff = this.elem[i].act(t,keyBoard,this.elem,i,this.size);
                if (this.elem[i].id == 0) result = this.elem[i].position;
                if (fallOff) this.makeFall(i);
            }
            
            for (let i = 0; i < this.backEffects.length; i ++){
                this.backEffects[i].act();
            }
            for (let i = 0; i < this.frontEffects.length; i ++){
                this.frontEffects[i].act();
            }  
            
            return result;
        }

        makeFall(i){
            let data = this.elem[i].fall();
            let back;
            if (data[1] < 0) back = true;
            else back = false;
            this.addEffect(new EffFall(data),back);
        }

        addEffect(obj,back){
            let liste;
            if (back) liste = this.backEffects;
            else liste = this.frontEffects;
            let indice = 6;
            for (let i = 0; i < liste.length; i ++){
                if (liste[i].dispo) indice = i;
            }
            liste[indice] = obj;
            
        }

        addMain(mains){
            for (let i = 0; i < mains.length; i ++){
                if (this.mains[i] == undefined) this.mains[i] = mains[i];
                else {
                    for (let j = 0; j < mains[i].length; j ++){
                        this.mains[i].push(mains[i][j]);
                    }
                }
            }
        }

        getById(id){
            for (let i = 0; i < this.elem.length; i ++){
                if (this.elem[i].getId() == id) return i;
            }
            return undefined;
        }
        
        event(evt){
            if (evt[0] == "activate" || evt[0] == "deactivate"){
                for (let i = 0; i < this.elem.length; i ++){
                    if (this.elem[i].getId() == evt[1]) {
                        if (evt[0] == "activate") this.elem[i].activate(evt[2]);
                        else this.elem[i].deActivate();
                    }
                }
            }
            else if (evt[0] == "modeFuite"){
                this.elem[this.getById(evt[1])].switchTo("fuite",evt[2]);
            }
        }

        isThereDeath(){
            for (let i = 0; i < this.elem.length; i ++){
                if (this.elem[i].vulnerable){
                    if (this.elem[i].touched){
                        this.elem[i].heal();
                        return true;
                    }
                }
            }
            return false;
        }

        setUp(pos){
            let iddi;
            for (let i = 0; i < this.elem.length; i ++){
                iddi = this.elem[i].getId();
                if (pos[iddi] != undefined){
                    this.elem[i].goTo(pos[iddi]);
                }
            }
        }
        
        getElem(n){
            if (n == undefined) return elem;
            else return elem[n];
        }

        sort(){
            function compare(a,b){
                return a.position[1] - b.position[1];                
            }
            this.elem.sort(compare);
        }
    }

    return new Scene();
}();
