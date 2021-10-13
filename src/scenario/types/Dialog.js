import ScenarioElement from "../ScenarioElement.js";

export default class Dialog extends ScenarioElement {
  /**
   * @param {[]} dialogs
   */
  constructor(dialogs) {
    super("dialog");
    this.dialogs = dialogs;
  }
}
