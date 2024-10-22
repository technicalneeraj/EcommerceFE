import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './Index.css'

import UserAuthContext from './utility/AuthContext.jsx'
import { CategoryProvider } from './utility/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(

  <UserAuthContext>
      <CategoryProvider>
        <App />
      </CategoryProvider>
  </UserAuthContext>

)
