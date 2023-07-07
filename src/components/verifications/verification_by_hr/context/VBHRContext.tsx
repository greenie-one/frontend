import React, { createContext, useContext, useState } from 'react';

type VBHRContextType = {
  activeStep: number;
  NextActiveStep: () => void;
  PrevActiveStep: () => void;
};

const VBHRContext = createContext<VBHRContextType>({} as VBHRContextType);
export const useVBHRContext = () => useContext(VBHRContext);

export const VBHRContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const NextActiveStep = () => {
    if (activeStep !== 7) {
      setActiveStep(activeStep + 1);
    }
  };
  const PrevActiveStep = () => {
    if (activeStep !== 1) {
      setActiveStep(activeStep - 1);
    }
  };
  return (
    <VBHRContext.Provider
      value={{
        activeStep,
        NextActiveStep,
        PrevActiveStep,
      }}
    >
      {children}
    </VBHRContext.Provider>
  );
};
