import React from 'react';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../Profile/context/ProfileContext';
import folderImage from '../assets/folderImg.png';
import pdfImage from '../../Profile/assets/pdfIcon.png';

export const Folder = ({ id, name, isFolder }) => {
  const { setDocDepotActivePage } = useProfileContext();

  return (
    <Box key={id} className="folder" onClick={() => setDocDepotActivePage(id)}>
      {isFolder ? <img src={folderImage} alt="folder-image" /> : <img src={pdfImage} alt="folder-image" />}
      <Text className="folder-text">{name}</Text>
    </Box>
  );
};
