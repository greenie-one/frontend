import { Text, Box } from '@mantine/core';

export const DocDepotFilter = () => {
  return (
    <Box className="filter-box">
      <Text className="filter-heading">Quick sort</Text>
      <Text className="filter">Appointment Letters</Text>
      <Text className="filter">Payslips</Text>
      <Text className="filter">Relieving Letters</Text>
      <Text className="filter">Certifications</Text>
    </Box>
  );
};
