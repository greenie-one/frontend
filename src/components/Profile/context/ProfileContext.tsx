// ---------------Import Statements--------------
import React, { createContext, useContext, useState, useEffect, useReducer } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import ApiList from '../../../assets/api/ApiList';

// ----------------Types-------------------------

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type ProfileContextType = {
  activePageState: activePageState;
  activePageDispatch: React.Dispatch<activePageAction>;
  detailsState: detailsState;
  detailsDispatch: React.Dispatch<detailsAction>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  skillForm: UseFormReturnType<skillFormType>;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
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

interface activePageState {
  profilePage: boolean;
  docDepot: boolean;
  myVerification: boolean;
}

type activePageAction =
  | { type: 'SET_ACTIVE'; component: string }
  | { type: 'SET_INACTIVE'; component: string };

interface detailsState {
  workExperience: boolean;
  residentialInfo: boolean;
  skills: boolean;
}

type detailsAction =
  | { type: 'SET_ACTIVE'; component: string }
  | { type: 'SET_INACTIVE'; component: string };

const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(false);

  //------------Forms-----------------
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

  function activePageReducer(state: activePageState, action: activePageAction): activePageState {
    switch (action.type) {
      case 'SET_ACTIVE':
        return { ...state, [action.component]: true };
      case 'SET_INACTIVE':
        return { ...state, [action.component]: false };
      default:
        return state;
    }
  }

  const [activePageState, activePageDispatch] = useReducer(activePageReducer, {
    profilePage: false,
    docDepot: false,
    myVerification: false,
  });

  function detailsReducer(state: detailsState, action: detailsAction): detailsState {
    switch (action.type) {
      case 'SET_ACTIVE':
        return { ...state, [action.component]: true };
      default:
        return state;
    }
  }

  const [detailsState, detailsDispatch] = useReducer(detailsReducer, {
    workExperience: false,
    residentialInfo: false,
    skills: false,
  });

  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

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
  const getSkills = async () => {
    try {
      const res = await axios.get(ApiList.skill, {
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

  return (
    <ProfileContext.Provider
      value={{
        activePageState,
        activePageDispatch,
        detailsState,
        detailsDispatch,
        workExperienceForm,
        residentialInfoForm,
        skillForm,
        forceRender,
        setForceRender,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
