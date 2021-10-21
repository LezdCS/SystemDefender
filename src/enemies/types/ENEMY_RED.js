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
        let frameNames;
        let anim;

        switch (this.direction) {
            case "E":
                 frameNames = scene.anims.generateFrameNames('redEnemy', {
                    start: 35, end: 45, zeroPad: 0,
                    prefix: '', suffix: '.png'
                });
                anim = scene.anims.create({ key: 'redEnemyEst', frames: frameNames, frameRate: 20, repeat: -1 });
                break;
            case "W":
                frameNames = scene.anims.generateFrameNames('redEnemy', {
                    start: 70, end: 80, zeroPad: 0,
                    prefix: '', suffix: '.png'
                });
                anim = scene.anims.create({ key: 'redEnemyWest', frames: frameNames, frameRate: 20, repeat: -1 });
                break;
            case "N":
                frameNames = scene.anims.generateFrameNames('redEnemy', {
                    start: 120, end: 140, zeroPad: 0,
                    prefix: '', suffix: '.png'
                });
                anim = scene.anims.create({ key: 'redEnemyNorth', frames: frameNames, frameRate: 20, repeat: -1 });
                break;
            case "S":
                frameNames = scene.anims.generateFrameNames('redEnemy', {
                    start: 1, end: 10, zeroPad: 0,
                    prefix: '', suffix: '.png'
                });
                anim = scene.anims.create({ key: 'redEnemySouth', frames: frameNames, frameRate: 20, repeat: -1 });
                break;
            case "END":
                frameNames = scene.anims.generateFrameNames('redEnemy', {
                    start: 1, end: 1, zeroPad: 0,
                    prefix: '', suffix: '.png'
                });
                anim = scene.anims.create({ key: 'redEnemySouth', frames: frameNames, frameRate: 20, repeat: -1 });
                break;

        }

        this.anims.play(anim, false);
    }

}