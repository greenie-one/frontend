import React from 'react';
import { Text, Box, Checkbox } from '@mantine/core';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { PageActionBtns } from './PageActionBtns';
import { SelectionHeading } from './SelectionHeading';

const expertiseList: {
  [key: string]: string;
} = {
  AMATEUR: 'Amateur',
  BEGINNER: 'Beginner',
  HIGHLY_COMPETENT: 'Highly Competent',
  EXPERT: 'Expert',
  SUPER_SPECIALIST: 'Super Specialist',
  MASTER: 'Master',
};

export const SkillSelection: React.FC<{
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setSelectionPage }): JSX.Element => {
  const { skillData } = useGlobalContext();

  return (
    <>
      <Box className="documents-action-section">
        <SelectionHeading heading="Skills" subHeading="Select the skill you want the peer to review"></SelectionHeading>
        <Box>
          <Box className="selected-attribute-header">
            <Checkbox checked indeterminate readOnly />
            <Text>Select Skills To Verify</Text>
          </Box>

          <Box className="selected-skills">
            {skillData
              .filter((skill) => {
                return true;
              })
              .map((skill, idx) => {
                return (
                  <Box key={idx}>
                    <Box className="selected-skill">
                      <Checkbox />
                      <Text>{skill.skillName}</Text>
                      {skill.expertise && <Text className="add-skill-rate">{expertiseList[skill.expertise]}</Text>}
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
        <PageActionBtns cb={() => setSelectionPage(2)} />
      </Box>
    </>
  );
};
