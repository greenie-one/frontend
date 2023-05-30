// ---------------Import Statements--------------
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { em } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';
import { notifications } from '@mantine/notifications';
import { BsCheckLg } from 'react-icons/bs';

// ----------------Types-------------------------

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type ProfileContextType = {
  profileData: UserProfile | null;
  documentsData: Document[];
  addDocument: () => void;
  workExperienceData: WorkExperience[];
  addWorkExperience: () => void;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  skillForm: UseFormReturnType<skillFormType>;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authTokens: AuthTokens;
};

enum DocumentType {
  AadharCard = 'Aadhar Card',
  PanCard = 'Pan Card',
}

interface Document {
  documentType: DocumentType;
  documentNumber: string;
  isVerified: boolean;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  descriptionTags: string[];
}

interface WorkExperience {
  image: string | null;
  designation: string;
  email: string;
  companyName: string;
  companyId: string;
  isVerified: boolean;
  description: string;
  companyStartYear: string;
  companyEndYear: string;
  verifiedBy: string | null;
}

type documentsFormType = {
  userName: string;
  documentType: DocumentType | null;
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
      documentType: null,
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

  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  //------------------------------PROFILE/BIO----------------------------------------

  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  const getProfile = async () => {
    try {
      const res = await axios.get<UserProfile>(ApiList.getMyProfile, {
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

  const [documentsData, setDocumentsData] = useState<Document[]>([]);

  const getDocuments = async () => {
    try {
      const res = await axios.get(ApiList.documents, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        setDocumentsData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const addDocument = async () => {
    if (
      !documentsForm.validateField('userName').hasError &&
      !documentsForm.validateField('documentType').hasError
    ) {
      if (
        documentsForm.values.documentType === 'Aadhar Card' &&
        !documentsForm.validateField('aadharNumber').hasError
      ) {
        try {
          documentsForm.clearErrors();
          const res = await axios.post(ApiList.postDocuments, {
            userName: documentsForm.values.userName,
            document_type: documentsForm.values.documentType,
            document_number: documentsForm.values.aadharNumber,
          });

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
        }
      }
      if (
        documentsForm.values.documentType === 'Pan Card' &&
        !documentsForm.validateField('panNumber').hasError
      ) {
        try {
          documentsForm.clearErrors();
          const res = await axios.post(ApiList.postDocuments, {
            userName: documentsForm.values.userName,
            document_type: documentsForm.values.documentType,
            document_number: documentsForm.values.panNumber,
          });

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

  const [workExperienceData, setWorkExperienceData] = useState<WorkExperience[]>([]);

  const getWorkExperience = async () => {
    try {
      const res = await axios.get(ApiList.workExperience, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        console.log(res.data);
        setWorkExperienceData(res.data);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const addWorkExperience = async () => {
    if (
      !workExperienceForm.validateField('jobTitle').hasError &&
      !workExperienceForm.validateField('companyName').hasError &&
      !workExperienceForm.validateField('workEmail').hasError &&
      !workExperienceForm.validateField('companyId').hasError &&
      !workExperienceForm.validateField('startDate').hasError &&
      !workExperienceForm.validateField('endDate').hasError
    ) {
      try {
        workExperienceForm.clearErrors();
        const res = await axios.post(ApiList.postWorkExperience, {
          designation: workExperienceForm.values.jobTitle,
          companyName: workExperienceForm.values.companyName,
          isVerified: false,
          companyStartYear: workExperienceForm.values.startDate.startYear,
          companyEndYear: workExperienceForm.values.endDate.endYear,
        });

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
      }
    }
  };

  //------------------------------RESIDENTIAL INFO----------------------------------------

  const getResidentialInfo = async () => {
    try {
      const res = await axios.get(ApiList.residentialInfo, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  //------------------------------SKILLS----------------------------------------
  const getSkills = async () => {
    console.log('Auth token: ', authTokens);

    try {
      const res = await axios.get(ApiList.skill, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      if (res.data && authTokens?.accessToken) {
        console.log(res.data);
        // dispatch({ type: 'SET_SKILLS', payload: res.data });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    getDocuments();
    getWorkExperience();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        documentsData,
        addDocument,
        workExperienceData,
        addWorkExperience,
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
