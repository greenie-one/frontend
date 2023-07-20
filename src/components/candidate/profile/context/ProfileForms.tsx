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
      firstName: isNotEmpty('Please provide your first name'),
      lastName: isNotEmpty('Please provide your last name'),
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

    validate: {
      licenceNo: hasLength(15, 'Please enter valid licence number'),
      dateOfBirth: isNotEmpty('Please enter valid Date'),
    },
  });

  const workExperienceForm = useForm<workExperienceFormType>({
    initialValues: {
      designation: '',
      companyType: '',
      companyName: '',
      linkedInUrl: '',
      email: '',
      companyId: '',
      dateOfJoining: '',
      dateOfLeaving: undefined,
      workType: '',
      workMode: '',
      department: '',
      description: '',
      salary: '',
    },

    validate: {
      email: isEmail('Please provide a valid email address'),
      designation: isNotEmpty('Please enter your job title'),
      companyType: isNotEmpty('Please enter Company Type'),
      companyName: isNotEmpty('Please enter your company name'),
      dateOfJoining: isNotEmpty('Please enter start date'),
      workType: isNotEmpty('Enter valid work types'),
      workMode: isNotEmpty('Please provide mode of work'),
      department: isNotEmpty('Please provide the department'),
      salary: isNotEmpty('Please provide your salary'),
    },
  });

  const residentialInfoForm = useForm<residentialInfoFormType>({
    initialValues: {
      address_line_1: '',
      address_line_2: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
      start_date: '',
      end_date: '',
      address_type: '',
    },

    validate: {
      address_line_1: isNotEmpty('Please enter valid address'),
      address_line_2: isNotEmpty('Please enter valid address'),
      landmark: isNotEmpty('Please enter valid address'),
      city: isNotEmpty('Please enter valid address'),
      address_type: isNotEmpty('Please enter the address type'),
      pincode: hasLength(6, 'Please enter valid pincode'),
      state: isNotEmpty('Please enter your state/country'),
      start_date: isNotEmpty('Please enter start date'),
      country: isNotEmpty('Please enter your country'),
    },
  });

  const skillForm = useForm<skillFormType>({
    initialValues: {
      skillName: '',
      expertise: '',
    },

    validate: {
      skillName: isNotEmpty('Please enter your skill'),
      expertise: isNotEmpty('Please enter your expertise'),
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
    residentialInfoForm,
    skillForm,
    residentialInfoVerificationForm,
    peerAddressVerificationForm,
  };
};
