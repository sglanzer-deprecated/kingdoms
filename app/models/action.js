import DS from 'ember-data';

var ActionModel = DS.Model.extend({
    value: DS.attr('string')
});

ActionModel.reopenClass({
    FIXTURES: [
        { id: 1, value: "+1 Power" },
        { id: 2, value: "" },
        { id: 3, value: "+2 Power" },
        { id: 4, value: "Attack: Each foe chooses and discards a card." }
    ]
});

export default ActionModel;
