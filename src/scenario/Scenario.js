export default class Scenario {
  /**
   * @param {ScenarioElement[]} elements
   */
  constructor(elements) {
    if(elements===undefined){
      this._elements = []
    }else{
      this._elements = elements;
    }
    this._elements = elements;
  }

  addElement(element) {
    this._elements.push(element);
  }

  deleteElement(element) {
    const index = this._elements.indexOf(element);
    if (index > -1) {
      this._elements.splice(index);
    }
  }

  getElement(index) {
    return this._elements[index];
  }


  get elements() {
    return this._elements;
  }
}
