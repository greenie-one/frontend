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
import { MonthPickerInput } from '@mantine/dates';
import { Carousel } from '@mantine/carousel';
import { MdOutlineEdit, MdOutlineCalendarMonth } from 'react-icons/md';
import '../styles/global.scss';
import noData from '../assets/noData.png';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../context/ProfileContext';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { ResidentialInfoCard } from '../components/ResidentialInfoCard';

const states = [
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' },
];

const countries = [
  { value: 'United States', label: 'United States' },
  { value: 'China', label: 'China' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Germany', label: 'Germany' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'India', label: 'India' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Canada', label: 'Canada' },
  { value: 'South Korea', label: 'South Korea' },
];

export const ResidentialInfo = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const {
    residentialInfoData,
    residentialInfoForm,
    addResidentialInfo,
    detailsPage,
    dispatchDetailsPage,
  } = useProfileContext();
  const { classes: inputClasses } = inputStyles();
  const [checked, setChecked] = useState(false);

  const handleLocation = () => {
    // @todo: API to be used. should use navigator?
  };

  const handleToggleResidentialDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_RESIDENTIALINFO',
      payload: !detailsPage.seeAllResidentialInfo,
    });
  };

  const handleCheck = () => {
    residentialInfoForm.values.endDate = null;
    setChecked(!checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addResidentialInfo();
    close();
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
              {...residentialInfoForm.getInputProps('addressLineOne')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Address Line 2</Title>
            <TextInput
              label="Address line 2"
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('addressLineTwo')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Landmark</Title>
            <TextInput
              label="Landmark"
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('landmark')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">City</Title>
            <TextInput
              label="City"
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('city')}
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

            <MonthPickerInput
              icon={<MdOutlineCalendarMonth />}
              label="Start date"
              withAsterisk
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('startDate')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">End Date</Title>

            <MonthPickerInput
              icon={<MdOutlineCalendarMonth />}
              label="End date"
              withAsterisk
              classNames={inputClasses}
              {...residentialInfoForm.getInputProps('endDate')}
            />

            <Checkbox
              checked={checked}
              onChange={handleCheck}
              className="checkbox"
              color="teal"
              label="I currently work here"
            />
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
          slidesToScroll={1}
          align="start"
          styles={{ control: { display: 'none' } }}
          breakpoints={[
            { maxWidth: 'xs', slideSize: '80%' },
            { maxWidth: 'md', slideSize: '50%' },
          ]}
        >
          {residentialInfoData.map(
            (
              {
                address_line_1,
                address_line_2,
                landmark,
                pincode,
                start_date,
                end_date,
                isVerified,
                city,
              },
              index
            ) => {
              return (
                <Carousel.Slide key={index}>
                  <ResidentialInfoCard
                    city={city}
                    address_line_1={address_line_1}
                    address_line_2={address_line_2}
                    landmark={landmark}
                    pincode={pincode}
                    start_date={start_date}
                    end_date={end_date}
                    isVerified={isVerified}
                  />
                </Carousel.Slide>
              );
            }
          )}
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

  icon: {
    marginTop: '18px',
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
