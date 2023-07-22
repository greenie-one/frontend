type ReminderModalType = {
  confirmationHandler: () => void;
  name: string;
};

type SentRequestActionType = {
  requestId: string;
  name: string;
};

type CancelationModalType = {
  cancelationHandler: () => void;
  name: string;
};
