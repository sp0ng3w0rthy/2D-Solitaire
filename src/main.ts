import 'pixi';
import 'p2';
import * as Phaser from 'phaser-ce';

import GameState from './states/Game';

class Solitaire extends Phaser.Game {
    constructor() {
        super(1280, 720, Phaser.AUTO, 'content', null);
        this.state.add('Game', GameState, false);
        this.state.start('Game');
    }
}

window.onload = () => {
    let game = new Solitaire();
};
