import { useState } from 'react';
import styles from './styles/main.module.css';
import { Sidebar } from './components/Sidebar';
import { RequestList } from './components/RequestList';
import { Notifications } from './components/Notifications';
import { ProfileNav } from '../profile/components/ProfileNav';
import { Layout } from '../profile/components/Layout';

const { verifications_layout } = styles;

export const MyVerifications = () => {
  const [activeListItem, setActiveListItem] = useState<number>(0);

  return (
    <>
      <Layout>
        <div style={{ marginTop: '7rem' }}>
          <ProfileNav />
          <div className={verifications_layout}>
            <Sidebar activeListItem={activeListItem} setActiveListItem={setActiveListItem} />
            {activeListItem === 2 ? <Notifications /> : <RequestList activeListItem={activeListItem} />}
          </div>
        </div>
      </Layout>
    </>
  );
};
