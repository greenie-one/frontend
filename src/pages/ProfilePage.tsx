import { Profile } from '../components/candidate/profile/index';
import { ProfileProvider } from '../components/candidate/profile/context/ProfileContext';

export const ProfilePage = () => {
  return (
    <>
      <ProfileProvider>
        <Profile />
      </ProfileProvider>
    </>
  );
};
