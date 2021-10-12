import Enemy from "../Enemy";

export default class ENEMY_RED extends Enemy {

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string} direction
     * @param {number} cooldown
     */

    constructor(scene, x, y, texture, direction, cooldown) {
        const life = 500;
        const damage_power = 50
        const velocity = 1
        super(scene, x, y, texture, velocity, life, direction, damage_power, cooldown)
    }

}