export default class Enemy extends Phaser.GameObjects.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    * @param {number} velocity
    * @param {number} life
    * @param {string} direction
    * @param {number} damage_power
    */
    constructor(scene, x, y, texture, velocity, life, direction, damage_power) {
        super(scene, x, y, texture)
        this.setScale(0.5)
        this.velocity = velocity
        this.life = life
        this.direction = direction
        this.damage_power = damage_power
    }
 }