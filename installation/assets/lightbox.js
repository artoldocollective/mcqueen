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

// Function to open the overlay and load the iframe
function openOverlay(url) {
  document.getElementById('overlay').style.display = 'flex'; // Show overlay
  document.getElementById('lightbox-iframe').src = url; // Set the iframe source to the URL of the clicked entity
}

// Function to close the overlay
function closeOverlay() {
  document.getElementById('overlay').style.display = 'none'; // Hide overlay
  document.getElementById('lightbox-iframe').src = ''; // Clear the iframe src when closing
}

// Add event listeners to all entities with the lightbox attribute
document.querySelectorAll('[lightbox]').forEach(function (entity) {
  entity.addEventListener('click', function () {
    const url = this.getAttribute('data-url'); // Get the iframe URL from the entity's data-url attribute
    openOverlay(url); // Open overlay with the specific iframe URL
  });
});
