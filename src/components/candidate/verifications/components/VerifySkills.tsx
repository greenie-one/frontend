import { useState, useEffect } from 'react';
import { Text, Box, Button } from '@mantine/core';
import { BsPersonCheckFill } from 'react-icons/bs';
import { HiOutlineBan } from 'react-icons/hi';
import { skillRate } from '../../profile/constants/SelectionOptions';

import { useVerificationContext } from '../context/VerificationContext';
import { DisputeModal } from './DisputeModal';
import { useDisclosure } from '@mantine/hooks';

export const VerifySkills = () => {
  const { setActiveStep, setVerificationResponse, verificationResponse, verificationData } = useVerificationContext();
  const { data } = verificationData;
  const [disputeModalOpened, { open: disputeModalOpen, close: disputeModalClose }] = useDisclosure();
  const [approvedAttrs, setApprovedAttrs] = useState<string[]>([]);
  const [disputedAttrs, setDisputedAttrs] = useState<string[]>([]);

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
        const skillsList = current.skills;

        const findSkill = skillsList.find((_skill) => _skill.id === _id);

        if (!findSkill) {
          return { ...current, skills: [...current.skills, responseObj] };
        }

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

    setApprovedAttrs((current) => [...current, _id]);
    setDisputedAttrs((current) => current.filter((id) => id !== _id));
  };

  useEffect(() => {
    if (verificationResponse.skills) {
      verificationResponse.skills.forEach((skill) => {
        if (skill.status.state === 'ACCEPTED') {
          setApprovedAttrs((current) => [...current, skill.id]);
        } else {
          setDisputedAttrs((current) => [...current, skill.id]);
        }
      });
    }
  }, []);

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
        setApprovedAttrs={setApprovedAttrs}
        setDisputedAttrs={setDisputedAttrs}
      />
      <Text className="question-text">Could you verify skills claimed by {data.name}?</Text>
      <Box className="verification-skills-box">
        <Box className="verification-skill-header">
          <Text>Skills</Text>
          <Text>Expertise</Text>
          <Text>Status</Text>
        </Box>
        <Box className="verification-skills-wrapper">
          {data.skills?.map((skill, index) => {
            return (
              <Box key={index} className="verification-skill-row">
                <Text>{skill.skillName}</Text>
                <Text className="expertise">{skillRate.find((_skill) => _skill.value === skill.expertise)?.label}</Text>
                <Box className="status-btns">
                  <button
                    disabled={approvedAttrs.includes(skill.id)}
                    className="green-outline-btn"
                    onClick={() => approveHandler(skill.id)}
                  >
                    <BsPersonCheckFill />
                  </button>
                  <button
                    disabled={disputedAttrs.includes(skill.id)}
                    className="disputed-skill-icon dispute-btn"
                    onClick={() => {
                      setAttrId(skill.id);
                      disputeModalOpen();
                    }}
                  >
                    <HiOutlineBan />
                  </button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box className="verification-btns-wrapper">
        <Button
          disabled={approvedAttrs.length + disputedAttrs.length < data.skills?.length}
          className="btn next-btn"
          onClick={() => setActiveStep((current) => current + 1)}
        >
          Continue
        </Button>
      </Box>
    </section>
  );
};
