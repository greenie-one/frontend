import { useForm, isNotEmpty } from '@mantine/form';
import { useProfileContext } from '../../Profile/context/ProfileContext';

export const useProfileSettingsForm = () => {
  const { profileData } = useProfileContext();
  const profileSettingsForm = useForm({
    initialValues: {
      firstName: profileData?.firstName,
      lastName: profileData?.lastName,
      bio: profileData?.bio,
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
