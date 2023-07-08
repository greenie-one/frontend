type LoginRequestBody = {
  email?: string;
  password?: string;
  mobileNumber?: string;
};

type SignupRequestBody = {
  email?: string;
  password?: string;
  mobileNumber?: string;
};

type ForgotPasswordBody = {
  email: string;
};

type ValidateOtpBody = {
  validationId: string;
  otp?: string;
};
