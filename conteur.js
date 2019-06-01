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
            let requestURL = "histoires/" + this.name + "/" + n + ".json";
            let request = new XMLHttpRequest();
            request.open("GET",requestURL);
            request.responseType = 'json';
            request.send();
            let that = this;
            request.onload = function(){
                that.fillIn(request.response);
                that.setUp(Scene);
                doNext();
            };
        }

        fillIn(data){
            this.first = data.first;
            this.mort = data.mort;
            this.pos = data.pos;
            this.dialogues = data.dialogues;
            this.events = data.events;
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
            
        }

        newDialogue(voices,Scene){
            voices[this.dialogues[this.nDia][0]].load(this.nDia,this.step);
            voices[this.dialogues[this.nDia][0]].play();
            let event = this.dialogues[this.nDia][2];
            if (event != undefined){
                event = this.events[event];
                for (let i = 0; i < event.length; i ++){
                    Scene.event(event[i]);
                }
            }
        }
        
        next(voices,Scene){
            if (this.nDia == -1) this.nDia = this.first;
            else this.nDia = this.dialogues[this.nDia][1];
            this.newDialogue(voices,Scene);
        }

        death(voices,Scene){
            this.nDia = this.mort;
            this.newDialogue(voices,Scene);
        }
    };

    return new Conteur();
}();
