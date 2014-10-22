import DS from 'ember-data';

var ActionModel = DS.Model.extend({
    value: DS.attr('string')
});

ActionModel.reopenClass({
    FIXTURES: [
        { id: 1, value: "+1 Power", action: function(controller) {
            controller.set('playerPower', controller.get('playerPower') + 1);
        }},
        { id: 2, value: "", action: function(controller) {} },
        { id: 3, value: "+2 Power", action: function(controller) {
            controller.set('playerPower', controller.get('playerPower') + 2);
        }},
        { id: 4, value: "Attack: Each foe chooses and discards a card.", action: function(controller) {} },
        { id: 5, value: "+3 Power", action: function(controller) {
            controller.set('playerPower', controller.get('playerPower') + 3);
        }},
        { id: 6, value: "At the end of your turn, put this card on the bottom of its owner's deck before drawing a new hand.", action: function(controller) {} }
    ]
});

export default ActionModel;
