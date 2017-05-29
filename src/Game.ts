import * as Phaser from 'phaser-ce';
import Foundation from './Foundation';
import Tableau from './Tableau';
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
        this.deck = new Deck(this.game);
        this.waste = this.add.physicsGroup();
        this.add.button(50, 20, 'back', () => {
            let randCard: Phaser.Sprite = this.deck.getRandom();
            randCard.loadTexture('deck', randCard.data.frameIndex);
            randCard.x = 150;
            randCard.y = 20;
            this.waste.add(randCard);
            randCard.bringToTop();
        });
        let tabCardX = this.world.centerX - (this.world.width / 2) + 50;
        let tabCardY = this.world.centerY - 100;
        let firstFoundationX = 275;
        for (let suit = 0; suit < 4; suit++) {
            this.add.group(new Foundation(this.game, suit));
            firstFoundationX += 110;
        }
        for (let i = 0; i < 7; i++) {
            this.add.group(new Tableau(this.game, i + 1, tabCardX, tabCardY));
            tabCardX += 100;
        }
    }

    render() { }
}