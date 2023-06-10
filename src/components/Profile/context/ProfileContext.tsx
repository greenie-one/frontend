// ---------------Import Statements--------------
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { em } from '@mantine/core';
import axios from 'axios';
import {
  skillsAPIList,
  profileAPIList,
  documentsAPIList,
  workExperienceAPiList,
  residentialInfoAPIList,
} from '../../../assets/api/ApiList';
import { notifications } from '@mantine/notifications';
import { BsCheckLg } from 'react-icons/bs';
import { FaExclamation } from 'react-icons/fa';

// ----------------Types-------------------------

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type ProfileContextType = {
  profileData: IUserProfile | null;
  documentsData: IDocument[];
  addDocument: () => void;
  workExperienceData: IWorkExperience[];
  residentialInfoData: IResidendialInfoDataType[];
  skillData: ISkillDataType[];
  addWorkExperience: () => void;
  deleteWorkExperience: (id: string) => void;
  updateWorkExperience: (id: string) => void;
  documentsForm: UseFormReturnType<documentsFormType>;
  verifyAadharForm: UseFormReturnType<verifyAadharFormType>;
  verifyPANForm: UseFormReturnType<verifyPANFormType>;
  verifyLicenceForm: UseFormReturnType<verifyLicenceFormType>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  addResidentialInfo: () => void;
  deleteResidentialInfo: (id: string) => void;
  updateResidentialInfo: (id: string) => void;
  skillForm: UseFormReturnType<skillFormType>;
  addSkill: () => void;
  deleteSkill: (id: string) => void;
  updateSkill: (id: string) => void;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authTokens: AuthTokens;
  detailsPage: DetailsPageState;
  dispatchDetailsPage: React.Dispatch<DetailsPageAction>;
};

interface IDocument {
  documentType: string;
  documentNumber: string;
  isVerified: boolean;
}

interface IUserProfile {
  firstName: string;
  lastName: string;
  descriptionTags: string[];
}

interface IWorkExperience {
  _id: string;
  image: string | null;
  designation: string;
  companyName: string;
  email: string;
  companyId: string;
  companyStartDate: string;
  companyEndDate: string;
  workMode: string;
  workType: string;
  isVerified: boolean;
  verifiedBy: [] | null;
  companyType: string;
}

interface IResidendialInfoDataType {
  _id: string;
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  pincode: number;
  city: string;
  state: string;
  country: string;
  start_date: Date;
  end_date: Date;
  isVerified: boolean;
}

interface ISkillDataType {
  _id: string;
  createdAt: string;
  designation: string;
  isVerified: boolean;
  skillRate: number;
  updatedAt: string;
  user: string;
  __v: number;
}

type documentsFormType = {
  documentType: string;
  aadharNumber: string;
  panNumber: string;
  drivingLicenseNumber: string;
};

type verifyAadharFormType = {
  linkedPhoneNo: string;
  otp: string;
};
type verifyPANFormType = {
  panNo: string;
  otp: string;
};
type verifyLicenceFormType = {
  licenceNo: string;
  otp: string;
};

type workExperienceFormType = {
  jobTitle: string;
  companyType: string;
  companyName: string;
  linkedInUrl: string;
  workEmail: string;
  companyId: string;
  startDate: Date | null;
  endDate: Date | null;
  workType: { modeOfWork: string; workType: string };
};

type residentialInfoFormType = {
  addressLineOne: string;
  addressLineTwo: string;
  landmark: string;
  city: string;
  pincode: number | null;
  typeOfAddress: string;
  stateCountry: { state: string; country: '' };
  startDate: Date | null;
  endDate: Date | null;
  currentLocation: number | null;
};

type skillFormType = {
  skillName: string;
  expertise: string;
};

type DetailsPageState = {
  seeAllWorkExperience: boolean;
  seeAllResidentialInfo: boolean;
  seeAllSkills: boolean;
  seeAadharCard: boolean;
  seePanCard: boolean;
  seeDrivingLicence: boolean;
};

