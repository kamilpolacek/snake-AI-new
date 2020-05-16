function Ai(snake, populationSize, maxDepth) {
  this.snake = snake;
  this.population = [];
  this.populationSize = populationSize;
  this.maxDepth = maxDepth;
  //this.currentDirection = 'Up';


  this.runEvolution = function() {

  }

  this.runSimulation = function() {
    this.snake.move();
    this.snake.move(); // dealing with snakes tail (twice)
    this.snake.pickFruitLocation();

  }

  this.chooseDirection = function() {
    this.population[0].root;
  }

  

  this.makeInitPopulation = function() {
    for(let i=0; i<this.populationSize; i++) {
      this.population[i] = new BinaryTree();
      this.population[i].makeRandomTree(this.maxDepth,this.population[i].root);
    }
  }
/******** looking for danger functions -> if one step ahead returns true ********/
  this.dangerUp = function() {
    if(this.snake.y == 0) {
      return true;
    }

    for(let i=0; i<this.snake.tail.length; i++) {
        //console.log(this.snake.y + " " + this.snake.tail[i].y);
        if(this.snake.y - this.snake.size == this.snake.tail[i].y && this.snake.x == this.snake.tail[i].x && this.snake.speedY != this.snake.size)
          return true;
    }

    return false;
  }
  this.dangerRight = function() {
    if(this.snake.x == canvas.width - this.snake.size)
      return true;

    for(let i=0; i<this.snake.tail.length; i++) {
        if(this.snake.x + this.snake.size == this.snake.tail[i].x && this.snake.y == this.snake.tail[i].y && this.snake.speedX != -this.snake.size)
          return true;
      }

    return false;
  }
  this.dangerDown = function() {
    if(this.snake.y == canvas.height - this.snake.size)
      return true;

    for(let i=3; i<this.snake.tail.length; i++) {
        if(this.snake.y + this.snake.size ==  this.snake.tail[i].y && this.snake.x == this.snake.tail[i].x && this.snake.speedY != this.snake.size)
          return true;
      }

    return false;
  }
  this.dangerLeft = function() {
    if(this.snake.x == 0)
      return true;

    for(let i=3; i<this.snake.tail.length; i++) {
        if(this.snake.x - this.snake.size == this.snake.tail[i].x && this.snake.y == this.snake.tail[i].y && this.snake.speedX != -this.snake.size)
          return true;
      }

    return false;
  }
/******** current direction functions -> if match returns true ********/
  this.movingUp = function() {
    if(this.snake.speedY == -this.snake.size)
      return true;
  }
  this.movingRight = function() {
    if(this.snake.speedX == this.snake.size)
      return true;
  }
  this.movingDown = function() {
    if(this.snake.speedY == this.snake.size)
      return true;
  }
  this.movingLeft = function() {
    if(this.snake.speedX == -this.snake.size)
      return true;
  }
/******** returns true if in line with food ********/
  this.fruitUp = function() {
    for(let i=this.snake.y - this.snake.size; i>=0; i-=this.snake.size ) {
      if(this.snake.fruitY == i && this.snake.fruitX == this.snake.x)
        return true;
    }
    return false;
  }
  this.fruitRight = function() {
    for(let i=this.snake.x + this.snake.size; i<=canvas.width-this.snake.size; i+=this.snake.size ) {
      if(this.snake.fruitX == i && this.snake.fruitY == this.snake.y)
        return true;
    }
    return false;
  }
  this.fruitDown = function() {
    for(let i=this.snake.y + this.snake.size; i<=canvas.height-this.snake.size; i+=this.snake.size ) {
      if(this.snake.fruitY == i && this.snake.fruitX == this.snake.x)
        return true;
    }
    return false;
  }
  this.fruitLeft = function() {
    for(let i=this.snake.x - this.snake.size; i>=0; i-=this.snake.size ) {
      if(this.snake.fruitX == i && this.snake.fruitY == this.snake.y)
        return true;
    }
    return false;
  }

}
