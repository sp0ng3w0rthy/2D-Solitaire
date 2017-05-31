import * as Phaser from 'phaser-ce';
import Card from './Card';
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
        let tabCardPoint = point.clone();
        for (let i = 0; i < numOfCards; i++) {
            let card: Card = state.deck.drawRandomCard();
            this.add(card);
            card.x = tabCardPoint.x;
            card.y = tabCardPoint.y;
            if (i + 1 === numOfCards) {
                card.loadTexture('deck', card.frameIndex);
                card.inputEnabled = true;
                card.input.useHandCursor = true;
                card.input.enableDrag();
            }
            tabCardPoint.add(0, 30);
        }
    }

}