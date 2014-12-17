<?php

/*
 * Enter your API keys and rename this file to 'config.php'
 */

ini_set('display_errors', 1); 
error_reporting(E_ALL);

abstract class Config {
    /**
     * Returns the base URL
     * @return String
     */
    static function base_url() {
        return 'http://'.$_SERVER['HTTP_HOST'].'/';
    }

    /**
     * Generates a REST request URL
     * @param $path The path to the method
     * @return String
     */
    static function request_url($path) {
        return Config::base_url().'REST.php/'.$path;
    }

    /**
     * The Twitter API base URL
     */
    const Twitter_api_url = 'https://api.twitter.com/1.1/';

    /**
     * The Twitter Consumer Key
     */
    const Twitter_consumer_key = '';

    /**
     * The Twitter Consumer Secret
     */
    const Twitter_consumer_secret = '';

    /**
     * The Twitter Access Token
     */
    const Twitter_access_token = '';

    /**
     * The Twitter Access Token Secret
     */
    const Twitter_access_secret = '';
}