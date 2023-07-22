import { Text } from '@mantine/core';
import Undertaking from '../assets/Undertaking User .pdf';
import privacyPolicy from '../../../auth/assets/Privacy Policy-Greenie.pdf';
export const UndertakingText = () => {
  return (
    <Text className="Undertaking">
      Click to view the{' '}
      <a href={Undertaking} download={'Undertaking'}>
        Undertaking
      </a>
      ,
      <a href={privacyPolicy} download={'Data and Privacy Policy'}>
        Data and Privacy Policy
      </a>
    </Text>
  );
};
