// how often do you want skipping? what is more likely function or terminal?

function BinaryTree () {
  //since i have to define root, functions are declared already at the top (might be even good idea generally for commenting)
  this.chooseTerminal = function() {};
  this.chooseFunction = function() {};
  this.chooseFunctionOrTerminal = function() {};

  this.root = {
    nodeNumber : 0,
    data : this.chooseTerminal(),
    leftChild : null,
    rightChild : null,
  };

  this.fitness = 0;
  this.nodeNumber = 0;
  this.depth = 0;

  this.makeRandomTree = function(maxDepth, current) {
    if(maxDepth == 0) {
      current.data = this.chooseTerminal();
      return;
    }

    if( (Math.round(Math.random()*10)) == 10 && this.current != this.root) {
      console.log("skipped");
      return;
    }

    this.nodeNumber++;
    let newNode1 = {
      nodeNumber : this.nodeNumber,
      data : this.chooseFunctionOrTerminal(),
      leftChild : null,
      rightChild : null
    }
    this.nodeNumber++;
    let newNode2 = {
      nodeNumber : this.nodeNumber,
      data : this.chooseFunctionOrTerminal(),
      leftChild : null,
      rightChild : null
    }


    current.leftChild = newNode1;
    current.rightChild = newNode2;
    return this.makeRandomTree(maxDepth-1, current.leftChild) + this.makeRandomTree(maxDepth-1, current.rightChild);


  }

  this.chooseFunctionOrTerminal = function() {
    if((Math.round(Math.random()*1)) == 1)
      return this.chooseFunction();
    else {
      return this.chooseTerminal();
    }

  }

  this.chooseFunction = function() {
    functions = ['dangerUp', 'dangerRight', 'dangerDown', 'dangerLeft',
                  'movingUp', 'movingRight', 'movingDown', 'movingLeft',
                    'fruitUp', 'fruitRight', 'fruitDown', 'fruitLeft' ]
    return functions[Math.round(Math.random()*11)];
  }

  this.chooseTerminal = function() {
    terminals = ['Up', 'Right', 'Down', 'Left'];
    return terminals[Math.round(Math.random()*3)]
  }




  }
