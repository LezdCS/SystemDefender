export default class Scenario {

  constructor() {
    this.elements = []
    this.currentElement = null;
    this.elementToPlay = null;
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


  getElements() {
    return this.elements;
  }
}
