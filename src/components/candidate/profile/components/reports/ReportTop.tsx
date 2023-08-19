import { MdVerified } from 'react-icons/md';
import './_report.scss';

export const ReportTop = () => {
  return (
    <>
      <div className="report-container-head report-res">
        <div>
          <div className="report-header">
            <span className="greenie">Greenie</span>
            <span className="verified report-verifybtn">
              <MdVerified />
            </span>
          </div>
          <p className="greenie-text">www.greenie.one</p>
        </div>
        <div>
          <p>Background Verification Report</p>
        </div>
      </div>
    </>
  );
};
