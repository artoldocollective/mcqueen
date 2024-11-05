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

AFRAME.registerComponent('enable-pointer-lock', {
    init: function () {
      const el = this.el;
      el.addEventListener('click', function () {
        if (!document.pointerLockElement) {
          el.sceneEl.requestPointerLock();
        }

        const cameraEl = document.querySelector('[camera]');
        const lookControls = cameraEl.components['look-controls'];
        if (lookControls) {
          lookControls.data.pointerLockEnabled = true;
          console.log('Pointer Lock Enabled');
        }
      });
    }
  });

 // Enable pointer lock when a opened lightbox is closed

document.querySelectorAll('[enable-pointer-lock]').forEach(el => {
    el.setAttribute('enable-pointer-lock', '');
  });

  const overlay = document.getElementById('overlay');
  const closeButton = document.querySelector('.close-btn');

  function closeLightbox() {
    overlay.style.display = 'none';
    const scene = document.querySelector('a-scene');
    scene.sceneEl.requestPointerLock();
    const cameraEl = document.querySelector('[camera]');
    const lookControls = cameraEl.components['look-controls'];
    if (lookControls) {
      lookControls.data.pointerLockEnabled = true;
      console.log('Pointer Lock Re-enabled');
    }
  }

  closeButton.addEventListener('click', closeLightbox);

  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.attributeName === 'style' && overlay.style.display === 'none') {
        closeLightbox();
      }
    }
  });

  observer.observe(overlay, { attributes: true });