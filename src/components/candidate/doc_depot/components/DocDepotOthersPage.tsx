import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { Folder } from './Folder';
import { useDocDepotContext } from '../context/DocDepotContext';

export const DocDepotOthersPage = () => {
  const { docDepoDocuments, setDocDepotActivePage } = useDocDepotContext();

  const otherDocumentsList = docDepoDocuments.filter((doc) => doc.type === 'other');

  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">Other documents({otherDocumentsList.length})</Text>
      </Box>

      <Box className="folder-wrapper">
        {otherDocumentsList.map(({ _id, name, privateUrl }, index) => {
          return (
            <Box key={index}>
              <Folder id={_id} name={name} isFolder={false} privateUrl={privateUrl} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
