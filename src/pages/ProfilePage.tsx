import { Profile } from '../components/candidate/profile/index';
import { ProfileProvider } from '../components/candidate/profile/context/ProfileContext';
import { DocDepotContextProvider } from '../components/candidate/doc_depot/context/DocDepotContext';

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
