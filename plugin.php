<?php
/**
 * Plugin Name: Charter Boat Blocks
 * Plugin URI: https://msp-media.org/charter-boat-bookings/
 * Description: Charter boat blocks display the availability calendar and charter options for remote charter boats and feed from the rest api created from using Charter boat bookings pro.
 * Author: MegPhillips91
 * Author URI: https://msp-media.org/charter-boat-bookings/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
/**
 * Adding plugin wide JQuery
 */
/*
function charter_boat_blocks_includes_scripts(){
   wp_enqueue_script( 'charter_boat_block_scripts',plugin_dir_url( __FILE__ ).'charter-boat-blocks.js', array( 'jquery' ),'',true );
   wp_localize_script( 'charter_boat_block_scripts', 'charter_boat_vars',
	   array(
		   'admin_ajax'=>admin_url( 'admin-ajax.php' ),
		   'home'=>site_url(),
	   )

   );
}
//add_action( 'wp_enqueue_scripts', 'charter_boat_blocks_includes_scripts' );
