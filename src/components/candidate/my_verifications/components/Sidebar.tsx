import React from 'react';
import styles from '../styles/sidebar.module.css';
import { MdOutlineAccountCircle, MdOutlineLock, MdOutlineNotificationsNone } from 'react-icons/md';

const { sidebar, option_list, option_list_items, active, option_icons } = styles;

export const Sidebar: React.FC<{
  activeListItem: number;
  setActiveListItem: React.Dispatch<React.SetStateAction<number>>;
}> = ({ activeListItem, setActiveListItem }): JSX.Element => {
  return (
    <aside className={sidebar}>
      <ul className={option_list}>
        <li
          tabIndex={0}
          role="button"
          className={`${option_list_items} ${activeListItem === 0 ? active : null}`}
          onClick={() => setActiveListItem(0)}
        >
          <span className={option_icons}>
            <MdOutlineAccountCircle />
          </span>
          Sent Requests
        </li>
        <li
          tabIndex={0}
          role="button"
          className={`${option_list_items} ${activeListItem === 1 ? active : null}`}
          onClick={() => setActiveListItem(1)}
        >
          <span className={option_icons}>
            <MdOutlineLock />
          </span>
          Received Requests
        </li>
        <li
          tabIndex={0}
          role="button"
          className={`${option_list_items} ${activeListItem === 2 ? active : null}`}
          onClick={() => setActiveListItem(2)}
        >
          <span className={option_icons}>
            <MdOutlineNotificationsNone />
          </span>
          Notifications
        </li>
      </ul>
    </aside>
  );
};
