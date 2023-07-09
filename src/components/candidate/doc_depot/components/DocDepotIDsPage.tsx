import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import { useProfileContext } from '../../profile/context/ProfileContext';
import AadharImg from '../../profile/assets/aadhar-logo.png';
import PanImg from '../../profile/assets/pan-logo.png';
import licenceImg from '../../profile/assets/licence-logo.png';

export const DocDepotIDsPage = () => {
  const { setDocDepotActivePage, documentsData } = useProfileContext();

  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">IDs({documentsData.length})</Text>
      </Box>
      <Text className="doc-depo-title">Your saved identification</Text>
      <Box className="ids-wrapper-doc-depot">
        {documentsData.map(({ id_type }, index) => {
          return (
            <Box key={index}>
              {id_type === 'AADHAR' && (
                <Box className="id-box-doc-depot">
                  <img src={AadharImg} /> <Text className="id-text">Aadhar Card</Text>
                </Box>
              )}
              {id_type === 'PAN' && (
                <Box className="id-box-doc-depot">
                  <img src={PanImg} /> <Text className="id-text">PAN Card</Text>
                </Box>
              )}
              {id_type === 'DRIVING_LICENCE' && (
                <Box className="id-box-doc-depot">
                  <img src={licenceImg} />
                  <Text className="id-text">Driver's Licence</Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
