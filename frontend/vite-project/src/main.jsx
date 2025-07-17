import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import store from './Components/redux/store'
const container=document.getElementById('root')
ReactDOM.createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
    <App /></Provider>
    <Toaster/>
  </StrictMode>,
)
