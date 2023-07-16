import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../profile/context/ProfileContext';
import { Folder } from './Folder';
import { useDocDepotContext } from '../context/DocDepotContext';

export const DocDepotEduDocPage = () => {
  const { setDocDepotActivePage } = useProfileContext();
  const { educationDocuments } = useDocDepotContext();

  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">Educational documents({educationDocuments.length})</Text>
      </Box>
      <Box className="folder-wrapper">
        {educationDocuments.map(({ _id, name, private_url }, index) => {
          return (
            <Box key={index}>
              <Folder id={_id} name={name} isFolder={false} private_url={private_url} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
