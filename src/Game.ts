import * as Phaser from 'phaser-ce';
import Foundation from './Foundation';
import Tableau from './Tableau';
import Card from './Card';
import Deck from './Deck';

/**
 * Represents the main game state
 * @export
 * @class
 * @extends Phaser.State
 */
export default class extends Phaser.State {

    deck: Deck;
    waste: Phaser.Group;
    tableaus: Array<Phaser.Group>;

    init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    preload() {
        this.load.image('background', 'dist/assets/green_felt.jpg');
        this.load.image('placeholder', 'dist/assets/placeholder.png');
        this.load.image('back', 'dist/assets/back.png');
        this.load.image('clubs', 'dist/assets/clubs_pile.png');
        this.load.image('diamonds', 'dist/assets/diamonds_pile.png');
        this.load.image('hearts', 'dist/assets/hearts_pile.png');
        this.load.image('spades', 'dist/assets/spades_pile.png');
        this.load.spritesheet('deck', 'dist/assets/playing-cards.png', 73.15, 98.3);
    }

    create() {
        this.add.sprite(0, 0, 'background');
        this.tableaus = new Array();
        this.deck = new Deck(this);
        this.waste = this.add.physicsGroup();
        this.add.button(50, 20, 'back', this.drawCard, this);
        let tableauPoint: Phaser.Point = new Phaser.Point(this.world.centerX - (this.world.width / 2) + 50, this.world.centerY - 100);
        for (let i = 0; i < 7; i++) {
            let tableau = new Tableau(this, i + 1, tableauPoint);
            this.tableaus.push(tableau);
            this.add.existing(tableau);
            tableauPoint.add(100, 0);
        }
    }

    drawCard() {
        let randCard: Card = this.deck.drawRandomCard();
        randCard.parent.removeChild(randCard);
        this.add.existing(randCard);
        randCard.inputEnabled = true;
        randCard.input.enableDrag();
        randCard.loadTexture('deck', randCard.frameIndex);
        randCard.x = 150;
        randCard.y = 20;
        randCard.bringToTop();
    }

    render() { }
}