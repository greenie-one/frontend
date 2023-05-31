// ---------------Import Statements--------------
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { em } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';
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
  residentialInfoData: string[];
  skillData: ISkillDataType[];
  addWorkExperience: () => void;
  documentsForm: UseFormReturnType<documentsFormType>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  addResidentialInfo: () => void;
  skillForm: UseFormReturnType<skillFormType>;
  addSkill: () => void;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authTokens: AuthTokens;
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
  image: string | null;
  designation: string;
  email: string;
  companyName: string;
  companyId: string;
  isVerified: boolean;
  description: string;
  companyStartDate: string;
  companyEndDate: string;
  verifiedBy: string | null;
}

interface ISkillDataType {
  createdAt: string;
  designation: string;
  isVerified: boolean;
  skillRate: number;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}

type documentsFormType = {
  userName: string;
  documentType: string;
  aadharNumber: string;
  panNumber: string;
};

type workExperienceFormType = {
  jobTitle: string;
  companyName: string;
  workEmail: string;
  companyId: string;
  startDate: { startMonth: string; startYear: string };
  endDate: { endMonth: string; endYear: string };
  workType: { modeOfWork: string; workType: string };
};

type residentialInfoFormType = {
  address: { addressLineOne: string; addressLineTwo: string; landmark: string };
  pincode: number | null;
  stateCountry: { state: string; country: '' };
  startDate: { startMonth: string; startYear: string };
  endDate: { endMonth: string; endYear: string };
  currentLocation: number | null;
};

