/**
 * MODEL DATA
 */
const tank = generateTank();
let arrayBlock = generateBlock();
let arrayBullet = [];
/*******
 */

canvas.addEventListener('mousedown', function (event) {
    if (event.button === 0) addBullet();
    let audio = new Audio('./assets/audio/zvuk-gun.mp3');
    audio.play();
});

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'KeyW':
            moveTank(0, -SIZE);
            updateTankDirection('up')

            break;
        case 'KeyS':
            moveTank(0, SIZE);
            updateTankDirection('down')
            break;
        case 'KeyD':
            moveTank(SIZE, 0);
            updateTankDirection('right')
            break;
        case 'KeyA':
            moveTank(-SIZE, 0);
            updateTankDirection('left')
            break;
    }
});


function pointInsideCanvas(x, y) {
    return x >= 0 && y >= 0 && x <= canvas.width && y <= canvas.height;
}

function updateTankDirection(dir) {
    tank.direction = dir;
}

function moveTank(offsetX, offsetY) {
    const newX = tank.x + offsetX;
    const newY = tank.y + offsetY;

    for (let i = 0; i < arrayBlock.length; i++) {
        if (newX < arrayBlock[i].x + SIZE && newX + tank.size > arrayBlock[i].x && newY < arrayBlock[i].y + SIZE && newY + tank.size > arrayBlock[i].y) {
            return;
        }
    }

    if (newX >= 0 && newX <= canvas.width - tank.size && newY >= 0 && newY <= canvas.height - tank.size) {
        tank.x = newX;
        tank.y = newY;
    }
}

function addBullet() {
    const startX = tank.x + tank.size / 2;
    const startY = tank.y + tank.size / 2;
    arrayBullet.push({
        startX,
        startY,
        x: startX,
        y: startY,
        size: BULLET_SIZE,
        type: 'bullet',
        speed: (SIZE * 2) / 1_000,
        direction: tank.direction,
        created: (new Date()).getTime()
    });
}

function generateBlock() {
    return Array.from({length: COUNT_BLOCKS})
        .map((_v, index) => {
            const x = Math.floor(Math.random() * (canvas.width / SIZE)) * SIZE;
            const y = Math.floor(Math.random() * (canvas.height / SIZE)) * SIZE;
            const position = new Vector(x, y);
            if (index % 2) {
                return new Box(
                    position,
                    SIZE
                )
            } else {
                return new BoxWithArmor(
                    position,
                    SIZE,
                    'blue',
                    Math.floor(Math.random() * 4) + 2
                )
            }
        });
}

function generateTank() {
    return {
        x: 0,
        y: 0,
        size: SIZE,
        type: "tank",
        direction: 'right'
    }
}