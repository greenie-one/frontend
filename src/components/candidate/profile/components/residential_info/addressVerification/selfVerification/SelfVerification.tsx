import React from 'react';
import { useParams } from 'react-router-dom';
import { Text, Box, Title, Button } from '@mantine/core';
// import emptyProfile from '../../../../assets/emptyProfile.png';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../../../assets/api/ApiList';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmationModal } from '../components/ConfirmationModals';
import { useGlobalContext } from '../../../../../../../context/GlobalContext';
import { Layout } from '../../../Layout';

type LocationRequestType = {
  latitude: number;
  longitude: number;
};

type CaptureSuccessResponse = {
  message: string;
  success: boolean;
};

const formattedDate = (data: string) => {
  return data.substring(0, 10).split('-').reverse().join('-');
};

export const SelfVerification: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const { residentialInfoData, authClient, setForceRender } = useGlobalContext();

  const currentResidentialInfo = residentialInfoData.find((data) => data.id === id);

  const [opened, { open, close }] = useDisclosure(false);
  const [addressVerified, setAddressVerified] = React.useState<boolean | null>(null);

  const getLocation = () => {
    setAddressVerified(null);

    if (navigator.geolocation) {
      showLoadingNotification({
        title: 'Capturing Location...',
        message: 'Please provide access to capture your location.',
      });
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
      showErrorNotification('Geo-Location is not supported by this browser.');
    }

    open();
  };

  const setPosition = async (position: { coords: CoordinatesType }) => {
    const requestBody: LocationRequestType = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    const res = await HttpClient.callApiAuth<CaptureSuccessResponse>(
      {
        url: `${addressVerificationAPIList.selfCaptureLocation}/${id}`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );

    if (res.ok) {
      setAddressVerified(true);
      setForceRender((current) => !current);
      showSuccessNotification({
        title: 'Verified!',
        message: 'Your location has been captured successfully!',
      });
    } else {
      showErrorNotification(res.error.code);
      setAddressVerified(false);
    }
  };

  const showError = (error: any) => {
    setAddressVerified(false);

    switch (error.code) {
      case error.PERMISSION_DENIED: {
        showErrorNotification('Request for capturing location is denied.');
        break;
      }

      case error.POSITION_UNAVAILABLE: {
        showErrorNotification('Location information is unavailable.');
        break;
      }
      case error.TIMEOUT: {
        showErrorNotification('The request to get user location timed out.');
        break;
      }
      case error.UNKNOWN_ERROR: {
        showErrorNotification('Something went wrong.');
        break;
      }

      default: {
        showErrorNotification('Something went wrong.');
      }
    }
  };

  return (
    <Layout>
      {addressVerified !== null ? (
        <ConfirmationModal
          verificationType={'Self'}
          opened={opened}
          close={close}
          addressVerified={addressVerified}
          residentialData={currentResidentialInfo as ResidentialInfoResponse}
        />
      ) : (
        <></>
      )}
      <Box className="container" style={{ marginTop: '8rem' }}>
        <Box className="address-verification-container">
          <Title className="address-verification-bold-title">We are trying to verify your residential address</Title>
          <Box className="address-verification-details-box-header">
            <Text>Sr. No.</Text>
            <Text>Address</Text>
            <Text>Address Type</Text>
            <Text>Residential since</Text>
          </Box>
          <Box className="address-verification-details-added-peers">
            <Text>1</Text>
            <Text className="peer-email">
              {currentResidentialInfo?.address_line_1}, {currentResidentialInfo?.address_line_2},{' '}
              {currentResidentialInfo?.landmark}, {currentResidentialInfo?.city}, {currentResidentialInfo?.pincode}
            </Text>
            <Text>{currentResidentialInfo?.addressType}</Text>
            <Text>{formattedDate(String(currentResidentialInfo?.start_date))}</Text>
          </Box>
          <Title className="address-verification-details-main-title">
            Please allow permission to capture location to confirm the verification
          </Title>
          <Button className="green-outline-btn" onClick={getLocation}>
            Capture Location
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
