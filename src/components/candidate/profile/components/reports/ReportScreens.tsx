import React, { useState, useEffect } from 'react';
import { Report } from './Report';
import { FrontReport } from './frontreport';
import { ExecutiveSummary } from './executivesummary';
import { PersonalIdentification } from './personalidentification';
import { WorkExperienceReport3 } from './workexperience3';
import { WorkExperienceReport1 } from './workexperiencereport';
import { WorkExperienceReport2 } from './workexperiencereport2';
import { ResidentialReport } from './residentialreport';
import { ResidentialReport2 } from './residentialreport2';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { useLocation } from 'react-router-dom';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { reportAPI } from '../../../../../assets/api/ApiList';

import './_report.scss';
export const ReportScreens: React.FC = (): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || '';
  const [pending, setPending] = useState<boolean>(true);

  const { authClient, profileData } = useGlobalContext();

  const [IdDetails, setIdDetails] = useState<IdDetailsResponse>({} as IdDetailsResponse);
  const [AccountDetails, setAccountDetails] = useState<AccountDetails>({} as AccountDetails);
  const [workExperienceDetails, setWorkExperienceDetails] = useState<WorkExperience[]>([]);
  const [peerDetails, setPeerDetails] = useState<WorkPeerReportResponse[]>([]);
  const [ResidentialInfo, setResidentialInfo] = useState<ResidentialType[]>([]);
  const [residentialPeer, setResidentialPeer] = useState<PeersResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse[]>([]);

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
      setDocument(res.value.workExperienceDetails.documents);
      setResidentialPeer(res.value.ResidentialDetails.residentialPeers);
      setAccountDetails(res.value.accountDetails);
      setIdDetails(res.value.idDetails);
      setWorkExperienceDetails(res.value.workExperienceDetails.workExp.workExperiences);
      setResidentialInfo(res.value.ResidentialDetails.residentialInfo);
      setPeerDetails(res.value.workExperienceDetails.peers);
    } else {
      showErrorNotification(res.error.code);
    }
  };
  console.log(document);
  // console.log(AccountDetails);
  // console.log(ResidentialInfo);
  // console.log(workExperienceDetails);
  useEffect(() => {
    getReportData();
  }, [email]);

  // if (!emailList.includes(email)) {
  //   return <PageNotFound />;
  // } else {
  return (
    <>
      <FrontReport />
      <hr></hr>
      <Report />
      <hr></hr>
      <ExecutiveSummary
        IdDetails={IdDetails}
        AccountDetails={AccountDetails}
        ResidentialInfo={ResidentialInfo}
        workExperienceDetails={workExperienceDetails}
      />
      <hr></hr>
      <PersonalIdentification IdDetails={IdDetails} />
      <hr></hr>
      <WorkExperienceReport3
        document={document}
        peerDetails={peerDetails}
        workExperienceDetails={workExperienceDetails}
      />
      <hr></hr>
      <WorkExperienceReport2 peerDetails={peerDetails} workExperienceDetails={workExperienceDetails} />
      <hr></hr>
      <WorkExperienceReport1 peerDetails={peerDetails} workExperienceDetails={workExperienceDetails} />
      <hr></hr>
      <ResidentialReport2 residentialPeer={residentialPeer} ResidentialInfo={ResidentialInfo} />
      <hr></hr>
      <ResidentialReport ResidentialInfo={ResidentialInfo} />
      <hr></hr>
    </>
  );
  // }
};
