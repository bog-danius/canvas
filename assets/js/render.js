function render() {

    arrayRenderElements = [
        ...arrayBlock,
        ...arrayBullet,
        tank
    ]

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    arrayRenderElements.forEach(el => {

        if (el instanceof Box) {
            ctx.fillStyle = inp.value;
            ctx.fillRect(el.position.x, el.position.y, el.size, el.size);
        }

        switch (el.type) {
            case "tank": {
                ctx.fillStyle = 'gray';
                ctx.fillRect(el.x, el.y, el.size, el.size);

                switch (el.direction) {
                    case 'right':
                        ctx.fillRect(el.x + el.size, el.y + el.size / 2 - (HEIGHT_TURRET / 2), WIDTH_TURRET, HEIGHT_TURRET);
                        break;
                    case 'left':
                        ctx.fillRect(el.x - WIDTH_TURRET, el.y + el.size / 2 - (HEIGHT_TURRET / 2), WIDTH_TURRET, HEIGHT_TURRET);
                        break;
                    case 'up':
                        ctx.fillRect(el.x + el.size / 2 - HEIGHT_TURRET / 2, el.y - WIDTH_TURRET, HEIGHT_TURRET, WIDTH_TURRET);
                        break;
                    case 'down':
                        ctx.fillRect(el.x + el.size / 2 - HEIGHT_TURRET / 2, el.y + el.size, HEIGHT_TURRET, WIDTH_TURRET);
                        break;
                }
                break;
            }
            case 'bullet': {
                ctx.beginPath();
                ctx.fillStyle = 'red';
                ctx.arc(el.x, el.y, el.size / 2, 0, Math.PI * 2);
                ctx.fill()
                ctx.closePath();
                break;
            }
        }
    })
}

function tick() {
    const tickTime = (new Date()).getTime();

    arrayBullet.forEach((bullet, index) => {
        // ms
        const diffTime = tickTime - bullet.created;
        switch (bullet.direction) {
            case 'right':
                bullet.x = bullet.startX + diffTime * bullet.speed + WIDTH_TURRET * 2;
                break;
            case 'left':
                bullet.x = bullet.startX - diffTime * bullet.speed - WIDTH_TURRET * 2;
                break;
            case 'up':
                bullet.y = bullet.startY - diffTime * bullet.speed - WIDTH_TURRET * 2;
                break;
            case 'down':
                bullet.y = bullet.startY + diffTime * bullet.speed + WIDTH_TURRET * 2;
                break;
        }
        arrayBlock.forEach(block => {
            if (bullet.x <= block.position.x + 40 && bullet.x >= block.position.x && bullet.y <= block.position.y + 40 && bullet.y >= block.position.y) {

                arrayBullet.splice(index, 1)
                arrayBlock.splice(arrayBlock.indexOf(block), 1)
                let audio = new Audio('./assets/audio/bang.mp3');
                audio.play();
            }
        })
    })

    arrayBullet = arrayBullet.filter(bullet => {
        return pointInsideCanvas(bullet.x, bullet.y);
    })

    if (arrayBlock.length === 0) arrayBlock = generateBlock()

    document.querySelector("#count-bullet").textContent = `Count: ${arrayBullet.length}`
}

setInterval(render, 1_000 / 60)
setInterval(tick, 1_000 / 150)
