//n of simulations
function Ai(populationSize, maxDepth) {
  this.snake;
  this.population = [];
  this.offsprings = [];
  this.populationSize = populationSize;
  this.maxDepth = maxDepth;
  //this.currentDirection = 'Up';

  this.randomN1;
  this.randomN2;


  this.makeInitPopulation = function() {
    for(let i=0; i<this.populationSize; i++) {
      this.population[i] = new BinaryTree();
      this.population[i].makeRandomTree(this.maxDepth,this.population[i].root);
    }
  }

  this.runEvolution = function(n) {
    for(let i=0; i<n; i++) {

      this.cleanFitness();

      for(let j=0; j<3; j++) {
        //console.log("simulation starts");
        this.runSimulation(j+1); // runs simulation of the game assign fitness based on success 
        //console.log("simulation " + j + " of " + i +  " finished" );
      }
      this.population.sort(this.sortPopulation);
      console.log("run -> " + i + " best -> " + this.population[0].fitness);

      this.Evolve();
      //this.mutatePopulation();
      //console.log("crossing population finished");
      if(i == n-1) {
        for(let j=0; j<3; j++) {
          //console.log("simulation starts");
          this.runSimulation(); // runs simulation of the game assign fitness based on success 
          //console.log("simulation " + j + " of " + i +  " finished" );
        }
        this.population.sort(this.sortPopulation);

      }
    }

  }

  
  this.Evolve = function() {
    let range = Math.round(this.populationSize/3);
    let size = 0;
    for(let i=0; i<this.populationSize; i++) {
      // randomly choosing parents from the best 1/3 of the population

      
      this.chooseRandomNumbers(range);

      this.offsprings[size] = new BinaryTree();
 
      let a,b,c;
      a = this.randomBranch(this.randomN1,1); // might be the same number;
      //console.log(a);
      b = this.randomBranch(this.randomN2,2);
      //console.log(b);

      
      let random = Math.round(Math.random()*1);
      //console.log("random " + random);
      
      c = this.switchBranches(a,b,c,random,1);
     
      
      this.population[this.randomN1].deepCopyTree(this.offsprings[size].root, this.population[this.randomN1].root);
      
      this.switchBranches(a,b,c,random,2)
      
      size++;

     

      //this.population[randomP2].deepCopyTree(this.offsprings[this.offsprings.length-1].root, this.population[randomP2].root);
      //this.offsprings[this.offsprings.length-1].nOfNodes = this.population[randomP2].nOfNodes;

    }

   this.establishNewPopulation();



  }


  this.establishNewPopulation = function() {
    //console.log(this.population[0]);
    //console.log(this.offsprings.length);
    // maybe change??
    for(let i=0; i<this.populationSize; i++) { 
      //console.log("hi");
      this.population[i] = this.offsprings[i];
    }
    //console.log(this.population[0]);
  }
  
  this.chooseRandomNumbers = function(range) {
    this.randomN1 = Math.round(Math.random()*range);
    this.randomN2 = Math.round(Math.random()*range);

    if(this.randomN1 == this.randomN2)
      this.chooseRandomNumbers(range);
  }
  this.randomBranch = function(position,branch) {
    let current = this.population[position].root;
    let depth;

    if(branch == 1) 
      depth = Math.round(Math.random()*(this.maxDepth-1));
    if(branch == 2) {
      depth = Math.ceil(Math.random()*(this.maxDepth-1)); 
      //console.log("depth in second branch " +depth );
    }

    for(let i=0; i<depth; i++) {
      let random = Math.round(Math.random()*1);

      if(branch == 1 && (current.leftChild.leftChild == null || current.leftChild.rightChild == null ||
         current.rightChild.leftChild == null || current.rightChild.rightChild == null) ) 
        return current;
      if(branch == 2 && (current.leftChild == null || current.rightChild == null) ) 
        return current;
      
      
      if(random == 1)
        current = current.leftChild;
      if(random == 0)
        current = current.rightChild;

    }

    return current;
  }

  this.switchBranches = function(a, b, c, random, run) {
    if(run == 1) {
      if(random == 0) {
        //console.log("pred:");
        c = a.leftChild;

        //console.log(a.leftChild);

        a.leftChild = b; 
        //console.log(a.leftChild);
        return c;
      }
      if(random == 1) {
        //console.log("pred:");
        c = a.rightChild;
        //console.log(a.rightChild);
 
        a.rightChild = b; 
        //console.log(a.rightChild);
        return c;

      }
    }

    if(run == 2) {
      if(random == 0) {
        //console.log("po:");
        a.leftChild = c;

        //console.log(a.leftChild);

      }
      if(random == 1) {
        //console.log("po:");
        a.rightChild = c;
        
        //console.log(a.rightChild);

      }
    }

  }

  this.cleanFitness = function() {
    for(let i=0; i<this.populationSize; i++) {
      //console.log("sort?");
      this.population[i].fitness = 0;
    }
  }


  this.runSimulation = function(run) {
    for(let i=0; i<this.populationSize; i++) {
     // console.log("hi");
      this.snake = new Snake()
      this.snake.move();
      this.snake.move();
      this.snake.chooseRandomPath();
      this.snake.move();
      this.snake.pickFruitLocation();

      let move = 0;
      while(!this.snake.checkCrash()) {
        move++
        //console.log("move n."+ move);
        this.snake.changeDirection(this.chooseDirection(i));
        this.snake.move();
        if(this.snake.eatFruit()){
          this.snake.pickFruitLocation();
          this.population[i].fitness += 1;
        }
        //console.log("move " + move);
        if(move >= 5000) {
          //console.log("too much steps");
          this.population[i].fitness = -1;
          break;
        }
        this.population[i].fitness += 0.01;

      }

    //  console.log(this.population[i]);
      //console.log("konec " + i );
      this.population[i].fitness = this.population[i].fitness/run;
      this.population[i].fitness = Math.round(parseFloat(this.population[i].fitness)*100)/100;
    }

  }
//going through tree returning up, right, down or left
  this.chooseDirection = function(position) {
    let current = this.population[position].root;
    let count = 0;

    while(true) {
      count++;
      if(current.data == "Up" || current.data  == "Right" || current.data  == "Down" || current.data  == "Left")
        return  current.data;
      
      //if current.data doesnt 
      if(current.rightChild == null | current.leftChild == null || count >= 5000)
        return "nothing :)"

      if(this.stringToFunction(current.data))
        current = current.rightChild;
      else
        current = current.leftChild;
    }
  }

  this.chooseDirection2 = function(position) {
    let current = this.population[position].root;

    while(true) {
      //console.log( ">>> " +current.data);
      if(current.data == "Up" || current.data  == "Right" || current.data  == "Down" || current.data  == "Left")
        return  current.data;

      if(this.stringToFunction(current.data))
        current = current.rightChild;
      else
        current = current.leftChild;
    }
  }

  this.sortPopulation = function(a,b) {
    if(a.fitness < b.fitness)
      return 1;
    else if(a.fitness > b.fitness)
      return -1;
    else
      return 0;
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
