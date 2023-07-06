import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../Profile/context/ProfileContext';
import { Folder } from './Folder';

export const DocDepotOthersPage = () => {
  const { setDocDepotActivePage, docDepotData } = useProfileContext();
  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">Other documents({docDepotData[3].items.length})</Text>
      </Box>

      <Box className="folder-wrapper">
        {docDepotData[3].items.map(({ name, isFolder }, index) => {
          return (
            <Box key={index}>
              <Folder name={name} isFolder={isFolder} id={index + 1} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
