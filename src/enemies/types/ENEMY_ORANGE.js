import Enemy from "../Enemy.js";

export default class ENEMY_ORANGE extends Enemy {

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
        const damage_power = 100;
        const velocity = 0.5;
        super(scene, x, y, texture, frame, velocity, life, direction, damage_power, cooldown);
    }

}