import DS from 'ember-data';

var Player = DS.Model.extend({
    name: DS.attr('string'),
    deck: DS.belongsTo('player-deck'),
    hand: DS.belongsTo('player-hand'),
    discard: DS.belongsTo('player-discard')
});

Player.reopenClass({
    FIXTURES: []
});

export default Player;
