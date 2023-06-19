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
  profileData: IUserProfile;
  profileForm: UseFormReturnType<profileFormType>;
  updateProfile: (id: string) => void;
  documentsData: IDocument[];
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
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getDocuments: () => void;
};

interface IDocument {
  id_type: string;
  isVerified: boolean;
}

interface IUserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
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
  typeOfAddress: string;
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

type profileFormType = {
  [key: string]: string | string[];
  firstName: string;
  lastName: string;
  bio: string;
  descriptionTags: string[];
};

type documentsFormType = {
  documentType: string;
  aadharNumber: string;
  panNumber: string;
  drivingLicenseNumber: string;
};

type verifyAadharFormType = {
  aadharNo: string;
  otp: string;
};
type verifyPANFormType = {
  panNo: string;
};
type verifyLicenceFormType = {
  licenceNo: string;
};

type workExperienceFormType = {
  [key: string]: string | Date | null;
  designation: string;
  companyType: string;
  companyName: string;
  linkedInUrl: string;
  workEmail: string;
  companyId: string;
  startDate: Date | null;
  endDate: Date | null;
  workType: string;
  modeOfWork: string;
};

type residentialInfoFormType = {
  [key: string]: string | number | Date | null;
  address_line_1: string;
  address_line_2: string;
  landmark: string;
  city: string;
  pincode: number | null;
  typeOfAddress: string;
  state: string;
  country: '';
  start_date: Date | null;
  endDate: Date | null;
};

type skillFormType = {
  [key: string]: string | null;
  designation: string;
  skillRate: string;
};

type DetailsPageState = {
  seeAllWorkExperience: boolean;
  seeAllResidentialInfo: boolean;
  seeAllSkills: boolean;
  seeAadharCard: boolean;
  seePanCard: boolean;
  seeDrivingLicence: boolean;
  seeCongratulations: boolean;
};

