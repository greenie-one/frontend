import { Box, Text, Chip, Group } from '@mantine/core';
import { useState } from 'react';
import level from '../assets/level.png';
import levelFilled from '../assets/levelFilled.png';
import medal from '../assets/medal.png';
import { FaRegCopy } from 'react-icons/fa';
import copyIcon from '../assets/content_copy.png';

export const BioSection = () => {
  const [userLevel, setUserLevel] = useState(0);
  return (
    <section className="bio-section container">
      <Text className="bio-name">John Marston</Text>
      <Box className="chips">
        <Chip.Group>
          <Group>
            <Chip>Energetic</Chip>
            <Chip>Team Player</Chip>
            <Chip>Optimistic</Chip>
          </Group>
        </Chip.Group>
      </Box>

      <Box className="bio-section-wrapper">
        <Box className="left-section">
          <Box className="level">
            <Text className="level-heading">Level {userLevel}</Text>
            {userLevel === 0 ? (
              <Box className="level-wrapper">
                <img className="level-img" src={level} alt="level" />
                <img className="level-img" src={level} alt="level" />
                <img className="level-img" src={level} alt="level" />
                <img className="level-img" src={level} alt="level" />
                <img className="level-img" src={level} alt="level" />
              </Box>
            ) : (
              <Box className="level-wrapper">
                {userLevel > 0 ? (
                  <img className="level-img" src={levelFilled} alt="level" />
                ) : (
                  <img src={level} alt="level" />
                )}
                {userLevel > 1 ? (
                  <img className="level-img" src={levelFilled} alt="level" />
                ) : (
                  <img className="level-img" src={level} alt="level" />
                )}
                {userLevel > 2 ? (
                  <img className="level-img" src={levelFilled} alt="level" />
                ) : (
                  <img className="level-img" src={level} alt="level" />
                )}
                {userLevel > 3 ? (
                  <img className="level-img" src={levelFilled} alt="level" />
                ) : (
                  <img className="level-img" src={level} alt="level" />
                )}
                {userLevel > 4 ? (
                  <img className="level-img" src={levelFilled} alt="level" />
                ) : (
                  <img className="level-img" src={level} alt="level" />
                )}
              </Box>
            )}
          </Box>
          <Box className="border-left"></Box>

          <Box className="medal-wrapper">
            <img className="medal-icon" src={medal} alt="Medal Icon" />
            <Box className="medal-text-box">
              <Text className="top-text">--</Text>
              <Text className="percentage">_</Text>
            </Box>
          </Box>
        </Box>

        <Box className="border-left"></Box>
        <Box className="greenie-id">
          <Box className="icon-box">
            <img src={copyIcon} alt="copy" className="greenie-id-icon" />
          </Box>

          <Box>
            <Text className="greenie-id-heading">Share Greenie ID </Text>
            <Text className="id">GRN788209</Text>
          </Box>
        </Box>
      </Box>
      <Text className="bio-text">
        With over 20 years of experience in engineering leadership, John Smith is a seasoned
        professional who has consistently driven success in complex and dynamic environments.
      </Text>
    </section>
  );
};
