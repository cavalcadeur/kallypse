class MusicChan {
    constructor(){
        this.music = new Audio();
        this.finish = true;
        this.volume = 0.3;
        this.name = "";
    }

    init(histoire,i){
        this.story = histoire;
        this.id = i;
    }

    pause(){
        this.music.pause();
    }

    end(){
        this.finish = true;
    }
    
    play(){
        this.finish = false;
        this.music.play();
        this.music.loop = true;
        this.music.volume = this.volume;
        this.music.onended =  (event) => {
            this.end();
        };
    }

    stop(){
        this.pause();
        this.end();
    }

    isEnded(){
        if (this.texte[this.clipTexte] == undefined) return this.finish;
        return this.finish && (this.nTexte == this.texte[this.clipTexte].length - 1);
    }

    empty(){}
    
    load(music){
        // On met en place l'audio
        
        if (music != this.name) {
            this.music.src = "musiques/" + this.story + "/" + music + ".mp3";
            this.play();
        }
        this.name = music;
    }

};

