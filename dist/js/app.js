var Gdz = Gdz || {};
Gdz.ReallySimpleGallery = {

	init: function() {

		'use strict';

		// Set up variables
		var $gallery = $( '#gallery' ),
			$frame = $( '#gallery-frame' ),
			$thumbs = $( '.gallery__item' ),
			$anchors = $gallery.find( '.gallery__thumb-link' );

		// Set first thumb as active
		$gallery.find( '.gallery__item:first-child' ).addClass('active');

		// Fire up the event handler
		this.changeImage( $anchors, $frame );

	},

	changeImage: function( anchors, frame ) {

		'use strict';

		anchors.on( 'click', function( e ) {

			// cache 'this'
			var $this = $(this),

				// grab the href of the thumbnail link
				newsrc = this.href,

				// grab the alt text of the thumbnail
				altText = $this.find( '.gallery__thumb').attr( 'alt' ),

				// grab the parent list item
				li = $this.parent();

			// change the clicked thumbnail to be active
			li.addClass( 'active' ).siblings().removeClass( 'active' );


			// apply the src and alt text to the main gallery image
			frame.find( '.gallery__image' ).attr({
				src: newsrc,
				alt: altText
			});

			// prevent the default click event
			e.preventDefault();

		});

	}

};
var Gallery = function( galleryType ) {

	this.galleryType = galleryType;
	this.galleryID = '#' + this.galleryType + '-gallery';

	this.gallery = $( this.galleryID );
	this.galleryFrame = this.gallery.find( '.gallery__frame' );
	this.galleryImage = this.gallery.find( '.gallery__image' );
	this.thumbs = $( this.galleryID ).find( '.gallery__item' );
	this.firstThumb = $( this.galleryID ).find( '.gallery__item:first-child' );


};

Gallery.prototype.create = function() {

	// Set first thumb as active
	this.firstThumb.addClass('active');

	var $image = this.galleryImage;

	// Fire up the event handler
	this.gallery.on( 'click', '.gallery__thumb-link', function( e ) {

		e.preventDefault();

		// cache 'this'
		var $this = $(this),

			// grab the href of the thumbnail link
			newsrc = $this.attr( 'href' ),

			// grab the alt text of the thumbnail
			altText = $this.find( '.gallery__thumb' ).attr( 'alt' ),

			// grab the parent list item
			$li = $this.parent();

		// change the clicked thumbnail to be active
		$li.addClass( 'active' ).siblings().removeClass( 'active' );

		// apply the src and alt text to the main gallery image
		$image.attr({
			src: newsrc,
			alt: altText
		});

	});

};
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