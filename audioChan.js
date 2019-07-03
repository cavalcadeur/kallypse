class AudioChan {
    constructor(){
        this.actx = new Audio();
        this.finish = true; this.story;
        this.step = -1;
        this.clip = -1;
        this.texte = [];
        this.nTexte = 0;
        this.id = -1;
    }

    init(histoire,i){
        this.story = histoire;
        this.id = i;
    }

    pause(){
        this.actx.pause();
    }

    end(){
        this.finish = true;
    }

    showSubtitles(){
        if (this.texte[this.clip] == undefined) return;
        let t = this.actx.currentTime;
        if ((this.nTexte + 1 < this.texte[this.clip].length && this.actx.currentTime >= this.texte[this.clip][this.nTexte + 1][0])) {
            this.nTexte += 1;
        }
        let elem = document.getElementById("alert" + this.id);
        elem.innerHTML = this.texte[this.clip][this.nTexte][1];
        
    }
    
    play(){
        this.finish = false;
        this.actx.play();
        this.actx.onended =  (event) => {
            this.end();
        };
    }

    empty(){}
    
    load(clip,step){
        // On met en place l'audio
        this.actx.src = "voices/" + this.story + "/" + step + "/" + clip + ".ogg";
        // On prépare les sous-titres.
        this.nTexte = 0;
        this.clip = clip;
        if (this.step != step){
            this.step = step;
            let requestURL = "textes/" + this.story + "/" + step + "-" + this.id + ".json";
            let request = new XMLHttpRequest();
            request.open("GET",requestURL);
            request.responseType = 'json';
            request.send();
            let that = this;
            request.onload = function(){
                that.texte = request.response;
                console.log(request.response);
            };
        }
    }

};

