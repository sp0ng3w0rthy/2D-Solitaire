import * as Phaser from 'phaser-ce';
import Card from './Card';
import Game from './Game';

class Deck extends Phaser.Group {

    state: Game;

    public constructor(state: Game) {
        super(state.game, null, 'deckGroup', false, true);
        this.state = state;
        for (let suit = 0; suit < 4; suit++) {
            for (let num = 0; num < 13; num++) {
                this.add(new Card(state, 0, 0, num + 1, suit));
            }
        }
        this.setAll('snapOnDrag', false);
        this.setAll('inputEnabled', true);
        this.setAll('input.draggable', false);
    }

    public drawCard = () => {
        if (this.children.length === 0) {
            let wasteCards = this.state.waste.getAll();
            this.state.waste.removeAll();
            wasteCards.forEach((card: Card) => {
                this.add(new Card(this.state, 0, 0, card.cardNum, card.suit));
                card.destroy();
            });
            this.setAll('snapOnDrag', false);
            this.setAll('inputEnabled', true);
            this.setAll('input.draggable', false);
            return;
        }
        let randCard: Card = this.getCard();
        this.removeChild(randCard);
        this.state.waste.add(randCard);
        randCard.initCard();
        randCard.x = 150;
        randCard.y = 20;
    }

    public getCard = () => {
        return this.getRandom();
    }

}

export default Deck;