import { fixedTime, conect } from "Game"

var isTimerRunning = false

export function startTimer() {
  console.log('startTimer running')
  //if (isTimerRunning) isTimerRunning = true
}

@component()
export class Time extends APJS.BasicScriptComponent {

  time = 35
  isTimerRunning = false
  accumulator = 0

  onStart() {
    
  }

  onUpdate(deltaTime: number) {
    
    deltaTime = Math.min(deltaTime, 0.25)
    this.accumulator += deltaTime

    while (this.accumulator >= fixedTime) {
      
      //console.log(fixedTime)
      if (this.isTimerRunning && this.time >= 0) {
        this.time -= fixedTime
        //console.log('teste')
        conect.name = Math.round(this.time).toString()
      }

      this.accumulator -= fixedTime
    }

  }

}