import { useState } from 'react';
import RegisterLoginLay from './layout/RegisterLoginLay';
import {
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Link,
  HStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();

  //Init values
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  //update values according to inputs
  const formChangeHandler = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  //API Call to login
  const requestRegister = e => {
    e.preventDefault();

    axios
      .post('/api/register', {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        phone: values.phone,
      })
      .then(res => {
        navigate('/login');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <RegisterLoginLay>
      <VStack spacing={10} align="stretch">
        <Box>
          <Text fontSize="6xl">Register</Text>
        </Box>
        <form onSubmit={requestRegister}>
          <VStack>
            <HStack width="full">
              <FormControl>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  id="first_name"
                  type="text"
                  value={values.first_name}
                  onChange={formChangeHandler('first_name')}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input
                  id="last_name"
                  type="text"
                  value={values.last_name}
                  onChange={formChangeHandler('last_name')}
                />
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={formChangeHandler('email')}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phone">Phone</FormLabel>
              <Input
                id="phone"
                type="phone"
                value={values.phone}
                onChange={formChangeHandler('phone')}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={values.password}
                onChange={formChangeHandler('password')}
              />
            </FormControl>
          </VStack>
          <Button colorScheme="blue" width="full" mt="50px" type="submit">
            Register
          </Button>
        </form>
        <Text>
          Already have an account? <Link href="/login">Login here</Link>{' '}
        </Text>
      </VStack>
    </RegisterLoginLay>
  );
};

export default Register;
