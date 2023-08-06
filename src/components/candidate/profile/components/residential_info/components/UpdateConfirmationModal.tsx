import React from 'react';
import { Box, Modal, Button, Text } from '@mantine/core';
import { confirmationModalStyle } from '../../../../../settings/styles/articleContentStyles';
import { useForm } from '@mantine/form';
import { HttpClient } from '../../../../../../utils/generic/httpClient';
import { searchEndpoints } from '../../../../../../assets/api/ApiList';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

type ModalPropsType = {
  residentialInfoForm: ReturnType<typeof useForm<residentialInfoFormType>>;
  setFetchedAddress: React.Dispatch<React.SetStateAction<any>>;
  modalOpened: boolean;
  modalClose: () => void;
  setFormUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UpdateConfirmationModal: React.FC<ModalPropsType> = ({
  residentialInfoForm,
  setFetchedAddress,
  modalOpened,
  modalClose,
  setFormUpdated,
}) => {
  const navigate = useNavigate();
  const { authClient } = useGlobalContext();
  const { classes: modalStyles } = confirmationModalStyle();

  const fetchAddresses = async () => {
    modalClose();

    const queryValues: Array<string> = [];
    const fieldsList: Array<keyof residentialInfoFormType> = [
      'address_line_1',
      'address_line_2',
      'pincode',
      'city',
      'state',
      'country',
    ];

    fieldsList.forEach((field) => {
      queryValues.push(String(residentialInfoForm.values[field]));
    });

    const queryString = queryValues.join(',');

    const queryParams = new URLSearchParams({
      address: queryString,
    }).toString();

    const res = await HttpClient.callApiAuth<Array<any>>(
      {
        url: `${searchEndpoints.searchAddress}?${queryParams}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      if (res.value.length > 0) {
        const newAddress = res.value[0];

        console.log(newAddress);

        setFetchedAddress(newAddress);
        residentialInfoForm.setValues(newAddress.address);
        navigate('.', { replace: true, state: res.value[0] });

        setFormUpdated(false);
      }
    } else {
      console.error(res.error);
    }
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={modalClose}
      title="Confirmation"
      padding="xl"
      radius="lg"
      size="lg"
      centered
      classNames={modalStyles}
    >
      <Box className={modalStyles.confirmationMsgWrapper}>
        <Text className={modalStyles.confirmationMsg}>Are you sure you want to update the changes made?</Text>

        <Box className={modalStyles.modalBtnsContainer}>
          {[
            { variant: 'filled', text: 'Confirm', action: fetchAddresses },
            { variant: 'outline', text: 'Cancel', action: modalClose },
          ].map((btns, idx) => (
            <Button
              key={idx}
              className={modalStyles.modalActionBtns}
              onClick={btns.action}
              size="sm"
              type="button"
              radius="xl"
              variant={btns.variant}
              color="teal"
            >
              {btns.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};
