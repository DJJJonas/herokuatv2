class Player{
  constructor(pos, camera){
    this.pos = pos;
    this.camera = camera;
    this.mapPos = createVector(floor(this.pos.x), floor(this.pos.y));
  }
  rotate(rad){
    this.camera.dir.rotate(rad);
    this.camera.plane.rotate(rad);
  }
  move(dir){
    this.pos.add(dir);
    this.updatePos();
  }

  updatePos(){
    this.mapPos.x = floor(this.pos.x);
    this.mapPos.y = floor(this.pos.y);
  }
}