type ProfileContextType = {
  aadharIsVerified: boolean;
  panIsVerified: boolean;
  licenseIsVerified: boolean;
  setAadharIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setPanIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setLicenseIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
};
