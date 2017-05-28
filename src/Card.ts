import * as Phaser from 'phaser-ce';
import Card from './Card';
export default class extends Phaser.Sprite {

    private onPlacedInFoundation: Phaser.Signal;
    private onPlacedInTableau: Phaser.Signal;

    constructor(game: Phaser.Game, x: number, y: number, cardNum: number, suit: number) {
        super(game, x, y, 'back');

        this.data.cardNum = cardNum + 1;
        this.data.topCard = false;
        this.data.suit = suit;
        this.data.color = (suit === 0 || suit === 2) ? 'black' : 'red';
        this.data.facedUp = false;
        this.data.frameIndex = cardNum + (suit * 13);
        this.data.origPos = null;
        this.data.origParent = null;
        this.events.onDragStart.add(this.setPreDragValues, this);
        this.events.onDragStop.add(this.checkOverlap, this);
        this.onPlacedInTableau = new Phaser.Signal();
        this.onPlacedInFoundation = new Phaser.Signal();
        this.onPlacedInFoundation.add(this.placeCard, this);
        this.onPlacedInTableau.add(this.placeCard, this);
    }

    public placeCard(position: Phaser.Point, parent: Phaser.Group) {
        this.parent.removeChild(this);
        parent.add(this);
        this.position = position.clone();
    }

    private setPreDragValues() {
        this.data.origPos = this.position.clone();
        this.data.origParent = this.parent;
        this.data.chosenCard.add(this);
    }

    private checkOverlap(card: Card, pointer: Phaser.Pointer) {
        let pile;
        let tableau;
        pile = card.game.data.piles.list.filter(function (pile) {
            return card.game.physics.arcade.overlap(this, pile);
        }, this).pop();
        tableau = card.game.data.tableaus.list.filter(function (tableau) {
            return card.game.physics.arcade.overlap(this, tableau);
        }, this).pop();
        if (pile != null) {
            this.placedInPile.dispatch(pile);
        } else if (tableau != null) {
            this.placedInTableau.dispatch(tableau, this);
        } else {
            this.data.origParent.add(this);
            this.position = this.data.origPos.clone();
        }
    }
}