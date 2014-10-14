import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['game-card'],

    purchaseCard: 'purchaseCard',

    actions: {
        purchaseCard: function() {
            this.sendAction('purchaseCard', this.get('card'));
        }
    }
});
