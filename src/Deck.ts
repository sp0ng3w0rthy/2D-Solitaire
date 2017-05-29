import * as Phaser from 'phaser-ce';
import Card from './Card';

export default class extends Phaser.Group {

    constructor(game: Phaser.Game) {
        super(game, null, 'deckGroup', false, true);
        for (let suit = 0; suit < 4; suit++) {
            for (let num = 0; num < 13; num++) {
                this.add(new Card(game, 0, 0, num, suit));
            }
        }
        this.setAll('snapOnDrag', false);
        this.setAll('inputEnabled', true);
        this.setAll('input.draggable', false);
    }

    public drawRandomCard() {
        return this.getRandom();
    }

}