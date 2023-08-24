import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Text, Title } from '@mantine/core';
import { useGlobalContext } from '../../../../../context/GlobalContext';

import { Layout } from '../Layout';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import emptyProfile from '../../assets/emptyProfile.png';

export const IDVerifiedDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { profileData, scrollToTop, IDs } = useGlobalContext();

  const handleContinue = () => {
    scrollToTop();
    if (state === 'showCongratsScreen') {
      navigate('/candidate/profile/IDs/verify/aadhar/congratulations');
    } else {
      navigate('/candidate/profile');
    }
  };

  const formattedDate = (data: string) => {
    return data?.substring(0, 10).split('-').reverse().join('-');
  };

  const details: DocsType | undefined = IDs?.find((item) => item.id_type.toLowerCase() === params.id?.toLowerCase());

  return (
    <>
      <Layout>
        <section className="container documents-container" style={{ marginTop: '7rem' }}>
          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={handleContinue}>
              <BsArrowLeft className="arrow-left-icon" size={'16px'} />
              <Text>Profile</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
            </Box>
            <Box className="go-back-btn">
              <Text>Verification ID</Text>
              <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              <Text>{params.id?.toUpperCase().replace('_', ' ')} Details</Text>
            </Box>
          </Box>

          <Box className="document-verified-container">
            <Box className="document-verified-left-box">
              <Box className="left-img-box">
                {profileData?.profilePic ? (
                  <img src={profileData?.profilePic} className="verified-document-profile" alt="" />
                ) : (
                  <img src={emptyProfile} className="verified-document-profile" alt="" />
                )}

                <Text className="verified-document-name">
                  {profileData?.firstName} {profileData?.lastName}
                </Text>
              </Box>

              <Box className="left-text-box">
                <Text className="details-title">Verified Date</Text>
                <Text className="details-detail">{formattedDate(String(details?.updatedAt))}</Text>
              </Box>
            </Box>

            <Box className="document-verified-right-box">
              <Box className="box-row aadhar-first-row">
                <Box className="details-box">
                  <Title className="details-title">{params.id?.toUpperCase().replace('_', ' ')} number</Title>
                  <Text className="details-detail">{details?.id_number}</Text>
                </Box>
                <Box className="details-box">
                  <Title className="details-title">Full Name (as per ID)</Title>
                  <Text className="details-detail">{details?.fullName}</Text>
                </Box>
              </Box>

              <Box className="box-row aadhar-first-row">
                <Box className="details-box">
                  <Title className="details-title">Address Line 1</Title>
                  <Text className="details-detail">{details?.address?.address_line_1} </Text>
                </Box>
                {details?.address?.address_line_2 ? (
                  <Box className="details-box">
                    <Title className="details-title">Address Line 2</Title>
                    <Text className="details-detail">{details?.address?.address_line_2} </Text>
                  </Box>
                ) : null}
              </Box>

              <Box className="box-row aadhar-first-row">
                <Box className="details-box">
                  <Title className="details-title">State</Title>
                  <Text className="details-detail">{details?.address?.state}</Text>
                </Box>
                <Box className="details-box">
                  <Title className="details-title">Pincode</Title>
                  <Text className="details-detail">{details?.address?.pincode}</Text>
                </Box>
              </Box>
              <Box className="box-row aadhar-first-row">
                <Box className="details-box">
                  <Title className="details-title">Country</Title>
                  <Text className="details-detail">{details?.address?.country}</Text>
                </Box>
                <Box className="details-box">
                  <Title className="details-title">DOB</Title>
                  <Text className="details-detail">{details?.dob}</Text>
                </Box>
              </Box>

              <Button className="primaryBtn" onClick={handleContinue}>
                Continue
              </Button>
            </Box>
          </Box>
        </section>
      </Layout>
    </>
  );
};
