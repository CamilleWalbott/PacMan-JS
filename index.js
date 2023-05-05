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

//loop animation
function animate() {
    requestAnimationFrame(animate)
    console.log('jdfhdskfjh')
    c.clearRect(0,0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw(c);

        if (player.position.y - player.radius + player.velocity.y <= boundary.position.y + boundary.height  
            && player.position.x + player.radius + player.velocity.x >= boundary.position.x 
            && player.position.y + player.radius + player.velocity.y >= boundary.position.y 
            && player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary.width ){
                console.log("ça touche")
                player.velocity.x=0
                player.velocity.y=0
            
        }
    })
    player.update(c)
    

    //déplacement selon touche /  movement according to key
    if (keys.z.pressed && lastKey === 'z'){
        player.velocity.y = -5
    }else if (keys.q.pressed && lastKey === 'q'){
        player.velocity.x = -5
    }else if (keys.s.pressed && lastKey === 's'){
        player.velocity.y = 5
    }else if (keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 5
    }

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
    console.log(keys.d.pressed)
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
    console.log(player.velocity)
}
)

