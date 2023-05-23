import React, { createContext, useContext, useReducer } from 'react';
import { useForm, UseFormReturnType, isNotEmpty, isEmail, hasLength } from '@mantine/form';

// ----------------Types-------------------------
type ProfileContextType = {
  workExperienceForm: UseFormReturnType<workExperienceFormType>;
  residentialInfoForm: UseFormReturnType<residentialInfoFormType>;
  skillForm: UseFormReturnType<skillFormType>;
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
  return (
    <ProfileContext.Provider value={{ workExperienceForm, residentialInfoForm, skillForm }}>
      {children}
    </ProfileContext.Provider>
  );
};
