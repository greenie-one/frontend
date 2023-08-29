import { Text, Box, Button } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';

export const AllExperiences = () => {
  const navigate = useNavigate();
  const { workExperienceData } = useGlobalContext();

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
              .map(({ designation, companyName, noOfVerifications, id, dateOfJoining, dateOfLeaving }, index) => {
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
                      {noOfVerifications >= 2 ? (
                        <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                          Verified
                        </Button>
                      ) : (
                        <Button leftIcon={<CgSandClock size={'16px'} />} className="pending">
                          Pending
                        </Button>
                      )}

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
