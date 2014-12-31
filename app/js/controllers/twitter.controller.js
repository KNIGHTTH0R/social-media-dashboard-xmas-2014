/**
 * @ngdoc function
 * @name smdc.controller:TwitterCtrl
 * @description
 * Twitter controller
 */

smdc.controller('TwitterCtrl',['$scope','$http', 'TwitterService', function($scope, $http, TwitterService) {

	/**
	 * [tweets description]
	 * @type {Array}
	 */
	$scope.tweets = [];

	/**
	 * Returns Twitter user information (CompetaIT)
	 */
	TwitterService.user.get(function(user) {
		$scope.user = user;
	});

	/**
	 * Returns 5 latest Tweets of the CompetaIT account and converts created_at date
	 */
	TwitterService.tweets.query(function(tweets) {
		angular.forEach(tweets, function(data) {
			data.created_at = parseTwitterDate(data.created_at);
			$scope.tweets.push(data);
		});
	});

	/**
	 * Converts Twitter created_at to a readable date
	 * @param  {string} tdate
	 * @return {string}
	 */
	var parseTwitterDate = function(tdate) {
	    var system_date = new Date(Date.parse(tdate));
	    var user_date = new Date();
	    var diff = Math.floor((user_date - system_date) / 1000);
	    if (diff <= 1) {return "just now";}
	    if (diff < 20) {return diff + " seconds ago";}
	    if (diff < 40) {return "half a minute ago";}
	    if (diff < 60) {return "less than a minute ago";}
	    if (diff <= 90) {return "one minute ago";}
	    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
	    if (diff <= 5400) {return "1 hour ago";}
	    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
	    if (diff <= 129600) {return "1 day ago";}
	    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
	    if (diff <= 777600) {return "1 week ago";}
	    return "on " + system_date;
	}

}]);