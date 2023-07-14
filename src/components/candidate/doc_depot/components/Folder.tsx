import React, { useState } from 'react';
import { Text, Box, Modal, Button } from '@mantine/core';
import folderImage from '../assets/folderImg.png';
import pdfImage from '../../profile/assets/pdfIcon.png';
import threeDots from '../assets/threeDots.png';
import { MdMoveDown, MdDeleteOutline } from 'react-icons/md';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useDocDepotContext } from '../context/DocDepotContext';
interface IFolderProps {
  id: string;
  name: string;
  isFolder: boolean;
}

export const Folder: React.FC<IFolderProps> = ({ id, name, isFolder }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<'Move' | 'Delete' | null>(null);
  const { deleteDocument, moveDocument } = useDocDepotContext();
  const handleOpenModal = (modal: 'Move' | 'Delete') => {
    setModalType(modal);
    open();
  };

  return (
    <>
      {modalType === 'Move' && (
        <Modal
          size={'50%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          centered
          title="Move file to"
          styles={{
            title: {
              fontWeight: 600,
            },
          }}
        >
          <Box className="folder-move-modal">
            <Box className="move-folder-wrapper">
              <Box className="folder" onClick={() => moveDocument(id, 'ID')}>
                <img src={folderImage} className="folder-img" alt="folder-image" />

                <Text className="folder-text">IDs</Text>
              </Box>
              <Box className="folder" onClick={() => moveDocument(id, 'education')}>
                <img src={folderImage} className="folder-img" alt="folder-image" />

                <Text className="folder-text">Educational documents</Text>
              </Box>
              <Box className="folder" onClick={() => moveDocument(id, 'work')}>
                <img src={folderImage} className="folder-img" alt="folder-image" />

                <Text className="folder-text">Work documents</Text>
              </Box>
              <Box className="folder" onClick={() => moveDocument(id, 'other')}>
                <img src={folderImage} className="folder-img" alt="folder-image" />

                <Text className="folder-text">Others</Text>
              </Box>
            </Box>
            <Box className="move-modal-btns-wrapper">
              <Button className="btn green-btn">Move</Button>
              <Button className="btn green-btn-outline">Move a copy</Button>
              <Button className="btn cancel-btn">Cancel</Button>
            </Box>
          </Box>
        </Modal>
      )}
      {modalType === 'Delete' && (
        <Modal
          size={'60%'}
          fullScreen={isMobile}
          opened={opened}
          onClose={close}
          centered
          title="Confirmation"
          styles={{
            title: {
              fontWeight: 600,
            },
          }}
        >
          <Box className="folder-delete-modal">
            <Text className="heading">You are about to delete this file</Text>
            <Text className="sub-heading">You cannot revert this action</Text>
            <Box className="delete-btn-wrapper">
              <Button className="delete-btn" onClick={() => deleteDocument(id)}>
                Delete
              </Button>
              <Button className="cancel-btn" onClick={close}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      <Box className="folder">
        {isFolder ? (
          <img src={folderImage} className="folder-img" alt="folder-image" />
        ) : (
          <img src={pdfImage} alt="folder-image" />
        )}
        <Text className="folder-text">{name}</Text>
        {!isFolder && (
          <img
            className="three-dots-menu"
            src={threeDots}
            alt="three-dots-menu"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          />
        )}
        {!isFolder && isDropdownVisible && (
          <Box className="folder-dropdown-menu" onClick={() => setDropdownVisible(!isDropdownVisible)}>
            <Box className="folder-action" onClick={() => handleOpenModal('Move')}>
              <MdMoveDown className="folder-action-icon" />
              <Text className="folder-action-text">Move</Text>
            </Box>
            <Box className="folder-action" onClick={() => handleOpenModal('Delete')}>
              <MdDeleteOutline size={'16px'} className="folder-action-icon" />
              <Text className="folder-action-text">Delete</Text>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
