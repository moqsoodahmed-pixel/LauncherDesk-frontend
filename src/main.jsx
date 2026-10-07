import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { activateWorkspaceStyles, workspaceForPath } from './styles/workspaceStyles'
import App from './App.jsx'

// Apply the right workspace stylesheet before the first paint (no flash of the wrong design);
// App keeps it in sync on every route change.
activateWorkspaceStyles(workspaceForPath(window.location.pathname))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)