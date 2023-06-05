import { useState } from 'react';
import {
  Text,
  Modal,
  Box,
  Title,
  TextInput,
  createStyles,
  em,
  rem,
  Select,
  Checkbox,
  Button,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { MdOutlineEdit } from 'react-icons/md';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { ResidentialInfoCard } from '../components/ResidentialInfoCard';

const states = [
  { value: 'andhra pradesh', label: 'Andhra Pradesh' },
  { value: 'arunachal pradesh', label: 'Arunachal Pradesh' },
  { value: 'assam', label: 'Assam' },
  { value: 'bihar', label: 'Bihar' },
  { value: 'chhattisgarh', label: 'Chhattisgarh' },
  { value: 'goa', label: 'Goa' },
  { value: 'gujarat', label: 'Gujarat' },
  { value: 'haryana', label: 'Haryana' },
  { value: 'himachal pradesh', label: 'Himachal Pradesh' },
  { value: 'jammu and kashmir', label: 'Jammu and Kashmir' },
  { value: 'jharkhand', label: 'Jharkhand' },
  { value: 'karnataka', label: 'Karnataka' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'madhya pradesh', label: 'Madhya Pradesh' },
  { value: 'maharashtra', label: 'Maharashtra' },
  { value: 'manipur', label: 'Manipur' },
  { value: 'meghalaya', label: 'Meghalaya' },
  { value: 'mizoram', label: 'Mizoram' },
  { value: 'nagaland', label: 'Nagaland' },
  { value: 'odisha', label: 'Odisha' },
  { value: 'punjab', label: 'Punjab' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'sikkim', label: 'Sikkim' },
  { value: 'tamil nadu', label: 'Tamil Nadu' },
  { value: 'telangana', label: 'Telangana' },
  { value: 'tripura', label: 'Tripura' },
  { value: 'uttar pradesh', label: 'Uttar Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'west bengal', label: 'West Bengal' },
];

const countries = [
  { value: 'united_states', label: 'United States' },
  { value: 'china', label: 'China' },
  { value: 'japan', label: 'Japan' },
  { value: 'germany', label: 'Germany' },
  { value: 'united_kingdom', label: 'United Kingdom' },
  { value: 'india', label: 'India' },
  { value: 'france', label: 'France' },
  { value: 'italy', label: 'Italy' },
  { value: 'canada', label: 'Canada' },
  { value: 'south_korea', label: 'South Korea' },
];

const months = [
  { value: 'january', label: 'January' },
  { value: 'february', label: 'February' },
  { value: 'march', label: 'March' },
  { value: 'april', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'June' },
  { value: 'july', label: 'July' },
  { value: 'august', label: 'August' },
  { value: 'september', label: 'September' },
  { value: 'october', label: 'October' },
  { value: 'november', label: 'November' },
  { value: 'december', label: 'December' },
];

const years = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
];

export const ResidentialInfo = () => {
  const screenSize = useMediaQuery('(min-width: 990px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const {
    residentialInfoData,
    residentialInfoForm,
    addResidentialInfo,
    handleToggleResidentialDetails,
  } = useProfileContext();
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);

  const data = [
    {
      addressLineOne: '1901 Thorrodge Cir',
      addressLineTwo: 'Baner, Pune',
      landmark: 'JP Mall',
      pincode: 3892230,
      type: 'current',
      state: 'Maharashtra',
      country: 'India',
      startDate: 'Jan 2017',
      endDate: 'May 2020',
      isverified: true,
      currentLocation: '',
    },
    {
      addressLineOne: '1901 Thorrodge Cir',
      addressLineTwo: 'Baner, Pune',
      landmark: 'JP Mall',
      pincode: 3892230,
      type: 'current',
      state: 'Maharashtra',
      country: 'India',
      startDate: 'Jan 2017',
      endDate: 'May 2020',
      isverified: false,
      currentLocation: '',
    },
  ];

  const handleLocation = () => {
    // @todo: API to be used. should use navigator?
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addResidentialInfo();
  };

  return (
    <section className="residential-info container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
        title="Add residential information"
      >
        <form onSubmit={handleSubmit}>
          <Box className="input-section">
            <Title className="title">Address Line 1</Title>
            <TextInput
              data-autofocus
              label="Address line 1"
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('address.addressLineOne')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Address Line 2</Title>
            <TextInput
              label="Address line 2"
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('address.addressLineTwo')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Landmark</Title>
            <TextInput
              label="Landmark"
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('address.landmark')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Pincode</Title>
            <TextInput
              label="Pincode"
              maxLength={6}
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('pincode')}
              withAsterisk
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">State/Country</Title>
            <Box className="inner-input-section">
              <Select
                data={states}
                label="Select state"
                classNames={inputClasses}
                {...residentialInfoForm.getInputProps('stateCountry.state')}
                withAsterisk
              />
              <Select
                data={countries}
                label="Select country"
                classNames={inputClasses}
                {...residentialInfoForm.getInputProps('stateCountry.country')}
                withAsterisk
              />
            </Box>
          </Box>
          <Box className="input-section">
            <Title className="title">Start Date</Title>
            <Box className="inner-input-section">
              <Select
                data={months}
                label="From month"
                classNames={inputClasses}
                {...residentialInfoForm.getInputProps('startDate.startMonth')}
                withAsterisk
              />
              <Select
                data={years}
                label="From year"
                classNames={inputClasses}
                {...residentialInfoForm.getInputProps('startDate.startYear')}
                withAsterisk
              />
            </Box>
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">End Date</Title>
            <Box className="inner-input-box">
              <Box className="inner-input-section">
                <Select
                  data={months}
                  label="From month"
                  classNames={inputClasses}
                  {...residentialInfoForm.getInputProps('endDate.endMonth')}
                  withAsterisk
                />
                <Select
                  disabled={checked}
                  data={years}
                  label="From year"
                  classNames={inputClasses}
                  {...residentialInfoForm.getInputProps('endDate.endYear')}
                  withAsterisk
                />
              </Box>
              <Checkbox
                checked={checked}
                onClick={() => setChecked(!checked)}
                className="checkbox"
                color="teal"
                label="I currently live here"
              />
            </Box>
          </Box>
          <Box className="location-wrapper">
            <Button
              leftIcon={<IoLocationOutline size={'22px'} />}
              className="location-btn"
              variant="default"
              onClick={handleLocation}
            >
              Find my current location
            </Button>
            <Box className="map"></Box>
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
          <Text className="heading">{`Residential Information (${residentialInfoData.length})`}</Text>
          <Text className="subheading">All government IDs, personal verification IDs etc.</Text>
        </Box>

        {residentialInfoData.length > 0 && (
          <Box className="header-links">
            <Text className="link" onClick={handleToggleResidentialDetails}>
              See all documents
            </Text>
            <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
              Edit Section
            </Button>
          </Box>
        )}
      </Box>

      {residentialInfoData.length === 0 ? (
        <Box className="no-data-wrapper">
          <img className="no-data" src={noData} alt="No data" />
          <Button leftIcon={<AiOutlinePlus />} onClick={open} className="add-records">
            Add records
          </Button>
        </Box>
      ) : (
        <Carousel
          withIndicators={false}
          slideSize="33.30%"
          slideGap={24}
          loop={false}
          slidesToScroll={screenSize ? 0 : 1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {/* {residentialInfoData.map(({ address, tenure, isVerified }, index) => {
            return (
              <Carousel.Slide key={index}>
                <ResidentialInfoCard address={address} tenure={tenure} isVerified={isVerified} />
              </Carousel.Slide>
            );
          })} */}
        </Carousel>
      )}
      {residentialInfoData.length > 0 && <Button className="see-all-btn">See All</Button>}
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
