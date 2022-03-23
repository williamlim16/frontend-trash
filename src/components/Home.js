import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import DashboardLay from './layout/DashboardLay';
import { useSelector } from 'react-redux';
import TrashCan from './TrashCan';
import Trashes from './Trashes';
const Home = () => {
  const email = useSelector(state => state.user.value.email);
  return (
    <DashboardLay>
      <Text fontSize="4xl">Howdy, {email}</Text>
      <Tabs variant="soft-rounded" colorScheme="blue" mt="2rem" align="center">
        <TabList>
          <Tab>Trash Cans</Tab>
          <Tab>Trashes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TrashCan />
          </TabPanel>
          <TabPanel>
            <Trashes />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLay>
  );
};

export default Home;
