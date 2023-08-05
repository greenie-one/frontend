import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HttpClient } from '../../../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../../../assets/api/ApiList';

import { Layout } from '../../../Layout';
import { WelcomeScreen } from './WelcomeScreen';
import { CaptureLocation } from './CaptureLocation';
import { VerifyPeer } from './VerifyPeer';

type ErrorCodeType = 'GR0050' | 'GR0051' | 'GR0055' | '';

export const PeerVerification: React.FC = (): JSX.Element => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [errorCode, setErrorCode] = useState<ErrorCodeType>('');
  const [peerData, setPeerData] = useState<PeerVerificationDataResponse>({} as PeerVerificationDataResponse);
  const [errorData, setErrorData] = useState<PeerVerificationErrorResponse>({} as PeerVerificationErrorResponse);

  const getPeerData = async () => {
    const res = await HttpClient.callApi<PeerVerificationDataResponse>({
      url: `${addressVerificationAPIList.getVerificationData}/${uuid}`,
      method: 'GET',
    });

    if (res.ok) {
      setPeerData(res.value);
      setErrorCode('');
    } else {
      setErrorCode(res.error.code as ErrorCodeType);
      setErrorData(res.error as PeerVerificationErrorResponse);
    }

    setCurrentStep(0);
  };

  // useEffect(() => {
  //   getPeerData();
  // }, [uuid]);

  if (errorCode === 'GR0055') {
    navigate('/');
    return <></>;
  }

  return (
    <Layout>
      {currentStep === -1 ? (
        <WelcomeScreen firstName="Bobby" getPeerData={getPeerData} />
      ) : currentStep === 0 && errorCode !== '' ? (
        <>
          {errorCode === 'GR0050' ? (
            <VerifyPeer
              type="EMAIL"
              peerName={errorData.name}
              verificationBy="Cousin"
              uuid={String(uuid)}
              getPeerData={getPeerData}
            />
          ) : (
            <></>
          )}
          {errorCode === 'GR0051' ? (
            <VerifyPeer
              type="MOBILE"
              peerName={errorData.name}
              verificationBy="Cousin"
              uuid={String(uuid)}
              getPeerData={getPeerData}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <CaptureLocation uuid={String(uuid)} peerData={peerData} />
      )}
    </Layout>
  );
};
