import React, { createContext, useContext, useState } from 'react';

type VBMContextType = {
  activeStep: number;
  NextActiveStep: () => void;
  PrevActiveStep: () => void;
};

const VBMContext = createContext<VBMContextType>({} as VBMContextType);
export const useVBMContext = () => useContext(VBMContext);

export const VBMContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const NextActiveStep = () => {
    if (activeStep !== 5) {
      setActiveStep(activeStep + 1);
    }
  };
  const PrevActiveStep = () => {
    if (activeStep !== 1) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <VBMContext.Provider
      value={{
        activeStep,
        NextActiveStep,
        PrevActiveStep,
      }}
    >
      {children}
    </VBMContext.Provider>
  );
};
