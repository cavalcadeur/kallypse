window.Painter = function(){

    class Painter {
        constructor(){
            
        }

        init(ctx,W,H,scrollX,scrollY){
            this.ctx = ctx;
            this.W = W; this.H = H;
            this.scrollX = scrollX; this.scrollY = scrollY;
        }

        ellipse(x,y,rX,rY,color){
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.ellipse(x,y,rX,rY,0, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        cleanScreen(){
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0,0,W,H);
        }

        scroll(){
            // Calcul du scroll idéal
            let ideal = [W/2,H/2];
            
        }

    };

    
    return new Painter();
}();
