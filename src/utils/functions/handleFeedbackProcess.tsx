import { BASE_URL } from '../../assets/api/ApiList';
import { AuthClient } from '../generic/authClinet';
import { HttpClient } from '../generic/httpClient';
import { showErrorNotification, showLoadingNotification, showSuccessNotification } from './showNotification';

type FeedbackTypes =
  | 'aadhar'
  | 'pan'
  | 'driving_license'
  | 'add_work_exp'
  | 'add_work_peer'
  | 'add_residential_info'
  | 'add_residential_peer';

type FeedbackBody = {
  flowExperience: string;
  referToSomeone: string;
  message: string;
};

export const feedbackExistCheck = async (type: FeedbackTypes, authClient: AuthClient) => {
  const res = await HttpClient.callApiAuth<{ feedback: boolean }>(
    {
      url: `${BASE_URL}/feedback/${type}`,
      method: 'GET',
    },
    authClient
  );

  if (res.ok) {
    return res.value.feedback;
  }

  return true;
};

export const postUserFeedback = async (type: FeedbackTypes, authClient: AuthClient, feedbackBody: FeedbackBody) => {
  showLoadingNotification({ title: 'Please Wait', message: 'We are submitting your feedback.' });
  const res = await HttpClient.callApiAuth<{ feedback: boolean }>(
    {
      url: `${BASE_URL}/feedback/add`,
      method: 'POST',
      body: {
        type: type,
        ...feedbackBody,
      },
    },
    authClient
  );

  if (res.ok) {
    showSuccessNotification({ title: 'Success', message: 'Thank You! We recieved your feedback.' });
    return { status: true, code: undefined };
  } else {
    showErrorNotification(res.error.code);
    return { status: false, code: res.error.code };
  }
};
