function Snake() {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.speedX = 0;
  this.speedY = 0;
  this.tail = [];
  this.total = 0;


  this.create = function() {
    ctx.fillStyle = "yellow";
    ctx.fillText("Score : " + this.total, 500, 30);

    for (let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x,this.tail[i].y, size, size);
    }

    ctx.fillRect(this.x, this.y, size, size);
  }

  this.move = function() {
    this.tail[this.total - 1] = { x: this.x, y: this.y };
    this.tail.forEach(function(item, index, array) {
      console.log(item, index);
    });
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.changeDirection = function(direction) {
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

  this.eatFruit = function(x, y) {
    if(this.x == x && this.y == y) {
      this.total++;
      return true;
    }
    return false;
  }



  this.gameOver = function(time) {
    if (this.x < 0 || this.x == canvas.width) {
      document.write("GAME OVER!");
      window.clearInterval(time);
    }
    if (this.y < 0 || this.y == canvas.height) {
      document.write("GAME OVER!");
      window.clearInterval(time);
    }
  }




}
