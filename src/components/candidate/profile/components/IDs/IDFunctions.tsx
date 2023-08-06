import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { APIError } from '../../../../../utils/generic/httpClient';
import { PANAPIList, aadharAPIList, drivinglicenseAPIList } from '../../../../../assets/api/ApiList';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';

export const useIDVerificationMethods = () => {
  const navigate = useNavigate();
  const { authClient, scrollToTop, verifyAadharForm, verifyPANForm, verifyLicenceForm } = useGlobalContext();

  /********** AADHAR CARD METHODS **********/
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45);
  const [aadharVerificationData, setAadharVerificationData] = useState<AadharVerificationResponse>({
    requestId: '',
    taskId: '',
  });

  const handleAadharSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyAadharForm.validateField('otp').hasError) {
      showLoadingNotification({
        title: 'Verifying your OTP...',
        message: 'Please wait while we verify your OTP',
      });

      const { taskId, requestId } = aadharVerificationData;
      const requestBody: IDVerificationOtpRequestBody = {
        otp: verifyAadharForm.values.otp,
        request_id: requestId,
        task_id: taskId,
      };

      const res: Result<verifyAadhar | APIError> = await HttpClient.callApiAuth(
        {
          url: `${aadharAPIList.verifyOTPForAadhar}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );

      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'OTP Verified Successfully' });
        verifyAadharForm.reset();
        navigate('/candidate/profile/IDs/verify/pan/details');
        close();
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  const requestOTPForAadhar = async () => {
    showLoadingNotification({
      title: 'Sending OTP to linked phone number...',
      message: 'Please wait while we send OTP to your linked number.',
    });

    const requestBody: IDRequestBody = { id_type: 'AADHAR', id_number: verifyAadharForm.values.aadharNo };
    const res: Result<AddAadhar> = await HttpClient.callApiAuth(
      {
        url: `${aadharAPIList.requestOTPForAadhar}`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

    if (res.ok) {
      showSuccessNotification({ title: 'Success !', message: 'OTP Sent to your linked phone number' });
      const { request_id, taskId } = res.value;

      setAadharVerificationData((prevState) => ({
        ...prevState,
        requestId: request_id,
        taskId: taskId,
      }));
      open();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const handleAadharModal = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!verifyAadharForm.validateField('aadharNo').hasError && checked) {
      requestOTPForAadhar();

      const timer = setInterval(() => {
        setSecondsRemaining((prevSecondsRemaining) => {
          const newSecondsRemaining = prevSecondsRemaining - 1;
          if (newSecondsRemaining === 0) {
            clearInterval(timer);
          }
          return newSecondsRemaining;
        });
      }, 1000);

      if (secondsRemaining === 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }
  };

  /********** PAN CARD METHODS **********/
  const handlePANSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!verifyPANForm.validateField('panNo').hasError) {
      showLoadingNotification({ title: 'Verifying your PAN Card...', message: 'Please wait while we verify your PAN' });

      const requestBody: IDRequestBody = { id_type: 'PAN', id_number: verifyPANForm.values.panNo };
      const res: Result<verifyPan> = await HttpClient.callApiAuth(
        {
          url: `${PANAPIList.verifyPAN}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );

      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Verified PAN successfully' });
        scrollToTop();
        navigate('/candidate/profile/IDs/verify/pan/details');
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  /********** DRIVING LICENCE METHODS **********/
  const handleDrivingLicenceSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!verifyLicenceForm.validateField('licenceNo').hasError) {
      showLoadingNotification({
        title: 'Verifying your Driving Licence...',
        message: 'Please wait while we verify your licence',
      });

      const requestBody: IDRequestBody = { id_type: 'DRIVING_LICENSE', id_number: verifyLicenceForm.values.licenceNo };
      const res: Result<verifyLicence> = await HttpClient.callApiAuth(
        {
          url: `${drivinglicenseAPIList.verifylicense}`,
          method: 'POST',
          body: requestBody,
        },
        authClient
      );

      if (res.ok) {
        showSuccessNotification({ title: 'Success !', message: 'Verified Licence successfully' });
        scrollToTop();
        navigate('/candidate/profile/IDs/verify/driving_licence/details');
      } else {
        showErrorNotification(res.error.code);
      }
    }
  };

  return {
    handleAadharSubmit,
    requestOTPForAadhar,
    handleAadharModal,
    handlePANSubmit,
    handleDrivingLicenceSubmit,
    checked,
    setChecked,
    secondsRemaining,
    opened,
    close,
  };
};
