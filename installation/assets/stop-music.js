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

// Pause and music resume with Lightbox closed

AFRAME.registerComponent('stop-music', {
    init: function () {
      const audioElement = document.querySelector('#background-music');  // Select the audio element
      let isMusicPaused = false; // Track if the music is paused
      let fadeDuration = 1000;  // Fade duration in milliseconds
      let initialVolume = 1;    // Save the initial volume level

      if (!audioElement) {
        console.error('Audio element not found!');
        return;
      }

      // Function to fade out the audio
      function fadeOutAudio() {
        let volume = initialVolume;
        const fadeOutInterval = setInterval(() => {
          if (volume > 0) {
            volume -= 0.1;
            audioElement.volume = Math.max(volume, 0);
          } else {
            clearInterval(fadeOutInterval);
            audioElement.pause();
            isMusicPaused = true;
          }
        }, fadeDuration / 10);  // Adjust volume in 10 steps
      }

      // Function to fade in the audio
      function fadeInAudio() {
        let volume = 0;
        audioElement.volume = volume;
        audioElement.play();
        const fadeInInterval = setInterval(() => {
          if (volume < initialVolume) {
            volume += 0.1;
            audioElement.volume = Math.min(volume, initialVolume);
          } else {
            clearInterval(fadeInInterval);
            isMusicPaused = false;
          }
        }, fadeDuration / 10);  // Adjust volume in 10 steps
      }

      // Handle click event on elements with the stop-music component
      this.el.addEventListener('click', (evt) => {
        evt.stopPropagation(); // Prevent scene click event from firing
        if (!isMusicPaused) {
          fadeOutAudio();
        }
      });

      // Resume music when lightbox is closed (after pointer lock is enabled)
      document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement && isMusicPaused) {
          fadeInAudio();
        }
      });
    }
  });