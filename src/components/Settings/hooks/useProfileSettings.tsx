import { useForm, isNotEmpty } from '@mantine/form';

export const useProfileSettingsForm = () => {
  const profileSettingsForm = useForm({
    initialValues: {
      firstName: 'John',
      lastName: 'Marston',
      bio: 'With over 20 years of experience in engineering leadership, John Smith is a seasoned professional who has consistently driven success in complex and dynamic environments. ',
    },

    transformValues: (values) => ({
      name: `${values.firstName} ${values.lastName}`,
      bio: values.bio,
    }),

    validate: {
      firstName: isNotEmpty('First name cannot be empty'),
    },
  });

  return profileSettingsForm;
};
