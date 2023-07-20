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

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleDetailsPage = (workId: string) => {
    navigate(`/candidate/profile/experience/${workId}`);
  };

  return (
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
          {workExperienceData
            .reverse()
            .map(({ designation, companyName, isVerified, id, dateOfJoining, companyEndDate }, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => {
                    handleDetailsPage(id);
                  }}
                >
                  <Box className="experience-card">
                    <Text className="position">{designation.substring(0, 25)}</Text>
                    <Text className="companyName">{companyName.substring(0, 25)}</Text>
                    {isVerified ? (
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
                        {dateOfJoining?.toString().substring(11, 15)} - {companyEndDate?.toString().substring(11, 15)}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </section>
    </Layout>
  );
};
