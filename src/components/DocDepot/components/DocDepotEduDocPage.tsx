import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../Profile/context/ProfileContext';
import { Folder } from './Folder';

type docDepotData = {
  name: string;
  isFolder: boolean;
};

export const DocDepotEduDocPage = () => {
  const { setDocDepotActivePage } = useProfileContext();

  const docDepotData: docDepotData[] = [
    { name: '10th Marksheet', isFolder: false },
    { name: '12th Marksheet', isFolder: false },
  ];
  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">Educational documents(2)</Text>
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
