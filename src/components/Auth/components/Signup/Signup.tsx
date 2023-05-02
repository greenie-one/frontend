import { Box, createStyles } from "@mantine/core";
import { useAuthContext } from "../../context/AuthContext";
import { Form } from "./Form";

export const Signup = () => {
  const { classes } = useStyles();
  const { signupForm } = useAuthContext();

  return (
    <>
      <Box className={classes.root}>
        <form onSubmit={signupForm.onSubmit((values) => console.log(values))}>
          <Form />
        </form>
      </Box>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: "2rem",
  },
}));
