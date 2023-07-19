import React, { createContext, useContext, useState } from 'react';
import { isNotEmpty, useForm, UseFormReturnType } from '@mantine/form';
import { useGlobalContext } from '../../../../../context/GlobalContext';

type VBMContextType = {
  activeStep: number;
  NextActiveStep: () => void;
  PrevActiveStep: () => void;
  disputeForm: UseFormReturnType<DisputeFormType>;
};

type DisputeFormType = {
  disputeType: string;
  disputeReason: string;
};

const VBMContext = createContext<VBMContextType>({} as VBMContextType);
export const useVBMContext = () => useContext(VBMContext);

export const VBMContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { scrollToTop } = useGlobalContext();

  const disputeForm = useForm<DisputeFormType>({
    initialValues: {
      disputeType: '',
      disputeReason: '',
    },
    validate: {
      disputeReason: isNotEmpty('Please provide more information'),
      disputeType: isNotEmpty('Please select dispute reason'),
    },
  });

  const NextActiveStep = () => {
    setActiveStep(activeStep + 1);
    scrollToTop();
  };
  const PrevActiveStep = () => {
    if (activeStep !== 1) {
      setActiveStep(activeStep - 1);
      scrollToTop();
    }
  };
  return (
    <VBMContext.Provider
      value={{
        activeStep,
        NextActiveStep,
        PrevActiveStep,
        disputeForm,
      }}
    >
      {children}
    </VBMContext.Provider>
  );
};
