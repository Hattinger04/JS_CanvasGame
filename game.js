
var enemys = []

let game = {
    canvas: document.getElementById("field"),
    start () {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        this.interval = setInterval(redraw, 20);
        this.intervalNewEnemy = setInterval(newEnemy, 600);
        let image = new Image();
        image.src = "img/face-cool.png"     
        this.player = new sprite(30, 30, image, 10, 120);
        this.enemies = [];
        this.keyCode = -1; //when there is no key pressed
        window.addEventListener('keydown', (e) =>
        {
            this.keyCode = e.keyCode;
        });

        window.addEventListener('keyup', (e) =>
        {
            this.keyPressed = -1;
        });
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function start() {
    console.log("Game started");
    game.start();

}


function sprite(width, height, image, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.image = image

  ctx = game.context;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)


  this.redraw = function()
  {
    ctx = game.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)  }
}

function redraw() {
  game.clear();
  game.player.x += 1;
  switch (game.keyCode) {
   case 37: //left
       game.player.x -= 2;
      break;
   case 38: //up
       game.player.y -= 1;
      break;
   case 39: //right
        game.player.x += 1;
      break;
   case 40: //down
       game.player.y += 1;
      break;
}

  game.player.redraw();


   game.enemies.forEach((e) => {
       console.log(e)
       let yDelta = Math.floor(Math.random() * 11) - 5;
       e.x -= 1;
       e.y += yDelta;
       e.redraw();
    })

    checkCollision()
}

function checkCollision() {
    
}

function newEnemy()
{
    let y = Math.floor(Math.random()*1024);
    let image = new Image();
    image.src = "img/face-monkey.png" 
    e = new sprite(30, 30, image, 1000, y);
    game.enemies.push(e);

}