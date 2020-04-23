const game = document.getElementById('game');
const ctx = game.getContext('2d');

const size = 20;





(function setup() {
  snake = new Snake();
  snake.draw();
  const timer = window.setInterval(() => {
    ctx.clearRect(0, 0, game.width, game.height);
    snake.move();
    console.log("hi");
  }, 50);
}());

window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));
