import { useState } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';

import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import { useDisclosure } from '@mantine/hooks';

export const VerifySkills = () => {
  const { setActiveStep, setVerificationResponse, verificationResponse, verificationData } = useVerificationContext();
  const { data } = verificationData;
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();

  const [attrId, setAttrId] = useState<string>('');

  const approveHandler = (_id: string) => {
    const responseObj: DynamicObjectWithIdType = {
      id: _id,
      status: {
        state: 'ACCEPTED',
      },
    };

    if (verificationResponse.skills) {
      setVerificationResponse((current) => {
        const skillsList = current.documents;
        const newSkillsList = skillsList.map((_skill) => {
          if (_skill.id === _id) {
            return responseObj;
          }

          return _skill;
        });

        return { ...current, skills: newSkillsList };
      });
    } else {
      setVerificationResponse({
        ...verificationResponse,
        skills: [responseObj],
      });
    }
  };

  return (
    <section className="verification-step">
      <DisputeModal
        attrId={attrId}
        setAttrId={setAttrId}
        opened={disputeModalOpened}
        close={() => {
          disputeModalClose();
        }}
        parentKey="skills"
      />
      <Text className="question-text">Could you verify skills claimed by {data.name}?</Text>
      <Box className="verification-skills-box">
        <Box className="verification-skill-header">
          <Text>Skills</Text>
          <Text>Expertise</Text>
          <Text>Approve/Dispute</Text>
        </Box>
        <Box className="verification-skills-wrapper">
          {data.skills.map((skill, index) => {
            return (
              <Box key={index} className="verification-skill-row">
                <Text>{skill.skillName}</Text>
                <Text className="expertise">{skill.expertise}</Text>
                <BsPersonCheckFill className="approved-skill-icon" onClick={() => approveHandler(skill.id)} />
                <HiOutlineBan
                  className="disputed-skill-icon"
                  onClick={() => {
                    setAttrId(skill.id);
                    disputeModalOpen();
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="verification-btns-wrapper">
        <Button className="btn next-btn" onClick={() => setActiveStep((current) => current + 1)}>
          Continue
        </Button>
      </Box>
    </section>
  );
};
