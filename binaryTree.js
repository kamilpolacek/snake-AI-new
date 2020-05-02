function BinaryTree () {
  this.root = null;

  this.insertNode = function(data) {
    let newNode = {
      data : data,
      leftChild : null,
      rightChild : null
    }
    let currentNode, parentNode;

    if(this.root === null) {
      this.root = newNode;
      this.root.data = data;
      return;
    }
    else {
      currentNode = this.root;
      parentNode = null;

      while(1) {
        parentNode = currentNode;

        if(data < parentNode.data) {
          currentNode = currentNode.leftChild;

          if(currentNode === null) {
            parentNode.leftChild = newNode;
            return;
          }
        }
        else {
          currentNode = currentNode.rightChild;

          if(currentNode === null) {
            parentNode.rightChild = newNode;
            return;
          }
        }
      }
    }
  }

  this.growTree = function(depth) {
    
  }

}
