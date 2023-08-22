import { ExperienceDetails, IDDetailsReport, ResidentialDetails } from '../ReportTypes';

export const fn = {
  calculateIDProgress: (idDetails: IDDetailsReport): number => {
    let verifiedIdsCount = 0;

    if (idDetails.aadhar) verifiedIdsCount += 1;
    if (idDetails.dl) verifiedIdsCount += 1;
    if (idDetails.pan) verifiedIdsCount += 1;

    return Math.round((verifiedIdsCount / 3) * 100);
  },

  calculateExperienceProgress: (experienceDetails: Array<ExperienceDetails>): number => {
    let verifiedExperiencesCount = 0;

    for (const experience of experienceDetails) {
      if (experience.noOfVerifications >= 2) {
        verifiedExperiencesCount += 1;
      }
    }

    return Math.round((verifiedExperiencesCount / experienceDetails.length) * 100);
  },

  calculateResidentialProgress: (residentialDetails: Array<ResidentialDetails>): number => {
    let verifiedAddressesCount = 0;

    for (const residential of residentialDetails) {
      if (residential.isVerified) {
        verifiedAddressesCount += 1;
      }
    }

    return Math.round((verifiedAddressesCount / residentialDetails.length) * 100);
  },

  totalProgress: (
    idDetails: IDDetailsReport,
    experienceDetails: Array<ExperienceDetails>,
    residentialDetails: Array<ResidentialDetails>
  ) => {
    let starCount = 0;

    if (idDetails.aadhar) starCount += 1;
    if (idDetails.dl) starCount += 1;
    if (idDetails.pan) starCount += 1;
    if (experienceDetails.some((data) => data.noOfVerifications >= 2)) starCount += 1;
    if (residentialDetails.some((data) => data.isVerified)) starCount += 1;

    return {
      starCount: starCount,
      percentage: Math.round((starCount / 5) * 100),
    };
  },
};