type DetailsPageAction =
  | { type: 'SET_SEE_ALL_WORKEXPERIENCE'; payload: boolean }
  | { type: 'SET_SEE_ALL_RESIDENTIALINFO'; payload: boolean }
  | { type: 'SET_SEE_ALL_SKILLS'; payload: boolean }
  | { type: 'SET_SEE_AADHAR_CARD'; payload: boolean }
  | { type: 'SET_SEE_PAN_CARD'; payload: boolean }
  | { type: 'SET_SEE_DRIVER_LICENCE'; payload: boolean }
  | { type: 'SET_SEE_CONGRATULATIONS_SCREEN'; payload: boolean };

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(false);

  //------------Forms-----------------

  const profileForm = useForm<profileFormType>({
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
    },
    validate: {
      licenceNo: hasLength(15, 'Please enter valide licence number'),
    },
  });

  const workExperienceForm = useForm<workExperienceFormType>({
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
      endDate: isNotEmpty('Please enter end date'),
      workType: isNotEmpty('Enter valid work types'),
      modeOfWork: isNotEmpty('Please provide mode of work'),
    },
  });

  const residentialInfoForm = useForm<residentialInfoFormType>({
    initialValues: {
      address_line_1: '',
      address_line_2: '',
      landmark: '',
      city: '',
      pincode: null,
      typeOfAddress: '',
      state: '',
      country: '',
      start_date: null,
      endDate: null,
      currentLocation: null,
    },
    validate: {
      address_line_1: isNotEmpty('Please enter valid address'),
      address_line_2: isNotEmpty('Please enter valid address'),
      city: isNotEmpty('Please enter valid address'),
      typeOfAddress: isNotEmpty('Please enter the address type'),
      pincode: hasLength(6, 'Please enter valid pincode'),
      state: isNotEmpty('Please enter your state/country'),
      start_date: isNotEmpty('Please enter start date'),
      country: isNotEmpty('Please enter your country'),
      endDate: isNotEmpty('Please enter end date'),
    },
  });

  const skillForm = useForm<skillFormType>({
    initialValues: {
      designation: '',
      skillRate: '',
    },

    validate: {
      designation: isNotEmpty('Please enter your skill'),
      skillRate: isNotEmpty('Please enter your expertise'),
    },
  });

  //------------------------------API CALLS----------------------------------------

  const token = localStorage.getItem('auth-tokens');
  const authTokens = token ? JSON.parse(token) : null;
  const [isLoading, setIsLoading] = useState(false);

  //------------------------------PROFILE/BIO----------------------------------------

  const [profileData, setProfileData] = useState<IUserProfile>({
    firstName: '',
    lastName: '',
    bio: '',
    descriptionTags: [],
    _id: '',
  });

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

  const updateProfile = async (id: string) => {
    try {
      const requestData: any = {};
      if (profileForm.values.firstName !== '') {
        requestData.firstName = profileForm.values.firstName;
      }
      if (profileForm.values.lastName !== '') {
        requestData.lastName = profileForm.values.lastName;
      }
      if (profileForm.values.bio !== '') {
        requestData.bio = profileForm.values.bio;
      }
      if (profileForm.values.descriptionTags.length === 3) {
        requestData.descriptionTags = profileForm.values.descriptionTags;
      }
      const res = await axios
        .patch(`${profileAPIList.updateProfile}/${id}`, requestData, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
        .then(() => {
          getProfile();
        });
    } catch (error: any) {
      console.log(error.message);
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
        setDocumentsData(res.data.ids);
      }
    } catch (err: any) {
      console.log(err.message);
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
      !workExperienceForm.validateField('designation').hasError &&
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
            designation: workExperienceForm.values.designation,
            companyType: workExperienceForm.values.companyType,
            email: workExperienceForm.values.workEmail,
            workMode: workExperienceForm.values.modeOfWork,
            workType: workExperienceForm.values.workType,
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
      const data = workExperienceForm.values;
      const filteredData: any = {};
      for (const key in data) {
        const value = data[key];
        if (value !== '' && value !== null) {
          filteredData[key] = value;
        }
      }
      const res = await axios
        .patch(`${workExperienceAPiList.updateWorkExperience}/${id}`, filteredData, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
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
      'address_line_1',
      'address_line_2',
      'landmark',
      'city',
      'pincode',
      'typeOfAddress',
      'state',
      ' country',
      'start_date',
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
          address_line_1: residentialInfoForm.values.address_line_1,
          address_line_2: residentialInfoForm.values.address_line_2,
          landmark: residentialInfoForm.values.landmark,
          pincode: residentialInfoForm.values.pincode,
          city: residentialInfoForm.values.city,
          state: residentialInfoForm.values.state,
          country: residentialInfoForm.values.country,
          start_date: residentialInfoForm.values.start_date,
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
      const data = residentialInfoForm.values;
      const filteredData: any = {};
      for (const key in data) {
        const value = data[key];
        if (value !== '' && value !== null) {
          filteredData[key] = value;
        }
      }

      const res = await axios
        .patch(`${residentialInfoAPIList.updateResidentialInfo}/${id}`, filteredData, {
          headers: {
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
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

    skillForm.validateField('designation');
    if (
      skillForm.validateField('designation').hasError &&
      skillForm.validateField('skillRate').hasError
    ) {
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
          designation: skillForm.values.designation,
          isVerified: false,
          skillRate: parseInt(skillForm.values.skillRate, 10),
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

        skillForm.setFieldValue('designation', '');
        skillForm.setFieldValue('skillRate', '');
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
      const requestData: any = {};

      if (skillForm.values.designation !== '') {
        requestData.designation = skillForm.values.designation;
      }
      if (skillForm.values.skillRate !== '') {
        requestData.skillRate = parseInt(skillForm.values.skillRate);
      }
      const res = await axios.patch(`${skillsAPIList.updateSkill}/${id}`, requestData, {
        headers: {
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });

      getSkills();
      setIsLoading(false);
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
      case 'SET_SEE_CONGRATULATIONS_SCREEN':
        return { ...state, seeCongratulations: action.payload };
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
    seeCongratulations: false,
  });

  useEffect(() => {
    if (authTokens) {
      getProfile();
      getDocuments();
      getWorkExperience();
      getSkills();
      getResidentialInfo();
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        setIsLoading,
        profileData,
        profileForm,
        updateProfile,
        documentsData,
        workExperienceData,
        residentialInfoData,
        skillData,
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
        getDocuments,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
