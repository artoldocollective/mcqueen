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

 AFRAME.registerComponent('disable-pointer-lock', {
    init: function () {
      const el = this.el;

      el.addEventListener('click', function () {
        // Attempt to exit pointer lock immediately
        if (document.pointerLockElement) {
          document.exitPointerLock();
          console.log('Pointer Lock Disabled immediately');
        }

        // Check after a short delay if pointer lock is still active
        setTimeout(() => {
          if (document.pointerLockElement) {
            // If pointer lock is still active, try disabling it again with 1.5s timeout
            console.log('Pointer Lock still active, attempting to disable after 1.5-second delay');
            setTimeout(() => {
              if (document.pointerLockElement) {
                document.exitPointerLock();
                console.log('Pointer Lock Disabled after 1.5-second delay');
              }
            }, 1500);
          }
        }, 100); // Slight delay to check if the first attempt failed
      });
    }
  });

  // Apply the component to all elements that should have pointer lock disabled
  document.querySelectorAll('[disable-pointer-lock]').forEach(el => {
    el.setAttribute('disable-pointer-lock', '');
  });