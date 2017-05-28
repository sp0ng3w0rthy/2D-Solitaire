import * as Phaser from 'phaser-ce';

export default class extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, cardNum: number, suit: number) {
        super(game, x, y, 'deck', cardNum + (suit * 13));
    }

}