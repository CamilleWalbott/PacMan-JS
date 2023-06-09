//Classe des granules / Pellets class
export default class Pellet {
    constructor({
        position
    }){
        this.position = position
        this.radius = 3
    }
    draw(c){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = "#FBC155"
        c.fill()
        c.closePath()
    }

}