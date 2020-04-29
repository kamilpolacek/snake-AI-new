const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const size = 20; // size of snake pieces
var speed = 150; // speed of the game
var commands = 0; // counts commands from keyboard -> only one per interval allowed
var time = 0; // for ending the setInterval
var start = false; // true if the game started

const width = canvas.width = 600;
const height = canvas.height = 600;

/******** main function for the game ********/
(function setup() {
  snake = new Snake();
  //initial logic and game drawing
  snake.move();
  snake.move(); // dealing with snakes tail (twice)
  snake.create();
  snake.pickFruitLocation();
  snake.createFruit();

  time = window.setInterval(() => {
    if(start) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if(snake.eatFruit()){
        snake.pickFruitLocation();
      }

      snake.createFruit();
      snake.move();
      snake.create();
      snake.checkCrash(time);
    }
  }, speed);
}());
/******** listens for keyboard input ********/
window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');
  start = true;

  if(commands == 0) {
    snake.changeDirection(direction);
    commands++;
  }
}));
