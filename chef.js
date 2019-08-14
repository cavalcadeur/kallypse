window.Chef = function(){
    class Chef {
        constructor(){
            this.goOn = false;
            this.soundLag = 3;
            this.curLag = 3;
            this.surImg = 0; // 0 : affichage de la table  1 : écran noir  2 : image
            this.img = new Image();
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

        manageEvent(event){
            for (let i = 0; i < event.length; i ++){
                if (event[i][0] == "changeStep"){
                    // Ca va beaucoup moins bien marcher forcément.
                    this.Conteur.load(event[i][1],Scene,this.newStep.bind(voices,Scene));
                    return;
                }
                else if (event[i][0] == "waitKey"){
                    this.KeyBoard.newStance(1,event[i][1]);
                }
                else if (event[i][0] == "img"){
                    this.img.src = "images/" + event[i][1] + ".png";
                    this.surImg = 1;
                    let that = this;
                    this.img.onload = function(){
                        that.surImg = 2;
                    };
                }
                else if (event[i][0] == "deImg"){
                    this.surImg = 0;
                }
                else if (event[i][0] == "addMain"){
                    this.Scene.addMain(event[i][1],event[i][2]);
                }
                else this.Scene.event(event[i]);
            }
        }

        handleKeyMsg(msg){
            if (msg[0] == "goto"){
                this.Conteur.setStep(msg[1]);
                let evt = this.Conteur.newDialogue(this.voices,this.Scene,this.KeyBoard);
                this.manageEvent(evt);
            }
        }

        draw(){
            this.Painter.cleanScreen();
            if (this.surImg == 0){
                this.Scene.draw(Painter);
            }
            else if (this.surImg == 2){
                this.Painter.imgCoverBottom(this.img);
            }
        }
        
        animation(){
            let f = function(t){
                if (this.curLag > 0) this.curLag -= 1;
                // Partie dessin
                this.draw();

                // Partie Action
                this.Scene.act(t,KeyBoard);
                this.Scene.sort();
                this.Painter.scroll();

                if (this.Scene.isThereDeath()){
                    this.Conteur.death(this.voices,this.Scene);
                }

                let keyMsg = this.KeyBoard.getNews();
                this.handleKeyMsg(keyMsg);
                this.KeyBoard.resetNews();

                // Partie Son
                this.subTitles();
                if (this.voicesEnded() && this.curLag <= 0){
                    this.curLag = this.soundLag;
                    let evt = this.Conteur.next(this.voices,this.Scene,this.KeyBoard);
                    this.manageEvent(evt);
                }
                
                window.requestAnimationFrame(f.bind(this));
            };
            window.requestAnimationFrame(f.bind(this));
        }
        

    }

    return new Chef();
}();
