import Boundary from '/boundary.js'
import Player from '/player.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Réglages canvas / Canvas settings
canvas.width = innerWidth
canvas.height = innerHeight


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
        x:Boundary.width * 1.5,
        y:Boundary.height * 1.5
    },
    velocity : {
        x:0,
        y:0
    }, 
    c
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
                }, 
                c
            })
        )
        break
      }  
    })
})

//loop animation
function animate() {
    requestAnimationFrame(animate)
    console.log('jdfhdskfjh')
    c.clearRect(0,0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw(c);
    })
    player.update(c)
}
animate()


window.addEventListener('keydown', ({key}) => {
    switch(key){
        case 'z' :
            player.velocity.y -= 5 ;
        break
        case 'q' :
            player.velocity.x -= 5;
        break
        case 's' :
            player.velocity.y += 5;
        break
        case 'd' :
            player.velocity.x += 5;
        break
    }
    console.log(player.velocity)
}
)


window.addEventListener('keyup' , (key) => {
    switch(key){
        case 'z' :
            player.velocity.y = 0 ;
        break
        case 'q' :
            player.velocity.x = 0;
        break
        case 's' :
            player.velocity.y = 0;
        break
        case 'd' :
            player.velocity.x = 0;
        break
    }
    console.log(player.velocity)
}
)

