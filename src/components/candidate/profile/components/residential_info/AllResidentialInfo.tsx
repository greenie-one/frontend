import { useState } from 'react';
import { useProfileContext } from '../../context/ProfileContext';
import { Text, Modal, Box, Button } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../../assets/location.png';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { ResidentialInfoDetails } from './ResidentialInfoDetails';
import { IResidendialInfoResponse } from '../../types/CandidateResponses';

export const AllResidentialInfo = () => {
  const { setCandidateActivePage, residentialInfoData } = useProfileContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [verifyInfo, setVerifyInfo] = useState<IResidendialInfoResponse | null>(null);
  const [infoDetails, setInfoDetails] = useState<IResidendialInfoResponse | null>(null);

  const handleToggleResidentialDetails = (): void => {
    setCandidateActivePage('Profile');
  };

  return (
    <section className="container">
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleResidentialDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text onClick={() => setInfoDetails(null)}>{`Residential Information (${residentialInfoData.length})`}</Text>
      </Box>
      {verifyInfo === null && infoDetails === null && (
        <Box className="residential-info-wrapper">
          {residentialInfoData.map((info, index) => {
            return (
              <Box className="residential-card" key={index} onClick={() => setInfoDetails(info)}>
                <Box className="top-box">
                  <Box className="location">
                    <img className="location=img" src={location} alt="Location" />
                  </Box>
                  <Box className="address-box">
                    <Box className="address">
                      {info.address_line_1}, {info.address_line_2}, {info.landmark}, {info.city} {info.pincode}
                    </Box>
                    {info.isVerified ? (
                      <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                        Verified
                      </Button>
                    ) : (
                      <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                        Pending
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Text className="since-text">Since</Text>
                  <Text className="tenure">
                    {info.start_date.toString().substring(0, 4)} - {info.end_date.toString().substring(0, 4)}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
      {verifyInfo === null && infoDetails !== null && (
        <ResidentialInfoDetails
          address_line_1={infoDetails.address_line_1}
          address_line_2={infoDetails.address_line_2}
          landmark={infoDetails.landmark}
          pincode={infoDetails.pincode}
          start_date={infoDetails.start_date}
          end_date={infoDetails.end_date}
          isVerified={infoDetails.isVerified}
          city={infoDetails.city}
          address_type={'Permanant'}
          state={infoDetails.state}
          country={infoDetails.country}
        />
      )}
    </section>
  );
};
