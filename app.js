/**
 * Copyright (C) 2013, Oliver Salzburg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Created: 2013-02-04 16:19
 *
 * @author Oliver Salzburg
 * @copyright Copyright (C) 2012, Oliver Salzburg
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

var dgram = require( "dgram" );
var udpServer = dgram.createSocket( "udp4" );
var Blink1 = require( "node-blink1" );
var blink1 = new Blink1.Blink1();

var options = require( __dirname + "/dust.js" );

/**
 * Helper function to wrap a function (Yes, you read that right)
 * @param fn
 * @param context
 * @param params
 * @returns {Function}
 * @source http://stackoverflow.com/questions/899102/how-do-i-store-javascript-functions-in-a-queue-for-them-to-be-executed-eventuall
 */
var wrapFunction = function( fn, context, params ) {
  return function() {
    fn.apply( context, params );
  };
};

/**
 * Invoked when the UDP listener becomes ready.
 */
udpServer.on( "listening", function() {
  var address = udpServer.address();
  console.log( "State change listener ready on " + address.address + ":" + address.port );
} );

/**
 * Invoked when a UDP message is received
 */
udpServer.on( "message", function( msg, rinfo ) {
  var buffer = new Buffer( msg );

  var state = buffer.toString();
  console.log( "Got state " + state + " from " + rinfo.address + ":" + rinfo.port );

  // Get the pixie dust for this message
  var pixieDust = getPixieDustForMessage( state );
  if( pixieDust ) {
    blink( pixieDust );
  }
} );

/**
 * Deep-clones an object
 * @param a The object to clone
 * @returns {*} The cloned object
 * @see http://stackoverflow.com/a/12826757/259953
 */
function simpleClone( a ) {
  return JSON.parse( JSON.stringify( a ) );
}

/**
 * Retrieve the pixie dust recipe for a given UDP message
 * @param message
 * @returns {*}
 */
function getPixieDustForMessage( message ) {
  for( var pattern in options ) {
    if( options.hasOwnProperty( pattern ) ) {
      if( message.match( new RegExp( pattern ) ) ) {
        return simpleClone( options[ pattern ] );
      }
    }
  }
}

/**
 * Blink a pixie dust recipe
 * @param pixieDust The recipe to blink
 */
function blink( pixieDust ) {
  var parameters = pixieDust.shift();
  if( parameters ) {
    var callback = wrapFunction( blink, this, [pixieDust] );
    parameters.push( callback );
    blink1.fadeToRGB.apply( blink1, parameters );
  }
}

// Why not?
blink1.fadeToRGB( 500, 255, 0, 0, function() {
  blink1.fadeToRGB( 500, 0, 0, 0, function() {
    blink1.fadeToRGB( 500, 0, 255, 0, function() {
      blink1.fadeToRGB( 500, 0, 0, 0, function() {
        blink1.fadeToRGB( 500, 0, 0, 255, function() {
          blink1.fadeToRGB( 500, 0, 0, 0 );
        } );
      } );
    } );
  } );
} );

udpServer.bind( 30000 );
