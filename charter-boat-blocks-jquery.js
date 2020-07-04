jQuery( document ).ready( function( $ ) {
	// Author: Meg Phillips;
	/* Scope: Javascript that affects public and admin facing side of WP
	*/

	$( document ).on( 'click', '.cb-list-products', function( e ) {
		const domain = $( '.remote-charterboat-calendar' ).attr( 'charterboat_domain' );
		const date = $( this ).attr( 'date' );
		// eslint-disable-next-line no-undef
		$.ajax( {
			type: 'GET',
			url: domain + 'wp-json/charter-bookings-pro/global_availability',
			data: 'date=' + date + '',
			success: function( response ) {
				$( '.hold-products-listing' ).replaceWith( response.html );
			},
		} );
		e.preventDefault();
	} );

	$( document ).on( 'click', '.cb-book-now', function( e ) {
		const domain = $( '.remote-charterboat-charters' ).attr( 'charterboat_domain' );
		const date = $( this ).attr( 'date' );
		const productId = $( this ).attr( 'product_id' );
		//const bookingAction = $( this ).attr( 'booking_to' );
		// eslint-disable-next-line no-undef
		$.ajax( {
			type: 'GET',
			url: domain + 'wp-json/charter-bookings-pro/book-now',
			data: 'date=' + date + '&productId=' + productId + '',
			success: function( response ) {
				window.location.replace( response.url );
			},
		} );
		e.preventDefault();
	} );
} );//end jquery wrapper
