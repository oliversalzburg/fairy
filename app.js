var dgram = require( "dgram" );
var terminal = require( "child_process" ).spawn( "bash" );

terminal.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

terminal.on('exit', function (code) {
        console.log('child process exited with code ' + code);
});

var udpServer = dgram.createSocket( "udp4" );

udpServer.on( "listening", function() {
  var address = udpServer.address();
  console.log( "State change listener ready on " + address.address + ":" + address.port );
} );

// Call this when we receive a UDP message
udpServer.on( "message", function( msg, rinfo ) {
  var buffer = new Buffer( msg );

  var state = buffer.toString( );
  console.log( "Got state " + state + " from " + rinfo.address + ":" + rinfo.port );
  blink("A"==state);
} );

var exec = require('child_process').exec,
    child;

function blink(state) {
var color=(state)?"--green":"--red";
var commandLine = "sudo ./blink1-tool "+color+" --blink 1&&sleep 1";
console.log( "Executing: ", commandLine );

child = exec( commandLine,
    function (error, stdout, stderr) {
        if(stdout!==''){
            console.log('---------stdout: ---------\n' + stdout);
        }
        if(stderr!==''){
            console.log('---------stderr: ---------\n' + stderr);
        }
        if (error !== null) {
            console.log('---------exec error: ---------\n[' + error+']');
        }
    });
}

udpServer.bind( 41234 );
