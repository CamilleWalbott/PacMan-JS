import Boundary from '/boundary.js'
import Player from '/player.js'
import Pellet from '/pellets.js'

const canvas = document.querySelector('canvas')
const scoreElement = document.querySelector('#score')
const c = canvas.getContext('2d')

//Réglages canvas / Canvas settings
canvas.width = innerWidth
canvas.height = innerHeight

const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastKey = ''
let score = 0

//dessin map / map draw
const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2',], 
  ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', 'B', ' ', '[', '7', ']', ' ', 'B', ' ', '|',],
  ['|', ' ', ' ', ' ', ' ', 'U', ' ', ' ', ' ', ' ', '|',],  
  ['|', ' ', '[', ']', ' ', ' ', ' ', '[', ']', ' ', '|',],
  ['|', ' ', ' ', ' ', ' ', 'n', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', 'B', ' ', '[', 'X', ']', ' ', 'B', ' ', '|',], 
  ['|', ' ', ' ', ' ', ' ', 'U', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', '[', ']', ' ', ' ', ' ', '[', ']', ' ', '|',], 
  ['|', ' ', ' ', ' ', ' ', 'n', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', 'B', ' ', '[', '_', ']', ' ', 'B', ' ', '|',], 
  ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|',], 
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3',], 
]

const pellets = []
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

function createImage(src){
    const image = new Image()
    image.src = src
    return image
}


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
                image : createImage('./assets/pipeHorizontal.png')
            })
        )
        break
        case 'U': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/capBottom.png')
            })
        )
        break
        case '_': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeConnectorTop.png')
            })
        )
        break
        case 'X': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeCross.png')
            })
        )
        break
        case 'n': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/capTop.png')
            })
        )
        break
        
        case '7': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeConnectorBottom.png')
            })
        )
        break
        case '[': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/capLeft.png')
            })
        )
        break
        case ']': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/capRight.png')
            })
        )
        break
        case '|': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeVertical.png')
            })
        )
        break
        case '1': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeCorner1.png')
            })
        )
        break
        case '2': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeCorner2.png')
            })
        )
        break
        case '3': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeCorner3.png')
            })
        )
        break
        case '4': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/pipeCorner4.png')
            })
        )
        break
        case 'B': 
        boundaries.push(
            new Boundary({
                position: {
                    x: Boundary.width *j,
                    y: Boundary.height *i
                },
                image : createImage('./assets/block.png')
            })
        )
        break
        // granules / pellets
        case ' ': 
        pellets.push(
            new Pellet({
                position: {
                    x: Boundary.width/2 + Boundary.width * j,
                    y: Boundary.height/2 + Boundary.height * i
                }
            })
        )
        break
      }  
    })
})

//collision
function circleCollidesWithRectangle({
    circle, rectangle
}) {
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height  
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x 
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y 
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width )
}

//loop animation
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, canvas.width, canvas.height)

    //déplacement selon touche /  movement according to key
    if (keys.z.pressed && lastKey === 'z'){
        for (let i =0; i <boundaries.length; i++){
            //prends en compte seulement le carré superieur
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, 
                    velocity: 
                    {
                    x:0, 
                    y:-5
                    }
                }, 
                rectangle: boundary
            }) 
            ){
            player.velocity.y = 0
            break
            } else {
            player.velocity.y = -5
            } 
        }   
    }else if (keys.q.pressed && lastKey === 'q'){
        //prends en compte seulement le carré de gauche
        for (let i =0; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, 
                    velocity: {
                        x:-5, 
                        y:0
                    }
                }, 
                rectangle: boundary
            }) 
            ){
            player.velocity.x = 0
            break
            } else {
            player.velocity.x = -5
            } 
        }
    }else if (keys.s.pressed && lastKey === 's'){
        //prends en compte seulement le carré inférieur
        for (let i =0; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, 
                    velocity: 
                    {
                    x:0, 
                    y:5
                    }
                }, 
                rectangle: boundary
            }) 
            ){
            player.velocity.y = 0
            break
            } else {
            player.velocity.y = 5
            } 
        }       
    }else if (keys.d.pressed && lastKey === 'd'){
        //prends en compte seulement le carré de droite
        for (let i =0; i <boundaries.length; i++){
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, 
                    velocity: {
                        x:5, 
                        y:0
                    }
                }, 
                rectangle: boundary
            }) 
            ){
            player.velocity.x = 0
            break
            } else {
            player.velocity.x = 5
            } 
        }           
    }

    //dessin et touché des granules / pellets draw and touch
    for(let i = pellets.length - 1; 0 < i; i--){
        const pellet = pellets[i]
        pellet.draw(c)
        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y)< pellet.radius + player.radius){
            pellets.splice(i,1)
            score += 10
            scoreElement.innerHTML = score
        }

    }  

    //dessin bords / boundaries draw
    boundaries.forEach((boundary) => {
        boundary.draw(c);

        if (circleCollidesWithRectangle({circle: player, rectangle: boundary}) ){
                player.velocity.x=0
                player.velocity.y=0
            
        }
    })
    player.update(c)

}
animate()


//listeners touches / keys listeners
window.addEventListener('keydown', ({key}) => {
    switch(key){
        case 'z' :
            keys.z.pressed = true     
            lastKey = 'z'   
        break
        case 'q' :
            keys.q.pressed = true      
            lastKey ='q'  
            break
        case 's' :
            keys.s.pressed = true     
            lastKey = 's'   
            break
        case 'd' :
            keys.d.pressed = true    
            lastKey = 'd'    
            break
    }
}
)
window.addEventListener('keyup', ({key}) => {
    switch(key){
        case 'z' :
            keys.z.pressed = false        
            break
        case 'q' :
            keys.q.pressed = false        
        break
        case 's' :
            keys.s.pressed = false        
        break
        case 'd' :
            keys.d.pressed = false        
        break
    }
}
)

