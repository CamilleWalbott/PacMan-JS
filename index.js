import Boundary from '/boundary.js'
import Player from '/player.js'

const canvas = document.querySelector('canvas')
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
//dessin map / map draw
const map = [
  ['-', '-', '-', '-', '-', '-', '-',], 
  ['-', ' ', ' ', ' ', ' ', ' ', '-',], 
  ['-', ' ', '-', ' ', '-', ' ', '-',],
  ['-', ' ', ' ', ' ', ' ', ' ', '-',],  
  ['-', ' ', '-', ' ', '-', ' ', '-',],
  ['-', ' ', ' ', ' ', ' ', ' ', '-',], 
  ['-', '-', '-', '-', '-', '-', '-',], 
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
        player.velocity.x = -5
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
        }       }else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 5
    }

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

