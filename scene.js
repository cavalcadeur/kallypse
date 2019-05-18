window.Scene = function(){
    class Scene {
        constructor(){
            this.elem = [];
            this.size = [1500,1000];
        }

        add(obj){
            this.elem.push(obj);
        }
        
        draw(Painter){
            Painter.ellipse(0,0,this.size[0],this.size[1],"rgb(255,255,255)");
            for (let i = 0; i < this.elem.length; i ++){
                this.elem[i].draw(Painter);
            }
        }
    }

    return new Scene();
}();
