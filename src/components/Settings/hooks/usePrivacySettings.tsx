import { useForm, matchesField, hasLength } from '@mantine/form';

export const usePrivacySettingsForm = () => {
  const privacySettingsForm = useForm({
    initialValues: {
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'My New Password',
    },

    validate: {
      currentPassword: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
      newPassword: hasLength({ min: 9, max: 72 }, 'Password must have at least 9 characters'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });

  return privacySettingsForm;
};
