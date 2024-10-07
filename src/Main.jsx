import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './Index.css'
import UserAuthContext from './utility/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <UserAuthContext>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </UserAuthContext>
)
