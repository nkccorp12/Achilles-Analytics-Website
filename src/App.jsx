import { lazy, Suspense } from 'react'
import LandingPage from './pages/LandingPage'
import './pages/LandingPage.css'
import './App.css'

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))

function App() {
  const path = window.location.pathname;
  if (path === '/privacy') return <Suspense fallback={null}><PrivacyPolicy /></Suspense>
  if (path === '/terms') return <Suspense fallback={null}><TermsOfService /></Suspense>
  return <LandingPage />
}

export default App
