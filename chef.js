window.Chef = function(){
    class Chef {
        constructor(){
            this.goOn = false;
            this.soundLag = 3;
            this.curLag = 3;
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

        setConteur(conteur){
            this.Conteur = conteur;
        }

        setVoiceChan(voices,story){
            this.voices = voices;
            this.voices.forEach(
                function(e,i){
                    e.init(story,i);
                }
            );
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

        voicesEnded(){
            for (let i = 0; i < this.voices.length; i++){
                if (this.voices[i].finish == false) return false;
            }
            return true;
        }

        subTitles(){
            for (let i = 0; i < this.voices.length; i++){
                this.voices[i].showSubtitles();
            }
        }
        
        animation(){
            let f = function(t){
                if (this.curLag > 0) this.curLag -= 1;
                // Partie dessin
                this.Painter.cleanScreen();
                this.Scene.draw(Painter);

                // Partie Action
                this.Scene.act(t,KeyBoard);
                this.Scene.sort();
                this.Painter.scroll();

                if (this.Scene.isThereDeath()){
                    this.Conteur.death(this.voices,this.Scene);
                }

                // Partie Son
                this.subTitles();
                if (this.voicesEnded() && this.curLag <= 0){
                    this.curLag = this.soundLag;
                    this.Conteur.next(this.voices,this.Scene);
                }
                
                window.requestAnimationFrame(f.bind(this));
            };
            window.requestAnimationFrame(f.bind(this));
        }
        

    }

    return new Chef();
}();
