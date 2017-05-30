import * as Phaser from 'phaser-ce';
import Game from './Game';

export default class extends Phaser.Group {

    /**
     * @param {Phaser.Game} game
     * @param {number} firstCardX
     * @param {number} firstCardY
     * @param {number} suitIndex
     */
    constructor(state: Game, numOfCards: number, point: Phaser.Point) {
        super(state.game, null);
        for (let i = 0; i < numOfCards; i++) {
            let card = state.deck.drawRandomCard();
            card.x = point.x;
            card.y = point.y;
            point.add(100, 0);
        }
    }

}