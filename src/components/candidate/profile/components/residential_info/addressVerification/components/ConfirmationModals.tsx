import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Title, Button, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import checkGif from '../../../../assets/94109-confirmation 1.gif';
import location from '../../../../assets/location.png';
import locationError from '../../../../assets/locationError.png';
import { MdVerified } from 'react-icons/md';

type ConfirmationModalProps = {
  opened: boolean;
  close: () => void;
  addressVerified: boolean;
  peerData?: PeerVerificationDataResponse;
  residentialData?: ResidentialInfoResponse;
  verificationType: 'Peer' | 'Self';
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  opened,
  close,
  addressVerified,
  peerData,
  residentialData,
  verificationType,
}): JSX.Element => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleContinue = () => {
    if (verificationType == 'Peer') {
      navigate('.?verified=true');
    } else if (verificationType == 'Self') {
      navigate('/candidate/profile');
    }
    close();
  };
  return (
    <>
      <Modal
        className="modal"
        size={'60%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={handleContinue}
        centered
        radius={'lg'}
      >
        {addressVerified ? (
          <Box className="address-verification-modal">
            <img src={checkGif} alt="Check Gif" />
            <Title className="address-verification-modal-title">Resident address verified</Title>
            <Box className="address-verification-modal-text-box">
              <Text className="address-verification-modal-text">Thanks for your co-operation in verify.</Text>
            </Box>
            <Box className="residential-details">
              <Box className="location">
                <img src={location} alt="location icon" />
              </Box>
              <Box className="residential-details-text-box">
                {peerData ? (
                  <Text className="address">
                    {peerData.residentialInfo.address_line_1}, {peerData.residentialInfo.address_line_2},{' '}
                    {peerData.residentialInfo.landmark}, {peerData.residentialInfo.city},{' '}
                    {peerData.residentialInfo.pincode}
                  </Text>
                ) : (
                  <Text className="address">
                    {residentialData?.address_line_1}, {residentialData?.address_line_2}, {residentialData?.landmark},{' '}
                    {residentialData?.city}, {residentialData?.pincode}
                  </Text>
                )}

                <Button leftIcon={<MdVerified size={'16px'} />} className="verified">
                  Verified
                </Button>
              </Box>
            </Box>
            <Button className="green-btn" onClick={handleContinue}>
              Continue
            </Button>
          </Box>
        ) : (
          <Box className="address-verification-modal">
            <img src={locationError} alt="Location Error" className="error-image" />
            <Title className="address-verification-modal-title">Error verification failed</Title>
            <Box className="address-verification-modal-text-box">
              <Text className="address-verification-modal-text">We were unable to verify your location.</Text>
              <Text className="address-verification-modal-text">
                please make sure to allow us to capture your location and you are at the right place to complete
                verification
              </Text>
            </Box>

            <Button className="green-btn" onClick={close}>
              Try Again
            </Button>
          </Box>
        )}
      </Modal>
    </>
  );
};
