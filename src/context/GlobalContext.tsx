import React, { createContext, useContext, useState, useEffect } from 'react';
import { createStyles, rem, em } from '@mantine/core';
import { AuthClient } from '../utils/generic/authClinet';
import {
  skillsAPIList,
  profileAPIList,
  documentsAPIList,
  workExperienceAPiList,
  residentialInfoAPIList,
} from '../assets/api/ApiList';
import { HttpClient } from '../utils/generic/httpClient';
import { useProfileForms } from '../components/candidate/profile/context/ProfileForms';

import {
  showErrorNotification,
  showLoadingNotification,
  showSuccessNotification,
} from '../utils/functions/showNotification';

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [forceRender, setForceRender] = useState<boolean>(true);
  const authClient = AuthClient.getInstance();

  const {
    profileForm,
    verifyAadharForm,
    verifyPANForm,
    verifyLicenceForm,
    workExperienceForm,
    residentialInfoForm,
    skillForm,
    residentialInfoVerificationForm,
    peerAddressVerificationForm,
  } = useProfileForms();

  const inputStyles: InputStylesType = createStyles(() => ({
    root: {
      position: 'relative',
      marginBottom: '24px',
      marginTop: '24px',
    },

    input: {
      width: '458px',
      height: '68px',
      paddingTop: '18px',
      fontSize: '16px',
      fontWeight: 500,
      borderRadius: '8px',
      border: '1px solid #D1D4DB',
      lineHeight: '19px',
      letterSpacing: '-0.02em',
      color: '#697082',

      [`@media screen and (max-width: ${em(1024)})`]: {
        width: '350px',
        height: '46px',
        borderRadius: '6px',
        fontSize: '10px',
        lineHeight: '12px',
        margin: '0 auto',
      },
    },

    innerInput: {
      height: rem(54),
      paddingTop: rem(28),

      [`@media screen and (max-width: ${em(1024)})`]: {
        paddingTop: rem(8),
      },
    },

    passwordInput: {
      '& input': {
        color: '#697082',
      },
    },

    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      paddingLeft: '14px',
      paddingTop: '7px',
      lineHeight: '14.52px',
      letterSpacing: '-0.02em',
      zIndex: 1,
      color: '#697082',

      [`@media screen and (max-width: ${em(1024)})`]: {
        fontSize: '10px',
        lineHeight: '10px',
        paddingTop: '8px',
      },
    },
  }));

  const OtpInputStyles: OtpInputStylesType = createStyles(() => ({
    root: {
      position: 'relative',
      marginBlock: '24px',
    },

    input: {
      width: '458px',
      height: '68px',
      fontSize: '16px',
      fontWeight: 500,
      borderRadius: '8px',
      border: '1px solid #D1D4DB',
      lineHeight: '19px',
      letterSpacing: '24px',
      color: '#697082',

      [`@media screen and (max-width: ${em(1024)})`]: {
        width: '350px',
        height: '46px',
        borderRadius: '6px',
        fontSize: '14px',
        lineHeight: '12px',
        margin: '0 auto',
      },
    },
  }));

  //-----------------------------------------------------------------------

  const [IDs, setIDs] = useState<DocsType[]>([]);

  const getIDs = async () => {
    const res = await HttpClient.callApiAuth<DocumentsResponse>(
      {
        url: `${documentsAPIList.getDocuments}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setIDs(res.value.ids);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //----------------------------------------------------------------------

  const [profileData, setProfileData] = useState<UserProfileType>({
    firstName: '',
    lastName: '',
    bio: '',
    descriptionTags: [],
    id: '',
    profilePic: '',
    greenieId: '',
  });

  const getProfile = async () => {
    const res = await HttpClient.callApiAuth<UserProfileType>(
      {
        url: `${profileAPIList.getMyProfile}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setProfileData(res.value);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const updateProfile = async () => {
    showLoadingNotification({
      title: 'Loading !',
      message: 'We are updating your profile.',
    });

    const requestData: updateProfileRequestBody = {};
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

    const res = await HttpClient.callApiAuth<UpdateResponse>(
      {
        url: `${profileAPIList.updateProfile}`,
        method: 'PATCH',
        body: requestData,
      },
      authClient
    );

    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'Your profile have been updated',
      });
    } else {
      showErrorNotification(res.error.code);
    }

    getProfile();
    profileForm.setFieldValue('firstName', '');
    profileForm.setFieldValue('lastName', '');
    profileForm.setFieldValue('bio', '');
  };

  //--------------------------------------------------------------------

  const [workExperienceData, setWorkExperienceData] = useState<WorkExperience[]>([]);

  const getWorkExperience = async () => {
    const res = await HttpClient.callApiAuth<workExperienceResponse>(
      {
        url: `${workExperienceAPiList.getWorkExperience}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setWorkExperienceData(res.value.workExperiences);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const deleteWorkExperience = async (id: string) => {
    showLoadingNotification({ title: 'Please wait !', message: 'Wait while we delete your Work Experience' });
    const res = await HttpClient.callApiAuth(
      {
        url: `${workExperienceAPiList.deleteWorkExperience}/${id}`,
        method: 'DELETE',
      },
      authClient
    );
    if (res.ok) {
      setForceRender(!forceRender);
      showSuccessNotification({ title: 'Success !', message: 'Work Experience deleted successfully' });
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //----------------------------------------------------------------------

  const [residentialInfoData, setResidentialInfoData] = useState<ResidentialInfoResponse[]>([]);

  const getResidentialInfo = async () => {
    const res = await HttpClient.callApiAuth<ResidentialInfoRes>(
      {
        url: `${residentialInfoAPIList.getResidentialInfo}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setResidentialInfoData(res.value.residentialInfo.residentialInfos);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  const deleteResidentialInfo = async (id: string) => {
    showLoadingNotification({
      title: 'Wait !',
      message: 'Please wait while we delete your residential information.',
    });

    const res = await HttpClient.callApiAuth<DeleteResponse>(
      {
        url: `${residentialInfoAPIList.deleteResidentialInfo}/${id}`,
        method: 'DELETE',
      },
      authClient
    );

    if (res.ok) {
      showSuccessNotification({
        title: 'Success !',
        message: 'Your residential information have been deleted.',
      });

      getResidentialInfo();
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //----------------------------------------------------------

  const [skillData, setSkillData] = useState<SkillResponse[]>([]);

  const getSkills = async () => {
    const res = await HttpClient.callApiAuth<{ skills: SkillResponse[] }>(
      {
        url: `${skillsAPIList.getSkill}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setSkillData(res.value.skills);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  //--------------------------------------------------------

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const authTokens = authClient.getAccessToken();

  useEffect(() => {
    if (authTokens) {
      getProfile();
      getIDs();
      getWorkExperience();
      getSkills();
      getResidentialInfo();
    }
  }, [forceRender]);

  return (
    <GlobalContext.Provider
      value={{
        forceRender,
        setForceRender,
        authClient,
        inputStyles,
        OtpInputStyles,
        scrollToTop,
        verifyAadharForm,
        verifyPANForm,
        verifyLicenceForm,
        profileForm,
        workExperienceForm,
        residentialInfoForm,
        skillForm,
        residentialInfoVerificationForm,
        peerAddressVerificationForm,
        IDs,
        profileData,
        updateProfile,
        workExperienceData,
        residentialInfoData,
        skillData,
        getWorkExperience,
        getResidentialInfo,
        deleteWorkExperience,
        deleteResidentialInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
