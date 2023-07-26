import { BsArrowLeft } from 'react-icons/bs';
import { Text, Box } from '@mantine/core';
import AadharImg from '../../profile/assets/aadhar-logo.png';
import PanImg from '../../profile/assets/pan-logo.png';
import licenceImg from '../../profile/assets/licence-logo.png';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useDocDepotContext } from '../context/DocDepotContext';

export const DocDepotIDsPage = () => {
  const { setDocDepotActivePage } = useDocDepotContext();
  const { IDs } = useGlobalContext();

  return (
    <Box>
      <Box className="doc-depo-header" onClick={() => setDocDepotActivePage(0)}>
        <BsArrowLeft className="arrow-left-icon" size={'16px'} />
        <Text className="text">IDs({IDs.length})</Text>
      </Box>
      <Text className="doc-depo-title">Your saved identification</Text>
      <Box className="ids-wrapper-doc-depot">
        {IDs.map((ID: DocsType, index: number) => {
          return (
            <Box key={index}>
              {ID.id_type === 'AADHAR' && (
                <Box className="id-box-doc-depot">
                  <img src={AadharImg} /> <Text className="id-text">Aadhar Card</Text>
                </Box>
              )}
              {ID.id_type === 'PAN' && (
                <Box className="id-box-doc-depot">
                  <img src={PanImg} /> <Text className="id-text">PAN Card</Text>
                </Box>
              )}
              {ID.id_type === 'DRIVING_LICENCE' && (
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
