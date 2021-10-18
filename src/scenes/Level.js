// You can write more code here

import Enemy from "../enemies/Enemy.js";
import EpfMainframe from "../EpfMainframe/EpfMainframe.js";

import Scenario from "../scenario/Scenario.js";
import Dialog from "../scenario/types/Dialog.js";
import Wave from "../scenario/types/Wave.js";
import ENEMY_RED from "../enemies/types/ENEMY_RED.js";
import ENEMY_ORANGE from "../enemies/types/ENEMY_ORANGE.js";

export default class Level extends Phaser.Scene {
	/** @type {Phaser.GameObjects.Group} */
	waveEnemies;

	/** @type {EpfMainframe} */
	EpfMainframe;
	/** @type {Phaser.GameObjects.Image} */
	mainFrameSprite;

	/** @type {Map<Array, String>} */
	pathBreakpoints =  new Map();
	/** @type {Array} */
	breakpointsCoordinates = [];

	/** @type {Scenario} */
	scenario = new Scenario();
	textSpeaker;

	/** @type {Phaser.GameObjects.Sprite} */
	towerspot;

    /** @type {Phaser.GameObjects.Image} */
    stripes;

	constructor() {
		super("Level");
	}

	init() {

	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(386, 221, "background");

		// towerSpots
		this.add.image(366, 232, "towerSpots");

		// shadow
		this.add.image(384, 245, "shadow");

		// mainframe
		this.mainFrameSprite = this.add.image(244, 317, "mainframe");

		// stripes
		this.stripes = this.add.image(381, 238, "stripes");

		// contour
		this.add.image(386, 240, "contour");

		this.events.emit("scene-awake");
	}

	preload(){

		this.waveEnemies = this.add.group({
			classType: Enemy,
		});

		this.EpfMainframe = new EpfMainframe(this.mainFrameSprite, 400);

		this.load.json('path', './src/scenes/level1.json');
		this.load.json('scenario', './src/scenes/level1_scenario.json');

		this.load.multiatlas('towerspot', 'assets/towerspot.json', 'assets');

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
						let mapDialog = [];
						element["dialogs"].forEach(property=> {
							mapDialog.push([property[0], property[1], property[2]])
						})

						const dialog = new Dialog(mapDialog);
						this.scenario.addElement(dialog);
						break;
					case "Wave":
						const wave = new Wave();
						element["enemies"].forEach(property=> {
							let enemy;
							switch (property["enemy_type"]) {
								case "red":
									enemy = new ENEMY_RED(this, 10, 360, "redEnemy", "E", property["cooldown"]);
									break;
								case "orange":
									enemy = new ENEMY_ORANGE(this, 10, 360, "orangeEnemy", "E", property["cooldown"]);
									break;
							}

							wave.addEnemy(enemy);

						})
						this.scenario.addElement(wave);
						break;
				}
			}
		)

		this.editorCreate();

		for (let index = 0; index < this.breakpointsCoordinates.length; index++) {
			const element = this.breakpointsCoordinates[index];

			this.add.circle(element[0], element[1], 10, 0xfffff);
		}

		this.scenario.elementToPlay = this.scenario.elements[0]

		this.textSpeaker = this.add.text(80, 420, 'Player Coords');

		this.towerspot = this.add.sprite(100, 400, 'towerspot', 'towerspot/1.png');

		const frameNames = this.anims.generateFrameNames('towerspot', {
			start: 1, end: 19, zeroPad: 0,
			prefix: '', suffix: '.png'
		});

		this.anims.create({ key: 'towerspot', frames: frameNames, frameRate: 20, repeat: -1 });
		this.towerspot.anims.play('towerspot');

	}

	createWave(scene,wave){
		console.log("creating wave")
		let time = 0
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
			console.log("WAVE")
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
					this.waveEnemies.clear();
					let nextDialog = this.scenario.elements[this.scenario.elements.indexOf(this.scenario.currentElement )+1]
					if(nextDialog){
						this.scenario.elementToPlay = nextDialog;
					}else{
						console.log("GG !!!!!!!");
					}
				}
			});
		}else if(this.scenario.elementToPlay.constructor.name === "Dialog" && this.scenario.currentElement !== this.scenario.elementToPlay){
			this.scenario.currentElement = this.scenario.elementToPlay
			console.log("DIALOG")
			let time = 0;
			let scene = this;

			this.scenario.currentElement.dialogs.forEach((element)=> {
				setTimeout(function () {
						scene.textSpeaker.setText(
							element[1]
						)
					}
					, time + element[2])
				time += element[2]
			})

			let nextWave = this.scenario.elements[this.scenario.elements.indexOf(this.scenario.currentElement )+1]
			if(nextWave){
				//load la barre du bas de progression d'arrivée d'enemeies
				this.createWave(this,nextWave);
				this.scenario.elementToPlay = nextWave;
			}
		}
	}

}

