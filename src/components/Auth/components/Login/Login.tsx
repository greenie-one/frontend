import { TextInput, createStyles, rem, Text, Button, Divider } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Login = () => {
  const { classes: inputClasses } = inputStyles();
  return (
    <>
      <TextInput label="Email or Phone number" classNames={inputClasses} />
      <Button type="submit" fullWidth radius="xl" color="teal" style={{ margin: '1rem 0' }}>
        Continue
      </Button>
      <Divider my="lg" label="Or better yet" fw={700} fz={'xl'} labelPosition="center" />
      <Button radius="xl" variant="default" fullWidth>
        Continue with Google
      </Button>
      <Text ta={'center'} mt={'sm'}>
        Not one Greenie yet?{' '}
        <u>
          <Link to={'/'}>Create a new Account</Link>
        </u>
      </Text>
    </>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    marginBottom: rem(16),
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
    marginTop: rem(32),
    width: '458px',
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
