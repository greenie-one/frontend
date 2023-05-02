import { createStyles } from "@mantine/core";

export const Authentication = (): JSX.Element => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.root}></div>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  root: {},
}));
