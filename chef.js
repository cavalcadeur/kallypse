window.Chef = function(){
    class Chef {
        constructor(){
            this.goOn = false;
        }

        start(){
            if (this.goOn == false){
                this.goOn = true;
                this.animation();
            }
        }

        stop(){
            this.goOn = false;
        }

        setScene(scene){
            this.Scene = scene;
        }

        setPainter(painter){
            this.Painter = painter;
        }
        
        animation(t){
            Painter.cleanScreen();
            Scene.draw(Painter);
                
            window.requestAnimationFrame(this.animation);
        }
        

    }

    return new Chef();
}();
