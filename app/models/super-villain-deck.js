import DS from 'ember-data';

var SuperVillainDeck = DS.Model.extend({
    cards: DS.hasMany('game-card', {inverse: null})
});

SuperVillainDeck.reopenClass({
    FIXTURES: []
});

export default SuperVillainDeck;