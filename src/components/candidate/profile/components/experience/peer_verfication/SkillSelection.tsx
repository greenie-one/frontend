import React, { useEffect, useState } from 'react';
import { Text, Box, Checkbox } from '@mantine/core';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { PageActionBtns } from './PageActionBtns';
import { SelectionHeading } from './SelectionHeading';
import { CreatePeerResponseType } from '../../../types/ProfileGeneral';
import { skillExpertiseDict } from '../../../../constants/dictionaries';

export const SkillSelection: React.FC<{
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
  activePeer: number;
  setCreatePeerResponse: React.Dispatch<React.SetStateAction<CreatePeerResponseType[]>>;
  createPeerResponse: CreatePeerResponseType[];
  workExperienceID: string;
}> = ({ setSelectionPage, activePeer, setCreatePeerResponse, createPeerResponse, workExperienceID }): JSX.Element => {
  const { skillData } = useGlobalContext();
  const [filteredSkills, setFilteredSkills] = useState<SkillResponse[]>([]);

  const handleMark = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updatedList = [];

    for (let i = 0; i < createPeerResponse.length; i++) {
      const peer = createPeerResponse[i];

      if (i !== activePeer) {
        updatedList.push(peer);
        continue;
      }

      let skillsList = peer.verificationSkills;
      if (event.target.checked) {
        skillsList.push(id);
      } else {
        skillsList = skillsList.filter((_id) => _id !== id);
      }

      peer.verificationSkills = skillsList;
      updatedList.push(peer);
    }

    setCreatePeerResponse(updatedList);
  };

  useEffect(() => {
    const filteredData = skillData.filter((skill) => skill.workExperience === workExperienceID);
    setFilteredSkills(filteredData);
  }, []);

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
            {filteredSkills.map((skill, idx) => {
              return (
                <Box key={idx}>
                  <Box className="selected-skill">
                    <Checkbox
                      checked={createPeerResponse[activePeer].verificationSkills.includes(skill.id)}
                      onChange={(event) => handleMark(event, skill.id)}
                    />
                    <Text>{skill.skillName}</Text>
                    {skill.expertise && <Text className="add-skill-rate">{skillExpertiseDict[skill.expertise]}</Text>}
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
