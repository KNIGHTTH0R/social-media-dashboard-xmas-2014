<?php
//-------- Twitter SERVICE --------//

/**
 * Get some Twitter stats and information about the user
 * Returns useful stuff like:
 *
 * favourites_count
 * followers_count
 * friends_count
 * statuses_count
 * status (most recent status)
 */
$app->get('/twitter/user', function() use ($app, $response, $twitter) {
    $url = Config::Twitter_api_url.'users/show.json';
    $getfield = '?screen_name=competait&user_id=competait';
    $requestMethod = 'GET';

    $app->response()->body(
        $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest()
    );
});

/**
 * Gets Tweets that mention us
 */
$app->get('/twitter/mentions', function() use ($app, $response, $twitter) {
    $url = Config::Twitter_api_url.'statuses/mentions_timeline.json';
    $requestMethod = 'GET';

    $app->response()->body(
        $twitter->buildOauth($url, $requestMethod)
            ->performRequest()
    );
});

/**
 * Gets negative Tweets matching a search term
 */
$app->get('/twitter/negative/:search', function($search) use ($app, $response, $twitter) {
    $url = Config::Twitter_api_url.'search/tweets.json';
    $getfield = '?q='.urlencode($search).'%20%3A(';
    $requestMethod = 'GET';

    $app->response()->body(
        $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest()
    );
});

/**
 * Gets positive Tweets matching a search term
 */
$app->get('/twitter/positive/:search', function($search) use ($app, $response, $twitter) {
    $url = Config::Twitter_api_url.'search/tweets.json';
    $getfield = '?q='.urlencode($search).'%20%3A)';
    $requestMethod = 'GET';

    $app->response()->body(
        $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest()
    );
});