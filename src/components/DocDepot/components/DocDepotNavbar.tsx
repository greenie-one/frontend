import { Box, Button, Title, TextInput, createStyles, em } from '@mantine/core';
import { GoSearch } from 'react-icons/go';

export const DocDepotNavbar = () => {
  const { classes: inputClasses } = inputStyles();
  return (
    <Box className="doc-depot-navbar">
      <Title className="title">Doc Depot</Title>
      <Box className="search" tabIndex={0}>
        <TextInput classNames={inputClasses} className="search-input" placeholder="Search" icon={<GoSearch />} />
      </Box>
      <Button className="green-outline-btn">Upload</Button>
    </Box>
  );
};

const inputStyles = createStyles((theme) => ({
  input: {
    background: '#ffffff',
    border: '1px solid #ebebeb',
    borderRadius: '40px',
    color: '#A4A4A4',

    [`@media screen and (max-width: ${em(768)})`]: {
      display: 'none',
    },
  },
}));
