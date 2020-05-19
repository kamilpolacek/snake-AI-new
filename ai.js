function Ai(populationSize, maxDepth) {
  this.snake;
  this.population = [];
  this.populationSize = populationSize;
  this.maxDepth = maxDepth;
  //this.currentDirection = 'Up';


  this.runEvolution = function() {

  }
  this.makeInitPopulation = function() {
    for(let i=0; i<this.populationSize; i++) {
      this.population[i] = new BinaryTree();
      this.population[i].makeRandomTree(this.maxDepth,this.population[i].root);
    }
  }

  this.runSimulation = function() {
    for(let i=0; i<this.populationSize; i++) {
      this.snake = new Snake()
      this.snake.move();
      this.snake.move();
      this.snake.speedX += this.snake.size;
      this.snake.move();
      this.snake.pickFruitLocation();

      let move = 0;
      while(!this.snake.checkCrash()) {
        move++
        this.snake.changeDirection(this.chooseDirection(i));
        this.snake.move();
        if(this.snake.eatFruit()){
          this.snake.pickFruitLocation();
          this.population[i].fitness += 1;
        }
        //console.log("move " + move);
        if(move >= 5000) {
          //console.log("too much steps");
          this.population[i].fitness = 0;
          break;
        }
        this.population[i].fitness += 0.01;

      }

    //  console.log(this.population[i]);
      //console.log("konec " + i );
      this.population[i].fitness = Math.round(parseFloat(this.population[i].fitness)*100)/100;
    }

  }
//returning up,right,down,left
  this.chooseDirection = function(position) {
    let current = this.population[position].root;

    while(true) {
      if(current.data == "Up" || current.data  == "Right" || current.data  == "Down" || current.data  == "Left")
        return  current.data;

      if(this.stringToFunction(current.data))
        current = current.rightChild;
      else
        current = current.leftChild;
    }
  }

  this.chooseDirection2 = function(position) {
    let current = this.population[position].root;

    while(true) {
      console.log( ">>> " +current.data);
      if(current.data == "Up" || current.data  == "Right" || current.data  == "Down" || current.data  == "Left")
        return  current.data;

      if(this.stringToFunction(current.data))
        current = current.rightChild;
      else
        current = current.leftChild;
    }
  }

  this.stringToFunction = function(string) {
    switch(string) {
      case "dangerUp":
        return this.dangerUp();
      case "dangerRight":
        return this.dangerRight();
      case "dangerDown":
        return this.dangerDown();
      case "dangerLeft":
        return this.dangerLeft();
      case "movingUp":
        return this.movingUp();
      case "movingRight":
        return this.movingRight();
      case "movingDown":
        return this.movingDown();
      case "movingLeft":
        return this.movingLeft();
      case "fruitUp":
        return this.fruitUp();
      case "fruitRight":
        return this.fruitRight();
      case "fruitDown":
        return this.fruitDown();
      case "fruitLeft":
        return this.fruitLeft();
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
