import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MockSeeProvider } from 'mocksee'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MockSeeProvider
      enabled={true}
      defaultVariant="border"
      theme={{ borderColor: '#8b5cf6' }}
    >
      <App />
    </MockSeeProvider>
  </StrictMode>,
)
