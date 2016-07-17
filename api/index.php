<?php
	// Load Libs
	require_once(dirname(__FILE__)."/configs.php");
	require_once(dirname(__FILE__)."/class/autoload.php");
	
	$noOfReviews	= RequestHelper::getParam('noOfReviews', 10);
	$offset			= RequestHelper::getParam('offset', 0);
	$internal		= RequestHelper::getParam('internal', 1);
	$yelp			= RequestHelper::getParam('yelp', 1);
	$google			= RequestHelper::getParam('google', 1);
	$threshold		= RequestHelper::getParam('threshold', 1);
	
	$options = array(
		CURLOPT_RETURNTRANSFER => true,     // return web page
		CURLOPT_HEADER         => false,    // don't return headers
		CURLOPT_FOLLOWLOCATION => true,     // follow redirects
		CURLOPT_AUTOREFERER    => true,     // set referer on redirect
		CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
		CURLOPT_TIMEOUT        => 120,      // timeout on response
		CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
		CURLOPT_SSL_VERIFYPEER => false
	);
	
	$ch      = curl_init(API_URL."?apiKey=".API_KEY."&offset=$offset&noOfReviews=$noOfReviews&yelp=$yelp&internal=$internal&google=$google&threshold=$threshold");
	curl_setopt_array( $ch, $options );
	$content = curl_exec( $ch );
	header('Content-Type: application/json');
	echo $content;
?>