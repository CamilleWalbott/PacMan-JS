//classe pour un carré de la map
export default class Boundary {
    static width = 40
    static height = 40
    constructor({position, }  ){
      this.position = position 
      this.width = 40
      this.height = 40
    }

    draw(c){
        c.fillStyle ='blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}