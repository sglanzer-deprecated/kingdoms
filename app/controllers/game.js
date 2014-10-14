import Ember from 'ember';

export default Ember.ObjectController.extend({
    deck: [],

    deckCount: function() {
        return this.get('deck').get('length');
    }.property('deck.@each'),

    lineup: []
});