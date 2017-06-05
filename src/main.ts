import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';
import PlayState from './PlayState';

class Game extends Phaser.Game {
    public constructor() {
        super(1280, 720, Phaser.AUTO);
        this.state.add('Game', PlayState, true);
    }
}

window.onload = () => {
    this.window = new Game();
};
