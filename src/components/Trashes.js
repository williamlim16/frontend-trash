import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Text,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  submitForm,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
const Trashes = () => {
  let [data, setData] = useState([]);
  let [values, setValues] = useState({});
  let [file, setFile] = useState(null);

  let token = useSelector(state => state.user.value.token);
  let email = useSelector(state => state.user.value.email);

  //Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  //JWT stufss
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  //Initialize data
  useEffect(() => {
    axios.get('/api/trash', config).then(res => {
      setData(res.data.data);
    });
  }, []);

  //Get data
  const getData = () => {
    axios.get('/api/trash', config).then(res => {
      setData(res.data.data);
    });
  };

  //update values according to inputs
  const formChangeHandler = name => e => {
    setValues({ ...values, [name]: e.target.value });

    // if (name === 'image') {
    //   setValues({ ...values, [name]: e.target.value.files[0] });
    //   console.log('hello');
    // }
  };

  const imageFormHandler = e => {
    setFile(e.target.files[0]);
  };

  /**
   * Modifying modal content
   */
  const editTrash = row => {
    onOpen();
    setValues({
      ...values,
      classified: row.classified,
      trashcanid: row.trashcanid,
      image: row.image,
      mode: 'edit',
    });
  };

  const addTrash = () => {
    onOpen();
    setValues({
      ...values,
      classified: '',
      trashcanid: '',
      mode: 'add',
    });
  };

  const submitForm = e => {
    e.preventDefault();
    let formData = new FormData();

    if (values.mode == 'add') {
      formData.append('classified', values.classified);
      formData.append('trashcanid', values.trashcanid);
      formData.append('image', file);

      fetch('/api/trash', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
        },
        body: formData,
      });

      onClose();
      // getData();
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      maxWidth: '20px',
    },
    {
      name: 'Classified',
      selector: row => row.classified,
    },
    {
      name: 'Trash Can ID',
      selector: row => row.trashcanid,
    },
    {
      name: 'Image',
      cell: row => {
        return <img height="10px" src={'https://picsum.com/200'} />;
      },
    },

    {
      name: 'Actions',
      button: true,
      cell: row => {
        return (
          <>
            <Button mr="1rem" onClick={() => editTrash(row)}>
              <EditIcon />
            </Button>

            <Button>
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
        <Text fontSize="xl">Trashes</Text>
        <Spacer />
        <Button onClick={() => addTrash()}>
          <AddIcon />
        </Button>
      </Flex>
      <DataTable columns={columns} data={data} />
      <img src={'localhost:3001/images/22test.png'} />
      {JSON.stringify(values)}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          {values.mode == 'add' ? (
            <ModalHeader>Create Trash</ModalHeader>
          ) : (
            <ModalHeader>Edit Trash</ModalHeader>
          )}

          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={submitForm}>
              <VStack>
                <FormControl>
                  <FormLabel htmlFor="classified">Classified</FormLabel>
                  <Input
                    id="classified"
                    type="text"
                    value={values.classified}
                    onChange={formChangeHandler('classified')}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Trash Can ID</FormLabel>
                  <Input
                    id="location"
                    type="text"
                    value={values.trashcanid}
                    onChange={formChangeHandler('trashcanid')}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Image</FormLabel>
                  <input type="file" name="image" onChange={imageFormHandler} />
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
};

export default Trashes;
