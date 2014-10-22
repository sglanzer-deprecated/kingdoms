import Ember from 'ember';

var playerNames = ["Steven", "Kristin", "Kevin", "Carl"];

export default Ember.Route.extend({
	model: function() {
        var route = this;

        // Retrieve all the cards available to the game
        route.store.find('card').then(
            function(cards) {
                // Initialize the main deck
                var gameDeck = route.store.createRecord('game-deck');

                // Add 20 Bane cards to the main deck
                var baneCard = cards.findBy('name', 'Bane');
                for (var cardCount = 0; cardCount < 20; cardCount++) {
                    gameDeck.get('cards').addObject(route.store.createRecord('game-card', {
                        card: baneCard
                    }));
                }

                // Initialize the super villain deck
                var superVillainDeck = route.store.createRecord('super-villain-deck');

                // Add 10 Ra's cards to the super villain deck
                var rasCard = cards.findBy('name', 'Ras Al Ghul');
                for (cardCount = 0; cardCount < 10; cardCount++) {
                    superVillainDeck.get('cards').addObject(route.store.createRecord('game-card', {
                        card: rasCard
                    }));
                }

                // Initialize the players
                playerNames.forEach(function(playerName) {
                    var player = route.store.createRecord('player', {
                        name: playerName,
                        deck: route.store.createRecord('player-deck', {})
                    });

                    // Add 7 punch cards and 3 vulnerability
                    // cards to each player deck
                    var punchCard = cards.findBy('name', 'Punch');
                    for (var cardCount = 0; cardCount < 7; cardCount++) {
                        player.get('deck').get('cards').addObject(route.store.createRecord('game-card', {
                            card: punchCard
                        }));
                    }

                    var vulnerabilityCard = cards.findBy('name', 'Vulnerability');
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
            deck: this.store.find('game-deck'),
            superVillainDeck: this.store.find('super-villain-deck'),
            kicks: [],
			players: this.store.find('player')
		});
	},

    setupController: function(controller, model) {
        // Retrieve the game deck
        var gameController = this.controllerFor('game');
        var gameDeck = model.deck.get('firstObject').get('cards');

        // Shuffle the game deck
        var shuffledGameDeck = _.shuffle(gameDeck.toArray());

        // Set the game deck
        gameController.set('deck', shuffledGameDeck);

        // Deal 5 cards into the game lineup
        var lineup = [];
        lineup.addObjects(shuffledGameDeck.slice(0, 5));
        shuffledGameDeck.removeObjects(lineup);

        // Set the game lineup
        gameController.set('lineup', lineup);


        // Retrieve the super villain deck
        var superVillainDeck = model.superVillainDeck.get('firstObject').get('cards');

        // Shuffle the super villain deck
        var shuffledSuperVillainDeck = _.shuffle(superVillainDeck.toArray());

        // Set the super villain deck
        gameController.set('superVillainDeck', shuffledSuperVillainDeck);

        // Deal a card into the super villain lineup
        var superVillainLineup = [];
        superVillainLineup.addObjects(shuffledSuperVillainDeck.slice(0, 1));
        shuffledSuperVillainDeck.removeObjects(superVillainLineup);

        // Set the super villain lineup
        gameController.set('superVillainLineup', superVillainLineup);


        // Retrieve the deck for player 'Steven'
        var deck = model.players.findBy('name', 'Steven').get('deck').get('cards');

        // Shuffle the player deck
        var shuffledDeck = _.shuffle(deck.toArray());

        // Set the player deck
        gameController.set('playerDeck', shuffledDeck);

        // Deal 5 cards into the player hand
        var hand = [];
        hand.addObjects(shuffledDeck.slice(0, 5));
        shuffledDeck.removeObjects(hand);

        // Set the player hand
        gameController.set('playerHand', hand);
    }
});