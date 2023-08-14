import React, { useEffect } from 'react';
import { Report } from './Report';
import { FrontReport } from './frontreport';
import { ExecutiveSummary } from './executivesummary';
import { WorkExperienceReport } from './workexperiencereport';
import { WorkExperienceReport3 } from './workexperience3';
import { WorkExperienceReport2 } from './workexperiencereport2';
import { PersonalIdentification } from './personalidentification';
import { ResidentialReport } from './residentialreport';
import { ResidentialReport2 } from './residentialreport2';
import { Document } from '@react-pdf/renderer';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { PageNotFound } from '../../../../../pages/PageNotFound';
import { useLocation } from 'react-router-dom';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { reportAPI } from '../../../../../assets/api/ApiList';

import './_report.scss';
export const ReportScreens: React.FC = (): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || '';

  const { profileData } = useGlobalContext();
  const emailList = ['tanvitomar0579@gmail.com', 'swanandwagh7@gmail.com', 'example@.com'];
  // const targetEmail = String(profileData.email);

  const getReportData = async () => {
    const res = await HttpClient.callApi({
      url: `${reportAPI}?email=${email}`,
      method: 'GET',
    });

    if (res.ok) {
      console.log(res);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getReportData();
  }, [profileData.id]);

  if (!emailList.includes(email)) {
    return <PageNotFound />;
  } else {
    return (
      <Document>
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
      </Document>
    );
  }
};
