import { Profile } from '../components/Profile/index';
import { ProfileProvider } from '../components/Profile/context/ProfileContext';
import { DocDepotContextProvider } from '../components/DocDepot/context/DocDepotContext';

export const ProfilePage = () => {
  return (
    <>
      <ProfileProvider>
        <DocDepotContextProvider>
          <Profile />
        </DocDepotContextProvider>
      </ProfileProvider>
    </>
  );
};
