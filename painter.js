window.Painter = function(){

    class Painter {

        
        
        constructor(){
            this.scrollSpeed = 6; this.vscr = 0;
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

        imgObjRotScale(img,x,y,r,sx,sy){
            this.ctx.save();
            this.ctx.translate(this.scrollX + x,this.scrollY + y - img.height/2);
            this.ctx.scale(sx,sy);
            this.ctx.rotate(r);
            this.ctx.drawImage(img,-img.width/2,-img.height/2);
            this.ctx.restore();
        }

        imgCover(img){
            this.ctx.drawImage(img,0,0,W,H)
        }

        imgCoverBottom(img){
            let x = img.width; let y = img.height;
            let newY = (y/x)*W
            this.ctx.drawImage(img,0,H-newY,W,newY);
        }
        
        cleanScreen(){
            this.ctx.fillStyle = "rgb(38,70,100)";
            this.ctx.fillRect(0,0,W,H);
        }

        scroll(x,y){
            // Calcul du scroll idéal
            let goalX = W/2 - 3*x/4;
            let goalY =  H/2 - 3*y/4;
            let dist = Math.hypot(goalX - this.scrollX,goalY - this.scrollY);

            let lscr = dist/70;
            if (dist <= 11) {this.vscr = 0; return;}
            if (this.vscr < lscr) this.vscr += 0.5;
            else if (this.vscr > lscr + 0.5) this.vscr -= 0.5;
            let dscrX = (goalX - this.scrollX)/dist;
            let dscrY = (goalY - this.scrollY)/dist;
            this.scrollX += this.vscr * dscrX;
            this.scrollY += this.vscr * dscrY;
        }

    };

    
    return new Painter();
}();
