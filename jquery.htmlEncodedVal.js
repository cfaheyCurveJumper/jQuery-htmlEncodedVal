/*!
 * htmlEncodedVal version 1.0
 *
 * Copyright © 2014 Charles Fahey | MIT license (enjoy!) | https://github.com/cfaheyCurveJumper/jQuery-htmlEncodedVal
 *
 * See index.html for basic usage
 *
 *
 *		options:
 *
 *		$("#input").htmlEncodedVal()						:	gets the encoded value of the input (encodes html markup, leaves the input value untouched)
 *
 *		$("#input").htmlEncodedVal( { retainHTML: true } )
 *		$("#input").htmlEncodedVal( true )					:	gets the encoded value (does not encode html markup, leaves the input value untouched)
 *
 *		$("#input").htmlEncodedVal( { retainHTML: true, convertInline: true } )
 *		$("#input").htmlEncodedVal( true, true )			:	encodes the value inline (does not encode html markup)
 *
 *		$("#input").htmlEncodedVal( "räksmörgås" )			:	sets the value of the input to an encoded version of the provided string (encodes html markup)
 *
 *		$("#input").htmlEncodedVal( "räksmörgås", { retainHTML: true } )
 *		$("#input").htmlEncodedVal( "räksmörgås", true )	:	sets the value of the input to an encoded version of the provided string (does not encode html markup)
 *
 */
(function ( $ ) {

	$.fn.htmlEncodedVal = function() {

		var _this = this,
		settings = {
			retainHTML: false, // if set to true, html markup will not be encoded
			convertInline: false // if set to true, the current value of the input will be replaced with the encoded value (ignored when setting the value)
		},
		// our private settings
		_setVal = false, // set to true once we determine we need to set a value
		_toVal = "", // given a value if we are setting the value
		_thisVal = "",


		// gather an array of our argument types
		argArray = [],

		i = 0,
		returnArray = [],
		returnStr = "",
		thisChar = "",
		thisCharCode = "";


		// this does the actual work of encoding our html characters
		function _encodeStr( inputStr, settings ) {

			// loop over our characters
			for ( i=0; i<inputStr.length; i++) {

				// get this character
				thisChar = inputStr.charAt(i);
				// and it's character code
				thisCharCode = thisChar.charCodeAt(0);

				// if this character is beyond the ascii set
				if ( thisCharCode > 127 ) {

					// update our return string with the encoded character
					returnStr = returnStr + "&#x" + thisCharCode.toString(16) + ";";
				// otherwise
				} else {

					// if we are not retaining the html
					if ( !settings.retainHTML ) {
						// evaluate our character and convert it
						if ( thisChar === "<" ) {
							thisChar = "&lt;";
						} else if ( thisChar === ">" ) {
							thisChar = "&gt;";
						} else if ( thisChar === "&" ) {
							thisChar = "&amp;";
						}
					}

					// add the chaarcter/code to our return string
					returnStr += thisChar;
				}
			}

			// return our encoded string
			return returnStr;
		}


		// let's get to it
		for ( i=0; i<arguments.length; i++ ) {

			argArray.push( $.type( arguments[i] ) );

		}

		// if we have an array of arguments
		if ( arguments.length > 0 ) {

			// if we are setting a value (the first argument will be a string)
			if ( arguments.length <= 2 && argArray[0] === "string" ) {

				_setVal = true;
				_toVal = arguments[0];

			}

			// if we are retaining the html (the first or second argument will be a boolean)
			if ( ( arguments.length === 1 && argArray[0] === "boolean" && arguments[0] === true ) || ( arguments.length === 2 && argArray[0] === "string" && argArray[1] === "boolean" && arguments[1] === true ) ) {

				// update our settings
				settings.retainHTML = true;
			}

			// if we are converting the value inline
			// the first argument will not be a string
			// and the first and second arguments will be booleans
			if ( arguments.length === 2 && argArray[0] === "boolean" && argArray[1] === "boolean" ) {

				settings.retainHTML = arguments[0];
				settings.convertInline = arguments[1];

			}


			// if we use an options structure it overrides prior settings
			if ( ( arguments.length === 1 && argArray[0] === "object" ) || ( arguments.length === 2 && argArray[1] === "object" ) ) {

				// if we only have an object
				if ( argArray[0] === "object" ) {

					// we extend our settings
					$.extend( settings, arguments[0] );

				// otherwise, we are setting a value
				} else {

					// flag the value is to be set

					// and extend our settings
					$.extend( settings, arguments[1] );
				}
			}
		}



		// if we are getting the value
		if ( !_setVal ) {

			// loop over our elements
			for ( i=0; i<_this.length; i++ ) {

				// get this encoded value
				_thisVal = _encodeStr( _this[i].value, settings );

				// if we are converting the value inline
				if ( settings.convertInline ) {
					// write it back to the input
					$(_this).val( _thisVal );
				}
				// push our encoded value into the return array
				returnArray.push( _thisVal );
			}

			// return our array
			return returnArray;


		// if we are setting the value
		} else {

			// set our value
			_toVal = _encodeStr( _toVal, settings );

			// loop over our collection of inputs
			return this.filter(":input").each( function() {

				// update the value of this element
				$(this).val( _toVal );
			} );
		}
	};


	$.fn.htmlEncodedVal.fromStr = function( inputStr ) {

		// create an html fragment around our string
		var fakeInput = $("<input>").val( inputStr ),

		retainHTML = false;

		// if we have a second argument that is a boolean
		if ( ( arguments.length > 1 ) && ( $.type( arguments[1] ) === "boolean" ) ) {

			// we use it to determine whether or not we are retaining our html
			retainHTML = arguments[1];
		}

		// when we call this, we never need to worry about converting the inline value, thus "false" for the second argument
		return $(fakeInput).htmlEncodedVal( retainHTML, false )[0];

	};

	jQuery.htmlEncodedVal = jQuery.fn.htmlEncodedVal;

}( jQuery ));