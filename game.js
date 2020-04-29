const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const size = 20;
var speed = 150;
var total = 0;
var commands = 0;
var time = 0;


const width = canvas.width = 600;
const height = canvas.height = 600;


(function setup() {
  snake = new Snake();


  snake.pickFruitLocation();

  time = window.setInterval(() => {
    //console.log("hii");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(snake.eatFruit()){
      snake.pickFruitLocation();
    }
    snake.createFruit();
    snake.move();
    snake.create();
    //did snake hit something?
    snake.checkCrash(time);
    //did snake had some apple?
    //console.log("hi");
  }, speed);
}());

window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');

  if(commands == 0) {
    snake.changeDirection(direction);
    commands++;
  }
}));
