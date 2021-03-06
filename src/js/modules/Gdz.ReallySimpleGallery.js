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