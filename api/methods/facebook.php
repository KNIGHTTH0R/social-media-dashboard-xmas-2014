<?php
//-------- FaceBook SERVICE --------//

use Facebook\FacebookRequest;
use Facebook\GraphUser;

/**
 * Get some FaceBook page insight stats
 */
$app->get('/facebook/page/insights', function() use ($app, $response, $facebookSession) {
    if (!$facebookSession) {
        $app->response()->body('User must be logged in');
    }

    try {
        $request = (new FacebookRequest(
            $facebookSession, 'GET', '/'.Config::FaceBook_Page_ID.'/insights'
        ))->execute()->getGraphObject(GraphUser::className());
        $app->response()->body(json_encode($request->asArray()));
    } catch (FacebookRequestException $e) {
        // The Graph API returned an error
        $app->response()->body($e->getMessage());
    } catch (\Exception $e) {
        // Some other error occurred
        $app->response()->body($e->getMessage());
    }
});

/**
 * Get the last 5 FaceBook page posts
 */
$app->get('/facebook/page/posts', function() use ($app, $response, $facebookSession) {
    if (!$facebookSession) {
        $app->response()->body('User must be logged in');
    }

    try {
        $request = (new FacebookRequest(
            $facebookSession, 'GET', '/'.Config::FaceBook_Page_ID.'/posts?limit=5'
        ))->execute()->getGraphObject(GraphUser::className());
        $app->response()->body(json_encode($request->asArray()));
    } catch (FacebookRequestException $e) {
        // The Graph API returned an error
        $app->response()->body($e->getMessage());
    } catch (\Exception $e) {
        // Some other error occurred
        $app->response()->body($e->getMessage());
    }
});