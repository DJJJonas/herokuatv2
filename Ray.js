class Ray{
  constructor(player, rayDir, gamemap){    
    this.rayDir = rayDir;
    
    this.deltaX = abs(1/this.rayDir.x);
    this.deltaY = abs(1/this.rayDir.y);
    
    this.wallMapPos = player.mapPos.copy();
    
    if (this.rayDir.x < 0){
      this.distX = (player.pos.x - player.mapPos.x) * this.deltaX;
      this.stepX = -1;
    } else {
      this.distX = (player.mapPos.x +1 - player.pos.x) * this.deltaX;
      this.stepX = +1;
    }
    if (this.rayDir.y < 0){
      this.distY = (player.pos.y - player.mapPos.y) * this.deltaY;
      this.stepY = -1;
    } else {
      this.distY = (player.mapPos.y +1 - player.pos.y) * this.deltaY;
      this.stepY = +1;
    }
    
    this.ddaLineX = this.distX;
    this.ddaLineY = this.distY;
    
    let hit = false;
    
    while(!hit){
      if (this.ddaLineX < this.ddaLineY){
        this.wallMapPos.x += this.stepX;
        this.ddaLineX += this.deltaX;
        this.hitSide = 0;
      } else {
        this.wallMapPos.y += this.stepY;
        this.ddaLineY += this.deltaY;
        this.hitSide = 1;
      }
  
      if (gamemap[this.wallMapPos.y][this.wallMapPos.x] > 0){
        hit = true;
        this.hitCords = createVector(this.wallMapPos.x, this.wallMapPos.y);
        this.hitTile = gamemap[this.wallMapPos.y][this.wallMapPos.x];
      }
      
    }
    
    if (this.hitSide == 0){
      this.perpendicularDist = abs(this.wallMapPos.x - player.pos.x + (1-this.stepX)/2)/this.rayDir.x;
    } else {
      this.perpendicularDist = abs(this.wallMapPos.y - player.pos.y + (1-this.stepY)/2)/this.rayDir.y;
    }
    
  }
}










