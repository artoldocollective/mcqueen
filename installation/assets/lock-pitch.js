AFRAME.registerComponent('lock-pitch', {
  init: function () {
    const el = this.el;
    const lookControls = el.components['look-controls'];

    // Override the tick function of the look-controls to lock pitch (X-axis).
    const originalTick = lookControls.tick;
    lookControls.tick = function (t) {
      originalTick.apply(this, arguments);

      // Lock the pitch (X-axis) to precisely 0 with slight smoothing to avoid jitter
      const pitchObject = this.pitchObject;
      pitchObject.rotation.x = THREE.MathUtils.lerp(pitchObject.rotation.x, 0, 0.1);
    };
  }
});
