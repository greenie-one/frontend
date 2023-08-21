import React from 'react';
import { MdVerified } from 'react-icons/md';
// import { CgProfile } from 'react-icons/cg';
import { CgSandClock } from 'react-icons/cg';
import { Text, Box, Button, Progress, RingProgress } from '@mantine/core';
import dummyThumbnail from '../../assets/johnMarston.png';
import level from '../../assets/levelFilled.png';
import { ReportTop } from './ReportTop';
import './_report.scss';

type ChildComponentProps = {
  IdDetails: IdDetailsResponse;
  AccountDetails: AccountDetails;
  ResidentialInfo: ResidentialType[];
  workExperienceDetails: WorkExperience[];
};

const calculateIDProgress = (idDetails: IdDetailsResponse): number => {
  let verifiedIdsCount = 0;

  if (idDetails.aadhar !== null) {
    verifiedIdsCount += 1;
  }

  if (idDetails.dl !== null) {
    verifiedIdsCount += 1;
  }

  if (idDetails.pan !== null) {
    verifiedIdsCount += 1;
  }

  return Math.round((verifiedIdsCount / 3) * 100);
};

const calculateExperienceProgress = (workExperienceDetails: WorkExperience[]): number => {
  let verifiedExperiencesCount = 0;

  for (const experience of workExperienceDetails) {
    if (experience.noOfVerifications >= 2) {
      verifiedExperiencesCount += 1;
    }
  }

  return Math.round((verifiedExperiencesCount / workExperienceDetails.length) * 100);
};

const calculateResidentialProgress = (residentialInfo: ResidentialType[]): number => {
  let verifiedAddressesCount = 0;

  for (const residential of residentialInfo) {
    if (residential.isVerified) {
      verifiedAddressesCount += 1;
    }
  }

  return Math.round((verifiedAddressesCount / residentialInfo.length) * 100);
};

const totalProgress = (
  idDetails: IdDetailsResponse,
  workExperienceDetails: WorkExperience[],
  residentialInfo: ResidentialType[]
): number => {
  let starCount = 0;

  if (idDetails.aadhar !== null) {
    starCount += 1;
  }

  if (idDetails.dl !== null) {
    starCount += 1;
  }

  if (idDetails.pan !== null) {
    starCount += 1;
  }

  if (workExperienceDetails.some((data) => data.noOfVerifications >= 2)) {
    starCount += 1;
  }

  if (residentialInfo.some((data) => data.isVerified)) {
    starCount += 1;
  }

  return Math.round((starCount / 5) * 100);
};

