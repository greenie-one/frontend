import {
  Text,
  Box,
  Button,
  Modal,
  Title,
  TextInput,
  createStyles,
  em,
  rem,
  Select,
} from '@mantine/core';
import '../styles/global.scss';
import { VerificationIDCard } from '../components/VerificationIDCard';
import { VerifyIdNoData } from '../components/VerifyIdNoData';
import { Link } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';

const documentsType = [
  {
    value: 'pan',
    label: 'Pan Card',
  },
  { value: 'aadhar', label: 'Adhar Card' },
];

export const VerificationIDSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { documentsData, addDocument } = useProfileContext();
  const { classes: inputClasses } = inputStyles();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addDocument();
  };

  return (
    <section className="verificationId-section  container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add work experience"
      >
        <form onSubmit={handleSubmit}>
          <Box className="input-section border-bottom">
            <Title className="title">Your Name</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Enter your name"
              classNames={inputClasses}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">Select Document</Title>
            <Select
              withAsterisk
              data={documentsType}
              label="Select your document"
              classNames={inputClasses}
            />
          </Box>
          <Box className="input-section  border-bottom">
            <Title className="title">Your Card Number</Title>
            <TextInput
              withAsterisk
              data-autofocus
              label="Enter your card number"
              classNames={inputClasses}
            />
          </Box>
          <Box className="location-wrapper">
            <Box className="btn-wrapper">
              <Button color="teal" type="submit">
                Save
              </Button>
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Verification ID (${documentsData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>

        <Box className="header-links">
          {documentsData.length > 0 && (
            <Link className="link" to={'/'}>
              See all documents
            </Link>
          )}

          <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
            Edit Section
          </Button>
        </Box>
      </Box>

      {documentsData.length === 0 ? (
        <Box className="verify-id-no-data-wrapper">
          <Box className="verify-id-img">
            <VerifyIdNoData />
          </Box>
          <Box className="verify-id-text">
            <Text className="text-heading">Stand Out!!</Text>
            <Text className="text-subheading">Verify your identity </Text>
            <Text className="text-subheading">and get a Greenie Check</Text>
          </Box>
        </Box>
      ) : (
        <Box className="cards-wrapper">
          {documentsData.map((document, index) => (
            <Box key={index}>
              <VerificationIDCard
                documentName={document.documentType}
                isVerified={document.isVerified}
              />
            </Box>
          ))}
        </Box>
      )}
    </section>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: '10px',
    marginBottom: '10px',
  },

  input: {
    height: '58px',
    paddingTop: '18px',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid #D1D4DB',
    lineHeight: '19px',
    letterSpacing: '-0.02em',
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      height: '46px',
      borderRadius: '6px',
      fontSize: '10px',
      lineHeight: '12px',
      margin: '0 auto',
    },
  },

  innerInput: {
    height: rem(54),
    paddingTop: rem(28),

    [`@media screen and (max-width: ${em(1024)})`]: {
      paddingTop: rem(8),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '12px',
    paddingLeft: '14px',
    paddingTop: '7px',
    lineHeight: '14.52px',
    letterSpacing: '-0.02em',
    zIndex: 1,
    color: '#697082',

    [`@media screen and (max-width: ${em(1024)})`]: {
      fontSize: '10px',
      lineHeight: '10px',
      paddingTop: '8px',
    },
  },
}));
