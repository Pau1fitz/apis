<?php
require_once('twitter_proxy.php');
// Twitter OAuth Config options
$oauth_access_token = '211518466-s7qam3nSRjbMaotCwNAbVmXxC3pCsJRZbfkNiG7n';
$oauth_access_token_secret = 'z0Kw5o66ZUc5kg9teg0admPKLoCVFX8sBEF3TJcpCF40u';
$consumer_key = 'Xd8Yw37geZRPO6Jhur0JFwVJF';
$consumer_secret = 'kJjKbYWPcTeMeJsPYkJvhUubiPwt8TU6JIkLxeVSo7Vj3LI796';
$user_id = '78884300';
$screen_name = 'CalvinHarris';
$count = 5;
$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
    $oauth_access_token,            // 'Access token' on https://apps.twitter.com
    $oauth_access_token_secret,     // 'Access token secret' on https://apps.twitter.com
    $consumer_key,                  // 'API key' on https://apps.twitter.com
    $consumer_secret,               // 'API secret' on https://apps.twitter.com
    $user_id,                       //  User id (http://gettwitterid.com/)
    $screen_name,                   //  Twitter handle
    $count                          //  The number of tweets to pull out
);

//Invoke a GET cURL request to retrieve results 
//and create a file with timestamp containing tweets
function checkForUpdates($twitter_proxy, $twitter_url) {
    $tweets = $twitter_proxy->get($twitter_url);
    $data = array ('twitter_result' => $tweets, 'timestamp' => time());
    file_put_contents('twitter_result.json', json_encode($data));
}

//check if the file exists
if(!file_exists('twitter_result.json')) {
    checkForUpdates($twitter_proxy, $twitter_url);

}else {
    //if file exists check it has not been updated in 10 minutes 
    //if not update the tweets and timestamp
    $data = json_decode(file_get_contents('twitter_result.json'));
    if ($data->{"timestamp"} > (time() - 10 * 60)) {
        checkForUpdates($twitter_proxy, $twitter_url);
    }
}

?>