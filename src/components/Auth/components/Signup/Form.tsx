import { TextInput, PasswordInput, createStyles, rem, Text, Button, Divider } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const Form = () => {
  const { classes: inputClasses } = inputStyles();
  const { signupForm } = useAuthContext();

  return (
    <>
      <TextInput
        label="Email or Phone number"
        classNames={inputClasses}
        {...signupForm.getInputProps('emailPhone')}
      />
      <PasswordInput
        label="Create Password"
        classNames={inputClasses}
        {...signupForm.getInputProps('password')}
      />
      <PasswordInput
        label="Confirm Password"
        classNames={inputClasses}
        {...signupForm.getInputProps('confirmPassword')}
      />
      <Text fz={{ sm: 'sm', md: 'md' }} mb={'md'}>
        By creating an account, you agree to our <u>Terms of Service</u> and{' '}
        <u>Privacy & Cookie Statement</u>.
      </Text>
      <Button type="submit" fullWidth radius="xl" color="teal">
        Agree & Join
      </Button>
      <Divider my="lg" label="Or better yet" fw={700} fz={'xl'} labelPosition="center" />
      <Button radius="xl" variant="default" fullWidth>
        Continue with Google
      </Button>
      <Text ta={'center'} mt={'sm'}>
        Aleady on Greenie?{' '}
        <u>
          <Link to={'/'}>Log In</Link>
        </u>
      </Text>
    </>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: rem(16),
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  // for password field
  innerInput: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },

  Button: {
    margin: '2rem 0',
  },

  termsAndConditionsText: {},
}));
