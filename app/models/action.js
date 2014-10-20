import DS from 'ember-data';

var ActionModel = DS.Model.extend({
    value: DS.attr('string')
});

ActionModel.reopenClass({
    FIXTURES: [
        { id: 1, value: "+1 Power" },
        { id: 2, value: "" },
        { id: 3, value: "+2 Power" },
        { id: 4, value: "Attack: Each foe chooses and discards a card." },
        { id: 5, value: "+3 Power" },
        { id: 6, value: "At the end of your turn, put this card on the bottom of its owner's deck before drawing a new hand." }
    ]
});

export default ActionModel;
