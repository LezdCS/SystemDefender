import Enemy from "../Enemy.js";

export default class ENEMY_RED extends Enemy {

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string} frame
     * @param {string} direction
     * @param {number} cooldown
     */

    constructor(scene, x, y, texture, frame, direction, cooldown) {
        const life = 500;
        const damage_power = 50;
        const velocity = 1;
        super(scene, x, y, texture, frame, velocity, life, direction, damage_power, cooldown);
    }

    changeSpriteDirection(scene){
        let startFrame= 0;
        let endFrame = 0;
        let directionName = "";

        switch (this.direction) {
            case "E":
                startFrame= 35;
                endFrame = 40;
                directionName = "Est";
                break;
            case "W":
                startFrame= 70;
                endFrame = 80;
                directionName = "West";
                break;
            case "N":
                startFrame= 120;
                endFrame = 140;
                directionName = "North";
                break;
            case "S":
                startFrame= 1;
                endFrame = 10;
                directionName = "South";
                break;
            case "END":
                startFrame= 1;
                endFrame = 1;
                directionName = "End";
                break;
        }

        const frameNames = scene.anims.generateFrameNames('redEnemy', {
            start: startFrame, end: endFrame, zeroPad: 0,
            prefix: '', suffix: '.png'
        });
        const anim = scene.anims.create({ key: 'redEnemy'+directionName, frames: frameNames, frameRate: 20, repeat: -1 });

        this.anims.play(anim, false);
    }

}