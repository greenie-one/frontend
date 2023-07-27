import React, { createContext, useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HttpClient } from '../../../../utils/generic/httpClient';
import { peerVerificationAPIList } from '../../../../assets/api/ApiList';
import { isNotEmpty, useForm } from '@mantine/form';
import { showErrorNotification } from '../../../../utils/functions/showNotification';
import { DisputeFormType, UnverifiedLinkType, VerificationContextType } from '../types/VerificationContext';

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
  const [verificationData, setVerificationData] = useState<GetVerificationDataResponse>(
    {} as GetVerificationDataResponse
  );
  const [unverifiedLink, setUnverifiedLink] = useState<UnverifiedLinkType>('NONE');
  const [verificationResponse, setVerificationResponse] = useState<PostVerificationDataType>(
    {} as PostVerificationDataType
  );
  const [personBeingVerified, setPersonBeingVerified] = useState<string>('');
  const [peerVerified, setPeerVerified] = useState<boolean>(false);

  const getVerificationData = async () => {
    const res = await HttpClient.callApi<GetVerificationDataResponse>({
      url: `${peerVerificationAPIList.getVerificationData}/${params.uuid}`,
      method: 'GET',
    });

    if (res.ok) {
      setUnverifiedLink('NONE');
      const responseData = res.value.data;

      if (responseData.documents.length > 0) {
        setTotalSteps((current) => current + 1);
      }

      if (responseData.skills.length > 0) {
        setTotalSteps((current) => current + 1);
      }

      if (responseData.selectedFields.salary) {
        setTotalSteps((current) => current + 1);
      }

      setVerificationData(res.value);
    } else {
      setPersonBeingVerified((res.error as APIErrorPeer).name);
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

        case 'GR0055': {
          setUnverifiedLink('NONE');
          setPeerVerified(true);
          break;
        }

        default: {
          setUnverifiedLink('NONE');
        }
      }
    }
  };

  const postVerificationData = async () => {
    let requestBody: PostVerificationDataType = { ...verificationResponse };

    if (!verificationResponse.documents) {
      requestBody = { ...requestBody, documents: [] };
    }

    if (!verificationResponse.skills) {
      requestBody = { ...requestBody, skills: [] };
    }

    const res = await HttpClient.callApi({
      url: `${peerVerificationAPIList.getVerificationData}/${params.uuid}`,
      method: 'PATCH',
      body: requestBody,
    });

    if (res.ok) {
      setActiveStep(totalSteps);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    if (verificationBy === 'HR') {
      setTotalSteps((current) => current + 2);
    }
    getVerificationData();
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
    personBeingVerified,
    peerVerified,
  };

  return <VerificationContext.Provider value={storeValues}>{children}</VerificationContext.Provider>;
};
