import { fixedTime, teleport, PPU, checkRectOverlap, getElementRect, conect, startTimer, addTime } from "Game"

// export var time = 35
// export var startTimer = false

@component()
export class Enemy extends APJS.BasicScriptComponent {

  accumulator = 0
  spawnTimer = 0
  spawnInterval = 3
  // time = 35
  //startTimer = false
  // spawnSpots = [[117 / PPU, 104 / PPU], [396 / PPU, 104 / PPU], [-396 / PPU, 104 / PPU], [-117 / PPU, 104 / PPU], [-256 / PPU, 333 / PPU], [256 / PPU, 333 / PPU]]
  spawnSpots = [[117 / PPU, 114 / PPU], [396 / PPU, 114 / PPU], [-396 / PPU, 114 / PPU], [-117 / PPU, 114 / PPU], [-256 / PPU, 343 / PPU], [256 / PPU, 343 / PPU]]
  currentSpot: any
  transform: any
  playerObj: any
  playerWidth: any
  playerHeight: any
  enemyWasHit = false
  points = 0
  enemyScene: any
  scenePoints: any

  getPlayerRect() {
    var center = this.playerObj.getTransform().getWorldPosition()
    if (center) {
      return [center.x, center.y, this.playerWidth * 0.75, this.playerHeight]
    }
  }

  getRandomItem(el: any) {
    return el[Math.floor(Math.random() * el.length)]
  }

  setCurrentSpot(el: any) {
    var newSpot = this.getRandomItem(el)
    if (newSpot != this.currentSpot) {
      this.currentSpot = newSpot
    } else {
      this.setCurrentSpot(el)
    }
  }

  onStart() {
    this.playerObj = this.getSceneObject().scene.findSceneObject('player')
    this.transform = this.playerObj.getComponent('ScreenTransform') as APJS.ScreenTransform
    this.playerWidth = this.transform.sizeDelta.x / PPU
    this.playerHeight = this.transform.sizeDelta.y / PPU
    this.enemyScene = this.getSceneObject().scene.findSceneObject('enemy')
    this.scenePoints = this.getSceneObject().scene.findSceneObject('points')
  }

  onUpdate(deltaTime: number) {

    deltaTime = Math.min(deltaTime, 0.25)
    this.accumulator += deltaTime

    while (this.accumulator >= fixedTime) {

      this.spawnTimer += fixedTime

      // if (this.startTimer && time >= 0) {
      //   time -= fixedTime
      //   conect.name = Math.round(time).toString()
      // }

      if (!this.enemyWasHit && checkRectOverlap(this.getPlayerRect(), getElementRect(this.getSceneObject(), 0))) {
        //console.log('hit')
        // if (!startTimer) startTimer = true
        //startTimer()
        startTimer()
        this.points++ 
        // conect.name = this.points.toString()
        this.scenePoints.name = this.points.toString()
        this.enemyScene.name = 'hit'
        this.enemyWasHit = true
        this.spawnTimer = 1
        if (this.points == 4) {
          this.spawnInterval = 2.5
        } else if (this.points == 8) {
          this.spawnInterval = 2.3
          addTime(15)
          //time =+ 15
          // adicionar visual tempo aumentando!
        } else if (this.points == 12) {
          this.spawnInterval = 2
          addTime(10)
          //time =+ 10
          // adicionar visual tempo aumentando!
        } else if (this.points == 25) {
          // adiocionar o KO!
        }
      } 

      if (this.spawnTimer >= this.spawnInterval) {
        // this.currentSpot = this.getRandomItem(this.spawnSpots)
        this.setCurrentSpot(this.spawnSpots)
        teleport(this.getSceneObject(), this.currentSpot[0], this.currentSpot[1])
        this.spawnTimer = 0
        this.enemyScene.name = 'enemy'
        this.enemyWasHit = false
      }
  
      this.accumulator -= fixedTime
    }

  }
}
