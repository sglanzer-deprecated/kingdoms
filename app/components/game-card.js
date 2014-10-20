import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-card'],

    actions: {
        purchaseCard: function() {
            this.sendAction('purchaseCard', this.get('card'));
        }
    }
});
