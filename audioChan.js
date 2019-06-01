class AudioChan {
    constructor(){
        this.actx = new Audio();
        this.finish = true;
    }

    init(histoire){
        this.story = histoire;
    }

    pause(){
        this.actx.pause();
    }

    end(){
        this.finish = true;
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
        //console.log("voices/" + this.story + "/" + step + "/" + clip + ".ogg");
        this.actx.src = "voices/" + this.story + "/" + step + "/" + clip + ".ogg";
    }

};