type skillFormType = {
  skillName: string;
  expertise: string;
};

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(false);

  //------------Forms-----------------

  const documentsForm = useForm<documentsFormType>({
    initialValues: {
      userName: '',
      documentType: '',
      aadharNumber: '',
      panNumber: '',
    },

    validate: {
      userName: isNotEmpty('Please enter your name'),
      documentType: isNotEmpty('Please select document type'),
      aadharNumber: hasLength(12, 'Please enter valid aadhar card number'),
      panNumber: hasLength(10, 'Please enter valid pan card number'),
    },
  });

  const workExperienceForm = useForm<workExperienceFormType>({
    initialValues: {
      jobTitle: '',
      companyName: '',
      workEmail: '',
      companyId: '',
      startDate: { startMonth: '', startYear: '' },
      endDate: { endMonth: '', endYear: '' },
      workType: { modeOfWork: '', workType: '' },
    },

    validate: {
      jobTitle: isNotEmpty('Enter your job title'),
      companyName: isNotEmpty('Enter your company name'),
      workEmail: isEmail('Invalid email'),
      companyId: isNotEmpty('Enter your company id'),
      startDate: isNotEmpty('Please enter start date'),
      endDate: isNotEmpty('Please enter end date'),
      workType: isNotEmpty('Enter valid work types'),
    },
  });

  const residentialInfoForm = useForm<residentialInfoFormType>({
    initialValues: {
      address: {
        addressLineOne: '',
        addressLineTwo: '',
        landmark: '',
      },

      pincode: null,
      stateCountry: { state: '', country: '' },
      startDate: { startMonth: '', startYear: '' },
      endDate: { endMonth: '', endYear: '' },
      currentLocation: null,
    },
    validate: {
      address: isNotEmpty('Enter valid address'),
      pincode: hasLength(6, 'Enter valid pincode'),
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

  // const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });
  const authTokens = JSON.parse(localStorage.getItem('auth-tokens'));
  const [isLoading, setIsLoading] = useState(false);

  //------------------------------PROFILE/BIO----------------------------------------

  const [profileData, setProfileData] = useState<IUserProfile | null>(null);

  const getProfile = async () => {
    try {
      const res = await axios.get<IUserProfile>(ApiList.getMyProfile, {
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

  const getDocuments = async () => {
    try {
      const res = await axios.get(ApiList.documents, {
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

  const addDocument = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }
    if (
      !documentsForm.validateField('userName').hasError &&
      !documentsForm.validateField('documentType').hasError
    ) {
      if (
        documentsForm.values.documentType === 'aadhar' &&
        !documentsForm.validateField('aadharNumber').hasError
      ) {
        try {
          setIsLoading(true);
          documentsForm.clearErrors();
          const res = await axios.post(
            ApiList.postDocuments,
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
        documentsForm.values.documentType === 'pan' &&
        !documentsForm.validateField('panNumber').hasError
      ) {
        try {
          documentsForm.clearErrors();
          const res = await axios.post(
            ApiList.postDocuments,
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
    }
  };

  //------------------------------WORK EXPERIENCE----------------------------------------

  const [workExperienceData, setWorkExperienceData] = useState<IWorkExperience[]>([]);

  const getWorkExperience = async () => {
    try {
      const res = await axios.get(ApiList.workExperience, {
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

  const addWorkExperience = async () => {
    if (isLoading) {
      return Promise.resolve(null);
    }
    if (
      !workExperienceForm.validateField('jobTitle').hasError &&
      !workExperienceForm.validateField('companyName').hasError &&
      !workExperienceForm.validateField('workEmail').hasError &&
      !workExperienceForm.validateField('companyId').hasError &&
      !workExperienceForm.validateField('startDate').hasError &&
      !workExperienceForm.validateField('endDate').hasError
    ) {
      try {
        setIsLoading(true);
        workExperienceForm.clearErrors();
        const res = await axios.post(
          ApiList.postWorkExperience,
          {
            designation: workExperienceForm.values.jobTitle,
            email: workExperienceForm.values.workEmail,
            workMode: workExperienceForm.values.workType.modeOfWork,
            workType: workExperienceForm.values.workType.workType,
            companyName: workExperienceForm.values.companyName,
            companyId: workExperienceForm.values.companyId,
            isVerified: false,
            companyStartDate: workExperienceForm.values.startDate.startYear,
            companyEndDate: workExperienceForm.values.endDate.endYear,
            user: 'GRN788209',
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
        }

        workExperienceForm.setFieldValue('jobTitle', '');
        workExperienceForm.setFieldValue('companyName', '');
        workExperienceForm.setFieldValue('workEmail', '');
        workExperienceForm.setFieldValue('companyId', '');
        workExperienceForm.setFieldValue('startDate', { startMonth: '', startYear: '' });
        workExperienceForm.setFieldValue('endDate', { endMonth: '', endYear: '' });
        getWorkExperience();
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  //------------------------------RESIDENTIAL INFO----------------------------------------

  const [residentialInfoData, setResidentialInfoData] = useState([]);
  const getResidentialInfo = async () => {
    try {
      const res = await axios.get(ApiList.residentialInfo, {
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

    const requestData = {
      address_line_1: residentialInfoForm.values.address.addressLineOne,
      address_line_2: residentialInfoForm.values.address.addressLineTwo,
      landmark: residentialInfoForm.values.address.landmark,
      pincode: residentialInfoForm.values.pincode,
      state: residentialInfoForm.values.stateCountry.state,
      country: residentialInfoForm.values.stateCountry.country,
      start_date: residentialInfoForm.values.startDate.startYear,
      end_date: residentialInfoForm.values.endDate.endYear,
      user: 'GRN788209',
    };

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

      const res = await axios.post(ApiList.postResidentialInfo, requestData, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      if (res.data) {
        notifications.update({
          id: 'load-data',
          color: 'teal',
          title: 'Success !',
          message: 'Residential information updated successfully.',
          icon: <BsCheckLg />,
          autoClose: 2000,
        });
      }
      getResidentialInfo();
    } catch (err: any) {
      console.error('Error in posting residential information: ', err);

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

  //------------------------------SKILLS----------------------------------------

  const [skillData, setSkillData] = useState<ISkillDataType[]>([]);
  const getSkills = async () => {
    try {
      const res = await axios.get(ApiList.skill, {
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
        ApiList.postSkill,
        {
          designation: skillForm.values.skillName,
          isVerified: false,
          skillRate: 0,
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

  useEffect(() => {
    getProfile();
    getDocuments();
    getWorkExperience();
    getSkills();
    getResidentialInfo();
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
        documentsForm,
        workExperienceForm,
        residentialInfoForm,
        skillForm,
        forceRender,
        setForceRender,
        authTokens,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
