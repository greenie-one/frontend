import { Text, Box } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { peerVerificationAPIList } from '../../../../../assets/api/ApiList';
import React from 'react';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { GetExperienceTag } from '../../../../../utils/functions/GetExperienceTag';

export const AllExperiences = () => {
  const navigate = useNavigate();
  const { workExperienceData, authClient } = useGlobalContext();

  const [sentRequests, setSentRequests] = React.useState<Array<SentRequestsResponseType>>([]);

  const getSentRequests = async () => {
    const res = await HttpClient.callApiAuth<SentRequestsResponseType[]>(
      {
        url: peerVerificationAPIList.getSentRequest,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setSentRequests(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const filterPeerById = (id: string) => {
    return sentRequests.filter((req) => req.workExperience === id);
  };

  React.useEffect(() => {
    getSentRequests();
  }, [authClient]);

  const handleDetailsPage = (workId: string) => {
    navigate(`/candidate/profile/experience/${workId}`);
  };

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  return (
    <>
      <Layout>
        <section className="container" style={{ marginTop: '7rem' }}>
          <Box className="top-header">
            <Box className="see-all-header">
              <Box className="go-back-btn" onClick={handleProfilePage}>
                <BsArrowLeft className="arrow-left-icon" size={'16px'} />
                <Text>Profile</Text>
                <AiOutlineRight className="arrow-right-icon" size={'16px'} />
              </Box>
              <Text>{`Work Experience (${workExperienceData.length})`}</Text>
            </Box>
          </Box>

          <Box className="see-all-experiences-wrapper">
            {[...workExperienceData]
              .reverse()
              .map(({ designation, companyName, id, dateOfJoining, dateOfLeaving }, index) => {
                const peerDetails = filterPeerById(id);
                return (
                  <Box
                    key={index}
                    onClick={() => {
                      handleDetailsPage(id);
                    }}
                  >
                    <Box className="experience-card">
                      <Text className="position">{designation}</Text>
                      <Text className="companyName">{companyName}</Text>
                      <GetExperienceTag peerDetails={peerDetails} />

                      <Box className="tenure-box">
                        <Text className="since-text">Since</Text>
                        <Text className="tenure">
                          {dateOfJoining?.toString().substring(0, 10)} -{' '}
                          {dateOfLeaving ? dateOfLeaving?.toString().substring(0, 10) : 'Present'}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </section>
      </Layout>
    </>
  );
};
