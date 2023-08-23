import React from 'react';
import { Progress, RingProgress, Text } from '@mantine/core';
import { AccountDetails, ExperienceDetails, IDDetailsReport, ResidentialDetails } from '../ReportTypes';
import thumbnail from '../../../assets/johnMarston.png';
import { PageHeader } from '../components/PageHeader';
import { PageHeading } from '../components/PageHeading';
import { Pending, Verified } from '../components/VerificationStatus';
import { InformationBox } from '../components/InformationBox';
import { BsFillStarFill } from 'react-icons/bs';
import { TemplateRow, TemplateTable } from '../components/TemplateTable';
import { fn } from '../utils/CalculationFunctions';

type PageProps = {
  accountDetails: AccountDetails;
  idDetails: IDDetailsReport;
  experienceDetails: Array<ExperienceDetails>;
  residentialDetails: Array<ResidentialDetails>;
};

export const ExecutiveSummary: React.FC<PageProps> = ({
  accountDetails,
  idDetails,
  experienceDetails,
  residentialDetails,
}): JSX.Element => {
  return (
    <section className="executive-summary">
      <PageHeader />
      <div className="page-content">
        <PageHeading>Executive Summary</PageHeading>
        <div className="page-content-container">
          <div className="account-details-container">
            <div className="account-details">
              <div className="profile-information">
                <span className="profile-thumbnail">
                  <img src={thumbnail} alt={`${accountDetails.firstName}${' '}${accountDetails.lastName}`} />
                </span>
                <div className="name-details">
                  <span className="candidate-name">
                    {`${accountDetails.firstName}${' '}${accountDetails.lastName}`}
                  </span>
                  {accountDetails.greenieId ? <Verified withIcon /> : <Pending withIcon />}
                </div>
              </div>
              <div className="greenie-details">
                <InformationBox label="Greenie ID">
                  {accountDetails.greenieId ? accountDetails.greenieId : '-'}
                </InformationBox>
                <InformationBox label="Greenie Rating">
                  <span className="greenie-rating">
                    <BsFillStarFill size={17} color="#17a672" />{' '}
                    {fn.totalProgress(idDetails, experienceDetails, residentialDetails).starCount} Rating
                  </span>
                </InformationBox>
              </div>
            </div>
            <div className="progress-details">
              <div className="ring-progress">
                <RingProgress
                  size={125}
                  thickness={6.5}
                  roundCaps
                  sections={[
                    {
                      value: fn.totalProgress(idDetails, experienceDetails, residentialDetails).percentage,
                      color: '#17a672',
                    },
                  ]}
                  label={
                    <Text size="lg" align="center" sx={{ pointerEvents: 'none' }}>
                      {fn.totalProgress(idDetails, experienceDetails, residentialDetails).percentage}%
                    </Text>
                  }
                />
              </div>
              <span className="progress-label">Total Completeness</span>
            </div>
          </div>
          <div className="summary-container">
            <TemplateTable
              templateHeading="Summary"
              templateHeaderData={['Particular', 'Status', 'Progress', 'Remarks']}
            >
              <TemplateRow
                templateRowData={[
                  'Personal Identification',
                  fn.calculateIDProgress(idDetails) > 0 ? <Verified key={1} /> : <Pending key={1} />,
                  <span key={2} className="peer-progress">
                    <Progress
                      className="progress-bar"
                      value={fn.calculateIDProgress(idDetails)}
                      size="xs"
                      color="#17a672"
                    />
                    {fn.calculateIDProgress(idDetails)}%
                  </span>,
                  'API Verification',
                ]}
              />
              <TemplateRow
                templateRowData={[
                  'Work Experience',
                  fn.calculateExperienceProgress(experienceDetails) > 0 ? <Verified key={1} /> : <Pending key={1} />,
                  <span key={2} className="peer-progress">
                    <Progress
                      className="progress-bar"
                      value={fn.calculateExperienceProgress(experienceDetails)}
                      size="xs"
                      color="#17a672"
                    />
                    {fn.calculateExperienceProgress(experienceDetails)}%
                  </span>,
                  'Verification using Email, Phone Number and OTP Verification',
                ]}
              />
              <TemplateRow
                templateRowData={[
                  'Residential Information',
                  fn.calculateResidentialProgress(residentialDetails) > 0 ? <Verified key={1} /> : <Pending key={1} />,
                  <span key={2} className="peer-progress">
                    <Progress
                      className="progress-bar"
                      value={fn.calculateResidentialProgress(residentialDetails)}
                      size="xs"
                      color="#17a672"
                    />
                    {fn.calculateResidentialProgress(residentialDetails)}%
                  </span>,
                  'Geo-Location API',
                ]}
              />
            </TemplateTable>
          </div>
          <div className="experience-container">
            <h2 className="entity-heading">Work Experience({experienceDetails.length})</h2>
            <div className="experience-details-container">
              {experienceDetails.map((experience, idx) => (
                <InformationBox key={idx} label={experience.designation}>
                  <div className="experience-details-box">
                    {experience.companyName}
                    {experience.noOfVerifications >= 2 ? <Verified withIcon /> : <Pending withIcon />}
                  </div>
                </InformationBox>
              ))}
            </div>
          </div>
          <div className="experience-container">
            <h2 className="entity-heading">Residential Addresses({residentialDetails.length})</h2>
            <div className="experience-details-container">
              {residentialDetails.map((address, idx) => (
                <InformationBox key={idx} label={address.addressType}>
                  <div className="experience-details-box residential-details-box">
                    {address.address_line_1}, {address.address_line_2}, {address.city}, {address.state} -{' '}
                    {address.pincode}
                    {address.isVerified ? <Verified withIcon /> : <Pending withIcon />}
                  </div>
                </InformationBox>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
