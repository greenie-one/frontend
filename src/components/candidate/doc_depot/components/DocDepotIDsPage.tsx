import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useDocDepotContext } from '../context/DocDepotContext';
import { Folder } from './Folder';

export const DocDepotIDsPage = () => {
  const { setDocDepotActivePage, docDepoDocuments } = useDocDepotContext();

  const IdsList = docDepoDocuments.filter((doc) => doc.type === 'id');

  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">IDs({IdsList.length})</Text>
      </Box>
      <Text className="doc-depo-title">Your saved identification</Text>
      <Box className="folder-wrapper">
        {IdsList.map(({ _id, name, privateUrl }, index) => {
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
