import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Personajes from './Personajes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Personajes />
  </StrictMode>,
)
