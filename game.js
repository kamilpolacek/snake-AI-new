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
canvas.width = canvas.height = canvas2.width = canvas2.height = 600;

//game variables
snake = new Snake(); // players snake
const size = 20; // size of snake pieces & fruits
const speed = 120; // speed of the game
var commands = 0; // counts commands from keyboard -> only one per interval allowed
var time = 0; // for ending the setInterval
var start = false; // true if player started started
var time2 = 0;
var k=0;
//AI variables
snake2 = new Snake(); // ais snake
EvolutionRepetition = 60;
populationSize = 1000;
maxDepth = 6; //  number of nodes = 2^maxDepth - 1 
ai = new Ai(populationSize, maxDepth); 
ai.makeInitPopulation(); // init population size && maxDepth of each tree
//ai.Evolve();



ai.runEvolution(EvolutionRepetition);
/*for(let i=0; i<3; i++) {
  ai.runSimulation();
}*/

ai.population.sort(ai.sortPopulation);
console.log("simulation over");
console.log(ai.population);
//console.log(ai.offsprings);
//ai.runSimulation2();
ai.snake = snake2;


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
      k++;
  }, speed/3);
}());
console.log("moves " +k);
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
