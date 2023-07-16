type candidateActivePageState =
  | 'Profile'
  | 'All Experiences'
  | 'Add Experience'
  | 'Verify Aadhar Card'
  | 'Verify PAN Card'
  | 'Verify Licence'
  | 'Add Address'
  | 'All Residential Info'
  | 'All Skills'
  | 'Add Skills'
  | 'Congratulation Screen'
  | 'Verify Address';

type DrawerState = {
  firstDrawerOpened: boolean;
  secondDrawerOpened: boolean;
};

type DrawerAction =
  | { type: 'OPEN_FIRST_DRAWER' }
  | { type: 'CLOSE_FIRST_DRAWER' }
  | { type: 'OPEN_SECOND_DRAWER' }
  | { type: 'CLOSE_SECOND_DRAWER' };

type ReviewStepState = {
  currentStep: number;
};

type ReviewStepAction = { type: ReviewActionType };
