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

                    // Add 7 punch cards to the player deck
                    var punchCard = cards.findBy('name', "Punch");
                    for (var cardCount = 0; cardCount < 7; cardCount++) {
                        player.get('deck').get('cards').addObject(route.store.createRecord('game-card', {
                            card: punchCard
                        }));
                    }

                    // Add 3 vulnerability cards to the player deck
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
	}
});