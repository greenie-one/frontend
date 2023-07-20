import React, { createContext, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import { UseFormReturnType, isNotEmpty, useForm } from '@mantine/form';

type UnverifiedLinkType = 'EMAIL' | 'MOBILE' | 'NONE';

type VerificationContextType = {
  peerId: string;
  verificationBy: string;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
  verificationData: any;
  unverifiedLink: string;
  disputeForm: UseFormReturnType<DisputeFormType>;
};

type DisputeFormType = {
  disputeType: string;
  disputeReason: string;
};

const VerificationContext = createContext<VerificationContextType>({} as VerificationContextType);
export const useVerificationContext = () => useContext(VerificationContext);

export const VerificationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();
  const { authClient } = useGlobalContext();

  const peerId = String(params.uuid);
  const verificationBy = String(params.peer);
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

  const [activeStep, setActiveStep] = useState<number>(1);
  const [totalSteps, setTotalSteps] = useState<number>(7);
  const [verificationData, setVerificationData] = useState<any>(null);
  const [unverifiedLink, setUnverifiedLink] = useState<UnverifiedLinkType>('NONE');

  const getVerificationData = async () => {
    const res = await HttpClient.callApiAuth(
      {
        url: `${peerVerificationAPIList.getVerificationData}/${params.uuid}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      console.log(res.value);
      setVerificationData(res.value);
    } else {
      switch (res.error.code) {
        case 'GR0050': {
          setUnverifiedLink('EMAIL');
          break;
        }

        case 'GR0051': {
          setUnverifiedLink('MOBILE');
          break;
        }

        default: {
          setUnverifiedLink('NONE');
        }
      }
    }
  };

  useEffect(() => {
    getVerificationData();
  }, [params.peer, params.uuid]);

  const storeValues = {
    peerId,
    verificationBy,
    activeStep,
    setActiveStep,
    totalSteps,
    verificationData,
    unverifiedLink,
    disputeForm,
  };

  return <VerificationContext.Provider value={storeValues}>{children}</VerificationContext.Provider>;
};
