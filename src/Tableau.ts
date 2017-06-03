import * as Phaser from 'phaser-ce';
import PlayState from './PlayState';
import Card from './Card';

/**
 * Represents a Tableau
 * @class Tableau
 * @extends Phaser.Group
 */
class Tableau extends Phaser.Group {

    /**
     * @param {PlayState} game
     * @param {number} firstCardX
     * @param {number} firstCardY
     * @param {number} suitIndex
     */
    public constructor(state: PlayState, numOfCards: number, point: Phaser.Point) {
        super(state.game, null);
        let tabCardPoint = point.clone();
        let placeHolder = new Phaser.Sprite(this.game, tabCardPoint.x - 5, tabCardPoint.y - 3, 'placeholder');
        placeHolder.alpha = 0.6;
        placeHolder.scale.add(0.3, 0.3);
        this.add(placeHolder);
        for (let i = 0; i < numOfCards; i++) {
            let card: Card = state.deck.getCard();
            this.add(card);
            card.x = tabCardPoint.x;
            card.y = tabCardPoint.y;
            if (i + 1 === numOfCards) {
                card.initCard();
            }
            tabCardPoint.add(0, 20);
        }
    }

    public handleCard = (card: Card) => {
        let topCard: Card = this.getTop();
        let placingCondition = (topCard.cardNum === card.cardNum + 1 && topCard.color !== card.color) || (this.length === 1 && card.cardNum === 13);
        if (!placingCondition) {
            card.resetPosition();
            return;
        }
        let topCardPoint = new Phaser.Point();
        let x = this.length === 1 ? 3 : 0;
        let y = this.length === 1 ? 3 : 30;
        topCardPoint.copyFrom(topCard.position);
        topCardPoint.add(0, y);
        this.add(card);
        card.position.copyFrom(topCardPoint);
    }
}

export default Tableau;