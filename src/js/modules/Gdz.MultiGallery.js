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