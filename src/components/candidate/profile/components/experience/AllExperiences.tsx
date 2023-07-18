import { Text, Box, Button } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import tscLogo from '../../assets/tscLogo.png';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';

export const AllExperiences = () => {
  const navigate = useNavigate();
  const { workExperienceData, scrollToTop } = useGlobalContext();

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleExperienceDetailsPage = (id: string) => {
    navigate(`/candidate/profile/experience/${id}`);
    scrollToTop();
  };
  return (
    <>
      <Navbar />
      <main className="profile">
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
              .map(({ designation, companyName, id, isVerified, companyStartDate, companyEndDate }, index) => {
                return (
                  <Box key={index} onClick={() => handleExperienceDetailsPage(id)}>
                    <Box className="experience-card">
                      <img className="companyLogo" src={tscLogo} />
                      <Text className="position">{designation}</Text>
                      <Text className="companyName">{companyName}</Text>
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
                          {companyStartDate?.toString().substring(11, 15)} -{' '}
                          {companyEndDate?.toString().substring(11, 15)}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </section>
      </main>
    </>
  );
};
