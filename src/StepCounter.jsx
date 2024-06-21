import React, { useState, useEffect } from 'react';
import useDeviceMotion from './useDeviceMotion';

const StepCounter = () => {
  const { x, y, z } = useDeviceMotion();
  const [steps, setSteps] = useState(0);
  const [lastAcc, setLastAcc] = useState({ x: 0, y: 0, z: 0 });
  const [lastPeak, setLastPeak] = useState(Date.now());
  const [acceleration, setAcceleration] = useState(0);

  useEffect(() => {
    const alpha = 0.8; // Low-pass filter constant
    const gravity = {
      x: alpha * lastAcc.x + (1 - alpha) * x,
      y: alpha * lastAcc.y + (1 - alpha) * y,
      z: alpha * lastAcc.z + (1 - alpha) * z,
    };

    const filteredX = x - gravity.x;
    const filteredY = y - gravity.y;
    const filteredZ = z - gravity.z;

    const accelerationMagnitude = Math.sqrt(filteredX * filteredY + filteredZ * filteredZ);

    setAcceleration(accelerationMagnitude);
    setLastAcc({ x: filteredX, y: filteredY, z: filteredZ });

    // Parameters for step detection
    const threshold = 1.2; // Threshold for acceleration magnitude to count as a step
    const timeBetweenSteps = 300; // Minimum time between steps in milliseconds

    if (
      accelerationMagnitude > threshold &&
      Date.now() - lastPeak > timeBetweenSteps
    ) {
      setSteps((prevSteps) => prevSteps + 1);
      setLastPeak(Date.now());
    }
  }, [x, y, z, lastAcc, lastPeak]);

  return (
    <div>
      <h1>Step Counter</h1>
      <p>Steps: {steps}</p>
      <p>Acceleration: {acceleration.toFixed(2)}</p>
    </div>
  );
};

export default StepCounter;