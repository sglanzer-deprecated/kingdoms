import DS from 'ember-data';

var PlayerHandModel = DS.Model.extend({
    player: DS.belongsTo('player'),
    cards: DS.hasMany('game-card')
});

PlayerHandModel.reopenClass({
    FIXTURES: [
        { id: 1, player: 1, cards: [] },
        { id: 2, player: 2, cards: [] },
        { id: 3, player: 3, cards: [] },
        { id: 4, player: 4, cards: [] }
    ]
});

export default PlayerHandModel;
