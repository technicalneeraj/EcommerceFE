import { ToastContainer } from "react-toastify";
import { authContext } from "./utility/AuthContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./route/Routes";
import LoaderModal from "./components/modals/LoaderModal";

function App() {
  const { isLoading } = useContext(authContext);

  return isLoading ?
  (
    <LoaderModal isOpen={isLoading} text={"Wait for a second.."} />
  ) : 
  (
    <>
      <Routes />
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
