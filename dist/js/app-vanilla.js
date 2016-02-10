var Gdz = Gdz || {};
Gdz.Scripts = {

	run: function () {

		'use strict';

		var $body = $( 'body' ),
			$galleries = $( '.gallery' ),
			galleryQuant = $galleries.length;

		// Add body classes for multiple galleries
		if ( galleryQuant > 1 ) {
			$body.addClass( 'has-gallery multiple galleries-' + galleryQuant );
		}

		// Conditionally run scripts based on page's body class
		switch (true) {

			// index.html
			case $body.hasClass( 'original' ):

				Gdz.ReallySimpleGallery.init();

			break;

			// multiple.html
			case $body.hasClass( 'multiple' ):

				var catGallery = new Gallery( 'cat' );
				catGallery.create();

				var dogGallery = new Gallery( 'dog' );
				dogGallery.create();

			break;

		}

	}

};

// document ready
$(document).ready(function() {

	Gdz.Scripts.run();

});

$(window).load(function() {

	// To run after the page has fully loaded

});