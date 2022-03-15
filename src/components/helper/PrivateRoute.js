import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const PrivateRoute = () => {
  const auth = useSelector(state => state.user.token);

  return <div>{auth}</div>;
};

export default PrivateRoute;
