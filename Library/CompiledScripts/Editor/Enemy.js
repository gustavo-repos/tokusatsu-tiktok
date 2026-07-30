const APJS = globalThis.orion['@orion/orion-sdk/EditorFramework'].APJS;

const {BasicScriptNode} = require('./BasicScriptNode');
const {
  customNode,
  component,
  input,
  output,
  serializeSceneObjectFlag,
  serializeProperty,
  label, readOnly, slider, spinBox, dropDown,
  textArea, header, showIf, tooltip, separator,
  space, groupBegin, groupEnd, disablePin,
} = require('./OrionDecorators');

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const Game_1 = require("Game");
// export var time = 35
// export var startTimer = false
let Enemy = class Enemy extends APJS.BasicScriptComponent {
    constructor() {
        super(...arguments);
        this.accumulator = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 3;
        this.playerAttackingTimer = 0;
        this.playerAttackingInterval = 0.4;
        // time = 35
        //startTimer = false
        // spawnSpots = [[117 / PPU, 104 / PPU], [396 / PPU, 104 / PPU], [-396 / PPU, 104 / PPU], [-117 / PPU, 104 / PPU], [-256 / PPU, 333 / PPU], [256 / PPU, 333 / PPU]]
        this.spawnSpots = [[117 / Game_1.PPU, 114 / Game_1.PPU], [396 / Game_1.PPU, 114 / Game_1.PPU], [-396 / Game_1.PPU, 114 / Game_1.PPU], [-117 / Game_1.PPU, 114 / Game_1.PPU], [-256 / Game_1.PPU, 343 / Game_1.PPU], [256 / Game_1.PPU, 343 / Game_1.PPU]];
        this.enemyWasHit = false;
        this.points = 0;
    }
    getPlayerRect() {
        var center = this.playerObj.getTransform().getWorldPosition();
        if (center) {
            return [center.x, center.y, this.playerWidth * 0.75, this.playerHeight];
        }
    }
    getRandomItem(el) {
        return el[Math.floor(Math.random() * el.length)];
    }
    setCurrentSpot(el) {
        var newSpot = this.getRandomItem(el);
        if (newSpot != this.currentSpot) {
            this.currentSpot = newSpot;
        }
        else {
            this.setCurrentSpot(el);
        }
    }
    onStart() {
        this.playerObj = this.getSceneObject().scene.findSceneObject('player');
        this.transform = this.playerObj.getComponent('ScreenTransform');
        this.playerWidth = this.transform.sizeDelta.x / Game_1.PPU;
        this.playerHeight = this.transform.sizeDelta.y / Game_1.PPU;
        this.enemyScene = this.getSceneObject().scene.findSceneObject('enemy');
        this.scenePoints = this.getSceneObject().scene.findSceneObject('points');
    }
    onUpdate(deltaTime) {
        deltaTime = Math.min(deltaTime, 0.25);
        this.accumulator += deltaTime;
        if (Game_1.resetPressed) {
            this.accumulator = 0;
            this.spawnTimer = 0;
            this.spawnInterval = 3;
            this.playerAttackingTimer = 0;
            this.playerAttackingInterval = 0.4;
            this.enemyWasHit = false;
            this.points = 0;
            this.scenePoints.name = 'points';
        }
        while (this.accumulator >= Game_1.fixedTime) {
            this.spawnTimer += Game_1.fixedTime;
            if (Game_1.substate == 4)
                this.playerAttackingTimer += Game_1.fixedTime;
            if (this.playerAttackingTimer >= this.playerAttackingInterval) {
                (0, Game_1.setSubstate)(3);
                this.playerAttackingTimer = 0;
            }
            if (!this.enemyWasHit) {
                this.enemyScene.name = 'enemy';
            }
            if (!this.enemyWasHit && (0, Game_1.checkRectOverlap)(this.getPlayerRect(), (0, Game_1.getElementRect)(this.getSceneObject(), 0))) {
                (0, Game_1.startTimer)();
                (0, Game_1.setSubstate)(4);
                this.points++;
                // conect.name = this.points.toString()
                //this.scenePoints.name = this.points.toString()
                if (this.points == 3) {
                    this.scenePoints.name = 'energybar1';
                }
                else if (this.points == 6) {
                    this.scenePoints.name = 'energybar2';
                }
                else if (this.points == 9) {
                    this.scenePoints.name = 'energybar3';
                }
                else if (this.points == 12) {
                    this.scenePoints.name = 'energybar4';
                }
                else if (this.points == 15) {
                    this.scenePoints.name = 'energybar5';
                }
                else if (this.points == 18) {
                    this.scenePoints.name = 'energybar6';
                }
                this.enemyScene.name = 'hit';
                this.enemyWasHit = true;
                this.spawnTimer = 1;
                this.spawnInterval = 3;
                if (this.points == 8) {
                    (0, Game_1.addTime)(15);
                    // adicionar visual tempo aumentando!
                }
                else if (this.points == 12) {
                    (0, Game_1.addTime)(10);
                    // adicionar visual tempo aumentando!
                }
                else if (this.points == 18) {
                    // adiocionar o KO!
                }
            }
            if (this.spawnTimer >= this.spawnInterval) {
                //console.log(this.spawnTimer, this.spawnInterval)
                // this.currentSpot = this.getRandomItem(this.spawnSpots)
                this.setCurrentSpot(this.spawnSpots);
                (0, Game_1.teleport)(this.getSceneObject(), this.currentSpot[0], this.currentSpot[1]);
                this.spawnTimer = 0;
                this.enemyScene.name = 'respawn';
                this.enemyWasHit = false;
                if (this.points == 4) {
                    this.spawnInterval = 2.5;
                }
                else if (this.points == 8) {
                    // this.spawnInterval = 2.3
                    this.spawnInterval = 2.0;
                }
                else if (this.points == 12) {
                    // this.spawnInterval = 2
                    this.spawnInterval = 1.6;
                }
                else if (this.points == 25) {
                    // adiocionar o KO!
                }
            }
            this.accumulator -= Game_1.fixedTime;
        }
    }
};
Enemy = __decorate([
    component()
], Enemy);
exports.Enemy = Enemy;
