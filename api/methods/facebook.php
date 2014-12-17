<?php
//-------- FaceBook SERVICE --------//

/**
 * Get some FaceBook stats
 */
$app->get('/facebook', function() use ($app, $response) {
    $app->response()->body('Some nice stats :)');
});
