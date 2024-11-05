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

// Custom Image cursor

document.querySelector('.mask').addEventListener('click', function () {
      const canvasEl = document.querySelector('a-scene').canvas;

      // Request pointer lock on the canvas (A-Frame scene)
      if (canvasEl.requestPointerLock) {
        canvasEl.requestPointerLock();
      } else if (canvasEl.mozRequestPointerLock) {
        canvasEl.mozRequestPointerLock();
      }

      // Enable pointer lock in the A-Frame look-controls component
      const cameraEl = document.querySelector('[camera]');
      const lookControls = cameraEl.components['look-controls'];
      if (lookControls) {
        lookControls.data.pointerLockEnabled = true;
        console.log('Pointer Lock Enabled');
      }
    });


// Prevent Image dragging

document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});