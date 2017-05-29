import * as Phaser from 'phaser-ce';

/**
 * Represents a Foundation group
 * @export
 * @class
 * @extends Phaser.Group
 */
export default class extends Phaser.Group {

    suit: number;

    /**
     * @param {Phaser.Game} game
     * @param {number} suitIndex
     */
    constructor(game: Phaser.Game, suitIndex: number) {
        super(game, undefined, 'foundation', true, true);
        this.suit = suitIndex;
    }

}