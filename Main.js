const gamemap = [
  [1,2,3,4,5,1,2,3,4,5,1],
  [1,0,0,0,0,0,0,0,0,0,1],
  [5,0,0,0,0,0,0,0,0,0,2],
  [4,0,0,0,0,0,0,0,0,0,3],
  [3,0,0,0,0,0,0,0,0,0,4],
  [2,0,0,0,0,0,0,0,0,0,5],
  [1,0,0,0,0,0,0,0,0,0,1],
  [5,0,0,0,0,0,0,0,0,0,2],
  [4,0,0,0,0,0,0,0,0,0,3],
  [4,0,0,0,0,0,0,0,0,0,3],
  [1,3,2,1,5,4,3,2,1,5,4]
]

let player;

function setup() {
  createCanvas(900, 600);
  
  player = new Player(createVector(5.5, 5.5), new Camera(createVector(0, -1), createVector(0.66, 0)));
}

function keyPressed() {
  if (keyCode === 32) {
    let ray = new Ray(player, player.camera.dir, gamemap);
    ray.hitCords.add( p5.Vector.mult(player.camera.dir, -1) );
    gamemap[round(ray.hitCords.y)][round(ray.hitCords.x)] = 2;
  }
}

function draw() {
  background(135, 206, 235);
  
  text("Pos: " + player.mapPos.x + ", " + player.mapPos.y, 8, 64);
   // Q
  if (keyIsDown(81)){
    player.move( p5.Vector.div(player.camera.dir.copy().rotate(PI/2), -10 ));
  }// E
  if (keyIsDown(69)){
    player.move( p5.Vector.div(player.camera.dir.copy().rotate(PI/2), 10 ));
  }// W
  if (keyIsDown(87)){
    player.move( p5.Vector.div(player.camera.dir, 10 ));
  }// A
  if (keyIsDown(65)){
    player.rotate(-0.05);
  }// D
  if (keyIsDown(68)){
    player.rotate(0.05);
  }// S
  if (keyIsDown(83)){
    player.move( p5.Vector.div(player.camera.dir, -10 ));
  }
  // Loop
  for (let pixel = 0; pixel < width+1; pixel++){
    const multiplier = 2*(pixel/width) -1;
    const cameraPixel = p5.Vector.mult(player.camera.plane, multiplier);
    
    const rayDir = p5.Vector.add(player.camera.dir, cameraPixel);
    
    let ray;

    try {
      ray = new Ray(player, rayDir, gamemap);
    } catch (error) {
      let instructions = document.getElementsByClassName("instructions")[0];
        let message = createElement('h1', 'Você saiu dos limites! Reinicie a página');
        instructions.appendChild(message);
    }

    let r, g, b;
    
    const tile = ray.hitTile;
    
    switch(tile){
      case 1:
        r=0;g=180;b=0;
        break;
      case 2:
        r=180;g=0;b=0;
        break;
      case 3:
        r=0;g=0;b=180;
        break;
      case 4:
        r=0;g=180;b=180;
        break;
      case 5:
        r=180;g=0;b=180;
        break;
    }
    
    const wallHeight = height/ray.perpendicularDist;
    
    const lineS = height/2 - wallHeight/2;
    const lineE = height/2 + wallHeight/2;
    
    if (ray.hitSide == 0){
      stroke(r, g, b);
    } else {
      stroke(r/2, g/2, b/2);
    }
    
    line(pixel, lineS, pixel, lineE);
  }
  stroke(255);
  circle(width/2-1, height/2-1, 2)
  
}