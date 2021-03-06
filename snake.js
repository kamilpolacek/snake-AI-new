function Snake() {
  this.x = canvas.width / 2;  //initial snake x position
  this.y = canvas.height / 2; //initial snake y position
  this.size = 20; // size of an object on canvas
  this.fruitX = 0; // fruit x position
  this.fruitY = 0; // fruit y position
  this.speedX = 0; // direction of the movement ( right(+20px) / left(-20) )
  this.speedY = 0; // direction of the movement ( up(-20) / down(+20) )
  this.tail = []; // array for snakes tail
  this.total = 3; // total pieces of tail

/******** draws snake on the screen ********/
  this.create = function(ctx) {
    ctx.font = "20px Georgia";
    ctx.fillStyle = "red";
    ctx.fillText("Score : " + (this.total-3), 500, 30);

    for(let i=0; i<this.tail.length; i++) {
      ctx.fillStyle = "blue";
      ctx.fillRect(this.tail[i].x,this.tail[i].y, this.size, this.size) ;
    }

    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
/******** move snakes in logic before drawning it ********/
  this.move = function() {
    this.tail[this.total - 1] = { x: this.x, y: this.y };  //adding new piece of snake

    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.x += this.speedX;
    this.y += this.speedY;
    commands = 0;
  }
/******** draws fruit on the screen ********/
  this.createFruit = function(ctx) {
    ctx.fillStyle = "purple";
    ctx.fillRect(this.fruitX, this.fruitY, this.size, this.size)
  }
/******** pick location for fruit avoiding snake ********/
  this.pickFruitLocation = function() {
    this.fruitX = Math.ceil(Math.random() * (canvas.width / this.size)-1) * this.size;
    this.fruitY = Math.ceil(Math.random() * (canvas.height / this.size)-1) * this.size;

    if(this.fruitX == this.x && this.fruitY == this.y) {
      this.pickFruitLocation();
    }

    for(let i=0; i<this.tail.length; i++) {
      if(this.fruitX == this.tail[i].x && this.fruitY == this.tail[i].y) {
        this.pickFruitLocation();
      }
    }
  }
/******** changing direction of movement ********/
  this.changeDirection = function(direction) {
    if(this.wrongDirection(direction)) {
      direction = "ignore :)";
    }

    switch (direction) {
      case 'Up':
        this.speedX = 0;
        this.speedY = -this.size;
        break;
      case 'Right':
        this.speedX = this.size;
        this.speedY = 0;
        break;
      case 'Down':
        this.speedX = 0;
        this.speedY = this.size;
        break;
      case 'Left':
        this.speedX = -this.size;
        this.speedY = 0;
        break;
    }
  }
/******** checking if suggested direction can be moved to ********/
  this.wrongDirection = function(direction) {
    if(direction == 'Up' && this.speedY == this.size && this.speedX == 0) {
      return true;
    }
    if(direction == 'Right' && this.speedY == 0 && this.speedX == -this.size) {
      return true;
    }

    if(direction == 'Down' && this.speedY == -this.size && this.speedX == 0) {
      return true;
    }

    if(direction == 'Left' && this.speedY == 0 && this.speedX == this.size)  {
      return true;
    }

    return false;
  }
/******** choosing random path of the snake (up/right/down/left) ********/
  this.chooseRandomPath = function() {
  let random = Math.round(Math.random()*3);

  switch(random) {
    case 0:
      this.speedX = this.size;
      break;
    case 1:
      this.speedX = -this.size;
      break;
    case 2:
      this.speedY = this.size;
      break;
    case 3:
      this.speedY = -this.size;
      break;
  }

}
/******** same location as fruit? = eat it ********/
  this.eatFruit = function() {
    if(this.x == this.fruitX && this.y == this.fruitY) {
      this.total++;
      return true;
    }

    return false;
  }
/******** checking for crashing ********/
  this.checkCrash = function() {
    for (let i=0; i<this.tail.length; i++) {
      if (this.tail[i].x == this.x  && this.tail[i].y == this.y) {
        this.gameOver();
        return true;
      }
    }

    if (this.x == -this.size || this.x == canvas.width) {
      this.gameOver();
      return true;
    }

    if (this.y == -this.size || this.y == canvas.height) {
      this.gameOver();
      return true;
    }
  }

  this.checkCrash2 = function() {
    for (let i=0; i<this.tail.length; i++) {
      if (this.tail[i].x == this.x  && this.tail[i].y == this.y) {
        this.gameOver();
        console.log("1");
        return true;
      }
    }

    if (this.x == -this.size || this.x == canvas.width) {
      this.gameOver();
      console.log("2");
      return true;
    }

    if (this.y == -this.size || this.y == canvas.height) {
      this.gameOver();
      console.log("3");
      return true;
    }
  }
/******** ending the game ********/
  this.gameOver = function() {

    if(time2 != 0 || time != 0)  {// avoids slowing down simulation process
      window.clearInterval(time2);
      console.log(AiMoves);
    }
  }


}
