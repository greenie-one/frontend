import { useForm, isEmail, isNotEmpty } from '@mantine/form';

export const useGeneralSettingsForm = () => {
  const generalSettingsForm = useForm({
    initialValues: {
      phoneNumber: 9876543210,
      emailId: 'john.marston@tcs.com',
      age: 25,
      dateOfBirth: '13/08/1998',
      phoneLinkedWithAadhar: 9876543210,
      aadharNumber: '2233 4454 5445 4354',
      phoneLinkedWithPAN: 9876543210,
      PANNumber: 'HJGU8768M',
    },

    validate: {
      phoneNumber: isNotEmpty('Phone number cannot be empty'),
      emailId: isEmail('Invalid email id!'),
      phoneLinkedWithAadhar: isNotEmpty('This field cannot be empty'),
      aadharNumber: isNotEmpty('Aadhar number cannot be empty'),
      phoneLinkedWithPAN: isNotEmpty('This field cannot be empty'),
      PANNumber: isNotEmpty('PAN number cannot be empty'),
    },
  });

  return generalSettingsForm;
};
