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

        act(t,keyBoard){
            for (let i = 0; i < this.elem.length; i++){
                this.elem[i].act(t,keyBoard,this.elem,i);
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
