import { gravity, move, jumpPressed, checkRectOverlap, getElementRect, snapY, PPU, platforms, leftPressed, rightPressed, fixedTime, conect } from "Game"

/* 
state:
---
0 grounded
1 airborne

substate:
---
0 idle
1 walking	
2 jumping
3 falling 
*/

@component()
export class Player extends APJS.BasicScriptComponent {
  state = 1
  substate = 3
  lastSubstate = 3
  previousState = 1
  jumpCycle = false
  jumpPower = 30
  velocityY = 0
  transform : APJS.ScreenTransform | undefined
  width!: number
  height!: number
  nextY!: number
  frameCounter = 0
  landedIn: any = null
  leftLimit!: number
  rightLimit!: number
  playerX: any
  playerSprite: any
  accumulator = 0
  jumpSound: any
  playerPosY: any
  platPosY: any
  halfPlayerSize: any
  halfPlatSize: any

  getPlayerCoreRect (nextValue: number) {
    var centerX = this.getSceneObject().getTransform().getWorldPosition().x
    var centerY = nextValue
    // return [centerX, centerY, this.width * 0.4, this.height * 0.875]
    return [centerX, centerY, this.width * 0.55, this.height * 0.9]
  }

  setSubstate () {

    if (this.state == 0) {
      if (leftPressed || rightPressed) {
        this.substate = 1
      } else {
        this.substate = 0
      }
    } else {
      this.substate = (this.velocityY >= 0) ? 2 : 3
    }

    if (leftPressed) {
      this.playerSprite.getComponent('Image').flipX = true
    } else if (rightPressed) {
      this.playerSprite.getComponent('Image').flipX = false
    }

  }

  setPlayerSprite () {
    if (this.substate == this.lastSubstate) return

    // this.playerSprite.name = this.substate.toString()
    // console.log(this.substate.toString())

    switch (this.substate) {
      case 0:
        this.playerSprite.name = 'idle'
        break
      case 1:
        this.playerSprite.name = 'walk'
        break
      case 2:
        this.playerSprite.name = 'jump'
        break
      case 3:
        this.playerSprite.name = 'fall'
        break
    }

    this.lastSubstate = this.substate
}

  onStart() {
    this.playerSprite = this.getSceneObject().scene.findSceneObject('playerSprite')
    this.transform = this.getSceneObject().getComponent('ScreenTransform') as APJS.ScreenTransform
    this.width = this.transform.sizeDelta.x / PPU
    this.height = this.transform.sizeDelta.y / PPU
    this.playerX = this.getSceneObject().getTransform().getWorldPosition().x
    this.jumpSound = this.getSceneObject().scene.findSceneObject('jumpSoundOff')
  }

  onUpdate(deltaTime: number) {
    if (this.frameCounter < 30) { this.frameCounter++; return }

    deltaTime = Math.min(deltaTime, 0.25)
    this.accumulator += deltaTime

    while (this.accumulator >= fixedTime) {
      this.setSubstate()

      this.setPlayerSprite()

      if (this.state == 1) this.velocityY += gravity * fixedTime

      if (this.velocityY < -30) this.velocityY = -30

      if (jumpPressed && this.state == 0 && !this.jumpCycle) {
        this.velocityY = this.jumpPower
        this.jumpCycle = true
        this.state = 1 
        this.jumpSound.name = 'jumpSoundOn'
      }

      if (!jumpPressed && this.jumpCycle) {
        if (this.velocityY > 0) this.velocityY = 0
        if (this.state == 0) this.jumpCycle = false
        this.jumpSound.name = 'jumpSoundOff'
      }

      if (this.state == 0) {
        // this.leftLimit = getElementRect(this.landedIn, 0)[0] - (getElementRect(this.landedIn, 0)[2] / 2) - (this.width * 0.2)
        // this.rightLimit = getElementRect(this.landedIn, 0)[0] + (getElementRect(this.landedIn, 0)[2] / 2) + (this.width * 0.2)
        this.leftLimit = getElementRect(this.landedIn, 0)[0] - (getElementRect(this.landedIn, 0)[2] / 2) - (this.width * 0.3)
        this.rightLimit = getElementRect(this.landedIn, 0)[0] + (getElementRect(this.landedIn, 0)[2] / 2) + (this.width * 0.3)
        if (this.playerX < this.leftLimit || this.playerX > this.rightLimit) {
          this.state = 1
        }
      }

      this.nextY = this.getSceneObject().getTransform().localPosition.y + (this.velocityY * fixedTime)
      if (this.state == 1) {
        for (let i = 0; i < platforms.length; i++) {
          if (checkRectOverlap(this.getPlayerCoreRect(this.nextY), getElementRect(platforms[i], 0))) {
            if (this.velocityY < 0) {
              this.state = 0
              this.velocityY = 0
              snapY('top', this.getSceneObject(), platforms[i])
              this.landedIn = platforms[i]
              break
            }
            if (this.velocityY > 0) {
              console.log(this.playerPosY, this.halfPlayerSize, this.halfPlatSize)
              this.state = 1
              this.velocityY = 0
              snapY('bottom', this.getSceneObject(), platforms[i])
              break
            }
          }
        }
        move(this.getSceneObject(), 0, this.velocityY * fixedTime)
      } 
      this.accumulator -= fixedTime
    }
  }
}
