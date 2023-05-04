const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Réglages canvas / Canvas settings
canvas.width = innerWidth
canvas.height = innerHeight


//classe pour un carré de la map
class Boundary {
    static width = 40
    static height = 40
    constructor({position}  ){
      this.position = position 
      this.width = 40
      this.height = 40
    }

    draw(){
        c.fillStyle ='blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//Classe du pacman / Pacman class
class Player {
    constructor({
        position,
        velocity
    }){
        this.position = position
        this.velocity = velocity
        this.radius = 10
    }
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }
}

//dessin map / map draw
const map = [
  ['-', '-', '-', '-', '-', '-',], 
  ['-', ' ', ' ', ' ', ' ', '-',], 
  ['-', ' ', '-', '-', ' ', '-',],
  ['-', ' ', ' ', ' ', ' ', '-',], 
  ['-', '-', '-', '-', '-', '-',], 
]

const boundaries = []
const player = new Player({
    position : {
        x:40,
        y:40
    },
    velocity : {
        x:0,
        y:0
    }
})

//création map / map creation
map.forEach((row, i) => {
    row.forEach((symbol, j) =>{
      switch(symbol){
        case '-': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                }
            })
        )
        break
      }  
    })
})
boundaries.forEach((boundary) => {
    boundary.draw();
})
player.draw()

