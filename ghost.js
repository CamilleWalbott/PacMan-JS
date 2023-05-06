//Classe des fantomes / ghosts class
export default class Ghost {
    constructor({
        position,
        velocity,
        color = 'red'
    }){
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
        this.prevCollision = []
    }
    draw(c){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update(c){
        this.draw(c)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }
}