function Box(position, size, color = 'black') {
    Vector.call(this, position.x, position.y)
    this.size = size;
    this.color = color;
    this.destroyed = false
    this.makeDamage = function damage() {
        this.destroy();
    }
    this.destroy = function destroy() {
        this.destroyed = true;
        const index = arrayBlock.indexOf(this);
        if (index !== -1) {
            arrayBlock.splice(index, 1);
        }
    }
}

function BoxWithArmor(position, size, color = 'blue', armor) {
    Box.call(this, position, size, color = 'blue')
    this.armor = armor;
    this.makeDamage = function damage() {
        if(this.armor === 0) this.destroy()
        else this.armor = this.armor - 1;
    }
}