import { Text, Box } from '@mantine/core';
import ProfilePic from '../../../Profile/assets/johnMarston.png';
import { useState } from 'react';
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
import { docDepotExplorer } from './data/folderData';
import './styles/global.scss';

import { useProfileContext } from '../Profile/context/ProfileContext';

export const DocDepot = () => {
  const { docDepotActivePage, setDocDepotActivePage, docDepotData } = useProfileContext();

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
                  <Box key={index}>
                    <Folder id={index + 1} name={name} isFolder={isFolder} />
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
