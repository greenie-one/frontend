import { useForm, isNotEmpty, isEmail, hasLength } from '@mantine/form';

export const profileForm = useForm<profileFormType>({
  initialValues: {
    firstName: '',
    lastName: '',
    bio: '',
    descriptionTags: [],
  },

  validate: {
    firstName: isNotEmpty('Please provide your first name'),
    lastName: isNotEmpty('Please provide your last name'),
    bio: isNotEmpty('Please provide bio'),
    descriptionTags: hasLength(3, 'Please select at least 3'),
  },
});

export const verifyAadharForm = useForm<verifyAadharFormType>({
  initialValues: {
    aadharNo: '',
    otp: '',
  },

  validate: {
    aadharNo: hasLength(12, 'Enter valid aadhar number'),
    otp: hasLength(6, 'OTP must be 6 digits'),
  },
});

export const verifyPANForm = useForm<verifyPANFormType>({
  initialValues: {
    panNo: '',
  },

  validate: {
    panNo: hasLength(10, 'Please eneter valid PAN number'),
  },
});

export const verifyLicenceForm = useForm<verifyLicenceFormType>({
  initialValues: {
    licenceNo: '',
    dateOfBirth: null,
  },
  validate: {
    licenceNo: hasLength(15, 'Please enter valide licence number'),
    dateOfBirth: isNotEmpty('Please enter valide licence number'),
  },
});

export const workExperienceForm = useForm<workExperienceFormType>({
  initialValues: {
    designation: '',
    companyType: '',
    companyName: '',
    linkedInUrl: '',
    workEmail: '',
    companyId: '',
    startDate: null,
    endDate: null,
    workType: '',
    modeOfWork: '',
  },

  validate: {
    designation: isNotEmpty('Please enter your job title'),
    companyType: isNotEmpty('Please enter Company Type'),
    companyName: isNotEmpty('Please enter your company name'),
    linkedInUrl: isNotEmpty('Please enter LinkedIn Url'),
    workEmail: isEmail('Invalid email'),
    companyId: isNotEmpty('Please enter your company id'),
    startDate: isNotEmpty('Please enter start date'),
    workType: isNotEmpty('Enter valid work types'),
    modeOfWork: isNotEmpty('Please provide mode of work'),
  },
});

export const residentialInfoForm = useForm<residentialInfoFormType>({
  initialValues: {
    address_line_1: '',
    address_line_2: '',
    landmark: '',
    city: '',
    pincode: '',
    typeOfAddress: '',
    state: '',
    country: '',
    start_date: null,
    end_date: null,
  },

  validate: {
    address_line_1: isNotEmpty('Please enter valid address'),
    address_line_2: isNotEmpty('Please enter valid address'),
    landmark: isNotEmpty('Please enter valid address'),
    city: isNotEmpty('Please enter valid address'),
    typeOfAddress: isNotEmpty('Please enter the address type'),
    pincode: hasLength(6, 'Please enter valid pincode'),
    state: isNotEmpty('Please enter your state/country'),
    start_date: isNotEmpty('Please enter start date'),
    end_date: isNotEmpty('Please enter start date'),
    country: isNotEmpty('Please enter your country'),
  },
});

export const skillForm = useForm<skillFormType>({
  initialValues: {
    skillName: '',
    expertise: '',
  },

  validate: {
    skillName: isNotEmpty('Please enter your skill'),
    expertise: isNotEmpty('Please enter your expertise'),
  },
});
