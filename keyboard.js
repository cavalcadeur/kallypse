window.KeyBoard = function(){
    class KeyBoard {

        constructor(){
            this.key = {};
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
        }

        isPressed(touche){
            return this.key[touche] == 1;
        }
    }

    return new KeyBoard();
}();
