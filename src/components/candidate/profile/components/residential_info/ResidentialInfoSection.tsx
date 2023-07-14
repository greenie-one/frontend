import { useState } from 'react';
import { Text, Modal, Box, Title, TextInput, Select, Checkbox, Button, Divider } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Carousel } from '@mantine/carousel';
import { MdOutlineEdit } from 'react-icons/md';
import noData from '../../assets/noData.png';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useProfileContext } from '../../context/ProfileContext';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { ResidentialInfoCard } from './ResidentialInfoCard';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { residentialInfoAPIList } from '../../../../../assets/api/ApiList';
import { states, countries } from '../../constants/SelectionOptions';
import { ResidentialInfoRequestBody } from '../../types/ProfileRequests';
import { createResidentialInfo } from '../../types/ProfileResponses';

export const ResidentialInfoSection = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const { residentialInfoData, residentialInfoForm, setCandidateActivePage, scrollToTop, getResidentialInfo } =
    useProfileContext();
  const { authClient } = useGlobalContext();
  const [checked, setChecked] = useState(false);

  const handleToggleResidentialDetails = (): void => {
    scrollToTop();
    setCandidateActivePage('All Residential Info');
  };

  const handleCheck = () => {
    residentialInfoForm.values.end_date = null;
    setChecked(!checked);
  };

  const validateFormFields = (requiredField: string[]) => {
    const listLength = requiredField.length;

    for (let i = 0; i < listLength; i++) {
      residentialInfoForm.validateField(requiredField[i]);
    }

    for (let i = 0; i < listLength; i++) {
      if (residentialInfoForm.validateField(requiredField[i]).hasError) return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const requiredField = [
      'address_line_1',
      'address_line_2',
      'landmark',
      'city',
      'pincode',
      'typeOfAddress',
      'state',
      'country',
      'start_date',
      'end_date',
      'currentLocation',
    ];

    if (!validateFormFields(requiredField)) return;
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we update your residential information.',
    });
    const requestBody: ResidentialInfoRequestBody = {
      address_line_1: residentialInfoForm.values.address_line_1,
      address_line_2: residentialInfoForm.values.address_line_2,
      landmark: residentialInfoForm.values.landmark,
      pincode: residentialInfoForm.values.pincode,
      city: residentialInfoForm.values.city,
      state: residentialInfoForm.values.state,
      country: residentialInfoForm.values.country,
      start_date: residentialInfoForm.values.start_date,
      end_date: residentialInfoForm.values.end_date,
      typeOfAddress: residentialInfoForm.values.typeOfAddress,
    };
    const res: Result<createResidentialInfo> = await HttpClient.callApiAuth(
      {
        url: `${residentialInfoAPIList.postResidentialInfo}`,
        method: 'POST',
        body: requestBody,
      },
      authClient
    );
    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'We have added your residential information.',
      });
      getResidentialInfo();
      onClose();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const onClose = () => {
    residentialInfoForm.values.address_line_1 = '';
    residentialInfoForm.values.address_line_2 = '';
    residentialInfoForm.values.typeOfAddress = '';
    residentialInfoForm.values.landmark = '';
    residentialInfoForm.values.city = '';
    residentialInfoForm.values.pincode = '';
    residentialInfoForm.values.state = '';
    residentialInfoForm.values.country = '';
    residentialInfoForm.values.start_date = '';
    residentialInfoForm.values.end_date = '';
    close();
  };

  return (
    <section className="residential-info container">
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
            <Title className="title">Type of Address</Title>
            <Select
              data-autofocus
              data={[
                { value: 'Permenent', label: 'Permenent' },
                { value: 'Current', label: 'Current' },
                { value: 'Temporary', label: 'Temporary' },
              ]}
              label="Type of address"
              className="inputClass"
              {...residentialInfoForm.getInputProps('typeOfAddress')}
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
          <Box className="input-section">
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
          <Divider mb={'10px'} />
          <Box className="input-section">
            <Title className="title">Start Date</Title>
            <DateInput
              label="Start date"
              withAsterisk
              className="inputClass"
              {...residentialInfoForm.getInputProps('start_date')}
            />
          </Box>
          <Box className="input-section">
            <Title className="title">End Date</Title>

            <DateInput
              disabled={checked}
              label="End date"
              className="inputClass"
              {...residentialInfoForm.getInputProps('end_date')}
            />

            <Checkbox
              checked={checked}
              onChange={handleCheck}
              className="checkbox"
              color="teal"
              label="I currently live here"
            />
          </Box>
          <Divider />
          <Box className="btn-wrapper">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button color="teal" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Modal>
      <Box className="header">
        <Box>
          <Text className="heading">{`Residential Information (${residentialInfoData.length})`}</Text>
          <Text className="subheading">All your permanenent and temporary addresses</Text>
        </Box>

        {residentialInfoData.length > 0 && (
          <>
            <Box className="header-links">
              <Text className="link" onClick={handleToggleResidentialDetails}>
                See All Addresses
              </Text>
              <Button leftIcon={<MdOutlineEdit />} onClick={open} className="edit-btn">
                Edit Section
              </Button>
            </Box>
            <Box className="edit-icon" onClick={open}>
              <MdOutlineEdit size={'22px'} className="btn" />
            </Box>
          </>
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
            ({ address_line_1, address_line_2, landmark, pincode, start_date, end_date, isVerified, city }, index) => {
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
      {residentialInfoData.length > 0 && (
        <Button className="see-all-btn" onClick={handleToggleResidentialDetails}>
          See All
        </Button>
      )}
    </section>
  );
};
