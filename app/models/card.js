import DS from 'ember-data';

var CardModel = DS.Model.extend({
	name: DS.attr('string'),
	type: DS.attr('string'),
	power: DS.attr('number'),
	actions: DS.hasMany('action')  
});

CardModel.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Card Name', type: 'Card Type', power: 1, actions: [] }
  ]
});

export default CardModel;