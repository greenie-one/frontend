import { Text, Box } from '@mantine/core';
import {
  ProfileBar,
  DocDepotExpPage,
  DocDepotFilter,
  DocDepotIDsPage,
  DocDepotNavbar,
  DocDepotOthersPage,
  DocDepotEduDocPage,
  Folder,
} from './components';
import './styles/global.scss';

import { useProfileContext } from '../profile/context/ProfileContext';

type docDepotData = {
  name: string;
  isFolder: boolean;
  id: string;
};

export const DocDepot = () => {
  const { docDepotActivePage, setDocDepotActivePage } = useProfileContext();

  const docDepotData: docDepotData[] = [
    { name: 'IDs', isFolder: true, id: '0' },
    { name: 'Work Documents', isFolder: true, id: '1' },
    { name: 'Education documents', isFolder: true, id: '2' },
    { name: 'Others', isFolder: true, id: '3' },
  ];

  return (
    <main>
      <ProfileBar />
      <Box className="container">
        <Box>
          <DocDepotNavbar />
        </Box>

        {docDepotActivePage === 0 && (
          <Box>
            <DocDepotFilter />
            <Text className="doc-depot-heading">Folders</Text>
            <Box className="folder-wrapper">
              {docDepotData.map(({ id, name, isFolder }, index) => {
                return (
                  <Box key={index} onClick={() => setDocDepotActivePage(index + 1)}>
                    <Folder id={id} name={name} isFolder={isFolder} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
        {docDepotActivePage === 1 && <DocDepotIDsPage />}
        {docDepotActivePage === 2 && <DocDepotExpPage />}
        {docDepotActivePage === 3 && <DocDepotEduDocPage />}
        {docDepotActivePage === 4 && <DocDepotOthersPage />}
      </Box>
    </main>
  );
};
