import React from 'react';
import { Box, Button } from '@mantine/core';

type PageActionBtnsProps = {
  cb: () => void;
};

export const PageActionBtns: React.FC<PageActionBtnsProps> = ({ cb }): JSX.Element => {
  return (
    <Box className="btn-wrapper">
      <Button className="cancel-btn" onClick={cb}>
        Skip
      </Button>
      <Button className="green-btn" onClick={cb}>
        Next
      </Button>
    </Box>
  );
};
