type signUpFormType = {
  emailPhone: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
};

type loginFormType = {
  emailPhoneGreenieId: string;
  password?: string;
  otp?: string;
};

type ProfileFormType = {
  firstName: string;
  lastName: string;
  descriptionTags: string[];
};
