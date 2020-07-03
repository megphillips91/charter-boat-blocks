/**
 * BLOCK: charter-boats
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import axios from 'axios';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-charter-boats-calendar', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Availability Calendar' ), // Block title.
	icon: 'calendar-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'boat-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'charter-boat' ),
		__( 'Charter Boat Bookings' ),
	],

	attributes: {
		calendar: {
			type: 'string',
		},
	},

	edit: ( props ) => {
		if ( ! props.attributes.calendar ) {
			const url = 'https://phillipsboatworks.com/wp-json/charter-bookings-pro/global_calendar';
			//create user
			axios.get( url )
				.then( ( res ) => {
					props.setAttributes( {
						calendar: res.data,
					} );
				} );
		}
		// Creates a <p class='wp-block-cgb-block-charter-boat'></p>.
		return (
			// eslint-disable-next-line react/jsx-no-undef
			<div>Availability Calendar</div>
		);
	},

	save: ( ) => {
		return null;
	},
} );
