import '../styles/global.scss';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Modal, Box, Button, Divider } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../assets/location.png';
import { RiDeleteBin6Line } from 'react-icons/ri';

const type = 'current';

export const SeeAllResidentialInfo = () => {
  const { detailsPage, dispatchDetailsPage, residentialInfoData, deleteResidentialInfo } =
    useProfileContext();
  const handleToggleResidentialDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_RESIDENTIALINFO',
      payload: !detailsPage.seeAllResidentialInfo,
    });
  };
  return (
    <section className="container">
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleResidentialDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text>{`Residential Information (${residentialInfoData.length})`}</Text>
      </Box>
      <Box className="see-all-residential-info-card-wrapper">
        {residentialInfoData.map(
          (
            {
              _id,
              address_line_1,
              address_line_2,
              landmark,
              pincode,
              state,
              country,
              city,
              start_date,
              end_date,
              isVerified,
            },
            index
          ) => {
            return (
              <Box key={index} className="see-all-residentila-info-card">
                <Box className="header">
                  <Box className="header-text">
                    <Box className="location">
                      <img className="location=img" src={location} alt="Location" />
                    </Box>
                    <Text>
                      {address_line_1}, {address_line_2}, {city} {pincode}
                    </Text>

                    {isVerified ? (
                      <Button
                        leftIcon={<MdVerified color="#8CF078" size={'16px'} />}
                        className="verified"
                      >
                        Verified
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<CgSandClock color="#FF7272" size={'16px'} />}
                        className="pending"
                      >
                        Pending
                      </Button>
                    )}
                  </Box>
                  <Box className="button-wrappers">
                    {!isVerified && <Button className="get-verified">Get Verified</Button>}

                    <Box className="icon" onClick={() => deleteResidentialInfo(_id)}>
                      <RiDeleteBin6Line size={'22px'} className="btn" />
                    </Box>
                  </Box>
                </Box>
                <Divider my="sm" color="#e1e1e1" />
                <Box className="residential-info-wrapper">
                  <Box>
                    <Text className="heading">Type</Text>
                    <Text className="details">{type}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">Landmark</Text>
                    <Text className="details">{landmark}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">State</Text>
                    <Text className="details">{state}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">Country</Text>
                    <Text className="details">{country}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">Living Since</Text>
                    <Text className="details">
                      {start_date.toString().substring(0, 7)}-{end_date.toString().substring(0, 7)}
                    </Text>
                  </Box>
                </Box>
                <Divider my="sm" color="#e1e1e1" />
                <Box className="map-wrapper">
                  <Text className="heading">Location on Map</Text>
                  <Box className="map">
                    <Text>No location marked yet</Text>
                  </Box>
                </Box>
              </Box>
            );
          }
        )}
      </Box>
    </section>
  );
};
