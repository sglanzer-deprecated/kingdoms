import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-card'],

    affordable: function() {
        return this.get('card').get('card').get('cost') <= this.get('playerPower');
    }.property('playerPower'),

    click: function() {
        this.sendAction('playCard', this.get('card'));
    },

    actions: {
        purchaseCard: function() {
            this.sendAction('purchaseCard', this.get('card'));
        }
    }
});
