//canvas for player
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//canvas for AI
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

//canvas size
canvas.width = canvas.height = canvas2.width = canvas2.height = 600;

//game variables
const size = 20; // size of snake pieces & fruits
var speed = 120; // speed of the game
var commands = 0; // counts commands from keyboard -> only one per interval allowed
var time = 0; // for ending the setInterval
var start = false; // true if player started started
var start2 = false; // true if computer started

//AI variables


/******** main function for the player ********/
(function setup() {
  snake = new Snake();



  ai = new Ai();
  bTree = new BinaryTree();
  bTree.makeRandomTree(4, bTree.root);
  console.log(bTree);




  //initial logic and game drawing
  snake.move();
  snake.move(); // dealing with snakes tail (twice)
  snake.create(ctx);
  snake.pickFruitLocation();
  snake.createFruit(ctx);

  time = window.setInterval(() => {
    if(start) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if(snake.eatFruit()){
        snake.pickFruitLocation();
      }

      snake.createFruit(ctx);
      snake.move();
      snake.create(ctx);
      snake.checkCrash(time);
    }
  }, speed);
}());
/******** main function for the UI********/
(function setup() {
  snake2 = new Snake();
  //initial logic and game drawing
  snake2.move();
  snake2.move(); // dealing with snakes tail (twice)
  snake2.create(ctx2);
  snake2.pickFruitLocation();
  snake2.createFruit(ctx2);

  time2 = window.setInterval(() => {
    //snake2.changeDirection(Ai.chooseDirection(),snake2.speedX, snake2.speedY);
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      if(snake2.eatFruit()){
        snake2.pickFruitLocation();
      }

      snake2.createFruit(ctx2);
      snake2.move();
      snake2.create(ctx2);
      snake2.checkCrash(time2);

  }, speed);
}());
/******** listens for keyboard input ********/
window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');
  start = true;

  if(commands == 0 && ( direction == 'Up' || direction == 'Right' || direction == 'Down' || direction == 'Left')) {
    snake.changeDirection(direction);
    snake2.changeDirection(direction);
    commands++;
  }
}));
