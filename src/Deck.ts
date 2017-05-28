import * as Phaser from 'phaser-ce';
import Card from './Card';

export default class extends Phaser.Group {

    constructor(game: Phaser.Game) {
        super(game);
        this.enableBody = true;
        for (let suit = 0; suit < 4; suit++) {
            for (let num = 0; num < 13; num++) {
                this.add(new Card(game, 0, 0, num, suit));
            }
        }
        this.setAll('snapOnDrag', false);
        this.setAll('inputEnabled', true);
        this.setAll('input.draggable', false);
    }

    /**
     * @param {Phaser.Game} game
     * @returns {Card}
     */
    public drawRandomCard(game: Phaser.Game) {
        return this.getAt(game.rnd.integerInRange(0, this.children.length - 1));
        // card.worldPosition = point.clone();
        // card.data.origPos = card.worldPosition.clone();
        // if (flip) {
        //     card.loadTexture('deck', card.data.frameIndex);
        //     card.input.draggable = true;
        // }
        // this.add.existing(card);
        // return card;
    }

}