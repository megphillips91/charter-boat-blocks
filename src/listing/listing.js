/**
 * BLOCK: calendar
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
const { BaseControl, Spinner, TextControl } = wp.components;

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
registerBlockType( 'cgb/block-charter-boats-listing', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Charter Listing' ), // Block title.
	icon: 'editor-ul', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'boat-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'charter-boat' ),
		__( 'Charter Boat Bookings' ),
	],

	attributes: {
		charters: {
			type: 'string',
		},
		domain: {
			type: 'string',
		},
	},

	edit: ( props ) => {
		if ( ! props.attributes.charters && props.attributes.domain ) {
			const url = props.attributes.domain + 'wp-json/charter-bookings-pro/global_availability';
			//create user
			axios.get( url )
				.then( ( res ) => {
					props.setAttributes( {
						charters: res.data,
					} );
				} );
		}
		function createMarkup() {
			return { __html: props.attributes.charters.html };
		}
		function onChangeDomain( e ) {
			props.setAttributes( { domain: e.target.value } );
		}
		// Creates a <p class='wp-block-cgb-block-charter-boat'></p>.
		if ( ! props.attributes.charters ) {
			return (
				// eslint-disable-next-line react/jsx-no-undef
				<React.Fragment>
					<Spinner />
					<BaseControl label="Remote Charterboat Domain" id="charterboat-listing-domain" help="copy and paste the url of the homepage of the charterboat">
						<TextControl
							type="url"
							id="charterboat-listing-domain"
							value={ props.attributes.domain }
							onBlur={ e => onChangeDomain( e ) }>
						</TextControl>
					</BaseControl>
				</React.Fragment>
			);
		}
		if ( props.attributes.charters ) {
			return (
				// eslint-disable-next-line react/jsx-no-undef
				<React.Fragment>
					<BaseControl label="Charterboat Domain" id="charterboat-listing-domain" >
						<TextControl
							type="url"
							id="charterboat-listing-domain"
							value={ props.attributes.domain }
							onBlur={ e => onChangeDomain( e ) }>
						</TextControl>
					</BaseControl>
					<div dangerouslySetInnerHTML={ createMarkup() } />
				</React.Fragment>
			);
		}
	},

	save: ( ) => {
		return null;
	},
} );
