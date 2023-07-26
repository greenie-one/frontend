import React from 'react';
import { Box, Text } from '@mantine/core';
import { ExperienceDocuments, Peer } from '../../../types/ProfileGeneral';
import { CreatePeerResponseType } from '../../../types/ProfileGeneral';
import pdfIcon from '../../../assets/pdfIcon.png';
import { optionalAttrDict, skillExpertiseDict } from '../../../../constants/dictionaries';
import { useGlobalContext } from '../../../../../../context/GlobalContext';

type ConfirmPeerType = {
  Peer: Peer;
  experienceDocuments: ExperienceDocuments[];
  createPeerResponse: CreatePeerResponseType[];
  indexNumber: number;
  experience: WorkExperience | undefined;
};

export const PeerDetails: React.FC<ConfirmPeerType> = ({
  Peer,
  experienceDocuments,
  createPeerResponse,
  indexNumber,
  experience,
}) => {
  const { skillData } = useGlobalContext();
  return (
    <Box className="peer-details">
      <Box className="requesting-peer">
        <Box className="requesting-peer-text-box">
          <Text className="name">{Peer.name}</Text>
          {Peer.peerType === 'LINE_MANAGER' && <Text className="peer-type">Line Manager</Text>}
          {Peer.peerType === 'REPORTING_MANAGER' && <Text className="peer-type">Reporting Manager</Text>}
          {Peer.peerType === 'HR' && <Text className="peer-type">HR</Text>}
          {Peer.peerType === 'COLLEAGUE' && <Text className="peer-type">Colleague</Text>}
          {Peer.peerType === 'CXO' && <Text className="peer-type">CXO</Text>}
        </Box>
      </Box>
      <Box className="document-list">
        <Box className="docs-wrapper">
          <Text className="document-action-heading">With Documents</Text>
          <Box className="docs-list">
            {experienceDocuments
              .filter((doc) => createPeerResponse[indexNumber].documents.includes(doc._id))
              .map((document: ExperienceDocuments, index: number) => {
                return (
                  <Box className="document" key={index}>
                    <img className="pdf-icon" src={pdfIcon} alt="pdf icon" />
                    <Text className="document-name">{document.name.substring(0, 15)}</Text>
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box className="document-list">
          <Text className="document-action-heading">With Skills</Text>
          <Box className="skills-wrapper">
            {skillData
              .filter((skill) => skill.workExperience === experience?.id)
              .filter((skill) => createPeerResponse[indexNumber].skills.includes(skill.id))
              .map((skill: Skill, index: number) => {
                const { expertise, skillName } = skill;
                return (
                  <Box key={index} className="skill-box">
                    <Text className="skill-name">{skillName}</Text>
                    {expertise && <Text className="expertise">{skillExpertiseDict[expertise]}</Text>}
                  </Box>
                );
              })}
          </Box>
        </Box>

        <Box className="skills-list">
          <Text className="document-action-heading">Attributes</Text>
          <Box className="add-skills-wrapper">
            {createPeerResponse[indexNumber].selectedFields.map((attr, index: number) => {
              return (
                <Text key={index} className="add-skill-name">
                  {optionalAttrDict[attr]}
                </Text>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
