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
class Game extends Phaser.State {

    public deck: Deck;
    public tableaus: Tableau[];
    public waste: Phaser.Group;
    private deckBtn: Phaser.Button;
    public foundations: Foundation[];

    public init() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    public preload() {
        this.load.image('background', 'dist/assets/green_felt.jpg');
        this.load.image('placeholder', 'dist/assets/placeholder.png');
        this.load.image('back', 'dist/assets/back.png');
        this.load.image('clubs', 'dist/assets/clubs_pile.png');
        this.load.image('diamonds', 'dist/assets/diamonds_pile.png');
        this.load.image('hearts', 'dist/assets/hearts_pile.png');
        this.load.image('spades', 'dist/assets/spades_pile.png');
        this.load.spritesheet('deck', 'dist/assets/playing-cards.png', 73.15, 98.3);
    }

    public create() {
        this.tableaus = [];
        this.foundations = [];
        this.add.image(0, 0, 'background');
        let foundationPoint = new Phaser.Point(300, 20);
        for (let i = 0; i < 4; i++) {
            let foundation = new Foundation(this, foundationPoint, i);
            this.foundations.push(foundation);
            foundationPoint.add(150, 0);
        }
        this.deck = new Deck(this);
        this.waste = this.add.physicsGroup();
        this.deckBtn = this.add.button(50, 20, 'back', this.deck.drawCard, this.deck);
        let tableauPoint: Phaser.Point = new Phaser.Point(this.world.centerX - (this.world.width / 2) + 250, this.world.centerY - 150);
        for (let i = 0; i < 7; i++) {
            let tableau = new Tableau(this, i + 1, tableauPoint);
            this.tableaus.push(tableau);
            this.add.existing(tableau);
            tableauPoint.add(100, 0);
        }
    }

    public render() { }

    public update() {
        this.tableaus.map((tab) => {
            tab.hitArea = tab.getBounds();
        });
    }
}

export default Game;