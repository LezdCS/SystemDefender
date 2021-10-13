// You can write more code here

import Enemy from "../enemies/Enemy.js";
import EpfMainframe from "../EpfMainframe/EpfMainframe.js";

import Scenario from "../scenario/Scenario.js";
import Dialog from "../scenario/types/Dialog.js";
import Wave from "../scenario/types/Wave.js";
import ENEMY_RED from "../enemies/types/ENEMY_RED.js";

export default class Level extends Phaser.Scene {
  /** @type {Phaser.GameObjects.Group} */
  waveEnemies;

  /** @type {EpfMainframe} */
  EpfMainframe;

  /** @type {Map<Array, String>} */
  pathBreakpoints =  new Map();

  /** @type {Array} */
  breakpointsCoordinates = [];

  /** @type {Scenario} */
  scenario = new Scenario();

  constructor() {
    super("Level");
  }

  init() {

  }

  /** @returns {void} */
  editorCreate() {

    // background
    this.add.image(386, 221, "background");

    // path
    this.add.image(366, 210, "path");

    // towerSpots
    this.add.image(366, 232, "towerSpots");

    // microship
    this.add.image(32, 422, "microship");

    // microship_3
    this.add.image(159, 439, "microship");

    // microship_1
    this.add.image(487, 466, "microship");

    // microship_2
    this.add.image(612, 466, "microship");

    // shadow
    this.add.image(384, 245, "shadow");

    // contour
    this.add.image(381, 240, "contour");

    this.events.emit("scene-awake");
  }

  preload(){

    this.waveEnemies = this.add.group({
      classType: Enemy,
    });

    this.EpfMainframe = new EpfMainframe(this, 260, 318, "microship", 400);

    this.load.json('path', './src/scenes/level1.json');
    this.load.json('scenario', './src/scenes/level1_scenario.json');

  }

  create() {

    const path = this.cache.json.get('path');
    path["level1"].forEach((element)=>
        {
          this.breakpointsCoordinates.push([element["x"], element["y"]]);
          this.pathBreakpoints.set(
              this.breakpointsCoordinates.at(-1),
              element["direction"]
          );
        }
    )

    const scenario = this.cache.json.get('scenario');
    scenario["Scenario"].forEach((element)=>
        {
          switch(element["type"]){
            case "Dialog":
              const dialog = new Dialog(element["speaker"], element["text"]);
              this.scenario.addElement(dialog);
              break;
            case "Wave":
              const wave = new Wave();
              element["enemies"].forEach(property=> {
                if(property["enemy_type"]==="red"){
                  const enemy = new ENEMY_RED(this, 10, 360, "microship", "E", property["cooldown"]);
                  wave.addEnemy(enemy);
                }
              })
              this.scenario.addElement(wave);
              break;
          }
        }
    )

    this.editorCreate();

    this.add.existing(this.EpfMainframe);

    for (let index = 0; index < this.breakpointsCoordinates.length; index++) {
      const element = this.breakpointsCoordinates[index];

      this.add.circle(element[0], element[1], 10, 0xfffff);
    }

    this.createWave(this,this.scenario.elements[1])
    this.scenario.elementToPlay = this.scenario.elements[1]
  }

  createWave(scene,wave){
    let time = scene.time.now
    wave.enemies.forEach((enemy)=>{

      setTimeout(function (){
            scene.add.existing(enemy)
            scene.waveEnemies.add(enemy)
          }
          ,time + enemy.cooldown)

      time += enemy.cooldown
    })
  }

  update() {
    if(this.scenario.elementToPlay.constructor.name === "Wave"){
      this.scenario.currentElement = this.scenario.elementToPlay
      this.waveEnemies.children.iterate((child) => {
        /** @type {Enemy} */
        const enemy = child;

        const key = this.breakpointsCoordinates.find(
            (element) =>
                JSON.stringify(element) === JSON.stringify([enemy.x, enemy.y])
        );

        if (key !== undefined) {
          enemy.direction = this.pathBreakpoints.get(key);
        }

        switch (enemy.direction) {
          case "E":
            enemy.x += enemy.velocity;
            break;
          case "N":
            enemy.y -= enemy.velocity;
            break;
          case "O":
            enemy.x -= enemy.velocity;
            break;
          case "S":
            enemy.y += enemy.velocity;
            break;
          case "END":
            enemy.x = 0;
            enemy.y = 0;
            enemy.direction = "none";
            this.waveEnemies.killAndHide(enemy);
            this.EpfMainframe.life -= enemy.damage_power;
            break;
        }

        if(this.waveEnemies.getTotalUsed() === 0){
          this.scenario.elementToPlay = this.scenario.elements[2]
        }
      });
    }else if(this.scenario.elementToPlay.constructor.name === "Dialog" && this.scenario.currentElement !== this.scenario.elementToPlay){
      this.scenario.currentElement = this.scenario.elementToPlay
      console.log("DIALOG")
      //play texts
      //timeout du Dialog avant de lancer la wave suivante
      //play next wave
    }
  }

}

