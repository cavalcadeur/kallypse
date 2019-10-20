window.Conteur = function(){
    class Conteur {
        constructor(){
            this.nDia = -1;
            this.step = -1;
        }

        init(name,Scene,doNext){
            this.name = name;
            let requestURL = "histoires/" + this.name + "/init.json";
            let request = new XMLHttpRequest();
            request.open("GET",requestURL);
            request.responseType = 'json';
            request.send();
            let that = this;
            request.onload = function(){
                that.objSet = request.response;
                that.createObj(Scene);
                doNext();
            };
        }

        load(n,Scene,doNext){  // Charge en mémoire l'étape n de l'histoire
            this.step = n;
            console.log(this.step);
            let requestURL = "histoires/" + this.name + "/" + n + ".json";
            let request = new XMLHttpRequest();
            request.open("GET",requestURL);
            request.responseType = 'json';
            request.send();
            let that = this;
            request.onload = function(){
                that.fillIn(request.response);
                //that.setUp(Scene);
                doNext();
            };
        }

        fillIn(data){
            this.first = data.first;
            this.mort = data.mort;
            this.pos = data.position;
            this.dialogues = data.dialogues;
            this.events = data.events;
            this.nDia = -1;
        }

        createObj(Scene){
            let obj;
            for (let i = 0; i < this.objSet.length; i ++){
                if (this.objSet[i][0] == "Croissant") {
                    obj = new Croissant(this.objSet[i][1],this.objSet[i][2],this.objSet[i][3]);
                }
                else if (this.objSet[i][0] == "Feux") {
                    obj = new Feux(this.objSet[i][1],this.objSet[i][2],this.objSet[i][3]);
                }
                else {
                    obj = new Objet(this.objSet[i][1],this.objSet[i][2],this.objSet[i][3]);
                }
                Scene.add(obj);
            }
        }

        setUp(Scene){
            Scene.setUp(this.pos);
        }

        newDialogue(voices,Scene,KeyBoard){
            let event = this.dialogues[this.nDia][3];
            if (event != undefined) event = this.events[event];
            else event = [];
            for (let i = 0; i < voices.length; i ++){
                voices[i].stop();
            }
            voices[this.dialogues[this.nDia][0]].load(this.nDia,this.step,this.dialogues[this.nDia][1]);
            voices[this.dialogues[this.nDia][0]].play();
            return event;
        }

        newStep(voices,Scene){
            this.nDia = this.first;
            voices[this.dialogues[this.nDia][0]].load(this.nDia,this.step);
            voices[this.dialogues[this.nDia][0]].play();
        }

        setStep(n){
            this.nDia = n;
        }
        
        next(voices,Scene,KeyBoard){
            if (this.nDia == -1) this.nDia = this.first;
            else this.nDia = this.dialogues[this.nDia][2];
            return this.newDialogue(voices,Scene,KeyBoard);
        }

        death(voices,Scene){
            this.nDia = this.mort;
            this.newDialogue(voices,Scene);
        }
    };

    return new Conteur();
}();
