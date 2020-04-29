function Snake() {
  this.x = canvas.width / 2;  //initial snake x position
  this.y = canvas.height / 2; //initial snake y position
  this.fruitX = 0; // fruit x position
  this.fruitY = 0; // fruit y position

  this.speedX = 0; // direction of movement ( right(+) / left(-) )
  this.speedY = 0; // direction of movement ( up(-) / down(+) )
  this.tail = []; // array for tail of the snake
  this.total = 0; // total pieces of tail


  this.create = function() {
    ctx.fillStyle = "yellow";
    ctx.font = "20px Georgia";
    ctx.fillText("Score : " + this.total, 500, 30);

    for(let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x,this.tail[i].y, size, size);
    }

    ctx.fillRect(this.x, this.y, size, size);
    commands = 0;
  }

  this.move = function() {
    this.tail[this.total - 1] = { x: this.x, y: this.y };
    this.tail.forEach(function(item, index, array) {
      //console.log(item, index);
    });
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.pickFruitLocation = function() {
    this.fruitX = Math.ceil(Math.random() * (width / size)-1) * size;
    this.fruitY = Math.ceil(Math.random() * (height / size)-1) * size;

    if(this.fruitX == this.x && this.fruitY == this.y) {
      console.log("picking again 1");
      this.pickFruitLocation();
    }

    for(let i=0; i<this.tail.length; i++) {
      if(this.fruitX == this.tail[i].x && this.fruitY == this.tail[i].y) {
        console.log("picking again 2");
        this.pickFruitLocation();
      }
    }
  }

  this.createFruit = function() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.fruitX, this.fruitY, size, size)
  }

  this.changeDirection = function(direction) {
    if(this.wrongDirection(direction)) {
      direction = "ignore :)";
    }

    switch (direction) {
      case 'Up':
        this.speedX = 0;
        this.speedY = -size;
        break;
      case 'Right':
        this.speedX = size;
        this.speedY = 0;
        break;
      case 'Down':
        this.speedX = 0;
        this.speedY = size;
        break;
      case 'Left':
        this.speedX = -size;
        this.speedY = 0;
        break;
    }

  }

  this.wrongDirection = function(direction) {
    if(direction == 'Up' && this.speedY == size && this.speedX == 0) {
      return true;
    }
    if(direction == 'Right' && this.speedY == 0 && this.speedX == -size) {
      return true;
    }
    if(direction == 'Down' && this.speedY == -size && this.speedX == 0) {
      return true;
    }
    if(direction == 'Left' && this.speedY == 0 && this.speedX == size) {
      return true;
    }

    return false;
  }

  this.eatFruit = function() {
    if(this.x == this.fruitX && this.y == this.fruitY) {
      this.total++;
      return true;
    }
    return false;
  }

  this.checkCrash = function() {
    for (let i=0; i<this.tail.length; i++) {
      if (this.tail[i].x == this.x  && this.tail[i].y == this.y)  {
        this.gameOver();
      }
    }

    if (this.x < 0 || this.x == canvas.width) {
      this.gameOver();
    }
    if (this.y < 0 || this.y == canvas.height) {
      this.gameOver();
    }
  }

  this.gameOver = function() {
    document.write("GAME OVER!");
    window.clearInterval(time);
  }



}
