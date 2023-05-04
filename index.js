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
        x:40,
        y:40
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
boundaries.forEach((boundary) => {
    boundary.draw(c);
})
player.draw(c)

