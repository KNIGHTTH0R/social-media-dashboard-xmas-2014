/**
 * @ngdoc overview
 * @name smdc
 * @description
 * # Social media dashboard Competa
 *
 * Main module of the application.
 */

var smdc = angular.module('smdc',
	['ngRoute',
	 'ngResource'
	]);
	
	smdc.constant('restAPI', {
		'url': 'http://smdc.api/REST.php/'
	});

	smdc.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/home.html',
			}).
			otherwise({
				redirectTo: '/'
			});
	}]);


