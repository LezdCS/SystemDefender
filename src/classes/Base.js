export default class Base extends Phaser.GameObjects.Sprite
{
    /**
    * @param {Phaser.Scene} scene
    * @param {number} x
    * @param {number} y
    * @param {string} texture
    * @param {number} life
    */
    constructor(scene, x, y, texture, life) {
        super(scene, x, y, texture)
        this.setScale(0.5)
        this.life = life
    }
 }