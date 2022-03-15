import PrivateRoute from './helper/PrivateRoute';
const Home = () => {
  return (
    <div>
      Home
      <PrivateRoute />
    </div>
  );
};

export default Home;
