import Routes from './Routes.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserAuthContext, { authContext } from './utility/AuthContext';
import { useContext } from 'react';
function App() {
  const { isLoading } = useContext(authContext);
  return isLoading ? <>
    Wait While we set things up for you
  </> : (
    <>
      {/* <UserAuthContext> */}
      <Routes />
      <ToastContainer />
      {/* </UserAuthContext> */}
    </>
  )
}

export default App
