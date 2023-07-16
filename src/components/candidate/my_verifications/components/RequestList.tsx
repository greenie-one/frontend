import React from 'react';
import styles from '../styles/requestlist.module.css';
import { RenderRequestList } from './RenderRequestList';

const { requestList_container } = styles;

const RequestListArray = [
  {
    id: 0,
    profileImg: '',
    name: 'John Marston',
    title: 'Request to verify your work experience',
    message: 'is asking you to verify your address proof.',
  },
  {
    id: 1,
    profileImg: '',
    name: 'John Marston',
    title: 'Request to verify your work experience',
    message: 'is asking you to verify your address proof',
  },
  {
    id: 2,
    profileImg: '',
    name: 'John Marston',
    title: 'Request to verify your work experience',
    message: 'is asking you to verify your address proof',
  },
];

export const RequestList: React.FC<{
  activeListItem: number;
}> = ({ activeListItem }): JSX.Element => {
  return (
    <article className={requestList_container}>
      <RenderRequestList requestType={activeListItem === 0 ? 'sent' : 'recieved'} requestList={RequestListArray} />
    </article>
  );
};
