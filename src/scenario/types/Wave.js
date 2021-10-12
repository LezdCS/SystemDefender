import Enemy from "../../enemies/Enemy";
import ScenarioElement from "../ScenarioElement";


export default class Wave extends ScenarioElement {
  /**
   * @param {Map<Enemy, number>} enemies
   */
  constructor(enemies) {
    super("wave");
    if(enemies===undefined){
      this._enemies = [];
    }else{
      this._enemies = enemies;
    }
  }

  addEnemy(enemy){
    this.enemies.push(enemy)
  }

  get enemies() {
    return this._enemies;
  }
}
