import {
  Box,
  TextInput,
  PasswordInput,
  createStyles,
  rem,
} from "@mantine/core";

export const Signup = () => {
  const { classes } = useStyles();
  const { classes: inputClasses } = inputStyles();

  return (
    <>
      <Box className={classes.root}>
        <form>
          <TextInput label="Email or Phone number" classNames={inputClasses} />
          <PasswordInput label="Create Password" classNames={inputClasses} />
          <PasswordInput label="Confirm Password" classNames={inputClasses} />
        </form>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {},
}));

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
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
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));
