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
