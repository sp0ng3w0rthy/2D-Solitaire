import * as Phaser from 'phaser-ce';
import SUITS from './globals';
import PlayState from './PlayState';
import Card from './Card';

/**
 * Represents a Foundation group
 * @class
 * @extends Phaser.Group
 */
class Foundation extends Phaser.Group {

    suit: number;

    public constructor(state: PlayState, point: Phaser.Point, suitIndex: number) {
        super(state.game);
        this.suit = suitIndex;
        this.enableBody = true;
        let placeHolder = new Phaser.Sprite(state.game, point.x, point.y, SUITS[suitIndex]);
        placeHolder.scale.add(0.3, 0.3);
        placeHolder.alpha = 0.8;
        this.add(placeHolder);
        this.getTop().cardNum = 0;
    }

    public handleCard(card: Card) {
        if (this.suit === card.suit && card.cardNum - 1 === this.getTop().cardNum) {
            let topCardPosition = new Phaser.Point();
            let topCard = this.getAt(this.children.length - 1) as Card;
            topCardPosition.copyFrom(topCard.position);
            topCardPosition.add(3, 3);
            this.add(card);
            card.position.copyFrom(topCardPosition);
        } else {
            card.resetPosition();
        }
    }
}

export default Foundation;