jQuery( document ).ready( function( $ ) {
	// Author: Meg Phillips;
	/* Scope: Javascript that affects public and admin facing side of WP
	*/

	$( document ).on( 'click', '.cb-list-products', function( e ) {
		const domain = $( '#remote-boat-calendar' ).attr( 'domain' );
		const date = $( this ).attr( 'date' );
		// eslint-disable-next-line no-undef
		$.ajax( {
			type: 'GET',
			url: domain + 'wp-json/charter-bookings-pro/global_availability',
			data: 'date=' + date + '',
			success: function( response ) {
				//console.log( response );
			},
		} );
		e.preventDefault();
	} );
} );//end jquery wrapper
