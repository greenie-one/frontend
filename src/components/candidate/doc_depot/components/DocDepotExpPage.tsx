import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../profile/context/ProfileContext';
import { Folder } from './Folder';
import { docDepotData } from '../types/DocDepotGeneral';

export const DocDepotExpPage = () => {
  const { setDocDepotActivePage } = useProfileContext();

  const docDepotData: docDepotData[] = [
    { name: 'Letter of appointement', isFolder: false },
    { name: 'Payslips', isFolder: false },
    { name: 'Experience letter', isFolder: false },
    { name: 'Relieving Letter', isFolder: false },
  ];

  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">Work Experience({docDepotData.length})</Text>
      </Box>
      <Box className="folder-wrapper">
        {docDepotData.map(({ name, isFolder }, index) => {
          return (
            <Box key={index}>
              <Folder name={name} isFolder={isFolder} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
