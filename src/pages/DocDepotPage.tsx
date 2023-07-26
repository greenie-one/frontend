import React from 'react';
import { DocDepot } from '../components/candidate/doc_depot';
import { DocDepotContextProvider } from '../components/candidate/doc_depot/context/DocDepotContext';

export const DocDepotPage = () => {
  return (
    <DocDepotContextProvider>
      <DocDepot />
    </DocDepotContextProvider>
  );
};
