import * as Phaser from 'phaser-ce';
import Card from './Card';
import Game from './Game';

export default class extends Phaser.Group {

    constructor(state: Game) {
        super(state.game, null, 'deckGroup', false, true);
        for (let suit = 0; suit < 4; suit++) {
            for (let num = 0; num < 13; num++) {
                this.add(new Card(state, 0, 0, num, suit));
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