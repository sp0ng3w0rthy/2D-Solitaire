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
        this.data.origPos = new Phaser.Point();
        this.data.origParent = null;
        this.events.onDragStart.add((card: Card, pointer: Phaser.Pointer) => {
            card.position.copyTo(card.data.origPos);
        });
        this.events.onDragStop.add(this.checkOverlap);
        this.onPlacedInTableau = new Phaser.Signal();
        this.onPlacedInFoundation = new Phaser.Signal();
        this.onPlacedInFoundation.add(this.placeCard);
        this.onPlacedInTableau.add(this.placeCard);
    }

    placeCard(position: Phaser.Point, parent: Phaser.Group) {
        this.parent.removeChild(this);
        parent.add(this);
        this.position = position.clone();
    }

    checkOverlap(card: Card, pointer: Phaser.Pointer) {
        card.x = card.data.origPos.x;
        card.y = card.data.origPos.y;
    }
}