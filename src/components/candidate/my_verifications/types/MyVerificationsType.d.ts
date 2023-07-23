type ReminderModalType = {
  confirmationHandler: () => void;
  name: string;
  createdAt?: string;
};

type SentRequestActionType = {
  requestId: string;
  name: string;
  setForceRenderList: React.Dispatch<React.SetStateAction<boolean>>;
  createdAt?: string;
};

type CancelationModalType = {
  cancelationHandler: () => void;
  name: string;
  createdAt?: string;
};
