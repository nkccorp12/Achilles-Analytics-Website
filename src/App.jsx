import VariantGrid from './variants/VariantGrid'
import CoreEngine from './pages/CoreEngine'
import IntelStack from './pages/IntelStack'
import AICouncil from './pages/AICouncil'
import './App.css'

function App() {
  return (
    <div className="vg">
      <VariantGrid />
      <CoreEngine />
      <IntelStack />
      <AICouncil />
    </div>
  )
}

export default App
