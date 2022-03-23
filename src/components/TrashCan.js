import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
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
  Text,
} from '@chakra-ui/react';

function TrashCan() {
  //Init data
  let [data, setData] = useState([]);
  let [values, setValues] = useState({
    mode: '',
    id: '',
    name: '',
    location: '',
  });

  //Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Get state from redux
  let token = useSelector(state => state.user.value.token);
  let email = useSelector(state => state.user.value.email);
  let userID = useSelector(state => state.user.value.ID);

  //JWT stufss
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  /**
   * Initialize data table
   */
  useEffect(() => {
    //Fetch data from API
    axios.get('/api/trashcans', config).then(res => {
      setData(res.data.data);
    });
  }, []);

  //Helper function for refreshing data
  const getData = () => {
    axios.get('/api/trashcans', config).then(res => {
      setData(res.data.data);
    });
  };

  //API call to register & edit data
  const submitForm = e => {
    e.preventDefault();

    if (values.mode == 'add') {
      axios
        .post('/api/trashcan', {
          name: values.name,
          location: values.location,
          userid: JSON.stringify(userID),
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(() => {
          onClose();
          getData();
        });
    } else {
      axios
        .put('/api/trashcan/' + values.id, {
          name: values.name,
          location: values.location,
          userid: JSON.stringify(userID),
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then(() => {
          onClose();
          getData();
        });
    }
  };

  //update values according to inputs
  const formChangeHandler = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  /**
   * Modifying modal content
   */

  //For editing entry
  const editTrashCan = row => {
    onOpen();
    setValues({
      ...values,
      name: row.Name,
      location: row.Location,
      id: row.ID,
      mode: 'edit',
    });
  };

  //For adding entry
  const addTrashCan = () => {
    onOpen();
    setValues({ ...values, name: '', location: '', mode: 'add' });
  };

  /**
   * Delete entry
   */
  const deleteTrashCan = row => {
    axios.delete('/api/trashcan/' + row.ID).then(() => {
      getData();
    });
  };

  /**
   * RDT configs
   */
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
      name: 'Actions',
      button: true,
      cell: row => {
        return (
          <>
            <Button onClick={() => editTrashCan(row)} mr="1rem">
              <EditIcon />
            </Button>
            <Button onClick={() => deleteTrashCan(row)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Flex mb="1rem">
        <Text fontSize="xl">Trash Cans</Text>
        <Spacer />
        <Button onClick={() => addTrashCan()}>
          <AddIcon />
        </Button>
      </Flex>
      {/* {JSON.stringify(data)} */}
      <DataTable columns={columns} data={data} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          {values.mode == 'add' ? (
            <ModalHeader>Create Trash Can</ModalHeader>
          ) : (
            <ModalHeader>Edit Trash Can</ModalHeader>
          )}

          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={submitForm}>
              <VStack>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={formChangeHandler('name')}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    id="location"
                    type="text"
                    value={values.location}
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
