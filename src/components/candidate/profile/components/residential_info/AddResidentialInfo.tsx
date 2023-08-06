import { Box, Title, TextInput, Select, Checkbox, Button, Divider, Text } from '@mantine/core';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useEffect, useState } from 'react';
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
import { useDisclosure } from '@mantine/hooks';
import { UpdateConfirmationModal } from './components/UpdateConfirmationModal';

const marker = new Icon({
  iconUrl: mapMarker,
  iconSize: [40, 40],
});

const months = [
  { value: '0', label: 'January' },
  { value: '1', label: 'February' },
  { value: '2', label: 'March' },
  { value: '3', label: 'April' },
  { value: '4', label: 'May' },
  { value: '5', label: 'June' },
  { value: '6', label: 'July' },
  { value: '7', label: 'August' },
  { value: '8', label: 'September' },
  { value: '9', label: 'October' },
  { value: '10', label: 'November' },
  { value: '11', label: 'December' },
];

export const AddResidentialInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmationModalOpened, { open: confirmationModalOpen, close: confirmationModalClose }] =
    useDisclosure(false);

  const { authClient, setForceRender } = useGlobalContext();
  const [checked, setChecked] = useState(false);
  const [fetchedAddress, setFetchedAddress] = useState<any>(location.state as any);
  const [formUpdated, setFormUpdated] = useState<boolean>(false);

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

    residentialInfoForm.setFieldValue('pincode', code);
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

        if (_key === 'start_date') {
          const startDate = new Date();
          startDate.setUTCFullYear(
            Number(residentialInfoForm.values[_key].year),
            Number(residentialInfoForm.values[_key].month)
          );
          startDate.setDate(1);

          requestBody = {
            ...requestBody,
            [key]: startDate.toISOString(),
          };
        } else if (key !== 'end_date') {
          requestBody = {
            ...requestBody,
            [key]: residentialInfoForm.values[_key],
          };
        }
      });
    } else {
      Object.keys(residentialInfoForm.values).forEach((key) => {
        const _key = key as keyof residentialInfoFormType;

        if (_key === 'start_date' || _key === 'end_date') {
          const date = new Date();
          date.setUTCFullYear(
            Number(residentialInfoForm.values[_key]?.year),
            Number(residentialInfoForm.values[_key]?.month)
          );
          date.setDate(1);

          requestBody = {
            ...requestBody,
            [key]: date.toISOString(),
          };
        } else if (key !== 'end_date') {
          requestBody = {
            ...requestBody,
            [key]: residentialInfoForm.values[_key],
          };
        }
      });
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

  useEffect(() => {
    setFormUpdated(
      residentialInfoForm.isDirty('address_line_1') ||
        residentialInfoForm.isDirty('address_line_2') ||
        residentialInfoForm.isDirty('pincode') ||
        residentialInfoForm.isDirty('city') ||
        residentialInfoForm.isDirty('state') ||
        residentialInfoForm.isDirty('country')
    );
  }, [
    residentialInfoForm.isDirty('address_line_1'),
    residentialInfoForm.isDirty('address_line_2'),
    residentialInfoForm.isDirty('pincode'),
    residentialInfoForm.isDirty('city'),
    residentialInfoForm.isDirty('state'),
    residentialInfoForm.isDirty('country'),
  ]);

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
                value={residentialInfoForm.values.pincode}
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
                  data={months}
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
                <TextInput
                  label="From Year"
                  maxLength={4}
                  className="inputClass"
                  withAsterisk
                  type="number"
                  {...residentialInfoForm.getInputProps('start_date.year')}
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
                  data={months}
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
                <TextInput
                  label="From Year"
                  maxLength={4}
                  className="inputClass"
                  withAsterisk={!checked}
                  disabled={checked}
                  type="number"
                  {...residentialInfoForm.getInputProps('end_date.year')}
                />
              </Box>
            </Box>
            <Divider />
            <Box className="btn-wrapper">
              <Button variant="default" onClick={handleToggleScreen}>
                Cancel
              </Button>
              {formUpdated ? (
                <Button color="teal" type="button" onClick={confirmationModalOpen}>
                  Update
                </Button>
              ) : (
                <Button color="teal" type="submit">
                  Save
                </Button>
              )}
            </Box>
          </form>
          <UpdateConfirmationModal
            residentialInfoForm={residentialInfoForm}
            setFetchedAddress={setFetchedAddress}
            modalOpened={confirmationModalOpened}
            modalClose={confirmationModalClose}
            setFormUpdated={setFormUpdated}
          />
        </section>
      </Layout>
    </>
  );
};
