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
};

export const DocDepot = () => {
  const { docDepotActivePage, setDocDepotActivePage } = useProfileContext();

  const docDepotData: docDepotData[] = [
    { name: 'IDs', isFolder: true },
    { name: 'Work Documents', isFolder: true },
    { name: 'Education documentsz', isFolder: true },
    { name: 'Others', isFolder: true },
  ];

  return (
    <main>
      <ProfileBar />
      <Box className="container">
        <Box onClick={() => setDocDepotActivePage(0)}>
          <DocDepotNavbar />
        </Box>

        {docDepotActivePage === 0 && (
          <Box>
            <DocDepotFilter />
            <Text className="doc-depot-heading">Folders</Text>
            <Box className="folder-wrapper">
              {docDepotData.map(({ name, isFolder }, index) => {
                return (
                  <Box key={index} onClick={() => setDocDepotActivePage(index + 1)}>
                    <Folder name={name} isFolder={isFolder} />
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
