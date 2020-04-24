const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const size = 20;
const speed = 150;

const width = canvas.width = 600;
const height = canvas.height = 600;


(function setup() {
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

  time = window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(snake.eatFruit(fruit.x, fruit.y)){
      fruit.pickLocation();
      console.log(fruit.x + " " + fruit.y);
    }
    fruit.create();
    snake.move();
    snake.create();
    //did snake end up in the wall?
    snake.gameOver(time);
    //did snake had some apple?
    //console.log("hi");
  }, speed);
}());

window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));
