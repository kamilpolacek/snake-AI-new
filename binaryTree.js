// how often do you want skipping? what is more likely function or terminal?
function BinaryTree () {
  this.root = {
    data : 0,
    leftChild : null,
    rightChild : null,
  };

  this.fitness = 0;
  this.nodeNumber = 0;
  this.depth = 0;
  this.nOfNodes = 0;

  this.makeRandomTree = function(maxDepth, current) {
    if(maxDepth == 0) {
      current.data = this.chooseTerminal();
      return;
    }

    if( (Math.round(Math.random()*15)) == 15 && current != this.root) {
      current.data = this.chooseTerminal();
      //console.log("skipped");
      return;
    }

    let newNode1 = {
      data : this.chooseFunctionOrTerminal(),
      leftChild : null,
      rightChild : null
    }
    let newNode2 = {
      data : this.chooseFunctionOrTerminal(),
      leftChild : null,
      rightChild : null
    }
    this.nOfNodes += 2;


    current.leftChild = newNode1;
    current.rightChild = newNode2;
    return this.makeRandomTree(maxDepth-1, current.leftChild) + this.makeRandomTree(maxDepth-1, current.rightChild);


  }

  this.chooseFunctionOrTerminal = function() {
    let random = Math.round(Math.random()*2);
    if(this.root.data === 0) {
      this.root.data = this.chooseFunction();
    }
    if(random == 1 || random == 2)
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
