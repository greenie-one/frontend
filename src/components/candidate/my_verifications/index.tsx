import { useState } from 'react';
import styles from './styles/main.module.css';
import { Sidebar } from './components/Sidebar';
import { RequestList } from './components/RequestList';
import { Notifications } from './components/Notifications';

const { verifications_layout } = styles;

export const MyVerifications = () => {
  const [activeListItem, setActiveListItem] = useState<number>(0);

  return (
    <div className={verifications_layout}>
      <Sidebar activeListItem={activeListItem} setActiveListItem={setActiveListItem} />
      {activeListItem === 2 ? <Notifications /> : <RequestList activeListItem={activeListItem} />}
    </div>
  );
};
