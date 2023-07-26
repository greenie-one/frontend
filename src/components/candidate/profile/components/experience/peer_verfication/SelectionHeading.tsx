import React from 'react';
import { Text, Box } from '@mantine/core';

type SelectionHeadingProps = {
  children?: React.ReactNode | undefined;
  heading: string;
  subHeading: string;
};

export const SelectionHeading: React.FC<SelectionHeadingProps> = ({ children, heading, subHeading }): JSX.Element => {
  return (
    <Box className="documents-action-nav">
      <Box className="document-action-heading-box">
        <Text className="document-action-heading">{heading}</Text>
        <Text className="document-action-sub-heading">{subHeading}</Text>
      </Box>
      {children}
    </Box>
  );
};
