class AudioChan {
    constructor(){
        this.actx = new Audio();
        this.finish = true; this.story;
        this.step = -1;
        this.clip = -1;
        this.texte = [];
        this.clipTexte = -1;
        this.nTexte = 0;
        this.id = -1;
        this.currentTime = 0;
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

    showSubtitles(t){
        if (this.finish){
            this.currentTime += t/1000;
        }
        else{
            this.currentTime = this.actx.currentTime;
        }
        if (this.texte[this.clipTexte] == undefined) return;
        if ((this.nTexte + 1 < this.texte[this.clipTexte].length && this.currentTime >= this.texte[this.clipTexte][this.nTexte + 1][0])) {
            this.nTexte += 1;
        }
        let elem = document.getElementById("alert" + this.id);
        elem.innerHTML = this.texte[this.clipTexte][this.nTexte][1];
    }
    
    play(){
        this.finish = false;
        this.actx.play();
        this.actx.onended =  (event) => {
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
    
    load(clip,step,clipTexte){
        // On met en place l'audio
        this.actx.src = "voices/" + this.story + "/" + step + "/" + clip + ".ogg";
        // On prépare les sous-titres.
        this.nTexte = 0;
        this.clip = clip;
        this.clipTexte = clipTexte;
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