type DetailsPageAction =
  | { type: 'SET_SEE_ALL_WORKEXPERIENCE'; payload: boolean }
  | { type: 'SET_SEE_ALL_RESIDENTIALINFO'; payload: boolean }
  | { type: 'SET_SEE_ALL_SKILLS'; payload: boolean }
  | { type: 'SET_SEE_AADHAR_CARD'; payload: boolean }
  | { type: 'SET_SEE_PAN_CARD'; payload: boolean }
  | { type: 'SET_SEE_DRIVER_LICENCE'; payload: boolean };

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(false);

  const isPhoneNumber = (input: string): boolean => {
    const pattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return pattern.test(input.trim());
  };

  const validatePhoneNo = (value: string) => {
    if (value.trim().length === 0) {
      return 'Phone Number cannot be empty';
    }
    if (/^[+]?[\d ]+$/.test(value.trim())) {
      if (!isPhoneNumber(value)) {
        return 'Invalid Phone Number';
      }
    }
  };

  //------------Forms-----------------

  const documentsForm = useForm<documentsFormType>({
    initialValues: {
      documentType: '',
      aadharNumber: '',
      panNumber: '',
      drivingLicenseNumber: '',
    },

    validate: {
      documentType: isNotEmpty('Please select document type'),
      aadharNumber: hasLength(12, 'Please enter valid aadhar card number'),
      panNumber: hasLength(10, 'Please enter valid pan card number'),
      drivingLicenseNumber: hasLength(15, 'Please enter valid driving licence number'),
    },
  });

  const verifyAadharForm = useForm<verifyAadharFormType>({
    initialValues: {
      linkedPhoneNo: '',
      otp: '',
    },

    validate: {
      linkedPhoneNo: (value) => validatePhoneNo(value),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const verifyPANForm = useForm<verifyPANFormType>({
    initialValues: {
      panNo: '',
      otp: '',
    },

    validate: {
      panNo: hasLength(10, 'Please eneter valid PAN number'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const verifyLicenceForm = useForm<verifyLicenceFormType>({
    initialValues: {
      licenceNo: '',
      otp: '',
    },
    validate: {
      licenceNo: hasLength(15, 'Please enter valide licence number'),
      otp: hasLength(6, 'OTP must be 6 digits'),
    },
  });

  const workExperienceForm = useForm<workExperienceFormType>({
    initialValues: {
      jobTitle: '',
      companyType: '',
      companyName: '',
      linkedInUrl: '',
      workEmail: '',
      companyId: '',
      startDate: null,
      endDate: null,
      workType: { modeOfWork: '', workType: '' },
    },

    validate: {
      jobTitle: isNotEmpty('Please enter your job title'),
      companyType: isNotEmpty('Please enter Company Type'),
      companyName: isNotEmpty('Please enter your company name'),
      linkedInUrl: isNotEmpty('Please enter LinkedIn Url'),
      workEmail: isEmail('Invalid email'),
      companyId: isNotEmpty('Please enter your company id'),
      startDate: isNotEmpty('Please enter start date'),
      endDate: isNotEmpty('Please enter end date'),
      workType: isNotEmpty('Enter valid work types'),
    },
  });

  const residentialInfoForm = useForm<residentialInfoFormType>({
    initialValues: {
      addressLineOne: '',
      addressLineTwo: '',
      landmark: '',
      city: '',
      pincode: null,
      typeOfAddress: '',
      stateCountry: { state: '', country: '' },
      startDate: null,
      endDate: null,
      currentLocation: null,
    },
    validate: {
      addressLineOne: isNotEmpty('Please enter valid address'),
      addressLineTwo: isNotEmpty('Please enter valid address'),
      city: isNotEmpty('Please enter valid address'),
      typeOfAddress: isNotEmpty('Please enter the address type'),
      pincode: hasLength(6, 'Please enter valid pincode'),
      stateCountry: isNotEmpty('Please enter your state/country'),
      startDate: isNotEmpty('Please enter start date'),
      endDate: isNotEmpty('Please enter end date'),
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

  //------------------------------API CALLS----------------------------------------

  const token = localStorage.getItem('auth-tokens');
  const authTokens = token ? JSON.parse(token) : null;
  const [isLoading, setIsLoading] = useState(false);

  //------------------------------PROFILE/BIO----------------------------------------

  const [profileData, setProfileData] = useState<IUserProfile | null>(null);

  const getProfile = async () => {
    try {
      const res = await axios.get<IUserProfile>(profileAPIList.getMyProfile, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setProfileData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  //------------------------------DOCUMENTS----------------------------------------

  const [documentsData, setDocumentsData] = useState<IDocument[]>([]);

  // GET
  const getDocuments = async () => {
    try {
      const res = await axios.get(documentsAPIList.getDocuments, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setDocumentsData(res.data.documents);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // POST
  const addDocument = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }
    if (
      !documentsForm.validateField('userName').hasError &&
      !documentsForm.validateField('documentType').hasError
    ) {
      if (
        documentsForm.values.documentType === 'AADHAR' &&
        !documentsForm.validateField('aadharNumber').hasError
      ) {
        try {
          setIsLoading(true);
          documentsForm.clearErrors();
          const res = await axios.post(
            documentsAPIList.postDocuments,
            {
              document_type: documentsForm.values.documentType,
              document_number: documentsForm.values.aadharNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${authTokens?.accessToken}`,
              },
            }
          );
          if (res.data) {
            setTimeout(() => {
              notifications.update({
                id: 'load-state',
                title: 'Sucess!',
                message: 'Aadhar added successfully',
                autoClose: 2200,
                withCloseButton: false,
                color: 'teal',
                icon: <BsCheckLg />,
                sx: { borderRadius: em(8) },
              });
            }, 1100);
          }
        } catch (error: any) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (
        documentsForm.values.documentType === 'PAN' &&
        !documentsForm.validateField('panNumber').hasError
      ) {
        try {
          documentsForm.clearErrors();
          const res = await axios.post(
            documentsAPIList.postDocuments,
            {
              document_type: documentsForm.values.documentType,
              document_number: documentsForm.values.panNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${authTokens?.accessToken}`,
              },
            }
          );

          if (res.data) {
            setTimeout(() => {
              notifications.update({
                id: 'load-state',
                title: 'Sucess!',
                message: 'Pan Card added successfully',
                autoClose: 2200,
                withCloseButton: false,
                color: 'teal',
                icon: <BsCheckLg />,
                sx: { borderRadius: em(8) },
              });
            }, 1100);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
      if (
        documentsForm.values.documentType === 'DRIVING_LICENSE' &&
        !documentsForm.validateField('drivingLicenseNumber').hasError
      ) {
        try {
          documentsForm.clearErrors();
          const res = await axios.post(
            documentsAPIList.postDocuments,
            {
              document_type: documentsForm.values.documentType,
              document_number: documentsForm.values.drivingLicenseNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${authTokens?.accessToken}`,
              },
            }
          );
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };

  //------------------------------WORK EXPERIENCE----------------------------------------

  const [workExperienceData, setWorkExperienceData] = useState<IWorkExperience[]>([]);

  // GET
  const getWorkExperience = async () => {
    try {
      const res = await axios.get(workExperienceAPiList.getWorkExperience, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setWorkExperienceData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // POST
  const addWorkExperience = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }
    if (
      !workExperienceForm.validateField('jobTitle').hasError &&
      !workExperienceForm.validateField('companyName').hasError &&
      !workExperienceForm.validateField('companyType').hasError &&
      !workExperienceForm.validateField('companyId').hasError &&
      !workExperienceForm.validateField('workEmail').hasError &&
      !workExperienceForm.validateField('companyId').hasError &&
      !workExperienceForm.validateField('startDate').hasError &&
      !workExperienceForm.validateField('linkedInUrl').hasError &&
      !workExperienceForm.validateField('workType').hasError
    ) {
      try {
        setIsLoading(true);
        workExperienceForm.clearErrors();
        const res = await axios.post(
          workExperienceAPiList.postWorkExperience,
          {
            designation: workExperienceForm.values.jobTitle,
            companyType: workExperienceForm.values.companyType,
            email: workExperienceForm.values.workEmail,
            workMode: workExperienceForm.values.workType.modeOfWork,
            workType: workExperienceForm.values.workType.workType,
            companyName: workExperienceForm.values.companyName,
            companyId: workExperienceForm.values.companyId,
            companyStartDate: workExperienceForm.values.startDate,
            companyEndDate: workExperienceForm.values.endDate,
            user: 'GRN788209',
            isVerified: false,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        );

        if (res.data) {
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'Experience added successfully',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);
          workExperienceForm.setFieldValue('jobTitle', '');
          workExperienceForm.setFieldValue('companyName', '');
          workExperienceForm.setFieldValue('companyType', '');
          workExperienceForm.setFieldValue('companyId', '');
          workExperienceForm.setFieldValue('linkedInUrl', '');
          workExperienceForm.setFieldValue('workEmail', '');
          workExperienceForm.setFieldValue('companyId', '');
          workExperienceForm.setFieldValue('startDate', null);
          workExperienceForm.setFieldValue('endDate', null);
          getWorkExperience();
        }
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // DELETE
  const deleteWorkExperience = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios
        .delete(`${workExperienceAPiList.deleteWorkExperience}/${id}`, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
        .then(() => {
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'Experience deleted!',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);
          getWorkExperience();
          setIsLoading(false);
        });
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PATCH
  const updateWorkExperience = async (id: string) => {
    try {
      const res = await axios
        .patch(
          `${workExperienceAPiList.updateWorkExperience}/${id}`,
          {
            designation: workExperienceForm.values.jobTitle,
            email: workExperienceForm.values.workEmail,
            workMode: workExperienceForm.values.workType.modeOfWork,
            workType: workExperienceForm.values.workType.workType,
            companyName: workExperienceForm.values.companyName,
            companyId: workExperienceForm.values.companyId,
            companyStartDate: workExperienceForm.values.startDate,
            companyEndDate: workExperienceForm.values.endDate,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'Experience updated!',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);
          workExperienceForm.setFieldValue('jobTitle', '');
          workExperienceForm.setFieldValue('companyName', '');
          workExperienceForm.setFieldValue('workEmail', '');
          workExperienceForm.setFieldValue('companyId', '');
          workExperienceForm.setFieldValue('startDate', null);
          workExperienceForm.setFieldValue('endDate', null);
          getWorkExperience();
          setIsLoading(false);
        });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //------------------------------RESIDENTIAL INFO----------------------------------------

  const [residentialInfoData, setResidentialInfoData] = useState<IResidendialInfoDataType[]>([]);
  // GET
  const getResidentialInfo = async () => {
    try {
      const res = await axios.get(residentialInfoAPIList.getResidentialInfo, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      if (res.data && authTokens?.accessToken) {
        setResidentialInfoData(res.data.residentialInfo);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // POST
  const validateFormFields = (requiredField: string[]) => {
    const listLength = requiredField.length;

    for (let i = 0; i < listLength; i++) {
      residentialInfoForm.validateField(requiredField[i]);
    }

    for (let i = 0; i < listLength; i++) {
      if (residentialInfoForm.validateField(requiredField[i]).hasError) return false;
    }

    return true;
  };

  const addResidentialInfo = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }

    const requiredField = [
      'address',
      'pincode',
      'stateCountry',
      'startDate',
      'endDate',
      'currentLocation',
    ];

    if (!validateFormFields(requiredField)) return;

    try {
      residentialInfoForm.clearErrors();
      notifications.show({
        id: 'load-data',
        title: 'Please wait !',
        message: 'We are updating your residential information.',
        loading: true,
        autoClose: false,
        withCloseButton: false,
        color: 'teal',
        sx: { borderRadius: em(8) },
      });

      const res = await axios.post(
        residentialInfoAPIList.postResidentialInfo,
        {
          address_line_1: residentialInfoForm.values.addressLineOne,
          address_line_2: residentialInfoForm.values.addressLineTwo,
          landmark: residentialInfoForm.values.landmark,
          pincode: residentialInfoForm.values.pincode,
          city: residentialInfoForm.values.city,
          state: residentialInfoForm.values.stateCountry.state,
          country: residentialInfoForm.values.stateCountry.country,
          start_date: residentialInfoForm.values.startDate,
          end_date: residentialInfoForm.values.endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );
      if (res.data) {
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'Residential information updated successfully.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });
        getResidentialInfo();
      }
    } catch (err: any) {
      console.error('Error in posting residential information: ', err.message);

      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: 'Error !',
        message: 'Something went wrong! Please check browser console for more info.',
        icon: <FaExclamation />,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteResidentialInfo = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios
        .delete(`${residentialInfoAPIList.deleteResidentialInfo}/${id}`, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
        .then(() =>
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'Residential information deleted!',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100)
        );
      getResidentialInfo();
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PATCH
  const updateResidentialInfo = async (id: string) => {
    try {
      const res = await axios
        .patch(
          `${residentialInfoAPIList.updateResidentialInfo}/${id}`,
          residentialInfoForm.values,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'Residential information updated!',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);
          getResidentialInfo();
          setIsLoading(false);
        });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //------------------------------SKILLS----------------------------------------

  const [skillData, setSkillData] = useState<ISkillDataType[]>([]);
  // GET
  const getSkills = async () => {
    try {
      const res = await axios.get(skillsAPIList.getSkill, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      if (res.data && authTokens?.accessToken) {
        setSkillData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // POST
  const addSkill = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }

    skillForm.validateField('skillName');
    if (skillForm.validateField('skillName').hasError) {
      return;
    }

    setIsLoading(true);
    try {
      notifications.show({
        id: 'load-data',
        title: 'Please wait !',
        message: 'We are adding your skill.',
        loading: true,
        autoClose: false,
        withCloseButton: false,
        color: 'teal',
        sx: { borderRadius: em(8) },
      });

      const res = await axios.post(
        skillsAPIList.postSkill,
        {
          designation: skillForm.values.skillName,
          isVerified: 0,
          skillRate: skillForm.values.expertise,
          user: 'GRN788209',
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );

      if (res.data) {
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'New skill added to your profile.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });

        skillForm.setFieldValue('skillName', '');
        skillForm.setFieldValue('expertise', '');
        getSkills();
      }
    } catch (err: any) {
      console.error('Error in posting skill: ', err);

      notifications.update({
        id: 'load-data',
        color: 'teal',
        title: 'Error !',
        message: 'Something went wrong! Please check browser console for more info.',
        icon: <FaExclamation />,
        autoClose: 2000,
      });
      getSkills();
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE
  const deleteSkill = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios
        .delete(`${skillsAPIList.deleteSkill}/${id}`, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
        .then(() =>
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'Skill deleted!',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100)
        );
      getSkills();
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PATCH
  const updateSkill = async (id: string) => {
    try {
      const res = await axios
        .patch(
          `${skillsAPIList.updateSkill}/${id}`,
          {
            designation: skillForm.values.skillName,
            skillRate: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          }
        )
        .then(() => {
          setTimeout(() => {
            notifications.update({
              id: 'load-state',
              title: 'Sucess!',
              message: 'skill updated!',
              autoClose: 2200,
              withCloseButton: false,
              color: 'teal',
              icon: <BsCheckLg />,
              sx: { borderRadius: em(8) },
            });
          }, 1100);
          getSkills();
          setIsLoading(false);
        });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //------------------Details Page States--------------------------------

  const detailsPageReducer = (
    state: DetailsPageState,
    action: DetailsPageAction
  ): DetailsPageState => {
    switch (action.type) {
      case 'SET_SEE_ALL_WORKEXPERIENCE':
        return { ...state, seeAllWorkExperience: action.payload };
      case 'SET_SEE_ALL_RESIDENTIALINFO':
        return { ...state, seeAllResidentialInfo: action.payload };
      case 'SET_SEE_ALL_SKILLS':
        return { ...state, seeAllSkills: action.payload };
      case 'SET_SEE_AADHAR_CARD':
        return { ...state, seeAadharCard: action.payload };
      case 'SET_SEE_PAN_CARD':
        return { ...state, seePanCard: action.payload };
      case 'SET_SEE_DRIVER_LICENCE':
        return { ...state, seeDrivingLicence: action.payload };
      default:
        return state;
    }
  };

  const [detailsPage, dispatchDetailsPage] = useReducer(detailsPageReducer, {
    seeAllWorkExperience: false,
    seeAllResidentialInfo: false,
    seeAllSkills: false,
    seeAadharCard: false,
    seePanCard: false,
    seeDrivingLicence: false,
  });

  useEffect(() => {
    if (authTokens) {
      getProfile();
      // getDocuments();
      getWorkExperience();
      getSkills();
      getResidentialInfo();
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        documentsData,
        workExperienceData,
        residentialInfoData,
        skillData,
        addDocument,
        addWorkExperience,
        addResidentialInfo,
        addSkill,
        deleteWorkExperience,
        deleteResidentialInfo,
        deleteSkill,
        updateWorkExperience,
        updateResidentialInfo,
        updateSkill,
        documentsForm,
        verifyAadharForm,
        verifyPANForm,
        verifyLicenceForm,
        workExperienceForm,
        residentialInfoForm,
        skillForm,
        forceRender,
        setForceRender,
        authTokens,
        detailsPage,
        dispatchDetailsPage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
