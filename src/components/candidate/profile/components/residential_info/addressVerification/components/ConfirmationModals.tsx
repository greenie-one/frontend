import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Title, Button, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import checkGif from '../../../../assets/94109-confirmation 1.gif';
import location from '../../../../assets/location.png';
import locationError from '../../../../assets/locationError.png';
import { MdVerified } from 'react-icons/md';
import { FcInfo } from 'react-icons/fc';

type ConfirmationModalProps = {
  opened: boolean;
  close: () => void;
  addressVerified: boolean;
  peerData?: PeerVerificationDataResponse;
  residentialData?: ResidentialInfoResponse;
  verificationType: 'self' | 'peer';
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

  return (
    <>
      <Modal
        className="modal"
        size={'60%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={() => {
          close();
          navigate('/');
        }}
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
            {verificationType === 'self' && (
              <Box style={{ width: 'min(100%, 32rem)' }} className="pro-tip-box">
                <Box className="icon-box">
                  <FcInfo color="#1991ff" />
                  <Text className="pro-tip">Pro tip</Text>
                </Box>
                <Text className="tip">
                  Verification of address does not determine the authenticity of the location. Greenie will only
                  authenticate the exact address claimed and the one verified in the Verification Report. You are the
                  owner of the report but it is only visible to an enterprise or HR/Recruiter whoever you allow.
                </Text>
              </Box>
            )}
            <Button
              className="green-btn"
              onClick={() => {
                if (verificationType === 'self') {
                  navigate('/candidate/profile');
                } else {
                  navigate('.?verified=true');
                }
              }}
            >
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
