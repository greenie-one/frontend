import {
  Box,
  TextInput,
  PasswordInput,
  createStyles,
  rem,
  Text,
  Button,
} from "@mantine/core";
import { useAuthContext } from "../../context/AuthContext";

export const Form = () => {
  const { classes: inputClasses } = inputStyles();
  const { signupForm } = useAuthContext();

  return (
    <>
      <TextInput
        label="Email or Phone number"
        classNames={inputClasses}
        {...signupForm.getInputProps("emailPhone")}
      />
      <PasswordInput
        label="Create Password"
        classNames={inputClasses}
        {...signupForm.getInputProps("password")}
      />
      <PasswordInput
        label="Confirm Password"
        classNames={inputClasses}
        {...signupForm.getInputProps("confirmPassword")}
      />
      <Text fz="md">
        By creating an account, you agree to our <u>Terms of Service</u> and
        <u>Privacy & Cookie Statement</u>.
      </Text>
      <Button type="submit" radius="xl" color="teal">
        Agree & Join
      </Button>
    </>
  );
};

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
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
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));
