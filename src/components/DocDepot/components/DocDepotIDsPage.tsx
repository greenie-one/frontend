import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../Profile/context/ProfileContext';
import AadharImg from '../../Profile/assets/aadhar-logo.png';
import PanImg from '../../Profile/assets/pan-logo.png';
import licenceImg from '../../Profile/assets/licence-logo.png';

export const DocDepotIDsPage = () => {
  const { setDocDepotActivePage, docDepotData } = useProfileContext();
  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">IDs({docDepotData[0].items.length})</Text>
      </Box>
      <Box className="ids-wrapper">
        {docDepotData[0].items.map((ids, index) => {
          return (
            <Box key={index} className="id-box">
              {ids.id_type === 'AADHAR' && <img src={AadharImg} />}
              {ids.id_type === 'PAN' && <img src={PanImg} />}
              {ids.id_type === 'DRIVING_LICENCE' && <img src={licenceImg} />}
              {ids.id_type === 'AADHAR' && <Text className="id-text">Aadhar Card</Text>}
              {ids.id_type === 'PAN' && <Text className="id-text">PAN Card</Text>}
              {ids.id_type === 'DRIVING_LICENCE' && <Text className="id-text">Driver's Licence</Text>}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
