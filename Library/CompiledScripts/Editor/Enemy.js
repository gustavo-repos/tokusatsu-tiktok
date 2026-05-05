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
let Enemy = class Enemy extends APJS.BasicScriptComponent {
    constructor() {
        super(...arguments);
        this.accumulator = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 2;
        this.spawnSpots = [[117 / Game_1.PPU, 104 / Game_1.PPU], [396 / Game_1.PPU, 104 / Game_1.PPU], [-396 / Game_1.PPU, 104 / Game_1.PPU], [-117 / Game_1.PPU, 104 / Game_1.PPU], [-256 / Game_1.PPU, 333 / Game_1.PPU], [256 / Game_1.PPU, 333 / Game_1.PPU]];
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
    }
    onUpdate(deltaTime) {
        deltaTime = Math.min(deltaTime, 0.25);
        this.accumulator += deltaTime;
        while (this.accumulator >= Game_1.fixedTime) {
            this.spawnTimer += Game_1.fixedTime;
            if (!this.enemyWasHit && (0, Game_1.checkRectOverlap)(this.getPlayerRect(), (0, Game_1.getElementRect)(this.getSceneObject(), 0))) {
                console.log('hit');
                this.points++;
                Game_1.conect.name = this.points.toString();
                this.enemyWasHit = true;
            }
            if (this.spawnTimer >= this.spawnInterval) {
                // this.currentSpot = this.getRandomItem(this.spawnSpots)
                this.setCurrentSpot(this.spawnSpots);
                (0, Game_1.teleport)(this.getSceneObject(), this.currentSpot[0], this.currentSpot[1]);
                this.spawnTimer = 0;
                this.enemyWasHit = false;
            }
            this.accumulator -= Game_1.fixedTime;
        }
    }
};
Enemy = __decorate([
    component()
], Enemy);
exports.Enemy = Enemy;
