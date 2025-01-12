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

AFRAME.registerComponent('camera-controls', {
    init: function () {
        this.camera = this.el;
        this.movementSpeed = 0.02; // Slowed down movement speed
        this.isPaused = false; // Track if movements are paused
        this.activeMovement = null; // Track active movement type
        this.movementIntervals = []; // Store active movement intervals

        // Save initial camera position (origin)
        const currentPosition = this.camera.getAttribute('position');
        this.initialPosition = { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z };

        // Create the tutorial overlay when the component is initialized
        this.createTutorialOverlay();

        // Bind the key events
        this.bindEvents();
    },

    bindEvents: function () {
        window.addEventListener('keydown', this.handleKeyPress.bind(this));

        // Bind the start button to hide the overlay when clicked
        const startButton = document.getElementById('startButton');
        startButton.addEventListener('click', () => {
            document.getElementById('overlay').style.display = 'none';
        });
    },

    handleKeyPress: function (event) {
        switch (event.key) {
            case '1':
                this.startMoving('x', 1);  // Move camera on +X axis
                break;
            case '2':
                this.startMoving('x', -1); // Move camera on -X axis
                break;
            case '3':
                this.startMoving('y', 1);  // Move camera on +Y axis
                break;
            case '4':
                this.startMoving('y', -1); // Move camera on -Y axis
                break;
            case '5':
                this.startMoving('z', 1);  // Move camera on +Z axis
                break;
            case '6':
                this.startMoving('z', -1); // Move camera on -Z axis
                break;
            case ' ': // Spacebar to pause/resume movement
                this.togglePause();
                break;
            case '0': // Reset to initial position and stop animation
                this.resetCameraToOrigin();
                break;
        }
    },

    startMoving: function (axis, direction) {
        // Hide the cursor when movement starts
        document.body.style.cursor = 'none';

        // Stop any ongoing movements
        this.stopAllMovements();

        // Start moving the camera along the given axis and direction (infinite)
        const movementInterval = setInterval(() => {
            if (!this.isPaused) {
                const position = this.camera.getAttribute('position');
                position[axis] += this.movementSpeed * direction;
                this.camera.setAttribute('position', position);
            }
        }, 16); // Approx. 60 FPS

        this.activeMovement = { axis, direction }; // Track current movement
        this.movementIntervals.push(movementInterval);
    },

    togglePause: function () {
        // Toggle pause state
        this.isPaused = !this.isPaused;

        // Show the cursor when movement is paused
        if (this.isPaused) {
            document.body.style.cursor = 'default';
        }
    },

    stopAllMovements: function () {
        // Stop all ongoing camera movements
        this.movementIntervals.forEach(clearInterval);
        this.movementIntervals = []; // Reset the interval array
        this.activeMovement = null;  // Clear active movement

        // Show the cursor when all movements stop
        document.body.style.cursor = 'default';
    },

    resetCameraToOrigin: function () {
        // Stop all movements
        this.stopAllMovements();

        // Reset camera position to its initial position (origin)
        this.camera.setAttribute('position', this.initialPosition);

        // Show the cursor when reset to the origin
        document.body.style.cursor = 'default';

        // Reset pause state
        this.isPaused = false;
    },

    createTutorialOverlay: function () {
        // Create overlay div
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.color = 'white';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.textAlign = 'center';
        overlay.style.zIndex = '10';
        overlay.style.fontFamily = 'Arial, sans-serif';

        // Create the content div inside the overlay
        const content = document.createElement('div');
        content.id = 'overlay-content';
        content.style.maxWidth = '80%';
        content.style.padding = '100px';
        content.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        content.style.borderRadius = '10px';

        // Add the tutorial text
        const tutorialHTML = `
            <h1>A-Frame Camera Control</h1>
            <h2>Camera Slide Studio</h2>
            <p>Use the following keys to move the camera:</p>
            <ul style="text-align: left;">
                <p>
                <strong>1</strong>: Move camera on + X axis<br>
                <strong>2</strong>: Move camera on – X axis
                </p>
                <p>
                <strong>3</strong>: Move camera on + Y axis<br>
                <strong>4</strong>: Move camera on – Y axis
                </p>
                <p>
                <strong>5</strong>: Move camera on + Z axis<br>
                <strong>6</strong>: Move camera on – Z axis
                </p>
                <p>
                <strong>Spacebar</strong>: Pause / Resume camera movement<br><br>
                <strong>0</strong>: Reset camera to its initial position
                </p>
            </ul>
        `;
        content.innerHTML = tutorialHTML;

        // Create the start button
        const startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.textContent = 'Start';
        startButton.style.padding = '10px 20px';
        startButton.style.backgroundColor = '#4CAF50';
        startButton.style.color = 'white';
        startButton.style.border = 'none';
        startButton.style.cursor = 'pointer';
        startButton.style.fontSize = '18px';
        startButton.style.marginTop = '20px';
        startButton.style.borderRadius = '10px';

        // Append the content and button to the overlay
        content.appendChild(startButton);
        overlay.appendChild(content);

        // Append the overlay to the document body
        document.body.appendChild(overlay);
    }
});
