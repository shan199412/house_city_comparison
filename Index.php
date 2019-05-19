<?php
/*
Plugin Name: House Comparison
Description: Short Code: [House-City-Comparison]
Version: 1.1
Author: Zoe
*/

// User cannot access the plugin directly
if (!defined('ABSPATH')) {
	exit;
}

// Add short code for the plugin
function generate_hcc_short_code() {
	include 'house-city-comparison.php';
}

add_shortcode('House-City-Comparison', 'generate_hcc_short_code');

// Add the scripts
function add_hcc_scripts() {
	wp_enqueue_script('houcity_script', plugins_url('/js/houcity_script.js',__FILE__), array('jquery'),'1.1', true);
	wp_enqueue_script('houdia_script', plugins_url('/js/houdia_script.js',__FILE__), array('jquery'),'1.1', true);
	wp_enqueue_style( 'houcity_style', plugins_url('/css/houcity_style.css', __FILE__), array(), '1.1');
	wp_enqueue_style( 'houdia_style', plugins_url('/css/houdia_style.css', __FILE__), array(), '1.1');

}

add_action('wp_enqueue_scripts', 'add_hcc_scripts');
