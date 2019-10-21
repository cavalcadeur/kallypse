window.Painter = function(){

    class Painter {

        
        
        constructor(){
            this.scrollSpeed = 6; this.vscr = 0;
            this.goalX; this.goalY; this.dist;
            this.maxX = 400; this.minX = -400;
            this.maxY = 700; this.minY = -150;
        }

        init(ctx,W,H,scrollX,scrollY){
            this.ctx = ctx;
            this.W = W; this.H = H;
            this.maxX += W/2; this.minX += W/2;
            this.maxY += H/2; this.minY += H/2;
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

        imgTable(img,x,y,sX,sY){
            this.ctx.drawImage(img,this.scrollX + x - sX,this.scrollY + y - sY);
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
        
        backScreen(){
            this.ctx.fillStyle = "rgb(72,65,222)";
            this.ctx.fillRect(0,0,W,H);
            this.ctx.fillStyle = "rgb(194,111,17)";
            this.ctx.fillRect(0,H/2 - 550 + this.scrollY,W,H/2 + 550 + this.scrollY);
        }

        scroll(x,y){
            // Calcul du scroll idéal
            this.goalX = W/2 - 3*x/4;
            this.goalX = Math.max(Math.min(this.goalX,this.maxX),this.minX);
            this.goalY =  H/2 - 3*y/4;
            this.goalY = Math.max(Math.min(this.goalY,this.maxY),this.minY);
            
            this.dist = Math.hypot(this.goalX - this.scrollX,this.goalY - this.scrollY);

            const lscr = this.dist/70;
            if (this.dist <= 11) {this.vscr = 0; return;}
            if (this.vscr < lscr) this.vscr += 0.5;
            else if (this.vscr > lscr + 0.5) this.vscr -= 0.5;
            const dscrX = (this.goalX - this.scrollX)/this.dist;
            const dscrY = (this.goalY - this.scrollY)/this.dist;
            this.scrollX += this.vscr * dscrX;
            this.scrollY += this.vscr * dscrY;
        }

    };

    
    return new Painter();
}();
