import Ember from 'ember';

var playerNames = ["Steven", "Kristin", "Kevin", "Carl"];

export default Ember.Route.extend({
	model: function() {
        var route = this;

        // Retrieve all the cards available to the game
        route.store.find('card').then(
            function(cards) {
                // Initialize the players
                playerNames.forEach(function(playerName) {
                    var player = route.store.createRecord('player', {
                        name: playerName,
                        deck: route.store.createRecord('player-deck', {})
                    });

                    // Add 7 punch cards and 3 vulnerability
                    // cards to each player deck
                    var punchCard = cards.findBy('name', "Punch");
                    for (var cardCount = 0; cardCount < 7; cardCount++) {
                        player.get('deck').get('cards').addObject(route.store.createRecord('game-card', {
                            card: punchCard
                        }));
                    }

                    var vulnerabilityCard = cards.findBy('name', "Vulnerability");
                    for (cardCount = 0; cardCount < 3; cardCount++) {
                        player.get('deck').get('cards').addObject(route.store.createRecord('game-card', {
                            card: vulnerabilityCard
                        }));
                    }
                });
            }
        );

        // Populate the model
		return Ember.RSVP.hash({
			players: this.store.find('player')
		});
	},

    setupController: function(controller, model) {
        // Retrieve the deck for player 'Steven'
        var playerController = this.controllerFor('player');
        var deck = model.players.findBy('name', 'Steven').get('deck').get('cards');

        // Shuffle the player deck
        var shuffledDeck = _.shuffle(deck.toArray());

        // Set the player deck
        playerController.set('deck', shuffledDeck);

        // Deal 5 cards into the player hand
        var hand = [];
        hand.addObjects(shuffledDeck.slice(0, 5));
        shuffledDeck.removeObjects(hand);

        // Set the player hand
        playerController.set('hand', hand);
    },

    renderTemplate: function() {
        this.render();

        this.render('player', {
            into: 'game',
            outlet: 'player',
            controller: 'player'
        });
    }
});