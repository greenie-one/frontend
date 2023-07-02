import { Text, Box, Button, em, Modal } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';
import { useVBMContext } from '../context/VBMContext';
import { useState } from 'react';

export const VBMStepFour = () => {
  const { PrevActiveStep, NextActiveStep } = useVBMContext();
  const [skills, setSkills] = useState([
    { skillName: 'Software Engineer', expertise: 'Master Pro', status: 'pending' },
    { skillName: 'ReactJs', expertise: 'Master Pro', status: 'pending' },
    { skillName: 'Express', expertise: 'Master Pro', status: 'pending' },
  ]);

  const handleApprove = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].status = 'approved';
    setSkills(updatedSkills);
  };
  const handleDispute = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].status = 'disputed';
    setSkills(updatedSkills);
  };
  const handlePending = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].status = 'pending';
    setSkills(updatedSkills);
  };
  return (
    <section className="verification-step">
      <Box className="profile-details-top">
        <Box className="candidate-profile">
          <img src={ProfilePic} alt="" />
        </Box>
        <Box className="profile-details-text-box">
          <Text className="name">Abhishek Deshmukh</Text>
          <Text className="designation">Software Engieer</Text>
          <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
            Verified
          </Button>
        </Box>
      </Box>
      <Text className="question-text">Could you verify documents uploaded by Abhishek?</Text>
      <Box className="verification-skills-box">
        <Box className="verification-skill-header">
          <Text>Skills</Text>
          <Text>Expertise</Text>
          <Text>Aprove/Dispute</Text>
        </Box>
        <Box className="verification-skills-wrapper">
          {skills.map(({ skillName, expertise, status }, index) => {
            return (
              <Box key={index} className="verification-skill-row">
                <Text>{skillName}</Text>
                <Text className="expertise">{expertise}</Text>
                <Box className="verification-skills-action">
                  {status === 'approved' ? (
                    <BsPersonCheckFill
                      className="approved-skill-icon"
                      onClick={() => handlePending(index)}
                    />
                  ) : (
                    <BsPersonCheckFill
                      className="verification-skill-icon"
                      onClick={() => handleApprove(index)}
                    />
                  )}
                  {status === 'disputed' ? (
                    <HiOutlineBan
                      className="disputed-skill-icon"
                      onClick={() => handlePending(index)}
                    />
                  ) : (
                    <HiOutlineBan
                      className="verification-skill-icon"
                      onClick={() => handleDispute(index)}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="profile-details-actions" my={'1rem'}>
        <Button className="green-outline-btn" onClick={NextActiveStep}>
          Continue
        </Button>
        <Button className="dispute-btn" onClick={PrevActiveStep}>
          Go Back
        </Button>
      </Box>
      <Text className="verification-disclaimer">
        I understand that during the sign-up process and while using this website, I may be required
        to provide certain personal information, including but not limited to my name, email
        address, contact details, and any other information deemed necessary for registration and
        website usage.
      </Text>
      <Text className="policy">Click to view Data and Privacy Policy</Text>
    </section>
  );
};
