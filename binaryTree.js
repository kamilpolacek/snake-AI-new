// how often do you want nodes skipping? 
function BinaryTree () {
  this.root = {
    data : 0, // later, if 0, assigned a function
    leftChild : null,
    rightChild : null,
  };

  this.fitness = 0;
  this.nodeNumber = 0;
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

  this.deepCopyTree = function(aCurrent, bCurrent) {
    
    if(aCurrent.data == 0) {
      aCurrent.data = bCurrent.data;
    }
    let newNode = {
      data : 0,
      leftChild : null,
      rightChild : null
    }

    aCurrent.data = bCurrent.data;

    if(bCurrent.leftChild == null && bCurrent.rightChild == null) 
      return;

    if(bCurrent.leftChild != null && bCurrent.leftChild.data == 1) {
      aCurrent.leftChild = newNode;
      this.deepCopyTree(aCurrent.leftChild, bCurrent.leftChild);
    }

    if(bCurrent.rightChild != null && bCurrent.leftChild.data == 1) {
      aCurrent.rightChild = newNode;
      this.deepCopyTree(aCurrent.rightChild, bCurrent.rightChild);
    }
  }

  this.chooseFunctionOrTerminal = function() {
    let random = Math.round(Math.random()*1);

    if(this.root.data === 0) {
      this.root.data = this.chooseFunction();
    }
    if(random == 1)
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
