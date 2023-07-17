type InputStyles = {
  root: string;
  input: string;
  innerInput: string;
  passwordInput: string;
  label: string;
};

type OtpInputStyles = {
  root: string;
  input: string;
};

type OtpInputStylesType = (
  params: void,
  options?: UseStylesOptions<string>
) => {
  classes: OtpInputStyles;
  cx: (...args: string[]) => string;
  theme: MantineTheme;
};

type InputStylesType = (
  params: void,
  options?: UseStylesOptions<string>
) => {
  classes: InputStyles;
  cx: (...args: string[]) => string;
  theme: MantineTheme;
};
