function Player(x, y, parent) {
    let self = this
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.sprite = document.createElement('div') // Creamos el div vacío que va a representar el jugador en la pantalla
    this.direction = 0
    this.speed = 5 // Cantidad de píxeles que se va a mover en cada llamada a la función 'move'
    this.isDead = false
    this.score = 0
    // this.directionX = 0 // Dirección en el eje X
    // this.directionY = 0

    this.insertPlayer = function () { // Función encargada de insertar al player en el DOM
        this.sprite.setAttribute('id', 'player')
        this.sprite.style.left = this.x + 'px'
        this.sprite.style.top = this.y + 'px'
        parent.appendChild(this.sprite)
    }

    this.move = function () {
        let moveInX = self.x + self.speed * self.direction
        // let moveInY = self.y + self.speed * self.directionY

        if (moveInX >= 0 && moveInX <= 450) {
            self.x = moveInX
            self.sprite.style.left = self.x + 'px'
        }
        // if (moveInY >= 0 && moveInY <= 750) { // Asegúrate de ajustar el límite según el tamaño de tu área de juego
        //     self.y = moveInY
        //     self.sprite.style.top = self.y + 'px'
        // }
    }
}


