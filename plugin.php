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
