window.Scene = function(){
    class Scene {
        constructor(){
            this.elem = [];
            this.size = [800,400];
        }

        add(obj){
            obj.setId(this.elem);
            this.elem.push(obj);
        }
        
        draw(Painter){
            Painter.ellipse(0,0,this.size[0],this.size[1],"rgb(140,140,140)");
            for (let i = 0; i < this.elem.length; i ++){
                this.elem[i].draw(Painter);
            }
        }

        put(n,x,y){
            this.elem[n].position = [x,y];
        }

        act(t,keyBoard){
            for (let i = 0; i < this.elem.length; i++){
                this.elem[i].act(t,keyBoard,this.elem,i);
                if (this.elem[i].touched){
                    
                }
            }
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
                return a.getY() - b.getY();                
            }
            this.elem.sort(compare);
        }
    }

    return new Scene();
}();
