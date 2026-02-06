import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Modules from './pages/Modules'
import IntroductionToConvection from './components/modules/IntroductionToConvection/IntroductionToConvection'
import ExternalFlow from './components/modules/ExternalFlow/ExternalFlow'
import InternalFlow from './components/modules/InternalFlow/InternalFlow'
import HeatExchangers from './components/modules/HeatExchangers/HeatExchangers'
import FreeConvection from './components/modules/FreeConvection/FreeConvection'
import Boiling from './components/modules/Boiling/Boiling'
import Condensation from './components/modules/Condensation/Condensation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/modules/introduction-to-convection" element={<IntroductionToConvection />} />
      <Route path="/modules/external-flow" element={<ExternalFlow />} />
      <Route path="/modules/internal-flow" element={<InternalFlow />} />
      <Route path="/modules/heat-exchangers" element={<HeatExchangers />} />
      <Route path="/modules/free-convection" element={<FreeConvection />} />
      <Route path="/modules/boiling" element={<Boiling />} />
      <Route path="/modules/condensation" element={<Condensation />} />
    </Routes>
  )
}

export default App
