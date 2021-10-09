class Scenario {
  /**
   * @param {ScenarioElements[]} elements
   */
  constructor(elements) {
    this.elements = elements;
  }

  addElement(element) {
    this.elements.push(element);
  }

  deleteElement(element) {
    const index = this.elements.indexOf(element);
    if (index > -1) {
      this.elements.splice(index);
    }
  }

  getElement(index) {
    return this.elements[index];
  }
}
