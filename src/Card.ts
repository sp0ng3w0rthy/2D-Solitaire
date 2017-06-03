import * as Phaser from 'phaser-ce';
import SUITS from './globals';
import PlayState from './PlayState';
import Tableau from './Tableau';
import Foundation from './Foundation';

/**
 * Represents a Card class
 * @class Card
 * @extends {Phaser.Sprite}
 */
class Card extends Phaser.Sprite {

    static SUITS = SUITS;

    public state: PlayState;
    public cardNum: number;
    public topCard: boolean;
    public suit: number;
    public color: string;
    public frameIndex: number;
    public prevPoint: Phaser.Point;
    public prevParent: Phaser.Group;
    public facedDown: boolean;

    public constructor(state: PlayState, x: number, y: number, cardNum: number, suitIndex: number) {
        super(state.game, x, y, 'back');
        this.scale.add(0.3, 0.3);
        this.state = state;
        this.suit = suitIndex;
        this.facedDown = true;
        this.cardNum = cardNum;
        this.prevPoint = new Phaser.Point();
        this.frameIndex = cardNum - 1 + (suitIndex * 13);
        this.color = (suitIndex === 0 || suitIndex === 2) ? 'black' : 'red';
        this.events.onInputDown.add(this.flipCard);
        this.events.onDragStop.add(this.checkOverlap);
        this.events.onDragStart.add(this.setPreviousValues);
        this.events.onDragStart.add(this.initDrag);
    }

    public flipCard = (card: Card, pointer: Phaser.Pointer) => {
        if (card.facedDown && card.parent.getChildIndex(card) === card.parent.children.length - 1) {
            card.facedDown = false;
            card.initCard();
        }
    }

    public initCard = () => {
        this.loadTexture('deck', this.frameIndex);
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag();
    }

    private initDrag = (card: Card, pointer: Phaser.Pointer) => {
        if (card.parent.children.length - 1 !== card.parent.getChildIndex(card)) {
            let siblingsAbove = card.parent.children.slice(card.parent.getChildIndex(card), card.parent.children.length);
            siblingsAbove.forEach((c: Card) => {
                card.addChild(c);
                c.x = 0;
                c.y = 20;
            });
        }
        card.parent.removeChild(card);
        card.game.add.existing(card);
    }

    public resetPosition = () => {
        if (this.children.length !== 0) {
            this.children.forEach((childCard: Card) => {
                this.removeChild(childCard);
                childCard.prevParent.add(childCard);
                childCard.position.copyFrom(childCard.prevPoint);
            });
        }
        this.prevParent.add(this);
        this.position.copyFrom(this.prevPoint);
    }

    private setPreviousValues = (card: Card, pointer: Phaser.Pointer) => {
        card.prevParent = card.parent as Phaser.Group;
        card.position.copyTo(card.prevPoint);
    }

    private checkOverlap = (card: Card, pointer: Phaser.Pointer) => {
        let overlappedTableau: Tableau = this.state.tableaus.filter((tableau) => {
            return card.overlap(tableau);
        }).pop();
        let overlappedFoundation: Foundation = this.state.foundations.filter((foundation) => {
            return card.overlap(foundation);
        }).pop();
        if (overlappedTableau !== undefined) {
            overlappedTableau.handleCard(card);
        } else if (overlappedFoundation !== undefined) {
            overlappedFoundation.handleCard(card);
        } else {
            this.resetPosition();
        }
    }
}

export default Card;