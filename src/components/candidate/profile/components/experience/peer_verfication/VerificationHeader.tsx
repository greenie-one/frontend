import React from 'react';
import { Box, Text } from '@mantine/core';
import { FcInfo } from 'react-icons/fc';

type VerificationHeaderProps = {
  selectionPage: number;
  setSelectionPage: React.Dispatch<React.SetStateAction<number>>;
};

const pageList: Array<{ id: number; title: string }> = [
  { id: 0, title: 'Document' },
  { id: 1, title: 'Skill' },
  { id: 2, title: 'Attributes' },
];

export const VerificationHeader: React.FC<VerificationHeaderProps> = ({
  selectionPage,
  setSelectionPage,
}): JSX.Element => {
  return (
    <>
      <Box className="doc-skill-selector">
        {pageList.map((page, idx) => {
          return (
            <Box
              key={idx}
              onClick={() => setSelectionPage(page.id)}
              className={selectionPage === page.id ? 'selector active' : 'selector'}
            >
              {page.title}
            </Box>
          );
        })}
      </Box>
      <Box className="verify-experience-progress-bars">
        <Box className="progress-bar active"></Box>
        <Box className={`progress-bar ${selectionPage >= 1 ? 'active' : ''}`}></Box>
        <Box className={`progress-bar ${selectionPage >= 2 ? 'active' : ''}`}></Box>
      </Box>

      <Text className="selection-page">{pageList[selectionPage].title}</Text>
      <Box className="pro-tip-box">
        <Box className="icon-box">
          <FcInfo color="#1991ff" />
          <Text className="pro-tip">Pro tip</Text>
        </Box>
        <Text className="tip">
          To receive the best review, carefully choose the documents, skills, and attributes that your peers are
          familiar with. This will ensure a more accurate and insightful assessment of your profile on Greenie
        </Text>
      </Box>
    </>
  );
};
