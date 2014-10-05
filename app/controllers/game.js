import Ember from 'ember';

export default Ember.ObjectController.extend({
	remainingGameDeckCards: function() {
		return this.get('cards').get('length');
	}.property('cards')
});
