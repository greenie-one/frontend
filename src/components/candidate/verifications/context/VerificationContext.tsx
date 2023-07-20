import React, { createContext, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { isNotEmpty, useForm } from '@mantine/form';
import { showErrorNotification } from '../../../../utils/functions/showNotification';
import {
  DisputeFormType,
  UnverifiedLinkType,
  VerificationContextType,
  VerificationResponseType,
} from '../types/VerificationContext';

const VerificationContext = createContext<VerificationContextType>({} as VerificationContextType);
export const useVerificationContext = () => useContext(VerificationContext);

export const VerificationContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const params = useParams();

  const peerUUID = String(params.uuid);
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
  const [verificationResponse, setVerificationResponse] = useState<VerificationResponseType>({});

  const getVerificationData = async () => {
    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.getVerificationData}/${params.uuid}`,
      method: 'GET',
    });

    if (res.ok) {
      setUnverifiedLink('NONE');
      setVerificationData(res.value);
    } else {
      setActiveStep(0);
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

  const postVerificationData = async () => {
    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.getVerificationData}/${params.uuid}`,
      method: 'PATCH',
      body: {
        verificationFields: verificationResponse,
      },
    });

    if (res.ok) {
      setActiveStep(totalSteps);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getVerificationData();
    if (verificationBy === 'HR') setTotalSteps(6);
    else setTotalSteps(7);
  }, [params.peer, params.uuid]);

  const storeValues = {
    peerUUID,
    verificationBy,
    activeStep,
    setActiveStep,
    totalSteps,
    verificationData,
    unverifiedLink,
    disputeForm,
    getVerificationData,
    postVerificationData,
    verificationResponse,
    setVerificationResponse,
  };

  return <VerificationContext.Provider value={storeValues}>{children}</VerificationContext.Provider>;
};
