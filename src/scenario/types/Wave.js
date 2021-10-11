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
    this._enemies = enemies;
  }

  addEnemy(enemy){
    this._enemies.add(enemy)
  }

  get enemies() {
    return this._enemies;
  }
}
