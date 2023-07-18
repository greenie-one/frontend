import { Text, Box, Button, Title, Modal, Checkbox } from '@mantine/core';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import tscLogo from '../../assets/tscLogo.png';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

export const AllExperiences = () => {
  const navigate = useNavigate();
  const { workExperienceData } = useGlobalContext();
  const [checked, setChecked] = useState<boolean>(false);
  const [workId, setWorkId] = useState<number>();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);

  const handleProfilePage = (): void => {
    navigate('/candidate/profile');
  };

  const handleGoToVerification = () => {
    navigate(`/candidate/profile/experience/${workId}/verify`);
  };
  return (
    <>
      <Navbar />
      <Modal className="modal" size={'60%'} fullScreen={isMobile} opened={opened} onClose={close} centered>
        <Box className="disclaimer-modal">
          <Title className="disclaimer-heading">Disclaimer</Title>
          <Text className="disclaimer-subHeading">Verifying IDs on Greenie</Text>
          <Button className="primaryBtn" disabled={!checked} onClick={handleGoToVerification}>
            I Agree
          </Button>
          <Box className="checkbox-box">
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} className="checkbox" color="teal" />
            <Text className="tearms-conditions">
              I understand that during the sign-up process and while using this website, I may be required to provide
              certain personal information, including but not limited to my name, email address, contact details, and
              any other information deemed necessary for registration and website usage.
            </Text>
          </Box>
          <Text className="policy">Click to view Data and Privacy Policy</Text>
        </Box>
      </Modal>
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
              .map(({ designation, companyName, isVerified, id, companyStartDate, companyEndDate }, index) => {
                return (
                  <Box
                    key={index}
                    onClick={() => {
                      setWorkId(id);

                      open();
                    }}
                  >
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
