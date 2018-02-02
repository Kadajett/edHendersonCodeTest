var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = 1500,
    height = 400, //increase if you want to view on fullscreen
    colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'],
    fireworks = [],
    count = 50;//increase if you want it's fun

canvas.width = width;
canvas.height = height;

//firework object x y location, and expHeight is the height it explodes at
var Firework = function () {
  this.x = Math.random()*width;
  this.y = height;
  this.expHeight = Math.random() * (height/2 - height/8) + height/8;
  this.trailLength = Math.random() * (40 - 10) + 10;
  this.exploded = false;
  this.color = colors[Math.floor(Math.random() * colors.length)];
};

//resets the object instead of creating new ones (thanks rlemon)
Firework.prototype.reset = function() {
  this.x = Math.random()*width;
  this.y = height;
  this.expHeight = Math.random() * (height/2 - height/8) + height/8;
  this.trailLength = Math.random() * (40 - 10) + 10;
  this.exploded = false;
  this.color = colors[Math.floor(Math.random() * 5)];
};

//increases height of firework
Firework.prototype.update = function(){

   //if it's lower to the ground, it speeds up slower
   this.y -= 2*height/(height+this.y);
};

//draws firework
Firework.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x, this.y - this.trailLength);
  ctx.stroke();
};

//draws explosion and console logs boom
Firework.prototype.explode = function () {
  //Lets be honest there's probably a much better way to do this part
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x, this.y + this.trailLength);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x - this.trailLength, this.y + this.trailLength);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x - this.trailLength, this.y);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x - this.trailLength, this.y - this.trailLength);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x, this.y - this.trailLength);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.trailLength, this.y - this.trailLength);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.trailLength, this.y);
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.trailLength, this.y + this.trailLength);
  ctx.stroke();
  console.log('boom');
  this.exploded = true;

  var that = this;
   setTimeout(function() {
      that.reset();
   }, Math.random() * 1000);
};



var firework1 = new Firework();

//starts the whole thing
function launch () {
  //fill fireworks pool
  for (i = 0; i < count; i++){
    fireworks[i] = new Firework();
  }

  draw();
  update();
}

//loops through each firework and draws it
function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //loop through all fireworks
  for (i = 0; i < count; i++){
    if(fireworks[i].exploded){
      continue;
    }
    if(fireworks[i].y - fireworks[i].trailLength < fireworks[i].expHeight){
      fireworks[i].explode();
    } else {
      fireworks[i].draw();
      fireworks[i].update();
    }
  }
}

//updates the heights of the fireworks
function update() {
  //loop through fireworks and update them
  for (i = 0; i < count; i++){
    //just for safety, when the firework explodes it should reset itself
    if(fireworks[i].exploded){
      continue;
    }
    fireworks[i].updateHeight();
  }
  setTimeout(update, 1000);
}


launch();
