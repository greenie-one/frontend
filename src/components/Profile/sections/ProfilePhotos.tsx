import { Box, Button } from '@mantine/core';
import { useState, useRef, CSSProperties, ChangeEvent } from 'react';
import emptyProfile from '../assets/emptyProfile.png';
import { MdOutlineEdit } from 'react-icons/md';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import { profileAPIList } from '../../../assets/api/ApiList';
export const ProfilePhotos = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({
    backgroundImage: `url(${emptyProfile})`,
    backgroundPosition: 'center',
  });
  const { authTokens } = useProfileContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    if (!selectedFile) {
      console.log('Please select an image');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const res = await axios.post(`${profileAPIList.updateProfilePicture}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      if (res.data && authTokens?.accessToken) {
        const imageURL = res.data.url;
        setBackgroundStyle({ backgroundImage: `url(${imageURL})` });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <section className="profile-section">
      <Box className="cover-photo">
        <Button leftIcon={<MdOutlineEdit />} className="edit-btn">
          Update Cover
        </Button>
      </Box>
      <Box className="profile-photo" style={backgroundStyle}>
        <Button
          leftIcon={<MdOutlineEdit />}
          onClick={() => fileInputRef.current?.click()}
          className="edit-btn"
        >
          Change picture
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </Box>
    </section>
  );
};
