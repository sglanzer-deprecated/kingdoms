import DS from 'ember-data';

var ActionModel = DS.Model.extend({
    value: DS.attr('string')
});

ActionModel.reopenClass({
    FIXTURES: [
        { id: 1, value: "+1 Power" }
    ]
});

export default ActionModel;
