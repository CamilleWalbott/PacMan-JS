import Boundary from '/boundary.js'
import Player from '/player.js'
import Pellet from '/pellets.js'
import Ghost from './ghost.js'
import PowerUp from './powerUp.js'

const canvas = document.querySelector('canvas')
const scoreElement = document.querySelector('#score')
const scoreText = document.querySelector('#scoreText')
const playButton = document.getElementById('play')
const c = canvas.getContext('2d')
const beginAudio = new Audio('./assets/sounds/pacman_beginning.wav')
const playAudio = new Audio('./assets/sounds/pacman_chomp.wav')
const deathAudio = new Audio('./assets/sounds/pacman_death.wav')
const scaredAudio = new Audio('./assets/sounds/pacman_eatghost.wav')
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
  ['|', 'P', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'P', '|',], 
  ['|', ' ', 'B', ' ', '[', '7', ']', ' ', 'B', ' ', '|',],
  ['|', ' ', ' ', ' ', ' ', 'U', ' ', ' ', ' ', ' ', '|',],  
  ['|', ' ', '[', ']', ' ', ' ', ' ', '[', ']', ' ', '|',],
  ['|', ' ', ' ', ' ', ' ', 'n', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', 'B', ' ', '[', 'X', ']', ' ', 'B', ' ', '|',], 
  ['|', ' ', ' ', ' ', ' ', 'U', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', '[', ']', ' ', ' ', ' ', '[', ']', ' ', '|',], 
  ['|', ' ', ' ', ' ', ' ', 'n', ' ', ' ', ' ', ' ', '|',], 
  ['|', ' ', 'B', ' ', '[', '_', ']', ' ', 'B', ' ', '|',], 
  ['|', 'P', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'P', '|',], 
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3',], 
]

const pellets = []
const boundaries = []
const powerUps = []
let begin = false

const ghosts = [
    new Ghost({
        position: {
        x: Boundary.width * 5 + Boundary.width/2,
        y: Boundary.height + Boundary.width/2
        },
       velocity: {
        x:5,
        y:0
       }
    }),
    new Ghost({
        position: {
        x: Boundary.width * 3 + Boundary.width/2,
        y: Boundary.height * 3 + Boundary.width/2
        },
       velocity: {
        x:5,
        y:0
       },
       color: 'cyan'
    }),
    new Ghost({
        position: {
        x: Boundary.width * 7 + Boundary.width/2,
        y: Boundary.height * 3 + Boundary.width/2
        },
       velocity: {
        x:5,
        y:0
       }, 
       color: 'pink'
    })
]
const player = new Player({
    position : {
        x:Boundary.width * 5.5,
        y:Boundary.height * 8.5
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
        //power ups
        case 'P': 
        powerUps.push(
            new PowerUp({
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
    const padding = Boundary.width /2 - circle.radius -1
    return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding  
        && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding
        && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding
        && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding )
}



let animationId
let isPlayedOnce = false


//loop animation
function animate() {
    if (!begin && !isPlayedOnce){
       beginAudio.play()
       console.log(beginAudio)
       isPlayedOnce = true
    } else if (begin){
        playAudio.play()
    }
    
    animationId = requestAnimationFrame(animate)
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

    //detection collision fantômes et joueur / detect collision between ghosts and player
    for(let i = ghosts.length - 1; 0 <= i; i--){
        const ghost = ghosts[i]
 
        if (Math.hypot(ghost.position.x - player.position.x, 
            ghost.position.y - player.position.y) < ghost.radius + player.radius  ){ 
                if (ghost.scared){
                    ghosts.splice(i, 1)
                    score += 50
                    scaredAudio.play()


                } else {
                    cancelAnimationFrame(animationId)
                    deathAudio.play()
                scoreText.innerHTML = "PERDU!"
                scoreElement.innerHTML =""
                }
                
        }
    }

    //conditions pour gagner / win conditions
    if (pellets.length ===0){
        scoreText.innerHTML = "Gagné! Score :"
        cancelAnimationFrame(animationId)
    }

    //dessin PowerUps
    for(let i = powerUps.length - 1; 0 <= i; i--){
        const powerUp = powerUps[i]
        powerUp.draw(c)

        // touché PowerUps / PowerUps touch 
        if (Math.hypot(powerUp.position.x - player.position.x, 
                        powerUp.position.y - player.position.y
                        ) < powerUp.radius + player.radius){
        powerUps.splice (i,1)

        // Modification état fantômes / ghost state 
        ghosts.forEach((ghost) => {
            ghost.scared = true
            setTimeout(() => {
               ghost.scared = false 
            }, 5000)
        })

        }
    }

    //dessin et touché des granules / pellets draw and touch
    for(let i = pellets.length - 1; 0 <= i; i--){
        const pellet = pellets[i]
        pellet.draw(c)
        if (Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y)< pellet.radius + player.radius){
            pellets.splice(i,1)
            //ajout du score
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


    //déplacement fantômes / ghosts movment
    ghosts.forEach((ghost) =>{

        ghost.update(c, begin)
        const collisions = []
        boundaries.forEach(boundary => {
            if ( !collisions.includes('right') &&
                circleCollidesWithRectangle({
                circle: {
                    ...ghost, 
                    velocity: 
                    {
                    x: ghost.speed, 
                    y:0
                    }
                }, 
                rectangle: boundary
            }) 
            ){
                collisions.push('right')
            }
            if (!collisions.includes('left') &&
            circleCollidesWithRectangle({
                circle: {
                        ...ghost, 
                    velocity: 
                    {
                    x: -ghost.speed, 
                    y:0
                    }
                }, 
                rectangle: boundary
            }) 
            ){
                collisions.push('left')
            }
            if ( !collisions.includes('up') &&
            circleCollidesWithRectangle({
                circle: {
                    ...ghost, 
                    velocity: 
                    {
                    x:0, 
                    y: -ghost.speed
                    }
                }, 
                rectangle: boundary
            }) 
            ){   
            collisions.push('up')}

            if (!collisions.includes('down') &&
            circleCollidesWithRectangle({
                circle: {
                    ...ghost, 
                    velocity: 
                    {
                    x:0, 
                    y: ghost.speed
                    }
                }, 
                rectangle: boundary
                }) 
            ){
            collisions.push('down')}
        })
        //calcul des directions disponibles / pathways available
        if( collisions.length > ghost.prevCollision.length) {        
            ghost.prevCollision = collisions
        }        
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollision)){
            if (ghost.velocity.x > 0){
                ghost.prevCollision.push('right')
            } else if (ghost.velocity.x < 0){
                ghost.prevCollision.push('left')
            } else if (ghost.velocity.y < 0){
                ghost.prevCollision.push('up')
            } else if (ghost.velocity.y > 0){
                ghost.prevCollision.push('down')
            }
            const pathways = ghost.prevCollision.filter((collision) =>{
                return !collisions.includes(collision)
            })
            console.log({pathways})
            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            switch(direction) {
                case 'down':
                    ghost.velocity.x = 0
                    ghost.velocity.y = ghost.speed
                    break
                case 'up':
                    ghost.velocity.x = 0
                    ghost.velocity.y = -ghost.speed
                    break
                case 'right':
                    ghost.velocity.x = ghost.speed
                    ghost.velocity.y = 0
                    break
                case 'left':
                    ghost.velocity.x = -ghost.speed
                    ghost.velocity.y = 0
                    break
            }

            ghost.prevCollision = []
        }

    })

    if (player.velocity.x > 0 )  player.rotation = 0
    else if (player.velocity.x < 0)  player.rotation = Math.PI
    else if (player.velocity.y > 0) player.rotation = Math.PI / 2
    else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5
}
playButton.onclick = function(){
    animate()
    playButton.remove()
}
//animate()

 //listeners touches / keys listeners
window.addEventListener('keydown', ({key}) => {
    switch(key){
        case 'z' :
            if (!begin ) begin = true
            keys.z.pressed = true     
            lastKey = 'z'   
        break
        case 'q' :
            if (!begin) begin = true
            keys.q.pressed = true      
            lastKey ='q'  
            break
        case 's' :
            if (!begin) begin = true
            keys.s.pressed = true     
            lastKey = 's'   
            break
        case 'd' :
            if (!begin) begin = true
            if (beginAudio.ended)keys.d.pressed = true    
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



