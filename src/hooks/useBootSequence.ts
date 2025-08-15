import { useState, useEffect } from "react";

export const useBootSequence = () => {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootText, setBootText] = useState("");
  const [bootProgress, setBootProgress] = useState(0);

  useEffect(() => {
    if (isBooting) {
      const bootSteps = [
        "Initializing quantum core...",
        "Loading cybernetic drivers...",
        "Activating neural networks...",
        "Establishing matrix connection...",
        "Portfolio OS ready!",
      ];

      let currentStep = 0;
      let currentProgress = 0;

      const bootInterval = setInterval(() => {
        if (currentStep < bootSteps.length) {
          setBootText(bootSteps[currentStep]);
          currentProgress += 20;
          setBootProgress(currentProgress);
          currentStep++;
        } else {
          setTimeout(() => {
            setIsBooting(false);
            setIsPoweredOn(true);
          }, 500);
          clearInterval(bootInterval);
        }
      }, 100);

      return () => clearInterval(bootInterval);
    }
  }, [isBooting]);

  const handlePowerOn = () => {
    setIsBooting(true);
  };

  return {
    isPoweredOn,
    isBooting,
    bootText,
    bootProgress,
    handlePowerOn,
  };
};
