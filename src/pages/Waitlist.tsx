import { useNavigate } from 'react-router-dom';
import { Box, TextInput, createStyles, rem, em, Button, Title, Text, Image } from '@mantine/core';
import { useForm, isEmail, isNotEmpty } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { authApiList } from '../assets/api/ApiList';
import { HttpClient } from '../utils/generic/httpClient';
import { showErrorNotification } from '../utils/functions/showErrorNotification';

import { Navbar } from '../components/common/Navbar';
import waitlist_img from '../assets/images/waitlist/waitlist_img.png';
import { MdVerified } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';

export const Waitlist = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { classes: inputClasses } = inputStyles();

  const waitlistForm = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },

    transformValues: (values) => ({
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
    }),

    validate: {
      firstName: isNotEmpty('Name cannot be empty'),
      lastName: isNotEmpty('Name cannot be empty'),
      email: isEmail('Invalid email'),
    },
  });

  const handleWaitlistSubmit = async () => {
    waitlistForm.reset();

    const res: any = await HttpClient.callApi({
      url: `${authApiList.waitlist}`,
      method: 'POST',
      body: waitlistForm.getTransformedValues(),
    });

    if (!res.code) {
      notifications.show({
        title: 'Success !',
        message: 'You have been added to the waitlist! We will notify you when we launch.',
        autoClose: 2200,
        color: 'teal',
        icon: <BsCheckLg />,
      });

      setTimeout(() => {
        navigate('/');
      }, 2200);
    } else {
      showErrorNotification(res.code);
    }
  };

  return (
    <>
      <Box className={classes.headerContainer}>
        <Navbar />
      </Box>
      <Box className={classes.root}>
        <Box className={classes.waitlist_left}>
          <Text className={classes.logo}>
            <span className={classes.greenie}>Greenie</span>
            <span className={classes.verified}>
              <MdVerified />
            </span>
          </Text>
          <Title order={1} mb="xl" className={classes.pageTitle}>
            Join the waitlist
          </Title>

          <form onSubmit={waitlistForm.onSubmit(handleWaitlistSubmit)}>
            <Box className={classes.nameInput}>
              <TextInput
                withAsterisk
                label="First Name"
                classNames={inputClasses}
                {...waitlistForm.getInputProps('firstName')}
              />
              <TextInput
                withAsterisk
                label="Last Name"
                classNames={inputClasses}
                {...waitlistForm.getInputProps('lastName')}
              />
            </Box>
            <TextInput
              withAsterisk
              label="Email Address"
              classNames={inputClasses}
              {...waitlistForm.getInputProps('email')}
            />
            <TextInput
              label="Phone Number"
              classNames={inputClasses}
              placeholder="optional"
              {...waitlistForm.getInputProps('phone')}
            />

            <Button fullWidth size="md" type="submit" radius="xl" color="teal">
              Join the waitlist
            </Button>
          </form>
        </Box>

        <Image
          maw={650}
          withPlaceholder
          src={waitlist_img}
          alt="waitlist illustration"
          className={classes.waitlist_img}
        />
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  headerContainer: {
    display: 'none',

    [`@media screen and (max-width: ${em(480)})`]: {
      display: 'block',
    },
  },

  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    placeItems: 'center',

    [`@media screen and (max-width: ${em(480)})`]: {
      height: '100dvh',
      overflow: 'hidden',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr',
      padding: '0 2.5rem',
      paddingBlockStart: rem(25),
    },
  },

  waitlist_left: {
    height: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [`@media screen and (max-width: ${em(480)})`]: {
      width: '100%',
      margin: '3rem 0',
      height: 'fit-content',
      alignItems: 'stretch',
    },
  },

  pageTitle: {
    [`@media screen and (max-width: ${em(480)})`]: {
      textAlign: 'center',
    },
  },

  waitlist_img: {
    [`@media screen and (max-width: ${em(480)})`]: {
      position: 'relative',
      top: '-2rem',
    },
  },

  nameInput: {
    display: 'flex',
    gap: '1rem',

    [`@media screen and (max-width: ${em(480)})`]: {
      flexDirection: 'column',
      width: '100% !important',
      gap: 0,
    },
  },

  logo: {
    display: 'flex',
    alignItems: 'start',

    [`@media screen and (max-width: ${em(480)})`]: {
      display: 'none',
    },
  },

  greenie: {
    fontSize: rem(22.5),
    fontWeight: 700,
  },

  verified: {
    fontSize: rem(20),
    color: '#9FE870',
    marginInlineStart: '0.25rem',
  },
}));

const inputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: rem(16),

    [`@media screen and (max-width: ${em(480)})`]: {
      marginBottom: rem(12),
    },
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),

    [`@media screen and (max-width: ${em(480)})`]: {
      height: rem(48),
    },
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,

    [`@media screen and (max-width: ${em(480)})`]: {
      paddingTop: `calc(${theme.spacing.sm} / 3.5)`,
      fontSize: `calc(${theme.fontSizes.xs} * 0.95)`,
    },
  },
}));
