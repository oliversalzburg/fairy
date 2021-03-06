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
 * Created: 2013-02-05 15:56
 *
 * @author Oliver Salzburg
 * @copyright Copyright (C) 2012, Oliver Salzburg
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

var dust = {
  "^info::LOGON": [
    [500, 0, 255, 0],
    [500, 0, 0, 0]
  ],
  "^info::LOGOFF": [
    [500, 255, 0, 0],
    [500, 0, 0, 0]
  ],
  "^info::ERROR": [
    [50, 255, 0, 0],
    [50, 0, 0, 0],
    [50, 255, 0, 0],
    [50, 0, 0, 0],
    [50, 255, 0, 0],
    [50, 0, 0, 0],
    [50, 255, 0, 0],
    [50, 0, 0, 0],
    [50, 255, 0, 0],
    [50, 0, 0, 0],
    [50, 255, 0, 0],
    [50, 0, 0, 0]
  ]
};

module.exports = dust;
