import Level from "../src/scenes/Level";

window.addEventListener("load", function () {
  var game = new Phaser.Game({
    width: 782,
    height: 495,
    type: Phaser.AUTO,
    backgroundColor: "#242424",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
  });

  game.scene.add("Level", Level);
  game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "assets/asset-pack.json");

    this.load.on(Phaser.Loader.Events.COMPLETE, () =>
      this.scene.start("Level")
    );
  }
}
