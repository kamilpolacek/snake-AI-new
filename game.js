//VARIABLES TO CONSIDER
//how often do you skip nodes(or branch depends on position) entirely when creating decision trees?  currently chance for skipping is 6%
//when creating tree what is the chance that node will be function or terminal? currenty 50%
//init population size
//maximal depth of trees


//canvas for player
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//canvas for AI
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

//canvas size
canvas.width = canvas.height = canvas2.width = canvas2.height = 160;

//game variables
snake = new Snake(); // players snake
const size = 20; // size of snake pieces & fruits
const speed = 120; // speed of the game
var commands = 0; // counts commands from keyboard -> only one per interval allowed
var time = 0; // for ending the setInterval
var start = false; // true if player started started
var time2 = 0;

//AI variables, maxMoves??
// bestRUN (147)-> evolutionRepetition - 70, simulationRepetition - 3, populationSize - 2000, maxDepth - 6, pickRange - 4 (1/4), chance for picking function -> 1/2
snake2 = new Snake(); // ais snake
evolutionRepetition = 65; // dont forget to change binary tree
simulationRepetition = 3;
populationSize = 2000; // size of an initial population
maxDepth = 6; //  number of nodes in a tree = 2^maxDepth - 1
ai = new Ai(populationSize, maxDepth, simulationRepetition);
ai.makeInitPopulation(); // init population size && maxDepth of each tree
var AiMoves=0;




ai.runEvolution(evolutionRepetition);


console.log("simulation over");
console.log(ai.population);
//console.log(ai.offsprings);
//ai.runSimulation2();

ai.snake = snake2;
canvas.width = canvas.height = canvas2.width = canvas2.height = 600;

/******** main function for the player ********/
(function setup() {

  //initial logic and game drawing
  snake.move();
  snake.move(); // dealing with snake tail (twice)
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
/******** main function for the AI********/

(function setup() {
  //initial logic and game drawing
  snake2.move();
  snake2.move(); // dealing with snakes tail (twice)

  snake2.chooseRandomPath();
  snake2.move();

  snake2.create(ctx2);
  snake2.pickFruitLocation();
  snake2.createFruit(ctx2);


  time2 = window.setInterval(() => {
      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      if(snake2.eatFruit()){
        snake2.pickFruitLocation();
      }

      snake2.createFruit(ctx2);
      snake2.changeDirection(ai.chooseDirection(0));
      snake2.move();
      snake2.create(ctx2);
      snake2.checkCrash2(time2);
      AiMoves++;
  }, speed/6);
}());

/******** listens for keyboard input ********/
window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');

  if(commands == 0 && (direction == 'Up' || direction == 'Right' || direction == 'Down' || direction == 'Left') ) {
    commands = 1;
    start = true; //
    snake.changeDirection(direction);
    //direction = 'nothiiin'
  }
}));
