import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';
import PlayState from './Game';

class Solitaire extends Phaser.Game {
    public constructor() {
        super(1280, 720, Phaser.AUTO, 'content', null);
        this.state.add('Game', PlayState, true);
    }
}

window.onload = () => {
    let game = new Solitaire();
};
