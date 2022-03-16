import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = useSelector(state => state.user.value.token);

  if (auth == '') {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
