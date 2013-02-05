var dgram = require( "dgram" );
var udpServer = dgram.createSocket( "udp4" );
var Blink1 = require( "node-blink1" );
var blink1 = new Blink1.Blink1();

udpServer.on( "listening", function() {
  var address = udpServer.address();
  console.log( "State change listener ready on " + address.address + ":" + address.port );
} );

// Call this when we receive a UDP message
udpServer.on( "message", function( msg, rinfo ) {
  var buffer = new Buffer( msg );

  var state = buffer.toString();
  console.log( "Got state " + state + " from " + rinfo.address + ":" + rinfo.port );
  blink( "A" == state );
} );


function blink( state ) {
  if( state ) {
    blink1.fadeToRGB( 500, 0, 255, 0, function() {
      blink1.fadeToRGB( 500, 0, 0, 0 );
    } );
  } else {
    blink1.fadeToRGB( 500, 255, 0, 0, function() {
      blink1.fadeToRGB( 500, 0, 0, 0 );
    } );
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

udpServer.bind( 41234 );
