import * as Phaser from 'phaser-ce';
import Card from './Card';
import Game from './Game';
import Tableau from './Tableau';

export default class extends Phaser.Sprite {

    cardNum: number;
    topCard: boolean;
    suit: number;
    color: string;
    frameIndex: number;
    origPos: Phaser.Point;
    origParent: any;

    constructor(state: Game, x: number, y: number, cardNum: number, suit: number) {
        super(state.game, x, y, 'back');
        this.cardNum = cardNum + 1;
        this.suit = suit;
        this.color = (suit === 0 || suit === 2) ? 'black' : 'red';
        this.frameIndex = cardNum + (suit * 13);
        this.origPos = new Phaser.Point();
        this.origParent = null;
        this.events.onDragStart.add((card: Card, pointer: Phaser.Pointer) => {
            state.tableaus.map((tab) => { tab.hitArea = tab.getBounds(); });
            card.origParent = card.parent;
            card.position.copyTo(card.origPos);
            card.parent.removeChild(card);
            card.game.add.existing(card);
        });
        this.events.onDragStop.add(this.checkOverlap, this, 0, state);
        // this.events.onDragUpdate.add((card: Card, pointer: Phaser.Pointer, x: number, y: number, point: Phaser.Point, fromStart: boolean) => {
        // let parent: Phaser.Group = card.data.origParent;
        // let childIndex = parent.getChildIndex(card);
        // let allChildrenUnder = parent.getAll('exists', true, childIndex);
        // let a = 1;
        // });
    }

    checkOverlap(card: Card, pointer: Phaser.Pointer, state: Game) {
        // let overlapped: Tableau = state.tableaus.filter((tableau) => { return card.overlap(tableau); }).pop();
        // if (overlapped !== null) {
        //     overlapped.add(card);
        //     card.x = 0;
        //     card.y = 30;
        // } else {
        card.parent.removeChild(card);
        card.origParent.add(card);
        card.x = card.origPos.x;
        card.y = card.origPos.y;
        // }
    }
}