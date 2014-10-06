import DS from 'ember-data';

var CardModel = DS.Model.extend({
	name: DS.attr('string'),
	type: DS.attr('string'),
	actions: DS.hasMany('action', { async: true }),
    points: DS.attr('number'),
    cost: DS.attr('number')
});

CardModel.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Punch', type: 'Starter', actions: [ 1 ], points: 0, cost: 0 },
    { id: 2, name: 'Punch', type: 'Starter', actions: [ 1 ], points: 0, cost: 0 },
    { id: 3, name: 'Punch', type: 'Starter', actions: [ 1 ], points: 0, cost: 0 },
    { id: 4, name: 'Punch', type: 'Starter', actions: [ 1 ], points: 0, cost: 0 },
    { id: 5, name: 'Punch', type: 'Starter', actions: [ 1 ], points: 0, cost: 0 }
  ]
});

export default CardModel;