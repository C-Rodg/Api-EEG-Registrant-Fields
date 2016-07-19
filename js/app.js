var app = angular.module('apiRegistrantsApp', ['ui.router', 'base64', 'ngSanitize', 'growlNotifications', 'angularMoment']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider
		.state('settings', {
			url: '/settings?u&p&e&m',
			templateUrl: './js/templates/card.html',
			controller: 'EegCtrl'
		})

		.state('registrant', {
			url: '/registrant',
			templateUrl: './js/templates/registrant-card.html',
			controller: 'RegistrantsCtrl'
		});

		$urlRouterProvider.otherwise('/settings');
});