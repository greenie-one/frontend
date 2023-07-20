import { randomId } from '@mantine/hooks';
import professionalProfiles from '../../../../assets/images/Landing/professional-profiles.svg';
import docdepot from '../../../../assets/images/Landing/doc-deoptsvg.svg';
import dataControll from '../../../../assets/images/Landing/data-controll.svg';
import instantVerification from '../../../../assets/images/Landing/instant-verification.svg';
import instantVerificationMobile from '../../../../assets/images/Landing/instant-verification.svg';

export const featuresCardContent: Array<{
  id: string;
  cardBg: string;
  title: string;
  text: string;
  textColor: string;
  titleColor: string;
  illustrationSmall: string;
  illustrationLarge: string;
}> = [
  {
    id: randomId(),
    cardBg: '#17A672',
    title: 'Instant Verification Of Documents',
    text: "Greeni's cutting edge automation enables verifying identity, address, employment, salary, experience and skills under 100 seconds",
    textColor: '#FFFFFF',
    titleColor: '#FFFFFF',
    illustrationSmall: instantVerificationMobile,
    illustrationLarge: instantVerification,
  },
  {
    id: randomId(),
    cardBg: '#47DAA4',
    title: 'Doc-Depot',
    titleColor: '#FFFFFF',
    text: "Upload, maintain and share all professional documents on Greenie's blockchain encrypted document locker and be in control of your data. ",
    textColor: '#FFFFFF',
    illustrationSmall: docdepot,
    illustrationLarge: docdepot,
  },
  {
    id: randomId(),
    cardBg: '#85D1B5',
    title: 'Professional Profiles',
    titleColor: '#FFFFFF',
    text: 'Greenie verifies all candidate profiles, providing HR with dependable information prior to the interview. HR can then simply conduct interviews, negotiate salary and onboard candidates',
    textColor: '#FFFFFF',
    illustrationSmall: professionalProfiles,
    illustrationLarge: professionalProfiles,
  },
  {
    id: randomId(),
    title: 'Contract Management Tool',
    text: "Enhance your team's productivity by using Greenie's in-built Contract Management Tool enabling you to effortlessly create robust contracts or upload and modify existing ones.",
    illustrationSmall: dataControll,
    illustrationLarge: dataControll,
    cardBg: '#A0E2E1',
    titleColor: '#310805',
    textColor: '#191819',
  },
];
