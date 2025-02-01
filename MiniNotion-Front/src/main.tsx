import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/:pageID" element={<App />}/>
      </Routes>
    </Router>
  </StrictMode>,
)
