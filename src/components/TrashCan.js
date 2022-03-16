import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { EditIcon, AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const columns = [
  {
    name: 'ID',
    selector: row => row.ID,
    maxWidth: '20px',
  },
  {
    name: 'Name',
    selector: row => row.Name,
  },
  {
    name: 'Location',
    selector: row => row.Location,
  },
  {
    name: 'User',
    selector: row => row.User.Email,
  },
  {
    name: 'Action',
    button: true,
    cell: row => {
      return (
        <a href="/">
          <EditIcon />
        </a>
      );
    },
  },
];

function TrashCan() {
  //Init data
  let [data, setData] = useState([]);
  let [values, setValues] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  let token = useSelector(state => state.user.value.token);
  let email = useSelector(state => state.user.value.email);
  let userID = useSelector(state => state.user.value.ID);
  useEffect(() => {
    //Get token for jwt
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    //Fetch data from API
    axios.get('/api/trashcans', config).then(res => {
      setData(res.data.data);
    });
  }, []);
  //API call to register new trash can
  const requestRegisterTrashCan = e => {
    e.preventDefault();
    console.log(values);

    axios.post('/api/trashcan', {
      name: values.name,
      location: values.location,
      userid: JSON.stringify(userID),
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  };

  //update values according to inputs
  const formChangeHandler = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  return (
    <>
      <Flex mb="1rem">
        <Spacer />
        <Button onClick={onOpen}>
          <AddIcon />
        </Button>
      </Flex>
      {/* {JSON.stringify(data)} */}
      <DataTable columns={columns} data={data} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Trash Can</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={requestRegisterTrashCan}>
              <VStack>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    values={values.name}
                    onChange={formChangeHandler('name')}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    id="location"
                    type="text"
                    values={values.location}
                    onChange={formChangeHandler('location')}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>User</FormLabel>
                  <Input isDisabled value={email} />
                </FormControl>
              </VStack>
              <Button
                colorScheme="blue"
                width="full"
                mt="2rem"
                mb="1rem"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TrashCan;
