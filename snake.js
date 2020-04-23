function Snake() {
  this.x = game.width/2;
  this.y = game.height/2;
  this.speedX = 0;
  this.speedY = 0;




  this.draw = function() {
    ctx.fillStyle = "yellow"
    ctx.fillRect(this.x, this.y, size, size )
  }

  this.move = function() {
    this.gameOver();
    this.x += this.speedX;
    this.y += this.speedY;
    ctx.fillRect(this.x, this.y, size, size)
  }
  this.changeDirection = function(direction) {
    switch(direction) {
      case 'Up':
        console.log("Up");
        this.speedX = 0;
        this.speedY = -size;
        break;
      case 'Right':
        console.log("Right");
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
  this.gameOver = function() {
    if(this.x < 0 || this.x == game.width) {
      document.write("GAME OVER!");


    }
    if(this.y < 0 || this.y == game.height) {
      document.write("GAME OVER!");
    }
  }



}
