function Bullet(x, y, parent, array, player) {
    var self = this
    this.x = x
    this.y = y
    this.width = 20
    this.height = 20
    this.sprite = document.createElement('div')
    this.direction = -1 // Movemos la bala hacia arriba
    this.speed = 10

    this.insertBullet = function () {
        this.sprite.setAttribute('class', 'bullet')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
    }

    this.move = function () {
        self.checkCollision()
        let newY = self.y + self.speed * self.direction
        if (newY >= 0 && newY <= 750) {
            self.y = newY
            self.sprite.style.top = self.y + 'px'
        }
        if (self.y <= 0) {
            self.removeBullet() // Quitamos la bala de la pantalla si ha llegado al borde superior del escenario
        }
    }

    this.removeBullet = function () {
        parent.removeChild(this.sprite)
        clearInterval(this.timerId)
    }
    this.checkCollision = function () {
        array.forEach(function (enemy, index) {
            if (
                self.x < enemy.x + enemy.width &&
                self.y < enemy.y + enemy.height &&
                self.x + self.width > enemy.x &&
                self.y + self.height > enemy.y
            ) {
                self.removeBullet() // En caso de colisionar con un enemigo, quitamos tanto la bala como el enemigo de la pantalla
                enemy.removeEnemy(index)
                player.score = player.score + 1
                let total = document.getElementById('total')
                total.innerText = player.score
            }
        })
    }

    this.timerId = setInterval(this.move, 50)
}