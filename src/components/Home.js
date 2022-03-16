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
const Home = () => {
  const email = useSelector(state => state.user.value.email);
  return (
    <DashboardLay>
      <Text fontSize="4xl">Howdy, {email}</Text>
      <Tabs variant="soft-rounded" colorScheme="blue" mt="2rem" isFitted>
        <TabList>
          <Tab>Trash Can</Tab>
          <Tab>Trashes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TrashCan />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLay>
  );
};

export default Home;
