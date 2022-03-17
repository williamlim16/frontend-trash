import { Grid, GridItem, Box } from '@chakra-ui/react';

const RegisterLoginLay = ({ children }) => {
  return (
    <Grid templateColumns={'repeat(7,1fr)'} gap={5}>
      <GridItem colStart={3} colEnd={6}>
        <Box boxShadow="md" p="2rem" rounded="xl">
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default RegisterLoginLay;
