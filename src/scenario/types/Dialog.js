import ScenarioElement from "../ScenarioElement";

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
