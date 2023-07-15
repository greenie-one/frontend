import styles from './styles/main.module.css';
import { Sidebar } from './components/Sidebar';
import { RequestList } from './components/RequestList';

const { verifications_layout } = styles;

export const MyVerifications = () => {
  return (
    <div className={verifications_layout}>
      <Sidebar />
      <RequestList />
    </div>
  );
};
