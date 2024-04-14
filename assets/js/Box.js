function Box(position, size, color = 'black') {

    Vector.call(this)

    this.position = position;
    this.size = size;
    this.color = color;
}