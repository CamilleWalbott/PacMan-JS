//Classe du pacman / Pacman class
export default class Player {
    constructor({
        position,
        velocity
    }){
        this.position = position
        this.velocity = velocity
        this.radius = 10
    }
    draw(c){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }
}