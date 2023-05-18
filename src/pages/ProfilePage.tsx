import { Profile } from '../components/Profile/index';
import { ProfileProvider } from '../components/Profile/context/ProfileContext';

export const ProfilePage = () => {
  return (
    <>
      <ProfileProvider>
        <Profile />
      </ProfileProvider>
    </>
  );
};
