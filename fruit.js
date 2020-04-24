function Fruit() {
  this.x = 0;
  this.y = 0;

  this.pickLocation = function() {
    this.x = Math.ceil(Math.random() * ((width / size))-1) * size;
    this.y = Math.ceil(Math.random() * ((height / size))-1) * size;
  }

  this.create = function() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, size, size)
  }
}
