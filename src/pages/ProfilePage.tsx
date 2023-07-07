import { Profile } from '../components/profile/index';
import { ProfileProvider } from '../components/profile/context/ProfileContext';
import { DocDepotContextProvider } from '../components/doc_depot/context/DocDepotContext';

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
