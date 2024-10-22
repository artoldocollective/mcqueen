/*
    MIT License

    Copyright © 2024 Chris Weil, RedMagicBlue

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

let scene = document.querySelector('a-scene');
  var videoEls = document.querySelectorAll('video'); // Select all video elements

  // Detect mobile device and add a user interaction fallback
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  window.onload = function() {
    if (isMobile) {
      // For mobile devices, play all videos on user interaction
      document.body.addEventListener('touchstart', function() {
        videoEls.forEach(function(videoEl) {
          videoEl.play();
        });
      }, { once: true });
    } else {
      // Autoplay and loop for non-mobile devices
      videoEls.forEach(function(videoEl) {
        videoEl.play();
        videoEl.loop = true;  // Ensure all videos are set to loop
      });
    }
  };