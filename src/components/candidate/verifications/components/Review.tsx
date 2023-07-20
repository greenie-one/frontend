import React, { useState } from 'react';
import { Text, Box, Button, Textarea, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useVerificationContext } from '../context/VerificationContext';
import { confirmationModalStyle } from '../../../settings/styles/articleContentStyles';

const ConfirmationModal: React.FC<{ opened: boolean; close: () => void }> = ({ opened, close }): JSX.Element => {
  const { postVerificationData } = useVerificationContext();
  const { classes: modalStyles } = confirmationModalStyle();

  const handleConfirm = async () => {
    close();
    await postVerificationData();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Confirmation"
      padding="xl"
      radius="lg"
      size="lg"
      centered
      classNames={modalStyles}
    >
      <Box className={modalStyles.confirmationMsgWrapper}>
        <Text className={modalStyles.confirmationMsg}>Are you sure you want to update the changes made?</Text>

        <Box className={modalStyles.modalBtnsContainer}>
          {[
            { variant: 'filled', text: 'Confirm', action: handleConfirm },
            { variant: 'outline', text: 'Cancel', action: () => close() },
          ].map((btns, idx) => (
            <Button
              key={idx}
              className={modalStyles.modalActionBtns}
              onClick={btns.action}
              size="sm"
              type="button"
              radius="xl"
              variant={btns.variant}
              color="teal"
            >
              {btns.text}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export const Review: React.FC = () => {
  const { verificationResponse, setVerificationResponse } = useVerificationContext();
  const [opened, { open, close }] = useDisclosure();

  const [review, setReview] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const wordCount = inputValue.trim().split(' ').length;

    if (wordCount <= 150) {
      setReview(inputValue);
    }
  };

  const endVerificationHandler = async () => {
    if (!review) return;
    const responseData: { [keys: string]: string } = {};
    responseData['review'] = review;

    setVerificationResponse({ ...verificationResponse, ...responseData });
    open();
  };

  return (
    <>
      <ConfirmationModal opened={opened} close={close} />
      <Box className="review-container">
        <Text className="question-text" w={'70%'}>
          Thank you, could you please provide your best regards by crafting an exceptional review for your esteemed peer
        </Text>
        <Box className="text-area-box">
          <Textarea
            value={review}
            onChange={handleInputChange}
            placeholder="Write a review to help your peer get his dream job"
            className="text-area"
          />
          <Text className="word-limit">{review.trim().split(' ').length} / 150 words</Text>
        </Box>

        <Button className="green-outline-btn" onClick={endVerificationHandler}>
          End Verification
        </Button>
      </Box>
    </>
  );
};
