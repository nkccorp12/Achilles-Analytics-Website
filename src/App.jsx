import { lazy, Suspense } from 'react'
import NewPage from './pages/NewPage'
import './pages/LandingPage.css'
import './pages/NewPage.css'
import './App.css'

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const AICouncilPage = lazy(() => import('./pages/AICouncilPage'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Testing2 = lazy(() => import('./pages/Testing2'))
const Testing2A = lazy(() => import('./pages/Testing2A'))
const Testing2B = lazy(() => import('./pages/Testing2B'))
const Testing2C = lazy(() => import('./pages/Testing2C'))
const HeroTestIndex = lazy(() => import('./pages/HeroTestIndex'))
const HeroTestBoot = lazy(() => import('./pages/HeroTestBoot'))
const HeroTestBeam = lazy(() => import('./pages/HeroTestBeam'))
const HeroTestGlitch = lazy(() => import('./pages/HeroTestGlitch'))
const HeroTestThreat = lazy(() => import('./pages/HeroTestThreat'))
const HeroTestRadar = lazy(() => import('./pages/HeroTestRadar'))

function App() {
  const path = window.location.pathname;
  if (path === '/privacy') return <Suspense fallback={null}><PrivacyPolicy /></Suspense>
  if (path === '/terms') return <Suspense fallback={null}><TermsOfService /></Suspense>
  if (path === '/about') return <Suspense fallback={null}><AboutPage /></Suspense>
  if (path === '/council' || path === '/ai-council') return <Suspense fallback={null}><AICouncilPage /></Suspense>
  if (path === '/old' || path === '/legacy') return <Suspense fallback={null}><LandingPage /></Suspense>
  if (path === '/testing2') return <Suspense fallback={null}><Testing2 /></Suspense>
  if (path === '/testing2-a') return <Suspense fallback={null}><Testing2A /></Suspense>
  if (path === '/testing2-b') return <Suspense fallback={null}><Testing2B /></Suspense>
  if (path === '/testing2-c') return <Suspense fallback={null}><Testing2C /></Suspense>
  if (path === '/hero-test') return <Suspense fallback={null}><HeroTestIndex /></Suspense>
  if (path === '/hero-test-boot') return <Suspense fallback={null}><HeroTestBoot /></Suspense>
  if (path === '/hero-test-beam') return <Suspense fallback={null}><HeroTestBeam /></Suspense>
  if (path === '/hero-test-glitch') return <Suspense fallback={null}><HeroTestGlitch /></Suspense>
  if (path === '/hero-test-threat') return <Suspense fallback={null}><HeroTestThreat /></Suspense>
  if (path === '/hero-test-radar') return <Suspense fallback={null}><HeroTestRadar /></Suspense>
  // Default: new home page (also handles /new)
  return <NewPage />
}

export default App
