window.KeyBoard = function(){
    class KeyBoard {

        constructor(){
            this.key = {};
            this.stance = 0; this.dest = 0; this.news = [];
        }

        init(){
            document.addEventListener("keydown",this.keyDown.bind(this));
            document.addEventListener("keyup",this.keyUp.bind(this));
        }

        keyDown(evt){
            this.key[evt.key] = 1;
            
        }
        
        keyUp(evt){
            this.key[evt.key] = 0;
            if (this.stance == 1) {
                this.news = ["goto",this.dest];
                this.stance = 0;
            }
        }

        newStance(stc,destination){
            this.stance = stc;
            this.dest = destination;
        }

        getNews(){
            return this.news;
        }

        resetNews(){
            this.news = [];
        }
        
        isPressed(touche){
            return this.key[touche] == 1 && this.stance == 2;
        }
    }

    return new KeyBoard();
}();
