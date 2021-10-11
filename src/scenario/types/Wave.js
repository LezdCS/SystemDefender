import Enemy from "../../enemies/Enemy";
import ScenarioElement from "../ScenarioElement";


export default class Wave extends ScenarioElements {
  /**
   * @param {Map<Enemy, number>} enemies
   */
  constructor(enemies) {
    super("wave");
    this.enemies = enemies;
  }
}
