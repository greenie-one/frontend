import React, { useState, useEffect } from 'react';
import { Report } from './Report';
import { FrontReport } from './frontreport';
import { ExecutiveSummary } from './executivesummary';
import { PersonalIdentification } from './personalidentification';
import { WorkExperienceReport3 } from './workexperience3';
// import { WorkExperienceReport2 } from './workexperiencereport2';
import { ResidentialReport } from './residentialreport';
import { ResidentialReport2 } from './residentialreport2';
import { useLocation } from 'react-router-dom';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { reportAPI } from '../../../../../assets/api/ApiList';

import './_report.scss';
import { LoadingState } from '../../../../common/LoadingState';
import { PageNotFound } from '../../../../../pages/PageNotFound';
export const ReportScreens: React.FC = (): JSX.Element => {
  const location = useLocation();

  const [pending, setPending] = useState<boolean>(true);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  const [IdDetails, setIdDetails] = useState<IdDetailsResponse>({} as IdDetailsResponse);
  const [AccountDetails, setAccountDetails] = useState<AccountDetails>({} as AccountDetails);
  const [workExperienceDetails, setWorkExperienceDetails] = useState<WorkExperience[]>([]);
  const [peerDetails, setPeerDetails] = useState<WorkPeerReportResponse[]>([]);
  const [ResidentialInfo, setResidentialInfo] = useState<ResidentialType[]>([]);
  const [residentialPeer, setResidentialPeer] = useState<PeersResponse[]>([]);
  const [document, setDocument] = useState<DocumentResponse[]>([]);
  const [skills, setSkills] = useState<CandidateSkillType[]>([]);

  const getReportData = async () => {
    setPending(true);
    setUserNotFound(false);
    const res = await HttpClient.callApi<ReportData>({
      url: `${reportAPI}${location.search}`,
      method: 'GET',
    });

    if (res.ok) {
      setDocument(res.value.workExperienceDetails.documents);
      setResidentialPeer(res.value.ResidentialDetails.residentialPeers);
      setAccountDetails(res.value.accountDetails);
      setIdDetails(res.value.idDetails);
      setWorkExperienceDetails(res.value.workExperienceDetails.workExp.workExperiences);
      setResidentialInfo(res.value.ResidentialDetails.residentialInfo);
      setPeerDetails(res.value.workExperienceDetails.peers);
      setSkills(res.value.workExperienceDetails.skills);
    } else {
      if (res.error.code === 'GR0008') {
        setUserNotFound(true);
      }
    }
    setPending(false);
  };

  useEffect(() => {
    getReportData();
  }, [location.search]);

  return (
    <>
      {pending ? (
        <LoadingState />
      ) : userNotFound ? (
        <PageNotFound />
      ) : (
        <>
          {' '}
          <FrontReport userName={`${AccountDetails.firstName} ${AccountDetails.lastName}`} />
          <hr className="pageDivider"></hr>
          <Report />
          <hr className="pageDivider"></hr>
          <ExecutiveSummary
            IdDetails={IdDetails}
            AccountDetails={AccountDetails}
            ResidentialInfo={ResidentialInfo}
            workExperienceDetails={workExperienceDetails}
            peerDetails={peerDetails}
            skills={skills}
          />
          <hr className="pageDivider"></hr>
          {<PersonalIdentification IdDetails={IdDetails} />}
          <>
            <hr className="pageDivider"></hr>
            <WorkExperienceReport3
              document={document}
              peerDetails={peerDetails}
              workExperienceDetails={workExperienceDetails}
              skills={skills}
            />
          </>
          <>
            <hr className="pageDivider"></hr>
            <ResidentialReport2 residentialPeer={residentialPeer} ResidentialInfo={ResidentialInfo} />
            <hr className="pageDivider"></hr>
            <ResidentialReport ResidentialInfo={ResidentialInfo} />
          </>
        </>
      )}
    </>
  );
};
