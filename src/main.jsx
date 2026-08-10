import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './AppV2.jsx'
import ComingSoon from './ComingSoon.jsx'
import { showComingSoon } from './config.js'

const Root = showComingSoon() ? ComingSoon : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
