import Routes from './Routes.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  { authContext } from './utility/AuthContext';
import { useContext } from 'react';
function App() {
  const { isLoading } = useContext(authContext);
  return isLoading ? <>
    Wait While we set things up for you
  </> : (
    <>
      <Routes />
      <ToastContainer autoClose={2000}/>
    </>
  )
}

export default App
