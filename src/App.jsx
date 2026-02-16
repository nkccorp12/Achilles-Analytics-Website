import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VariantGrid, { ArchitectureSection } from './variants/VariantGrid'
import CoreEngine from './pages/CoreEngine'
import UseCases from './pages/UseCases'
import IntelStack from './pages/IntelStack'
import AICouncil from './pages/AICouncil'
import './App.css'

const NeuPage = lazy(() => import('./pages/NeuPage'))

function LandingPage() {
  return (
    <div className="vg">
      <VariantGrid />
      <CoreEngine />
      <UseCases />
      <IntelStack />
      <AICouncil />
      <ArchitectureSection />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/neu" element={
          <Suspense fallback={<div style={{ background: '#000', width: '100vw', height: '100vh' }} />}>
            <NeuPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
