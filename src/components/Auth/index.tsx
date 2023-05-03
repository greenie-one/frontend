import { Box, Tabs, createStyles, rem } from '@mantine/core';
import { Signup } from './components/Signup/Signup';
import Login from './components/Login';

export const Auth = () => {
  const { classes } = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.auth_left}></Box>
        <Box className={classes.auth_right}>
          <Tabs defaultValue="signup">
            <Tabs.List position="center">
              <Tabs.Tab value="signup">Create new account</Tabs.Tab>
              <Tabs.Tab value="login">Log in</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="signup">
              <Signup />
            </Tabs.Panel>
            <Tabs.Panel value="login">
              <Login />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  auth_right: {
    height: '100dvh',
    paddingTop: '15rem',
    display: 'flex',
    justifyContent: 'center',
  },
  auth_left: {},
}));
