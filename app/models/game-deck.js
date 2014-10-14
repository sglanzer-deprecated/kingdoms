import DS from 'ember-data';

var GameDeck = DS.Model.extend({
    cards: DS.hasMany('game-card', {inverse: null})
});

GameDeck.reopenClass({
    FIXTURES: []
});

export default GameDeck;
