import Enemy from "../../enemies/Enemy";
import ScenarioElement from "../ScenarioElement";


export default class Wave extends ScenarioElement {

  constructor() {
    super("wave");
    this._enemies = [];
  }

  addEnemy(enemy){
    this.enemies.push(enemy)
  }

  get enemies() {
    return this._enemies;
  }
}
