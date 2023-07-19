import { Text, Box, Button } from '@mantine/core';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';
import { useVBMContext } from '../context/VBMContext';
import { useState } from 'react';
import { ProfileDetailsBox } from '../../verification_by_hr/components';
import { DisclaimerText } from './DisclaimerText';
import { PolicyText } from './PolicyText';

export const VBMStepFour = () => {
  const { PrevActiveStep, NextActiveStep } = useVBMContext();
  const [skills, setSkills] = useState([
    {
      skillName: 'Software Engineer',
      expertise: 'Master Pro',
      status: 'pending',
    },
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
      <ProfileDetailsBox />
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
                    <BsPersonCheckFill className="approved-skill-icon" onClick={() => handlePending(index)} />
                  ) : (
                    <BsPersonCheckFill className="verification-skill-icon" onClick={() => handleApprove(index)} />
                  )}
                  {status === 'disputed' ? (
                    <HiOutlineBan className="disputed-skill-icon" onClick={() => handlePending(index)} />
                  ) : (
                    <HiOutlineBan className="verification-skill-icon" onClick={() => handleDispute(index)} />
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
      <DisclaimerText />
      <PolicyText />
    </section>
  );
};
