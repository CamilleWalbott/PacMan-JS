//Classe des Bonus / PowerUp class
export default class PowerUp {
    constructor({
        position
    }){
        this.position = position
        this.radius = 8
    }
    draw(c){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = '#FBC155'
        c.fill()
        c.closePath()
    }

}