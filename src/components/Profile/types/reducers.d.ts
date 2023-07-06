export type DetailsPageState = {
  seeAllWorkExperience: boolean;
  seeAllResidentialInfo: boolean;
  seeAllSkills: boolean;
  seeAadharCard: boolean;
  seePanCard: boolean;
  seeDrivingLicence: boolean;
  seeCongratulations: boolean;
  seeAddWorkExperience: boolean;
  seeAddSkills: boolean;
};

export type DetailsPageAction =
  | { type: 'SET_SEE_ALL_WORKEXPERIENCE'; payload: boolean }
  | { type: 'SET_SEE_ALL_RESIDENTIALINFO'; payload: boolean }
  | { type: 'SET_SEE_ALL_SKILLS'; payload: boolean }
  | { type: 'SET_SEE_AADHAR_CARD'; payload: boolean }
  | { type: 'SET_SEE_PAN_CARD'; payload: boolean }
  | { type: 'SET_SEE_DRIVER_LICENCE'; payload: boolean }
  | { type: 'SET_SEE_CONGRATULATIONS_SCREEN'; payload: boolean }
  | { type: 'SET_SEE_ADD_WORK_EXPERIENCE'; payload: boolean }
  | { type: 'SET_SEE_ADD_SKILLS'; payload: boolean };

export type DrawerState = {
  firstDrawerOpened: boolean;
  secondDrawerOpened: boolean;
};

export type DrawerAction =
  | { type: 'OPEN_FIRST_DRAWER' }
  | { type: 'CLOSE_FIRST_DRAWER' }
  | { type: 'OPEN_SECOND_DRAWER' }
  | { type: 'CLOSE_SECOND_DRAWER' };
