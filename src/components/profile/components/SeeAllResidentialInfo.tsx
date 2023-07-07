import '../styles/global.scss';
import { useState } from 'react';
import { useProfileContext } from '../context/ProfileContext';
import { Text, Modal, Box, Button, Divider, Title, TextInput, Select, Checkbox } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineRight } from 'react-icons/ai';
import { MdVerified, MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';
import { CgSandClock } from 'react-icons/cg';
import location from '../assets/location.png';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { IoLocationOutline } from 'react-icons/io5';

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

export const SeeAllResidentialInfo = () => {
  const {
    detailsPage,
    dispatchDetailsPage,
    residentialInfoData,
    residentialInfoForm,
    deleteResidentialInfo,
    updateResidentialInfo,
  } = useProfileContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [updateId, setUpdateId] = useState<string>('');

  const onClose = () => {
    close();
    residentialInfoForm.setFieldValue('address_line_1', '');
    residentialInfoForm.setFieldValue('address_line_2', '');
    residentialInfoForm.setFieldValue('landmark', '');
    residentialInfoForm.setFieldValue('typeOfAddres', '');
    residentialInfoForm.setFieldValue('city', '');
    residentialInfoForm.setFieldValue('pincode', '');
    residentialInfoForm.setFieldValue('state', '');
    residentialInfoForm.setFieldValue('country', '');
    residentialInfoForm.setFieldValue('start_date', null);
    residentialInfoForm.setFieldValue('endDate', null);
  };

  const handleCheck = () => {
    residentialInfoForm.values.endDate = null;
    setChecked(!checked);
  };

  const handleLocation = () => {
    // @todo: API to be used. should use navigator?
  };

  const openModal = (id: string) => {
    setUpdateId(id);
    open();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateResidentialInfo(updateId);
    onClose();
  };
  const handleToggleResidentialDetails = (): void => {
    dispatchDetailsPage({
      type: 'SET_SEE_ALL_RESIDENTIALINFO',
      payload: !detailsPage.seeAllResidentialInfo,
    });
  };
  return (
    <section className="container">
      <Modal
        className="modal"
        size={'65%'}
        fullScreen={isMobile}
        opened={opened}
        onClose={onClose}
        title="Add residential information"
      >
        <form onSubmit={handleSubmit}>
          <Box className="input-section">
            <Title className="title">Address Line 1</Title>
            <TextInput
              data-autofocus
              label="Address line 1"
              className="inputClass"
              {...residentialInfoForm.getInputProps('address_line_1')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Address Line 2</Title>
            <TextInput
              label="Address line 2"
              className="inputClass"
              {...residentialInfoForm.getInputProps('address_line_2')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Landmark</Title>
            <TextInput
              label="Landmark"
              className="inputClass"
              {...residentialInfoForm.getInputProps('landmark')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">City</Title>
            <TextInput
              label="City"
              className="inputClass"
              {...residentialInfoForm.getInputProps('city')}
              withAsterisk
            />
          </Box>
          <Box className="input-section ">
            <Title className="title">Pincode</Title>
            <TextInput
              label="Pincode"
              maxLength={6}
              className="inputClass"
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
                className="inputClass"
                {...residentialInfoForm.getInputProps('state')}
                withAsterisk
                styles={() => ({
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: '#17a672',
                        color: 'white',
                      },
                    },
                  },
                })}
              />
              <Select
                data={countries}
                label="Select country"
                className="inputClass"
                {...residentialInfoForm.getInputProps('country')}
                withAsterisk
                styles={() => ({
                  item: {
                    '&[data-selected]': {
                      '&, &:hover': {
                        backgroundColor: '#17a672',
                        color: 'white',
                      },
                    },
                  },
                })}
              />
            </Box>
          </Box>
          <Box className="input-section">
            <Title className="title">Start Date</Title>

            <DateInput
              label="Start date"
              withAsterisk
              className="inputClass"
              {...residentialInfoForm.getInputProps('start_date')}
            />
          </Box>
          <Box className="input-section border-bottom">
            <Title className="title">End Date</Title>

            <DateInput
              label="End date"
              withAsterisk
              className="inputClass"
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
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
      <Box className="see-all-header">
        <Box className="go-back-btn" onClick={handleToggleResidentialDetails}>
          <BsArrowLeft className="arrow-left-icon" size={'16px'} />
          <Text>Profile</Text>
          <AiOutlineRight className="arrow-right-icon" size={'16px'} />
        </Box>
        <Text>{`Residential Information (${residentialInfoData.length})`}</Text>
      </Box>
      <Box className="see-all-residential-info-card-wrapper">
        {residentialInfoData.map(
          (
            {
              _id,
              address_line_1,
              address_line_2,
              landmark,
              pincode,
              state,
              country,
              city,
              start_date,
              end_date,
              isVerified,
              typeOfAddress,
            },
            index
          ) => {
            return (
              <Box key={index} className="see-all-residentila-info-card">
                <Box className="header">
                  <Box className="header-text">
                    <Box className="location">
                      <img className="location=img" src={location} alt="Location" />
                    </Box>
                    <Text>
                      {address_line_1}, {address_line_2}, {landmark}, {city} {pincode}
                    </Text>

                    {isVerified ? (
                      <Button leftIcon={<MdVerified color="#8CF078" size={'16px'} />} className="verified">
                        Verified
                      </Button>
                    ) : (
                      <Button leftIcon={<CgSandClock color="#FF7272" size={'16px'} />} className="pending">
                        Pending
                      </Button>
                    )}
                  </Box>
                  <Box className="button-wrappers">
                    {!isVerified && <Button className="get-verified">Get Verified</Button>}

                    <Box className="icon" onClick={() => deleteResidentialInfo(_id)}>
                      <MdOutlineDelete size={'22px'} className="btn" />
                    </Box>
                    <Box className="icon" onClick={() => openModal(_id)}>
                      <MdOutlineEdit size={'22px'} className="btn" />
                    </Box>
                  </Box>
                </Box>
                <Divider my="sm" color="#e1e1e1" />
                <Box className="residential-info-wrapper">
                  <Box>
                    <Text className="heading">Type</Text>
                    <Text className="details">{typeOfAddress}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">Landmark</Text>
                    <Text className="details">{landmark}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">State</Text>
                    <Text className="details">{state}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">Country</Text>
                    <Text className="details">{country}</Text>
                  </Box>
                  <Box>
                    <Text className="heading">Living Since</Text>
                    <Text className="details">
                      {start_date.toString().substring(0, 4)}-{end_date.toString().substring(0, 4)}
                    </Text>
                  </Box>
                </Box>
                <Divider my="sm" color="#e1e1e1" />
                <Box className="map-wrapper">
                  <Text className="heading">Location on Map</Text>
                  <Box className="map">
                    <Text>No location marked yet</Text>
                  </Box>
                </Box>
              </Box>
            );
          }
        )}
      </Box>
    </section>
  );
};
