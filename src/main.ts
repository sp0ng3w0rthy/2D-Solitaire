import 'pixi';
import 'p2';
import Phaser from 'phaser';
import GameState from './Game';

class Solitaire extends Phaser.Game {
    constructor() {
        super(1280, 720, Phaser.AUTO, '', null);
        this.state.add('Game', GameState, false);
        this.state.start('Game');
    }
}
window.game = new Solitaire();