export const ExecutiveSummary: React.FC<ChildComponentProps> = ({
  IdDetails,
  AccountDetails,
  ResidentialInfo,
  workExperienceDetails,
}) => {
  // console.log(IdDetails.aadhar);
  return (
    <>
      <main className="report-container">
        <ReportTop />
        <div className="disclaimer-box">
          <span className="disclaimer-text">Executive Summary</span>
          <div className="residential-address">
            <div className="residential-address-left workexperience">
              <span className="profile-thumbnail">
                <img src={dummyThumbnail} className="profile-img" />
              </span>
              <div>
                <p>
                  {AccountDetails.firstName} {AccountDetails.lastName}
                </p>
                {AccountDetails.greenieId ? (
                  <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                    Verified
                  </Button>
                ) : (
                  <Button leftIcon={<CgSandClock size={'16px'} />} className="pending report-verifybtn">
                    Pending
                  </Button>
                )}
              </div>
            </div>
            {/* <div className="residential-address-right ">
              <CgProfile size={'20px'} />
              View profile
            </div> */}

            <div className="residential-address-right right-view-profile">
              <div>
                <RingProgress
                  size={65}
                  thickness={4}
                  roundCaps
                  sections={[
                    { value: totalProgress(IdDetails, workExperienceDetails, ResidentialInfo), color: '#17a672' },
                  ]}
                  label={
                    <Text size="s" align="center" px="s" sx={{ pointerEvents: 'none' }}>
                      {totalProgress(IdDetails, workExperienceDetails, ResidentialInfo)}%
                    </Text>
                  }
                />
              </div>
              Total Completeness
            </div>
          </div>
        </div>
        <Box className="basic-info-box-wrapper wrapper-executive">
          <Box className="info-box">
            <Text className="experience-details-box-heading">Greenie ID</Text>
            <Text className="experience-details-box-text">{AccountDetails ? AccountDetails.greenieId : '-'}</Text>
          </Box>
          <Box className="info-box">
            <Text className="experience-details-box-heading">Greenie Rating</Text>
            <Text className="experience-details-box-text">
              <span>
                <img className="star-img" src={level} alt="level" />
              </span>
              {(totalProgress(IdDetails, workExperienceDetails, ResidentialInfo) * 5) / 100} Rating
            </Text>
          </Box>
        </Box>
        <div className="location">
          <p>Summary</p>
        </div>

        <Box className="add-peer-header executive-header">
          <Text className="add-peer-header-text">Particular</Text>
          <Text className="add-peer-header-text">Status</Text>
          <Text className="add-peer-header-text">Progress</Text>
          <Text className="add-peer-header-text">Remarks</Text>
        </Box>

        <Box className="added-peer-box">
          <Box className="added-peers executive-peers">
            <Text className="peer-name ">Personal Identification</Text>
            <Text className="peer-name text-verified">
              {calculateIDProgress(IdDetails) >= 33 ? 'Verified' : <span style={{ color: '#ff7272' }}>Pending</span>}
            </Text>
            <Text className="peer-name">
              <span className="peer-progress">
                <Progress value={calculateIDProgress(IdDetails)} size="xs" color="#8CF078" />
              </span>
              <span>{calculateIDProgress(IdDetails)}%</span>
            </Text>
            <Text className="peer-name">API Verification</Text>
          </Box>
          <Box className="added-peers executive-peers">
            <Text className="peer-name ">Residential Information</Text>
            <Text className="peer-name text-verified">
              {calculateResidentialProgress(ResidentialInfo) > 0 ? (
                'Verified'
              ) : (
                <span style={{ color: '#ff7272' }}>Pending</span>
              )}
            </Text>
            <Text className="peer-name">
              <span className="peer-progress">
                <Progress value={calculateResidentialProgress(ResidentialInfo)} size="xs" color="#8CF078" />
              </span>
              <span>{calculateResidentialProgress(ResidentialInfo)}%</span>
            </Text>
            <Text className="peer-name">Geolocation API</Text>
          </Box>
          <Box className="added-peers executive-peers">
            <Text className="peer-name ">Work Experience</Text>
            <Text className="peer-name text-verified">
              {calculateExperienceProgress(workExperienceDetails) > 0 ? (
                'Verified'
              ) : (
                <span style={{ color: '#ff7272' }}>Pending</span>
              )}
            </Text>
            <Text className="peer-name">
              <span className="peer-progress">
                <Progress value={calculateExperienceProgress(workExperienceDetails)} size="xs" color="#8CF078" />
              </span>
              <span>{calculateExperienceProgress(workExperienceDetails)}%</span>
            </Text>
            <Text className="peer-name">Verification using Email, Phone Number and OTP Verification</Text>
          </Box>
        </Box>

        {workExperienceDetails.length > 0 ? (
          <div className="location">
            <p>Work Experience ({workExperienceDetails.length})</p>
          </div>
        ) : null}

        <Box className="basic-info-box-wrapper executive-wrapper">
          {workExperienceDetails.map((experience, index) => (
            <Box key={index} className="info-box">
              <Text className="experience-details-box-heading">{experience.designation}</Text>
              <Text className="experience-details-box-text">{experience.companyName}</Text>
              {experience.noOfVerifications >= 2 ? (
                <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                  Verified
                </Button>
              ) : (
                <Button leftIcon={<CgSandClock size={'16px'} />} className="pending report-verifybtn">
                  Pending
                </Button>
              )}
            </Box>
          ))}
        </Box>
        {ResidentialInfo.length > 0 ? (
          <div className="location">
            <p>Residential Addresses ({ResidentialInfo.length})</p>
          </div>
        ) : null}
        <Box className="basic-info-box-wrapper executive-wrapper">
          {ResidentialInfo.map((resident, index) => (
            <Box key={index} className="info-box">
              <Text className="experience-details-box-heading">{resident.addressType} Address</Text>
              <Text className="experience-details-box-text">
                {resident.address_line_1}, {resident.address_line_2}, {resident.city} - {resident.pincode}
              </Text>
              {resident.isVerified ? (
                <Button leftIcon={<MdVerified color="#17A672" size={'16px'} />} className="verified report-verifybtn">
                  Verified
                </Button>
              ) : (
                <Button leftIcon={<CgSandClock size={'16px'} />} className="pending report-verifybtn">
                  Pending
                </Button>
              )}
            </Box>
          ))}
        </Box>
      </main>
    </>
  );
};
