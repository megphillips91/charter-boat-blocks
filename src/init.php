<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function charter_boat_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'charter_boat-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'charter_boat-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-api-fetch' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'charter_boat-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'charter_boat-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-charter-boat-calendar', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'charter_boat-cgb-block-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'charter_boat-cgb-calendar-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'charter_boat-cgb-block-editor-css',
			'render_callback' => 'render_charter_boat_calendar'
		)
	);

	register_block_type(
		'cgb/block-charter-boat-listing', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'charter_boat-cgb-block-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'charter_boat-cgb-listing-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'charter_boat-cgb-block-editor-css',
			'render_callback' => 'render_charter_boat_listing'
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'charter_boat_cgb_block_assets' );

function render_charter_boat_calendar($attributes){
	$content = '<h3>Availability Calendar</h3>';
	$content .= $attributes['calendar'];
	return $content;
}


function render_charter_boat_listing($attributes){
	$content = '<h3>Listing</h3>';
	//$return = $attributes['charters'];
	//$content .= $return['html'];
	return $content;
}

function charter_boats_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'boat-blocks',
				'title' => __( 'Charter Boat Blocks', 'boat-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'charter_boats_block_category', 10, 2);
