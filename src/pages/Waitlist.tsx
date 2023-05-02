import {
  Box,
  TextInput,
  createStyles,
  rem,
  Button,
  Group,
  Title,
  Text,
  Image,
} from "@mantine/core";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { MdVerified } from "react-icons/md";
import waitlist_img from "../assets/images/waitlist/waitlist_img.png";

export const Waitlist = (): JSX.Element => {
  const { classes } = useStyles();
  const { classes: inputClasses } = inputStyles();

  const waitlistForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },

    validate: {
      firstName: isNotEmpty("Name cannot be empty"),
      lastName: isNotEmpty("Name cannot be empty"),
      email: isEmail("Invalid email"),
      phone: (value) =>
        /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value)
          ? null
          : "Invalid phone number",
    },
  });

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.waitlist_left}>
          <Text className={classes.logo}>
            <span className={classes.greenie}>Greenie</span>
            <span className={classes.verified}>
              <MdVerified />
            </span>
          </Text>
          <Title order={1} mb="xl">
            Join the waitlist
          </Title>

          <form
            onSubmit={waitlistForm.onSubmit((values) => console.log(values))}
          >
            <Group grow>
              <TextInput
                label="First Name"
                classNames={inputClasses}
                {...waitlistForm.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                classNames={inputClasses}
                {...waitlistForm.getInputProps("lastName")}
              />
            </Group>
            <TextInput
              label="Email Address"
              classNames={inputClasses}
              {...waitlistForm.getInputProps("email")}
            />
            <TextInput
              label="Phone Number"
              classNames={inputClasses}
              {...waitlistForm.getInputProps("phone")}
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
        />
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    placeItems: "center",
  },

  waitlist_left: {
    height: "100dvh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    display: "flex",
    alignItems: "start",
  },

  greenie: {
    fontSize: rem(22.5),
    fontWeight: 700,
  },

  verified: {
    fontSize: rem(20),
    color: "#9FE870",
    marginInlineStart: "0.25rem",
  },
}));

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    marginBottom: rem(16),
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));
