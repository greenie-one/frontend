import { Box, Button, Modal, Text } from '@mantine/core';
import { useState, useRef, CSSProperties, ChangeEvent } from 'react';
import emptyProfile from '../assets/emptyProfile.png';
import { MdOutlineEdit } from 'react-icons/md';
import { useProfileContext } from '../context/ProfileContext';
import axios from 'axios';
import { profileAPIList } from '../../../assets/api/ApiList';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import profileIllustration from '../../Auth/assets/profileillustration.png';

export const ProfilePhotos = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [url, setUrl] = useState();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({
    backgroundImage: `url(${emptyProfile})`,
    backgroundPosition: 'center',
  });
  const { authTokens } = useProfileContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
    open();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('Please select an image');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      const res = await axios
        .post(`${profileAPIList.updateProfilePicture}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        })
        .then((res) => {
          const imageURL = res.data.url;
          setUrl(imageURL);
          setBackgroundStyle({ backgroundImage: `url(${imageURL})` });
          close();
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <section className="profile-section">
      <Modal
        className="modal"
        size={'65%'}
        centered
        fullScreen={isMobile}
        opened={opened}
        onClose={close}
      >
        <Box className="profile-modal">
          <Text className="title">Upload the selected image</Text>
          <img src={profileIllustration} alt="" />
          <Button onClick={handleUpload} className="primaryBtn">
            Upload
          </Button>
        </Box>
      </Modal>
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
