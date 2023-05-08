import { PasswordInput, createStyles, rem } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
const SignUpWithEmail = () => {
  const { classes: inputClasses } = inputStyles();
  const { signupForm } = useAuthContext();
  return (
    <>
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
    </>
  );
};

export default SignUpWithEmail;

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
}));
