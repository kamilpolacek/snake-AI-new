function BinaryTree () {
  this.root = {
    data : 0, // later, if 0, assigned a function (root recognition)
    leftChild : null,
    rightChild : null,
  };

  this.fitness = 0;
  this.depth = 0;
  this.nOfNodes = 1;


  this.makeRandomTree = function(maxDepth, current) {
    if(maxDepth == 1) {
      current.data = this.chooseTerminal();
      return;
    }

    if(current.data == 'Up' || current.data == 'Right' || current.data == 'Down' || current.data == 'Left' ) {
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

  this.deepCopyTree = function(aCurrent, bCurrent) {

    let newNode = {
      data : 0,
      leftChild : null,
      rightChild : null
    }

    aCurrent.data = bCurrent.data;

    if(bCurrent.leftChild == null && bCurrent.rightChild == null)
      return;

    if(bCurrent.leftChild != null) {
      aCurrent.leftChild = newNode;
      this.deepCopyTree(aCurrent.leftChild, bCurrent.leftChild);
    }

    newNode = {
      data : 0,
      leftChild : null,
      rightChild : null
    }

    if(bCurrent.rightChild != null) {
      aCurrent.rightChild = newNode;
      this.deepCopyTree(aCurrent.rightChild, bCurrent.rightChild);
    }


  }

  this.chooseFunctionOrTerminal = function() {
    let random = Math.round(Math.random()*1);

    if(this.root.data === 0) {
      this.root.data = this.chooseFunction();
    }
    if(random > 0)
      return this.chooseTerminal();
    else {
      return this.chooseFunction();
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
