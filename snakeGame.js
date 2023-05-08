const canvas = document.getElementById("snake");
const canvas2d = canvas.getContext("2d");
const start = document.getElementById("startGame");
const replay = document.getElementById("newGame");
let gameEnd = false;
canvas.width = 375;
canvas.height = 375;
var snakeBody = [];
var snakeLength = 1;
var snakeX = 0;
var snakeY = 0;
var directionX = 10;
var directionY = 0;
var dots = [];

//let score = 0

//window.addEventListener("keyup", ev => {
	//if (ev.keyCode === 32) {
	  
	//}
  //});

function drawSnake() {
  canvas2d.clearRect(0, 0, canvas.width, canvas.height);
  canvas2d.fillStyle = "white"; 
  for (var i = 0; i < snakeBody.length; i++) {
    canvas2d.fillRect(snakeBody[i].x, snakeBody[i].y, 20, 20);
  }
}

function drawDots() {
  if(dots.length < 1) {
    var dotX = Math.floor(Math.random() * canvas.width);
    var dotY = Math.floor(Math.random() * canvas.height);
    dots.push({ x: dotX, y: dotY });
  }
  for (var i = 0; i < dots.length; i++) {
    canvas2d.fillStyle = "red";
    canvas2d.fillRect(dots[i].x, dots[i].y, 15, 15);
  }
}

function moveSnake() {
  snakeBody.unshift({ x: snakeX, y: snakeY });
  snakeX += directionX;
  snakeY += directionY;
  while (snakeBody.length > snakeLength) {
    snakeBody.pop();
  }
}


document.onkeydown = function(event) {
switch (event.keyCode) {
  case 37:
    directionX = -10;
    directionY = 0;
    break;
  case 38:
    directionX = 0;
    directionY = -10;
    break;
  case 39:
    directionX = 10;
    directionY = 0;
    break;
  case 40:
    directionX = 0;
    directionY = 10;
    break;
  }
};

function checkBump() {
  for (var i = 0; i < dots.length; i++) {
    if (snakeX < dots[i].x + 10 && 
      snakeX + 10 > dots[i].x && 
      snakeY < dots[i].y + 10 && 
      snakeY + 10 > dots[i].y) {
        snakeLength++;
        dots.splice(i, 1);
    }
  }
  if (snakeX < -10 || 
    snakeY < -10 || 
    snakeX > canvas.width+10 ||
    snakeY > canvas.height+10) {
      gameOver();
  }
  for (var i = 1; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      gameOver();
    }
  }
}

function gameLoop() {
  moveSnake();
  drawSnake();
  drawDots();
  checkBump();
  if(!gameEnd) {
    setTimeout(gameLoop, 100);
  }
}
gameLoop();

function gameOver() {
	alert("Game Over");
	document.querySelector('.newGame').addEventListener('click', function(){
		window.location.reload();
		return false;
	  }); 
  gameEnd = true;
}
