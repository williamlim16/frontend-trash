import { Grid, GridItem } from '@chakra-ui/react';

const RegisterLoginLay = ({ children }) => {
  return (
    <Grid templateColumns={'repeat(7,1fr)'} gap={5}>
      <GridItem colStart={3} colEnd={6}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default RegisterLoginLay;
