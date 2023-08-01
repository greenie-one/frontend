import { useState } from 'react';
import { Title, Button, UseStylesOptions, MantineTheme, Modal } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import checkGif from '../../assets/94109-confirmation 1.gif';
import location from '../../assets/location.png';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useParams } from 'react-router-dom';
import locationError from '../../assets/locationError.png';

type OtpInputStyles = {
  root: string;
  input: string;
};

type OtpInputStylesType = (
  params: void,
  options?: UseStylesOptions<string>
) => {
  classes: OtpInputStyles;
  cx: (...args: string[]) => string;
  theme: MantineTheme;
};

export const AddressVerification = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { peerAddressVerificationForm, profileData, residentialInfoData } = useGlobalContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [residentialInfo, setResidentialInfo] = useState<ResidentialInfoResponse | null>(null);
  const addressVerified = true;

  const NextActiveStep = () => {
    if (activeStep !== 7) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleGoToProfile = () => {
    close();
  };

  const { id } = useParams();
  const filteredInfo = residentialInfoData.find((info) => info.id === id);

  return <></>;
};
