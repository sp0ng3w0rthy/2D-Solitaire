import * as Phaser from 'phaser-ce';

export default class extends Phaser.Group {

    /**
     * @param {Phaser.Game} game
     * @param {number} firstCardX
     * @param {number} firstCardY
     * @param {number} suitIndex
     */
    constructor(game: Phaser.Game, firstCardX: number, firstCardY: number, suitIndex: number) {
        super(game);
    }

}