import { useForm, isEmail, isNotEmpty } from '@mantine/form';

export const useGeneralSettingsForm = () => {
  const generalSettingsForm = useForm({
    initialValues: {
      phoneNumber: null,
      emailId: '',
      age: null,
      dateOfBirth: '',
      phoneLinkedWithAadhar: null,
      aadharNumber: '',
      PANNumber: '',
    },

    validate: {
      phoneNumber: isNotEmpty('Phone number cannot be empty'),
      emailId: isEmail('Invalid email id!'),
      phoneLinkedWithAadhar: isNotEmpty('This field cannot be empty'),
      aadharNumber: isNotEmpty('Aadhar number cannot be empty'),
      PANNumber: isNotEmpty('PAN number cannot be empty'),
    },
  });

  return generalSettingsForm;
};
