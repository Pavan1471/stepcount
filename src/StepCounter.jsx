import React, { useState, useEffect } from 'react';
import useDeviceMotion from './useDeviceMotion';

const StepCounter = () => {
  const { x, y, z } = useDeviceMotion();
  const [steps, setSteps] = useState(0);
  const [lastPeak, setLastPeak] = useState(Date.now());
  const [lastAcc, setLastAcc] = useState({ x: 0, y: 0, z: 0 });
  const [filteredAcc, setFilteredAcc] = useState({ x: 0, y: 0, z: 0 });
  const [accelerationMagnitude, setAccelerationMagnitude] = useState(0);
  const [state, setState] = useState('WAITING_FOR_STEP');

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

    setFilteredAcc({ x: filteredX, y: filteredY, z: filteredZ });

    const magnitude = Math.sqrt(filteredX * filteredX + filteredY * filteredY + filteredZ * filteredZ);
    setAccelerationMagnitude(magnitude);
    setLastAcc({ x: filteredX, y: filteredY, z: filteredZ });

    // Parameters for step detection
    const threshold = 1.2; // Threshold for acceleration magnitude to count as a step
    const timeBetweenSteps = 300; // Minimum time between steps in milliseconds

    switch (state) {
      case 'WAITING_FOR_STEP':
        if (magnitude > threshold) {
          setState('PEAK_DETECTED');
          setLastPeak(Date.now());
        }
        break;
      case 'PEAK_DETECTED':
        if (Date.now() - lastPeak > timeBetweenSteps) {
          setSteps((prevSteps) => prevSteps + 1);
          setState('WAITING_FOR_STEP');
        }
        break;
      default:
        setState('WAITING_FOR_STEP');
        break;
    }
  }, [x, y, z, lastAcc, lastPeak, state]);

  return (
    <div>
      <h1>Ste Count</h1>
      <p>Steps: {steps}</p>
      <p>Acceleration Magnitude: {accelerationMagnitude.toFixed(2)}</p>
    </div>
  );
};

export default StepCounter;
