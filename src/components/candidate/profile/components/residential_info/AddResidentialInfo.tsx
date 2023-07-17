import { Box, Title, TextInput, Select, Checkbox, Button, Divider, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../../../../../utils/functions/showNotification';
import { HttpClient, Result } from '../../../../../utils/generic/httpClient';
import { residentialInfoAPIList } from '../../../../../assets/api/ApiList';
import { states, countries } from '../../constants/SelectionOptions';
import { Navbar } from '../Navbar';
import { useNavigate } from 'react-router-dom';

export const AddResidentialInfo = () => {
  const navigate = useNavigate();
  const { authClient, residentialInfoForm, scrollToTop, setForceRender } = useGlobalContext();
  const [checked, setChecked] = useState(false);

  const handleToggleScreen = () => {
    residentialInfoForm.reset();
    scrollToTop();
    navigate('/candidate/profile');
  };

  const handleCheck = () => {
    residentialInfoForm.values.end_date = '';
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
      'address_type',
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
      pincode: String(residentialInfoForm.values.pincode),
      city: residentialInfoForm.values.city,
      state: residentialInfoForm.values.state,
      country: residentialInfoForm.values.country,
      start_date: residentialInfoForm.values.start_date,
      end_date: residentialInfoForm.values.end_date,
      address_type: residentialInfoForm.values.address_type,
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
      setForceRender((prev) => !prev);
      handleToggleScreen();
    } else {
      showErrorNotification(res.error.code);
    }
  };
  return (
    <>
      <Navbar />
      <main className="profile">
        <section className="container add-residential-info ">
          <Box className="see-all-header">
            <Box className="go-back-btn" onClick={handleToggleScreen}>
              <BsArrowLeft className="arrow-left-icon" size={'16px'} />
              <Text>Add Residential Info</Text>
            </Box>
          </Box>
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
                {...residentialInfoForm.getInputProps('address_type')}
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
              <Button variant="default">Cancel</Button>
              <Button color="teal" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </section>
      </main>
    </>
  );
};
