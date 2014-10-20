import Ember from 'ember';
import { animate, stop } from 'vendor/liquid-fire';

export default Ember.ObjectController.extend({
    // Data
    deck: [],

    deckCount: function() {
        return this.get('deck').get('length');
    }.property('deck.@each'),

    lineup: [],

    lineupCount: function() {
        return this.get('lineup').get('length');
    }.property('lineup.@each'),

    superVillainDeck: [],

    superVillainLineup: [],

    superVillainLineupCount: function() {
        return this.get('superVillainLineup').get('length');
    }.property('superVillainLineup.@each'),

    playerDeck: [],

    playerDeckCount: function() {
        return this.get('playerDeck').get('length');
    }.property('playerDeck.@each'),

    playerDiscard: [],

    playerDiscardCount: function() {
        return this.get('playerDiscard').get('length');
    }.property('playerDiscard.@each'),

    playerHand: [],

    // Control
    overviewSideBarExpanded: true,

    actions: {
        overviewSideBarToggle: function() {
            this.set('overviewSideBarExpanded', !this.get('overviewSideBarExpanded'));
        },

        purchaseLineupCard: function(card) {
            var gameController = this.controllerFor('game');

            gameController.get('lineup').removeObject(card);
            gameController.get('playerDiscard').addObject(card);
        },

        purchaseSuperVillainLineupCard: function(card) {
            var gameController = this.controllerFor('game');
            gameController.get('superVillainLineup').removeObject(card);
            gameController.get('playerDiscard').addObject(card);
        },

        endTurn: function() {
            var gameController = this.controllerFor('game');

            var dealtSuperVillainCards = gameController.get('superVillainDeck').slice(0, 1 - gameController.get('superVillainLineupCount'));
            gameController.get('superVillainDeck').removeObjects(dealtSuperVillainCards);
            gameController.get('superVillainLineup').addObjects(dealtSuperVillainCards);

            var dealtDeckCards = gameController.get('deck').slice(0, 5 - gameController.get('lineupCount'));
            gameController.get('deck').removeObjects(dealtDeckCards);
            gameController.get('lineup').addObjects(dealtDeckCards);

            gameController.get('playerDiscard').addObjects(gameController.get('playerHand'));
            gameController.get('playerHand').clear();
            if (gameController.get('playerDeck').get('length') >= 5) {
                gameController.get('playerHand').addObjects(gameController.get('playerDeck').slice(0, 5));
                gameController.get('playerDeck').removeObjects(gameController.get('playerHand'));
            }
            else {
                var shuffledDiscard = _.shuffle(gameController.get('playerDiscard').toArray());
                gameController.get('playerDeck').addObjects(shuffledDiscard);
                gameController.get('playerDiscard').clear();
                gameController.get('playerHand').addObjects(gameController.get('playerDeck').slice(0, 5));
                gameController.get('playerDeck').removeObjects(gameController.get('playerHand'));
            }
        }
    }
});