import ScenarioElement from "../ScenarioElement";

export default class Dialog extends ScenarioElement {
  /**
   * @param {Map<String, String>} textToSay
   */
  constructor(textToSay) {
    super("dialog");
    this.textToSay = textToSay;
  }
}
