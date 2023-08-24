import React from 'react';
import { Text, Box, Title, Button } from '@mantine/core';
import emptyProfile from '../../../../assets/emptyProfile.png';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../../../utils/functions/showNotification';
import { HttpClient } from '../../../../../../../utils/generic/httpClient';
import { addressVerificationAPIList } from '../../../../../../../assets/api/ApiList';
import { useDisclosure } from '@mantine/hooks';
import { ConfirmationModal } from '../components/ConfirmationModals';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../../../../context/GlobalContext';

type CaptureLocationProps = {
  uuid: string;
  peerData: PeerVerificationDataResponse;
};

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

export const CaptureLocation: React.FC<CaptureLocationProps> = ({ uuid, peerData }): JSX.Element => {
  const { scrollToTop } = useGlobalContext();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const [addressVerified, setAddressVerified] = React.useState<boolean | null>(null);

  if (JSON.stringify(peerData) === '{}') {
    return <></>;
  }

  const getLocation = () => {
    setAddressVerified(null);

    showLoadingNotification({
      title: 'Capturing Location...',
      message: 'Please provide access to capture your location.',
    });

    if (navigator.geolocation) {
      showSuccessNotification({ title: 'Success', message: 'Location Permission Granted' });
      navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
      showErrorNotification('Geo-Location is not supported by this browser.');
    }

    open();
  };

  const setPosition = async (position: { coords: CoordinatesType }) => {
    showLoadingNotification({
      title: 'Verifying Address...',
      message: 'Please wait while we verify your location.',
    });

    const requestBody: LocationRequestType = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    const res = await HttpClient.callApi<CaptureSuccessResponse>({
      url: `${addressVerificationAPIList.peerCaptureLocation}/${uuid}`,
      method: 'POST',
      body: requestBody,
    });

    if (res.ok) {
      setAddressVerified(true);
      showSuccessNotification({
        title: 'Verified!',
        message: 'Your location has been captured successfully!',
      });
    } else {
      showErrorNotification(res.error.code);

      if (res.error.code === 'GR0058') {
        navigate('.?verified=true');
        scrollToTop();
      } else {
        setAddressVerified(false);
      }
    }
  };

  const showError = (error: any) => {
    setAddressVerified(false);

    switch (error.code) {
      case error.PERMISSION_DENIED: {
        showErrorNotification('ACCESS_DENIED');
        break;
      }

      case error.POSITION_UNAVAILABLE: {
        showErrorNotification('INFORMATION_UNAVAILABLE');
        break;
      }
      case error.TIMEOUT: {
        showErrorNotification('REQUEST_TIMED_OUT');
        break;
      }
      case error.UNKNOWN_ERROR: {
        showErrorNotification('SOMETHING_WENT_WRONG');
        break;
      }

      default: {
        showErrorNotification('SOMETHING_WENT_WRONG');
      }
    }
  };

  return (
    <>
      {addressVerified !== null ? (
        <ConfirmationModal
          verificationType={'Peer'}
          opened={opened}
          close={close}
          addressVerified={addressVerified}
          peerData={peerData}
        />
      ) : (
        <></>
      )}
      <Box className="container" style={{ marginTop: '8rem' }}>
        <Box className="address-verification-container">
          <Title className="address-verification-bold-title">We are trying to verify residential address of</Title>
          <Box className="profile-details">
            {peerData.user.profilePic ? (
              <Box className="profile-details-image">
                <img src={peerData.user.profilePic} alt="Profile picture" />
              </Box>
            ) : (
              <Box className="profile-details-image">
                <img src={emptyProfile} alt="Profile picture" />
              </Box>
            )}
            <Title className="address-verification-details-name">{peerData.user.name}</Title>
            <Box className="address-verification-details">
              <Text className="address-verification-details-address">
                {peerData.residentialInfo.address_line_1}, {peerData.residentialInfo.address_line_2},{' '}
                {peerData.residentialInfo.landmark}, {peerData.residentialInfo.city}, {peerData.residentialInfo.pincode}
              </Text>
            </Box>
          </Box>
          <Box className="address-verification-details-box-header">
            <Text>Sr. No.</Text>
            <Text>Address</Text>
            <Text>Address Type</Text>
            <Text>Residential since</Text>
          </Box>
          <Box className="address-verification-details-added-peers">
            <Text>1</Text>
            <Text className="peer-email">
              {peerData.residentialInfo.address_line_1}, {peerData.residentialInfo.address_line_2},{' '}
              {peerData.residentialInfo.landmark}, {peerData.residentialInfo.city}, {peerData.residentialInfo.pincode}
            </Text>
            <Text>{peerData.residentialInfo.addressType}</Text>
            <Text>{formattedDate(peerData.residentialInfo.start_date)}</Text>
          </Box>
          <Title className="address-verification-details-main-title">
            Please allow permission to capture location to confirm the verification
          </Title>
          <Button sx={{ marginTop: '2rem' }} className="green-outline-btn" onClick={getLocation}>
            Capture Location
          </Button>
        </Box>
      </Box>
    </>
  );
};
