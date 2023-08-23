import React, { useEffect, useState } from 'react';
import './_report.scss';
import {
  AccountDetails,
  IDDetailsReport,
  ExperienceDetails,
  WorkPeerDetails,
  WorkDocumentDetails,
  ResidentialDetails,
  ResidentialPeerDetails,
  ReportData,
} from './ReportTypes';
import { useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../../../../context/GlobalContext';
import { reportAPI } from '../../../../../assets/api/ApiList';
import { HttpClient } from '../../../../../utils/generic/httpClient';
import { showErrorNotification } from '../../../../../utils/functions/showNotification';
import { FrontPage } from './pages/FrontPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { ExecutiveSummary } from './pages/ExecutiveSummary';

export const CandidateVerificationReport: React.FC = (): JSX.Element => {
  const { authClient } = useGlobalContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || '';

  const [pending, setPending] = useState<boolean>(true);
  const [idDetails, setIdDetails] = useState<IDDetailsReport>({} as IDDetailsReport);
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({} as AccountDetails);
  const [experienceDetails, setExperienceDetails] = useState<Array<ExperienceDetails>>([]);
  const [workPeerDetails, setWorkPeerDetails] = useState<Array<WorkPeerDetails>>([]);
  const [workDocumentDetails, setWorkDocumentDetails] = useState<Array<WorkDocumentDetails>>([]);
  const [residentialDetails, setResidentialDetails] = useState<Array<ResidentialDetails>>([]);
  const [residentialPeerDetails, setResidentialPeerDetails] = useState<Array<ResidentialPeerDetails>>([]);

  const getReportData = async () => {
    const res = await HttpClient.callApiAuth<ReportData>(
      {
        url: `${reportAPI}?email=${email}`,
        method: 'GET',
      },
      authClient
    );

    if (res.ok) {
      setIdDetails(res.value.idDetails);
      setAccountDetails(res.value.accountDetails);
      setExperienceDetails(res.value.workExperienceDetails.workExp.workExperiences);
      setWorkPeerDetails(res.value.workExperienceDetails.peers);
      setWorkDocumentDetails(res.value.workExperienceDetails.documents);
      setResidentialDetails(res.value.ResidentialDetails.residentialInfo);
      setResidentialPeerDetails(res.value.ResidentialDetails.residentialPeers);
    } else {
      showErrorNotification(res.error.code);
    }
  };

  useEffect(() => {
    getReportData();
  }, [email]);
  return (
    <>
      <main className="report-main">
        <FrontPage candidateFirstName={accountDetails.firstName} candidateLastName={accountDetails.lastName} />
        <DisclaimerPage />
        <ExecutiveSummary
          accountDetails={accountDetails}
          idDetails={idDetails}
          experienceDetails={experienceDetails}
          residentialDetails={residentialDetails}
        />
        <section className="report-page">PDF Pages</section>
        <section className="report-page">PDF Pages</section>
        <section className="report-page">PDF Pages</section>
        <section className="report-page">PDF Pages</section>
        <section className="report-page">PDF Pages</section>
      </main>
    </>
  );
};
