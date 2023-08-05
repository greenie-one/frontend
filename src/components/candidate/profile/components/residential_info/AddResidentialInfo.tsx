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
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { residentialInfoAPIList } from '../../../../../assets/api/ApiList';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import dayjs from 'dayjs';

export const AddResidentialInfo = () => {
  const navigate = useNavigate();
  const { authClient, residentialInfoForm, setForceRender } = useGlobalContext();
  const [checked, setChecked] = useState(false);
  const handleToggleScreen = () => {
    residentialInfoForm.reset();
    navigate('/candidate/profile');
  };

  const handleCheck = () => {
    residentialInfoForm.setFieldValue('end_date', '');
    setChecked(!checked);
  };

  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;

    if (code.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${code}`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
            residentialInfoForm.setFieldValue('pincode', code);

            const state = data[0].PostOffice[0].State;
            const country = data[0].PostOffice[0].Country;

            residentialInfoForm.setFieldValue('state', state);
            residentialInfoForm.setFieldValue('country', country);
          }

          residentialInfoForm.setFieldError('pincode', 'Please enter a valid pincode!');
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      residentialInfoForm.setFieldError('pincode', 'Please enter a valid pincode!');
      residentialInfoForm.setFieldValue('state', '');
      residentialInfoForm.setFieldValue('country', '');
    }
  };

  const checkEndDate = () => {
    if (!checked && residentialInfoForm.values.end_date === '') {
      residentialInfoForm.setFieldError('end_date', 'This field is required! Please enter a valid value.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (residentialInfoForm.validate().hasErrors) {
      checkEndDate();
      return;
    }

    if (!checkEndDate()) {
      return;
    }

    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we update your residential information.',
    });

    let requestBody: ResidentialInfoRequestBody = {} as ResidentialInfoRequestBody;
    if (residentialInfoForm.values.end_date === '') {
      Object.keys(residentialInfoForm.values).forEach((key) => {
        if (key !== 'end_date') {
          requestBody = {
            ...requestBody,
            [key]: residentialInfoForm.values[key],
          };
        }
      });
    } else {
      requestBody = { ...residentialInfoForm.values };
    }

    const res = await HttpClient.callApiAuth<createResidentialInfo>(
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
      <Layout>
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
                clearable
                searchable
                nothingFound="No options"
                data-autofocus
                data={[
                  { value: 'Permenent', label: 'Permenent' },
                  { value: 'Current', label: 'Current' },
                  { value: 'Temporary', label: 'Temporary' },
                ]}
                label="Type of address"
                className="inputClass"
                {...residentialInfoForm.getInputProps('addressType')}
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
                maxLength={40}
              />
            </Box>
            <Box className="input-section ">
              <Title className="title">Address Line 2</Title>
              <TextInput
                label="Address line 2"
                className="inputClass"
                {...residentialInfoForm.getInputProps('address_line_2')}
                withAsterisk
                maxLength={40}
              />
            </Box>
            <Box className="input-section ">
              <Title className="title">Landmark</Title>
              <TextInput
                label="Landmark"
                className="inputClass"
                {...residentialInfoForm.getInputProps('landmark')}
                withAsterisk
                maxLength={25}
              />
            </Box>
            <Box className="input-section ">
              <Title className="title">City</Title>
              <TextInput
                label="City"
                className="inputClass"
                {...residentialInfoForm.getInputProps('city')}
                withAsterisk
                maxLength={15}
              />
            </Box>
            <Box className="input-section ">
              <Title className="title">Pincode</Title>
              <TextInput
                label="Pincode"
                maxLength={6}
                className="inputClass"
                withAsterisk
                type="number"
                onChange={handlePincodeChange}
              />
            </Box>
            <Box className="input-section">
              <Title className="title">State & Country</Title>
              <Box className="inner-input-section">
                <TextInput
                  label="State"
                  readOnly={true}
                  className="inputClass"
                  {...residentialInfoForm.getInputProps('state')}
                />
                <TextInput
                  label="Country"
                  className="inputClass"
                  readOnly={true}
                  {...residentialInfoForm.getInputProps('country')}
                />
              </Box>
            </Box>
            <Divider mb={'10px'} />
            <Box className="input-section">
              <Title className="title">Start Date</Title>
              <DateInput
                maxDate={new Date()}
                label="Start date"
                withAsterisk
                className="inputClass"
                {...residentialInfoForm.getInputProps('start_date')}
              />
            </Box>
            <Box className="input-section">
              <Title className="title">End Date</Title>

              <DateInput
                maxDate={new Date()}
                minDate={dayjs(residentialInfoForm.values.start_date).add(1, 'day').toDate()}
                withAsterisk={!checked}
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
              <Button variant="default" onClick={handleToggleScreen}>
                Cancel
              </Button>
              <Button color="teal" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </section>
      </Layout>
    </>
  );
};
