social-media-dashboard-xmas-2014
================================

This was a small fun Christmas project for members of the Competa JavaScript & Front-end BootCamp.

We used AngularJS, Grunt, SASS and Scrum.

## Config file
The REST API relies on a config file that is not present in the GitHub repo because it contains API keys for social media platforms.
Copy `api/config.template.php` to `api/config.php` and enter the API keys for your accounts.
DO NOT edit `api/config.template.php` directly or commit `api/config.php` to a public GitHub repository!!

## API methods


**GET some FaceBook page insight stats**

`/api/REST.php/facebook/page/insights`

**GET the last 5 FaceBook page posts**

`/api/REST.php/facebook/page/posts`

**GET some Twitter stats and information about the user** - Returns useful stuff like:  
favourites_count  
followers_count    
friends_count  
statuses_count  
status (most recent status)  

`/api/REST.php/twitter/user`

**GETs the last 5 tweets**

`/api/REST.php/twitter/statuses`

**GETs Tweets that mention us**

`/api/REST.php/twitter/mentions`

**GETs negative Tweets matching a search term**

`/api/REST.php/twitter/negative/:searchterm`

**GETs positive Tweets matching a search term**

`/api/REST.php/twitter/positive/:searchterm`
