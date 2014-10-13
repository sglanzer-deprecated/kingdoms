import Ember from 'ember';

export default Ember.ObjectController.extend({
	deck: function() {
        var deck = this.get('players').findBy('name', 'Steven').get('deck');
        console.log(deck.get('cards'));
		return deck;
	}.property('players')
});