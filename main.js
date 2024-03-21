let board = document.getElementById('board')
let total = document.getElementById('total')
let player = new Player(225, 750, board)
let timerPlayerId
let spawnId
let enemiesArray = []

let start = document.getElementById('btn-start')
let startPage = document.getElementById('start')
let end = document.getElementById('btn-end')
let endPage = document.getElementById('end')



function gamestart() {
    player.insertPlayer()
    timerPlayerId = setInterval(playerMovement, 25)
    spawnId = setInterval(createEnemy, 2000)
}


function playerMovement() {
    // if (player.score === 3) {
    //     clearInterval(timerPlayerId)
    //     clearInterval(spawnId)
    //     enemiesArray.forEach(function (enemy) {
    //         clearInterval(enemy.timerId)
    //     })
    //     alert('Yu Win')
    // }
    if (!player.isDead) {
        player.move()
    }
    else {
        clearInterval(timerPlayerId)
        clearInterval(spawnId)
        enemiesArray.forEach(function (enemy) {
            clearInterval(enemy.timerId)
        })
        board.style.display = 'none'
        endPage.style.display = 'block'
    }
}


function createEnemy() {
    var coord = Math.floor(Math.random() * 10) * 50 // Generamos una coordenada horizontal aleatoria, en intervalos de 50px
    var enemy = new Enemy(coord, 0, board, enemiesArray)
    enemy.insertEnemy() // Insertamos el enemigo en el DOM
    enemiesArray.push(enemy) // Insertamos el enemigo creado en el array de la línea 16
}


end.addEventListener('click', function (e) {
    endPage.style.display = 'none'
    startPage.style.display = 'none'
    startPage.style.display = 'block'
})

function resetGame() {
    // Detener todos los intervalos
    clearInterval(timerPlayerId);
    clearInterval(spawnId);
    enemiesArray.forEach(function (enemy) {
        clearInterval(enemy.timerId);
    });

    // Limpiar el array de enemigos
    enemiesArray = [];

    // Restablecer el estado del jugador y del juego si es necesario
    // Por ejemplo, si tienes una propiedad de puntuación en el jugador, restablecerla a 0
    player.score = 0;
    total.innerText = 0

    player.isDead = false; // Asumiendo que hay una propiedad para verificar si el jugador está muerto
    // También puedes necesitar restablecer la posición del jugador, etc.

    limpiarTableroExceptoH2()

    // Restablecer la visibilidad del tablero y de las páginas de inicio/fin
    board.style.display = 'block';
    startPage.style.display = 'none';
    endPage.style.display = 'none';

    // Reiniciar el juego
    gamestart();
}

function limpiarTableroExceptoH2() {
    // Obtener todos los hijos del elemento #board
    const hijos = Array.from(board.children);

    // Iterar sobre los hijos y eliminarlos, excepto el h2
    hijos.forEach(hijo => {
        if (hijo.tagName !== 'H2') { // Verificar si el elemento no es un h2
            board.removeChild(hijo);
        }
    });
}

// Modificar el evento click del botón de inicio para reiniciar el juego
start.addEventListener('click', function (e) {
    resetGame(); // Llamar a resetGame en lugar de solo ajustar la visualización de los elementos
});

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case 'a':
            player.direction = -1 // Moverse a la izquierda significa reducir el valor de 'x'
            break
        case 'd':
            player.direction = 1 // Moverse a la derecha significa aumentar el valor de 'x'
            break
        // case 'w':
        //     player.directionY = -1 // Moverse a la izquierda significa reducir el valor de 'x'
        //     break
        // case 's':
        //     player.directionY = 1 // Moverse a la derecha significa aumentar el valor de 'x'
        //     break
        case ' ':
            var bullet = new Bullet(player.x + player.width / 2 - 10, player.y - 20, board, enemiesArray, player) // Creamos una bala usando las coordenadas del jugador
            bullet.insertBullet() // Insertamos la bala en el DOM
            break
    }
})

window.addEventListener('keyup', function () {
    // player.directionY = 0 //Al levantar la tecla correspondiente, dejamos de movernos
    player.direction = 0 //Al levantar la tecla correspondiente, dejamos de movernos
})

gamestart()
