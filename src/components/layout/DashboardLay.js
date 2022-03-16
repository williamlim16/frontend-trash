import { Grid, GridItem } from '@chakra-ui/react';

const DashboardLay = ({ children }) => {
  return (
    <Grid templateColumns={'repeat(5,1fr)'} gap={1}>
      <GridItem colStart={2} colEnd={5}>
        {children}
      </GridItem>
    </Grid>
  );
};

export default DashboardLay;
