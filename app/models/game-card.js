import DS from 'ember-data';

var GameCardModel = DS.Model.extend({
    card: DS.belongsTo('card', {inverse: null})
});

GameCardModel.reopenClass({
    FIXTURES: []
});

export default GameCardModel;
