import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { HttpClient } from '../../../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../../../assets/api/ApiList';

import { Layout } from '../../../Layout';
import { WelcomeScreen } from './WelcomeScreen';
import { CaptureLocation } from './CaptureLocation';
import { VerifyPeer } from './VerifyPeer';
import { CompleteVerification } from '../../../../../verifications/components/CompleteVerification';
import { Navbar } from '../../../../../verifications/components/Navbar';

type ErrorCodeType = 'GR0050' | 'GR0051' | 'GR0055' | '';

export const PeerVerification: React.FC = (): JSX.Element => {
  const { uuid } = useParams();
  const [searchParams] = useSearchParams();
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
  };

  useEffect(() => {
    getPeerData();
  }, [uuid]);

  if (searchParams && searchParams.get('verified') === 'true') {
    return (
      <>
        <Navbar />
        <CompleteVerification />
      </>
    );
  }

  if (errorCode === 'GR0055') {
    navigate('/');
    return <></>;
  }

  return (
    <Layout>
      {currentStep === -1 ? (
        <WelcomeScreen firstName={errorData.username} getPeerData={getPeerData} setCurrentStep={setCurrentStep} />
      ) : currentStep >= 0 && errorCode !== '' ? (
        <>
          {errorCode === 'GR0050' ? (
            <VerifyPeer
              type="EMAIL"
              peerName={errorData.name}
              verificationBy={errorData.verificationBy}
              uuid={String(uuid)}
              getPeerData={getPeerData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          ) : (
            <></>
          )}
          {errorCode === 'GR0051' ? (
            <VerifyPeer
              type="MOBILE"
              peerName={errorData.name}
              verificationBy={errorData.verificationBy}
              uuid={String(uuid)}
              getPeerData={getPeerData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
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
