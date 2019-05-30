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

        setKeyBoard(keyBoard){
            this.KeyBoard = keyBoard;
        }
        
        animation(){
            let Scene = this.Scene;
            let Painter = this.Painter;
            let KeyBoard = this.KeyBoard;
            let f = function(t){
                // Partie dessin
                Painter.cleanScreen();
                Scene.draw(Painter);

                // Partie Action
                Scene.act(t,KeyBoard);
                Scene.sort();
                Painter.scroll();
                
                window.requestAnimationFrame(f);
            };
            window.requestAnimationFrame(f);
        }
        

    }

    return new Chef();
}();
