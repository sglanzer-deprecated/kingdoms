import DS from 'ember-data';

var CardModel = DS.Model.extend({
	name: DS.attr('string'),
	type: DS.attr('string'),
	actions: DS.hasMany('action', {async: true, inverse: null}),
    points: DS.attr('number'),
    cost: DS.attr('number')
});

CardModel.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Punch', type: 'Starter', actions: [1], points: 0, cost: 0 },
    { id: 2, name: 'Vulnerability', type: 'Starter', actions: [2], points: 0, cost: 0 },
    { id: 3, name: 'Kick', type: 'Super Power', actions: [3], points: 1, cost: 3 },
    { id: 4, name: 'Bane', type: 'Villain', actions: [3, 4], points: 1, cost: 4 },
    { id: 5, name: 'Ras Al Ghul', type: 'Super Villain', actions: [5, 6], points: 4, cost: 8 }
  ]
});

export default CardModel;