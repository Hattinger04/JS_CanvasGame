
var enemys = []

let game = {
    canvas: document.getElementById("field"),
    start () {
        console.log(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.clear();
        this.interval = setInterval(redraw, 20);
        this.intervalNewEnemy = setInterval(newEnemy, 600);
        this.intervalNewBonusstone = setInterval(newBonusstone, 2500);
        this.intervalTime = setInterval(updateTime, 1000); 
        this.time = 0;
        this.score = 0;
        let image = new Image();
        image.src = "img/face-cool.png"; 
        this.player = new sprite(30, 30, image, 10, 120);
        this.enemies = [];
        this.bonusstones = []; 
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
    },
    runAgain() {
        clearInterval(this.interval); 
        clearInterval(this.intervalNewEnemy); 
        clearInterval(this.intervalNewBonusstone); 
        clearInterval(this.intervalTime); 
        game.start();
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
  this.image = image;

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
   if(game.player.x > game.canvas.width - 30) {
        game.player.x = game.canvas.width - 30; 
   } else if(game.player.x < 0) {
        game.player.x = 0; 
   }
   if(game.player.y > game.canvas.height - 30) {
        game.player.y = game.canvas.height - 30;
   } else if(game.player.y < 0) {
        game.player.y = 0; 
   }

  game.player.redraw();


   game.enemies.forEach((e) => {
       let yDelta = Math.floor(Math.random() * 11) - 5;
       e.x -= 1;
       e.y += yDelta;
       e.redraw();
    })

    game.bonusstones.forEach((e) => {
        let yDelta = Math.floor(Math.random() * 11) - 5;
        e.x -= 1;
        e.y += yDelta;
        e.redraw();
    })

    checkCollision();
    drawScore();
    drawTime(); 
}

function checkCollision() {
    distance = 15; 
    game.bonusstones.forEach((e) => {
        if(Math.abs(game.player.x - e.x) < distance && Math.abs(game.player.y - e.y) < distance) {
            game.bonusstones.splice(game.bonusstones.indexOf(e), 1); 
            game.score += 5; 
        }
    }); 
    game.enemies.forEach((e) => {
        if(Math.abs(game.player.x - e.x) < distance && Math.abs(game.player.y - e.y) < distance) {
            game.runAgain(); 
        }
    }); 
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.strokeText("Score: " + game.score, 50, 50); 
}

function drawTime() {
    ctx.font = "20px Arial";
    ctx.strokeText("Time: " + game.time, 150, 50); 
}


function newEnemy()
{
    let y = Math.floor(Math.random()*1024);
    let image = new Image();
    image.src = "img/face-devilish.png" 
    e = new sprite(30, 30, image, 1000, y);
    game.enemies.push(e);

}

function newBonusstone()
{
    let y = Math.floor(Math.random()*1024);
    let image = new Image();
    image.src = "img/face-monkey.png" 
    e = new sprite(30, 30, image, 1000, y);
    game.bonusstones.push(e);
}

function updateTime() {
    game.time += 1;  
    game.score += 1;  
}