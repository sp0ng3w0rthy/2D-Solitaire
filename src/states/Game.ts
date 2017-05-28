import * as Phaser from 'phaser-ce';
import Pile from '../groups/Pile';

export default class extends Phaser.State {
    /**
     * This is the deck sprite which will be used as a button to draw a new card
     * @type {Phaser.Sprite}
     */
    deckBtn: Phaser.Sprite;
    piles:Phaser.Group

    init() { }

    preload() {
        this.load.image('background', 'dist/images/green_felt.jpg');
        this.load.image('placeholder', 'dist/images/placeholder.png');
        this.load.image('back', 'dist/images/back.png');
        this.load.image('clubs', 'dist/images/clubs_pile.png');
        this.load.image('diamonds', 'dist/images/diamonds_pile.png');
        this.load.image('hearts', 'dist/images/hearts_pile.png');
        this.load.image('spades', 'dist/images/spades_pile.png');
        this.load.spritesheet('deck', 'dist/images/playing-cards.png', 73.15, 98.3);
    }

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.add.sprite(0, 0, 'background');
        this.deckBtn = this.add.sprite(50, 20, 'back');
        this.deckBtn.inputEnabled = true;
        let firstCardPos = new Phaser.Point(this.world.centerX - (this.world.width / 2) + 50, this.world.centerY - 100);
        let newCardPoint = new Phaser.Point(this.deckBtn.world.x + this.deckBtn.width + 25, this.deckBtn.world.y);
        let firstPileX = 275;
        for (let suit = 0; suit < 4; suit++) {
            this.piles.add(new Pile(this, firstPileX, 20, suit));
            firstPileX += 110;
        }
        this.deck = new Deck(this);
        this.deckButton.events.onInputDown.add(this.deck.drawCard, this.deck, 0, newCardPoint, true);
        for (var i = 0; i < 7; i++) {
            this.tableaus.add(new Tableau(this, i + 1, firstCardPos));
            firstCardPos.x += 100;
        }
        this.chosenCard = this.add.group();
        this.chosenCard.enableBody = true;
    }
imsp0ng3PE
    render() { }
}