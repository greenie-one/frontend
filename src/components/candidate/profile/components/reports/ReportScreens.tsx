import React, { useState, useEffect } from 'react';
import { Report } from './Report';
import { FrontReport } from './frontreport';
import { ExecutiveSummary } from './executivesummary';
import { WorkExperienceReport } from './workexperiencereport';
import { WorkExperienceReport3 } from './workexperience3';
import { WorkExperienceReport2 } from './workexperiencereport2';
import { PersonalIdentification } from './personalidentification';
import { ResidentialReport } from './residentialreport';
import { ResidentialReport2 } from './residentialreport2';
// import { Document } from '@react-pdf/renderer';
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

  const { authClient, profileData } = useGlobalContext();
  const emailList = ['tanvitomar0579@gmail.com', 'swanandwagh7@gmail.com', 'example@.com'];
  // const targetEmail = String(profileData.email);

  const [workExperienceDetails, setWorkExperienceDetails] = useState<WorkExperience[]>([]);
  const [ResidentialInfo, setResidentialInfo] = useState<ResidentialType[]>([]);

  const getReportData = async () => {
    const res = await HttpClient.callApiAuth<ReportData>(
      {
        url: `${reportAPI}?email=${email}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      console.log(res);
      // setResidentialInfoData(res.value.idDetails);
      setWorkExperienceDetails(res.value.workExperienceDetails);
      setResidentialInfo(res.value.ResidentialDetails);
    } else {
      showErrorNotification(res.error.code);
    }
  };
  console.log(ResidentialInfo);
  useEffect(() => {
    getReportData();
  }, [profileData.id]);

  if (!emailList.includes(email)) {
    return <PageNotFound />;
  } else {
    return (
      <>
        <FrontReport />
        <Report />
        <ExecutiveSummary workExperienceDetails={workExperienceDetails} />
        <WorkExperienceReport />
        <WorkExperienceReport2 />
        <WorkExperienceReport3 workExperienceDetails={workExperienceDetails} />
        <PersonalIdentification />
        <ResidentialReport2 />
        <ResidentialReport />
        <button onClick={() => window.print()}>PRINT</button>
      </>
    );
  }
};
