function Enemy(x, y, parent, array) {
    var self = this
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.sprite = document.createElement('div')
    this.direction = 1
    this.speed = 5
    this.isDead = false

    this.insertEnemy = function () {
        this.sprite.setAttribute('class', 'enemy')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
    }

    this.move = function () {
        var newY = self.y + self.speed * self.direction // Movemos el enemigo hacia abajo
        if (newY >= 0 && newY <= 800) {
            self.y = newY
            self.sprite.style.top = self.y + 'px'
        }
        if (self.y >= 800) {
            self.removeEnemy()
        }
        self.checkCollision()
    }

    this.removeEnemy = function (idx) {
        if (self.y >= 800) {
            array.shift()
        } else {
            array.splice(idx, 1) // Si no ha llegado al borde inferior, eliminamos el elemento en el índice que hemos recibido desde la función 'checkCollision' de la bala que ha colisionado con este enemigo
        }
        parent.removeChild(this.sprite)
        clearInterval(this.timerId)
    }

    this.checkCollision = function () {
        if (
            this.x < player.x + player.width &&
            this.y < player.y + player.height &&
            this.x + this.width > player.x &&
            this.y + this.height > player.y
        ) {
            player.isDead = true // Matamos al jugador en caso de haber colisionado con él
        }
    }
    this.timerId = setInterval(this.move, 25) // Nada más crear el enemigo, creamos un intervalo que se encargará de su movimiento
}
