import React from 'react';
import { Report } from './Report';
import { FrontReport } from './frontreport';
import { ExecutiveSummary } from './executivesummary';
import { WorkExperienceReport } from './workexperiencereport';
import { WorkExperienceReport3 } from './workexperience3';
import { WorkExperienceReport2 } from './workexperiencereport2';
import { PersonalIdentification } from './personalidentification';
import { ResidentialReport } from './residentialreport';
import { ResidentialReport2 } from './residentialreport2';
import './_report.scss';
export const ReportScreens: React.FC = (): JSX.Element => {
  return (
    <>
      <FrontReport />
      <Report />
      <ExecutiveSummary />
      <WorkExperienceReport />
      <WorkExperienceReport2 />
      <WorkExperienceReport3 />
      <PersonalIdentification />
      <ResidentialReport2 />
      <ResidentialReport />
      <button onClick={() => window.print()}>PRINT</button>
    </>
  );
};
