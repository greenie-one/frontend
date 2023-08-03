import { Box, Title, TextInput, Select, Checkbox, Button, Divider, Text } from '@mantine/core';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import { hasLength, isNotEmpty, useForm } from '@mantine/form';
import { SearchBox } from './components/SearchBox';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import mapMarker from '../../assets/map-marker.png';

const marker = new Icon({
  iconUrl: mapMarker,
  iconSize: [40, 40],
});

export const AddResidentialInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { authClient, setForceRender } = useGlobalContext();
  const [checked, setChecked] = useState(false);
  const [fetchedAddress, setFetchedAddress] = useState<any>(location.state as any);

  console.log(fetchedAddress);

  const residentialInfoForm = useForm<residentialInfoFormType>({
    initialValues: {
      address_line_1: fetchedAddress?.address.address_line_1 || '',
      address_line_2: fetchedAddress?.address.address_line_2 || '',
      landmark: '',
      pincode: fetchedAddress?.address.pincode || '',
      city: fetchedAddress?.address.city || '',
      state: fetchedAddress?.address.state || '',
      country: fetchedAddress?.address.country || '',
      start_date: {
        month: '',
        year: '',
      },
      end_date: {
        month: '',
        year: '',
      },
      addressType: '',
    },

    validate: {
      address_line_1: isNotEmpty('Please enter valid address'),
      address_line_2: isNotEmpty('Please enter valid address'),
      landmark: isNotEmpty('Please enter valid address'),
      city: isNotEmpty('Please enter valid address'),
      addressType: isNotEmpty('Please enter the address type'),
      pincode: hasLength(6, 'Please enter valid pincode'),
      state: isNotEmpty('Please enter your state/country'),
      start_date: {
        month: isNotEmpty('Please enter start month'),
        year: isNotEmpty('Please enter start year'),
      },
      country: isNotEmpty('Please enter your country'),
    },
  });

  console.log(residentialInfoForm);

  const handleToggleScreen = () => {
    residentialInfoForm.reset();
    navigate('/candidate/profile');
  };

  const handleCheck = () => {
    residentialInfoForm.setFieldValue('end_date.month', '');
    residentialInfoForm.setFieldValue('end_date.year', '');
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
    let isValid = true;

    if (!checked && residentialInfoForm.values.end_date?.month === '') {
      residentialInfoForm.setFieldError('end_date.month', 'Please enter end month.');
      isValid = false;
    }

    if (!checked && residentialInfoForm.values.end_date?.year === '') {
      residentialInfoForm.setFieldError('end_date.year', 'Please enter end year.');
      isValid = false;
    }

    return isValid;
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
    if (residentialInfoForm.values.end_date?.month === '' || residentialInfoForm.values.end_date?.year === '') {
      Object.keys(residentialInfoForm.values).forEach((key) => {
        const _key = key as keyof residentialInfoFormType;

        if (key !== 'end_date') {
          requestBody = {
            ...requestBody,
            [key]: residentialInfoForm.values[_key],
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

  console.log(fetchedAddress);

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
          <Box className="info-header-container">
            <Box className="location-search-box">
              <SearchBox
                innerComponent={true}
                setFetchedAddress={setFetchedAddress}
                residentialInfoForm={residentialInfoForm}
              />
            </Box>
            <Text className="address-string">{fetchedAddress.addressString}</Text>
            <Box className="map-box-container">
              <MapContainer
                center={[fetchedAddress.position.latitude, fetchedAddress.position.longitude]}
                zoom={12}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[fetchedAddress.position.latitude, fetchedAddress.position.longitude]} icon={marker}>
                  <Popup>{fetchedAddress.addressString}</Popup>
                </Marker>
              </MapContainer>
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
                  { value: 'Permanent', label: 'Permanent' },
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
                value={fetchedAddress?.address.pincode}
              />
            </Box>
            <Box className="input-section">
              <Title className="title">State/Country</Title>
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
              <Box className="inner-input-section">
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
                  label="From Month"
                  className="inputClass"
                  {...residentialInfoForm.getInputProps('start_date.month')}
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
                  clearable
                  searchable
                  nothingFound="No options"
                  data-autofocus
                  data={[
                    { value: 'Permenent', label: 'Permenent' },
                    { value: 'Current', label: 'Current' },
                    { value: 'Temporary', label: 'Temporary' },
                  ]}
                  label="From Year"
                  className="inputClass"
                  {...residentialInfoForm.getInputProps('start_date.year')}
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
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              className="checkbox"
              color="teal"
              label="I currently live here"
            />
            <Box className="input-section">
              <Title sx={{ color: checked ? '#D1D4DB !important' : '#191919 !important' }} className="title">
                End Date
              </Title>

              <Box className="inner-input-section">
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
                  label="From Month"
                  className="inputClass"
                  {...residentialInfoForm.getInputProps('end_date.month')}
                  withAsterisk={!checked}
                  disabled={checked}
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
                  clearable
                  searchable
                  nothingFound="No options"
                  data-autofocus
                  data={[
                    { value: 'Permenent', label: 'Permenent' },
                    { value: 'Current', label: 'Current' },
                    { value: 'Temporary', label: 'Temporary' },
                  ]}
                  label="From Year"
                  className="inputClass"
                  {...residentialInfoForm.getInputProps('end_date.year')}
                  withAsterisk={!checked}
                  disabled={checked}
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
