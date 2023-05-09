import { Box, createStyles } from '@mantine/core';
import { useAuthContext } from '../../context/AuthContext';
import Form from './Form';

export const Login = () => {
  const { classes } = useStyles();
  const { loginForm } = useAuthContext();
  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={loginForm.onSubmit((values) => console.log(values))}>
          <Form />
        </form>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: '2rem',
  },
}));
