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
  state: dataState;
  dispatch: React.Dispatch<dataAction>;
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  skillForm: UseFormReturnType<skillFormType>;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  authTokens: AuthTokens;
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

interface dataState {
  documents: Array<Object>;
  workExperienceData: Array<Object>;
  residentialInfoData: Array<Object>;
  skillsData: Array<Object>;
}

type dataAction =
  | { type: 'SET_DOCUMENTS'; payload: Array<Object> }
  | { type: 'SET_WORKEXPERIENCE'; payload: Array<Object> }
  | { type: 'SET_RESIDENTIALINFO'; payload: Array<Object> }
  | { type: 'SET_SKILLS'; payload: Array<Object> };

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

  function dataReducer(state: dataState, action: dataAction): dataState {
    switch (action.type) {
      case 'SET_DOCUMENTS':
        return { ...state, documents: action.payload };
      case 'SET_WORKEXPERIENCE':
        return { ...state, workExperienceData: action.payload };
      case 'SET_RESIDENTIALINFO':
        return { ...state, residentialInfoData: action.payload };
      case 'SET_SKILLS':
        return { ...state, skillsData: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(dataReducer, {
    documents: [],
    workExperienceData: [],
    residentialInfoData: [],
    skillsData: [],
  });

  const [authTokens, setAuthTokens] = useLocalStorage<AuthTokens>({ key: 'auth-tokens' });

  const getDocuments = async () => {
    try {
      const res = await axios.get(ApiList.documents, {
        headers: {
          Authorization: `Bearer${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        console.log(res.data);
        // dispatch({ type: 'SET_DOCUMENTS', payload: res.data });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getWorkExperience = async () => {
    try {
      const res = await axios.get(ApiList.workExperience, {
        headers: {
          Authorization: `Bearer${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        console.log(res.data);
        // dispatch({ type: 'SET_WORKEXPERIENCE', payload: res.data });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getResidentialInfo = async () => {
    try {
      const res = await axios.get(ApiList.residentialInfo, {
        headers: {
          Authorization: `Bearer${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        console.log(res.data);
        // dispatch({ type: 'SET_RESIDENTIALINFO', payload: res.data });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

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
        dispatch({ type: 'SET_SKILLS', payload: res.data });
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // useEffect(() => {
  //   const runGetRequests = async () => {
  //     await getSkills();
  //   };

  //   runGetRequests();
  // }, []);

  return (
    <ProfileContext.Provider
      value={{
        state,
        dispatch,
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
