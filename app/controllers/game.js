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

    playerPlayedCards: [],

    playerPlayedCardsCount: function() {
        return this.get('playerPlayedCards').get('length');
    }.property('playerPlayedCards.@each'),

    playerPower: 0,

    // Control
    overviewSideBarExpanded: true,

    actions: {
        overviewSideBarToggle: function() {
            this.set('overviewSideBarExpanded', !this.get('overviewSideBarExpanded'));
        },

        purchaseLineupCard: function(card) {
            if (this.get('playerPower') >= card.get('card').get('cost')) {
                this.get('lineup').removeObject(card);
                this.get('playerDiscard').addObject(card);
                this.set('playerPower', this.get('playerPower') - card.get('card').get('cost'));
            }
        },

        purchaseSuperVillainLineupCard: function(card) {
            if (this.get('playerPower') >= card.get('card').get('cost')) {
                this.get('superVillainLineup').removeObject(card);
                this.get('playerDiscard').addObject(card);
                this.set('playerPower', this.get('playerPower') - card.get('card').get('cost'));
            }
        },

        playCard: function(card) {
            this.get('playerHand').removeObject(card);
            this.get('playerPlayedCards').addObject(card);

            var controller = this;
            card.get('card').get('actions').forEach(function(action) {
                action._data.action(controller);
            });
        },

        endTurn: function() {
            var dealtSuperVillainCards = this.get('superVillainDeck').slice(0, 1 - this.get('superVillainLineupCount'));
            this.get('superVillainDeck').removeObjects(dealtSuperVillainCards);
            this.get('superVillainLineup').addObjects(dealtSuperVillainCards);

            var dealtDeckCards = this.get('deck').slice(0, 5 - this.get('lineupCount'));
            this.get('deck').removeObjects(dealtDeckCards);
            this.get('lineup').addObjects(dealtDeckCards);

            this.set('playerPower', 0);

            this.get('playerDiscard').addObjects(this.get('playerPlayedCards'));
            this.get('playerPlayedCards').clear();
            this.get('playerDiscard').addObjects(this.get('playerHand'));
            this.get('playerHand').clear();
            if (this.get('playerDeck').get('length') >= 5) {
                this.get('playerHand').addObjects(this.get('playerDeck').slice(0, 5));
                this.get('playerDeck').removeObjects(this.get('playerHand'));
            }
            else {
                var shuffledDiscard = _.shuffle(this.get('playerDiscard').toArray());
                this.get('playerDeck').addObjects(shuffledDiscard);
                this.get('playerDiscard').clear();
                this.get('playerHand').addObjects(this.get('playerDeck').slice(0, 5));
                this.get('playerDeck').removeObjects(this.get('playerHand'));
            }
        }
    }
});