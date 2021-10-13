import ScenarioElement from "../ScenarioElement.js";

export default class Dialog extends ScenarioElement {
  /**
   * @param {String} speaker
   * @param {String} text
   */
  constructor(speaker, text) {
    super("dialog");
    this.speaker = speaker;
    this.text = text
  }
}
