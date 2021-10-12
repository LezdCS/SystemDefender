import Tower from "../Tower";

const _type = "RocketTower";

/**
 * @param {Phaser.Scene} scene
 * @param {number} x
 * @param {number} y
 * @param {string} texture
 */
class RocketTower extends Tower {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.setScale(0.5);

    this.damages = [8, 10, 12];
    this.ranges = [180, 200, 220];
    this.rates = [2500, 1750, 1000];
    this._damage = this.damages[0];
    this._range = this.ranges[0];
    this._delay = this.rates[0];
  }
}
