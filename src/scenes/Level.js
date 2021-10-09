// You can write more code here

import Enemy from "../enemies/Enemy";
import Base from "../classes/Base";

/* START OF COMPILED CODE */

export default class Level extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Group} */
  waveEnemies;

  /** @type {Phaser.Physics.Arcade.Sprite} */
  base;

  /** @type {Map<Array, String>} */
  pathBreakpoints;

  /** @type {Array} */
  breakpointsCoordinates;

  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  init() {
    this.base = new Base(this, 260, 318, "microship", 400);

    this.breakpointsCoordinates = new Array();
    this.pathBreakpoints = new Map();

    fetch("./src/scenes/level1.json")
      .then((response) => response.json())
      .then((json) => 
      json["level1"].forEach(element => {
        this.breakpointsCoordinates.push([element["x"],element["y"]])
        this.pathBreakpoints.set(this.breakpointsCoordinates.at(-1),element["direction"])
      })
      );
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

    this.events.emit("scene-awake");
  }

  /* START-USER-CODE */

  // Write more your code here

  create() {
    this.editorCreate();

    this.waveEnemies = this.add.group({
      classType: Enemy,
    });

    const red = new Enemy(this, 10, 360, "microship", 2, 30, "E");
    this.waveEnemies.add(red);
    this.add.existing(red);
    // this.waveEnemies.get(100,50,"microship")

    this.add.existing(this.base);

    for (let index = 0; index < this.breakpointsCoordinates.length; index++) {
      const element = this.breakpointsCoordinates[index];

      this.add.circle(element[0], element[1], 10, 0xfffff);
    }
  }

  update() {
    this.waveEnemies.children.iterate((child) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      const enemy = child;

      var key = this.breakpointsCoordinates.find(
        (element) =>
          JSON.stringify(element) == JSON.stringify([enemy.x, enemy.y])
      );

      if (key != undefined) {
        const direction = this.pathBreakpoints.get(key);
        console.log(direction);

        enemy.direction = direction;
      }

      if (enemy.direction === "E") {
        enemy.x += enemy.velocity;
      } else if (enemy.direction === "N") {
        enemy.y -= enemy.velocity;
      } else if (enemy.direction === "O") {
        enemy.x -= enemy.velocity;
      } else if (enemy.direction === "S") {
        enemy.y += enemy.velocity;
      } else if (enemy.direction === "END") {
        enemy.x = 0;
        enemy.y = 0;
        enemy.direction = "none";
        this.waveEnemies.killAndHide(enemy);
        this.base.life -= enemy.damage_power;
      }
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
