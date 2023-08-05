import { useGlobalContext } from '../../context/GlobalContext';

export const getStars = () => {
  const { IDs, workExperienceData, residentialInfoData } = useGlobalContext();

  const verifiedIDsCount = IDs.filter((id) => id.isVerified).length;

  const verifiedExperienceCount = workExperienceData.some((data) => data.noOfVerifications >= 2) ? 1 : 0;

  const verifiedResidentialInfoCount = residentialInfoData.some((data) => data.isVerified) ? 1 : 0;

  return verifiedIDsCount + verifiedExperienceCount + verifiedResidentialInfoCount;
};
