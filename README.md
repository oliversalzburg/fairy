fairy
=====

will invoke predefined blink patterns on your blink(1)

Installation
------------
### Prerequisites on Windows:
1. Install [Python 2.7.3](http://www.python.org/download/)
2. Add `C:\Python27` to your `PATH`

### All platforms
1. `git clone git://github.com/oliversalzburg/fairy.git`
2. `cd fairy`
3. `npm install`

Configuration
-------------
Edit `dust.js`. The format is:

    "udp message content": [
      [duration, red, green, blue],
      [duration, red, green, blue],
      ...
    ]
