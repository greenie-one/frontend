export type SettingsContextType = {
  showDetailsId: number;
  setShowDetailsId: React.Dispatch<React.SetStateAction<number>>;
  privacySettingsForm: UseFormReturnType<privacySettingsFormType>;
  changeCurrentPassword: () => void;
};
