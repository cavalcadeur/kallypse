window.Painter = function(){

    class Painter {

        
        
        constructor(){
            this.scrollSpeed = 6;
        }

        init(ctx,W,H,scrollX,scrollY){
            this.ctx = ctx;
            this.W = W; this.H = H;
            this.scrollX = scrollX; this.scrollY = scrollY;
        }

        ellipse(x,y,rX,rY,color){
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.ellipse(x + this.scrollX,y + this.scrollY,rX,rY,0, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        rectangle(x,y,sX,sY,color){
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x + this.scrollX - sX/2,y + this.scrollY - sY/2,sX,sY);
        }

        imgObj(img,x,y){
            this.ctx.drawImage(img,this.scrollX + x - img.width/2,this.scrollY + y - img.height);
        }

        imgObjTrans(img,x,y,trans){
            this.ctx.globalAlpha = trans;
            this.imgObj(img,x,y);
            this.ctx.globalAlpha = 1;
        }
        
        imgObjRot(img,x,y,r){
            this.ctx.save();
            this.ctx.translate(this.scrollX + x,this.scrollY + y - img.height/2);
            this.ctx.rotate(r);
            this.ctx.drawImage(img,-img.width/2,-img.height/2);
            this.ctx.restore();
        }

        cleanScreen(){
            this.ctx.fillStyle = "rgb(38,70,100)";
            this.ctx.fillRect(0,0,W,H);
        }

        scroll(){
            // Calcul du scroll idéal
            let ideal = [W/2,H/2];

            // On approche le scroll de la position idéal
            ideal[0] -= this.scrollX;
            ideal[1] -= this.scrollY;
            let taille = ideal[0]**2 + ideal[1]**2;
            if (taille >= this.scrollSpeed**2){
                taille = this.scrollSpeed / Math.sqrt(taille);
                ideal[0] = ideal[0]*taille;
                ideal[1] = ideal[1]*taille;
                this.scrollX += ideal[0];
                this.scrollY += ideal[1];
            }
        }

    };

    
    return new Painter();
}();
