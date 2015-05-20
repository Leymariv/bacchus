Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return Meteor.subscribe('posts');}
	});

Router.route('/', {
	name: 'home',
});

Router.route('/loginMenu', {
	name: 'loginMenu',
	layoutTemplate: 'layout'
});

Router.route('/mainMenu', {
	name: 'mainMenu',
	layoutTemplate: 'layout'
});


var requireLogin = function(){
	if (! Meteor.user()) {
		Router.go('loginMenu');
	} else {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {	
			this.render('accessDenied');
		}

		this.next();
	}
}

Router.onBeforeAction(requireLogin, {only: 'mainMenu'});

