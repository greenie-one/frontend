import { MdVerified } from 'react-icons/md';
import { LandingSectionHeading } from './SectionHeading';
import { Box, Text, Title } from '@mantine/core';
import '../Landing/styles/_solutions.scss';

import cost from '../../assets/images/Landing/cost.png';
import speedometer from '../../assets/images/Landing/speedometer.png';
import contract from '../../assets/images/Landing/contract.png';
import speechBubble from '../../assets/images/Landing/speech-bubble.png';
import smartContract from '../../assets/images/Landing/smart-contract.png';
import fileSharing from '../../assets/images/Landing/file-sharing.png';
import userProfile from '../../assets/images/Landing/user-profile.png';
import socialMedia from '../../assets/images/Landing/social-media.png';
import solutionsBg from '../../assets/images/Landing/solutionsBg.png';

const forEnterPrice = [
  'Reduce cost of background verification by 73%.',
  'Unlock candidate insights pre-interview.',
  'Increase speed of onboarding by 80%.',
  'Create and share iron clad contracts using inbuilt Contract Tool.',
];
const forCandidates = [
  'Boost hiring prospect with Greenie verified profile.',
  'Store all documents on blockchain backed Doc Depot.',
  'Share verification report at will.',
  'Elevate professional network with mutual verification requests.',
];

export const LandingSolutions = () => {
  return (
    <section className="solutions">
      <LandingSectionHeading
        heading="Greenie’s solution for you"
        subheading="Streamlining background checks with State-of-the-Art technology redefining trust in the verification industry"
      />
      <Box className="solutions-wrapper">
        <Box className="solutions-box">
          <Box className="text-box">
            <Title className="heading">For Enterprises</Title>
            {forEnterPrice.map((text) => (
              <Box key={text} className="text-wrapper">
                <MdVerified size={'22px'} className="icon" color="#9FE870" />
                <Text className="text">{text}</Text>
              </Box>
            ))}
          </Box>
          <Box className="cards-wrapper">
            <Box className="card">
              <img src={cost} alt="Cost Icon" />
            </Box>
            <Box className="card">
              <img src={contract} alt="Contract Icon" />
            </Box>
            <Box className="card">
              <img src={speechBubble} alt="Speech Bubble Icon" />
            </Box>
            <Box className="card">
              <img src={speedometer} alt="Speedometer Icon" />
            </Box>
          </Box>
        </Box>
        <Box className="solutions-box">
          <Box className="text-box">
            <Title className="heading">For Candidates</Title>
            {forCandidates.map((text) => (
              <Box key={text} className="text-wrapper">
                <MdVerified size={'22px'} className="icon" color="#9FE870" />
                <Text className="text">{text}</Text>
              </Box>
            ))}
          </Box>
          <Box className="cards-wrapper">
            <Box className="card">
              <img src={smartContract} alt="Smart Contract Icon" />
            </Box>
            <Box className="card">
              <img src={fileSharing} alt="File Sharing Icon" />
            </Box>

            <Box className="card">
              <img src={userProfile} alt="User Profile Icon" />
            </Box>
            <Box className="card">
              <img src={socialMedia} alt="Social Media Icon" />
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};
