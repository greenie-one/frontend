export type candidateActivePageState =
  | 'Profile'
  | 'All Experiences'
  | 'Add Experience'
  | 'Verify Aadhar Card'
  | 'Verify PAN Card'
  | 'Verify Licence'
  | 'All Residential Info'
  | 'All Skills'
  | 'Add Skills'
  | 'Congratulation Screen'
  | 'Verify Address';

export type DrawerState = {
  firstDrawerOpened: boolean;
  secondDrawerOpened: boolean;
};

export type DrawerAction =
  | { type: 'OPEN_FIRST_DRAWER' }
  | { type: 'CLOSE_FIRST_DRAWER' }
  | { type: 'OPEN_SECOND_DRAWER' }
  | { type: 'CLOSE_SECOND_DRAWER' };

export type ReviewStepState = {
  currentStep: number;
};

export type ReviewStepAction = { type: ReviewActionType };
