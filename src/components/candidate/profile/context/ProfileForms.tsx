import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';

export const useProfileForms = () => {
  const profileForm = useForm<profileFormType>({
    initialValues: {
      firstName: '',
      lastName: '',
      bio: '',
      descriptionTags: [],
      profilePic: '',
    },

    validate: {
      firstName: hasLength(3, 'Please provide your first name'),
      lastName: hasLength(3, 'Please provide your last name'),
      bio: isNotEmpty('Please provide bio'),
      descriptionTags: hasLength(3, 'Please select at least 3'),
    },
  });

  const verifyAadharForm = useForm<verifyAadharFormType>({
    initialValues: {
      aadharNo: '',
      otp: '',
    },

    validate: {
      aadharNo: hasLength(12, 'Enter valid aadhar number'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const verifyPANForm = useForm<verifyPANFormType>({
    initialValues: {
      panNo: '',
    },

    validate: {
      panNo: hasLength(10, 'Please eneter valid PAN number'),
    },
  });

  const verifyLicenceForm = useForm<verifyLicenceFormType>({
    initialValues: {
      licenceNo: '',
      dateOfBirth: null,
    },
    transformValues: (values) => ({
      licenceNo: values.licenceNo.toUpperCase(),
      dateOfBirth: values.dateOfBirth,
    }),
    validate: {
      licenceNo: hasLength(15, 'Please enter valid licence number'),
      dateOfBirth: isNotEmpty('Please enter valid Date'),
    },
  });

  const linkedInRegex =
    /(^((https?:\/\/)?((www|\w\w)\.)?)linkedin\.com\/)((([\w]{2,3})?)|([^/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gim;

  const workExperienceForm = useForm<workExperienceFormType>({
    initialValues: {
      designation: '',
      companyType: '',
      companyName: '',
      linkedInUrl: '',
      email: '',
      companyId: '',
      dateOfJoining: '',
      dateOfLeaving: '',
      workType: '',
      workMode: '',
      department: '',
      description: '',
      salary: '',
    },

    validate: {
      designation: isNotEmpty('Please enter your job title'),
      companyType: isNotEmpty('Please enter Company Type'),
      companyName: isNotEmpty('Please enter your company name'),
      dateOfJoining: isNotEmpty('Please enter start date'),
      workType: isNotEmpty('Enter valid work types'),
      workMode: isNotEmpty('Please provide mode of work'),
      department: isNotEmpty('Please provide the department'),
      salary: isNotEmpty('Please provide your salary'),
      email: isEmail('Please enter your official work Email'),
      linkedInUrl: (value) => (linkedInRegex.test(String(value)) ? null : 'Invalid LinkedIn URL'),
    },
  });

  const skillForm = useForm<skillFormType>({
    initialValues: {
      skillName: '',
      expertise: '',
      workExperience: '',
    },

    validate: {
      skillName: isNotEmpty('Please enter your skill'),
      expertise: isNotEmpty('Please enter your expertise'),
      workExperience: isNotEmpty('Please select a work experience'),
    },
  });

  const residentialInfoVerificationForm = useForm<residentialInfoVerificationFormType>({
    initialValues: {
      name: '',
      email: '',
      peerType: '',
      phone: '',
    },
    validate: {
      name: isNotEmpty("Please enter peer's name"),
      email: isEmail('Please provide valid email'),
      peerType: isNotEmpty('Please select peer type'),
      phone: hasLength(10, 'Please enter valid phone number'),
    },
  });

  const peerAddressVerificationForm = useForm<peerAddressVerificationFromType>({
    initialValues: {
      otp: '',
    },
    validate: {
      otp: hasLength(6, 'Please provide valid OTP'),
    },
  });

  return {
    profileForm,
    verifyAadharForm,
    verifyPANForm,
    verifyLicenceForm,
    workExperienceForm,
    skillForm,
    residentialInfoVerificationForm,
    peerAddressVerificationForm,
  };
};
