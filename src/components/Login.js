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
} from '@chakra-ui/react';
import axios from 'axios';
import { login } from './helper/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatchUser = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

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
  const requestLogin = e => {
    e.preventDefault();

    axios
      .post('/api/login', {
        email: values.email,
        password: values.password,
      })
      .then(res => {
        dispatchUser(
          login({
            ID: res.data.user.id,
            email: res.data.user.Email,
            token: res.data.token,
          })
        );
        // navigate('/');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <RegisterLoginLay>
      <VStack spacing={10} align="stretch">
        <Box>
          <Text fontSize="6xl">Login</Text>
        </Box>
        <form onSubmit={requestLogin}>
          <VStack>
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
            Login
          </Button>
        </form>
        <Text>
          Don't have an account yet? <Link href="/register">Register here</Link>{' '}
        </Text>
        <Text>{token}</Text>
      </VStack>
    </RegisterLoginLay>
  );
};

export default Login;
