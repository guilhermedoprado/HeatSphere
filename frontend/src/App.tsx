import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Modules from './pages/Modules'
import ModuleHub from './pages/ModuleHub'
import Notes from './features/notes/Notes'
import NoteView from './features/notes/NoteView'
import { ShellTubeRating } from './features/heat-exchangers/tools/ShellTubeRating'
import { CylinderFlowCalculator } from './features/external-flow/tools/CylinderFlow'

function App() {
  return (
    <Routes>
      {/* --- HOMEPAGE --- */}
      <Route path="/" element={<Home />} />

      {/* --- MODULES (catalog) --- */}
      <Route path="/modules" element={<Modules />} />
      
      {/* MODULE HUB (modules/internal-flow) */}
      <Route path="/modules/:slug" element={<ModuleHub />} />

      {/* --- TOOLS --- */}
      <Route path="/modules/heat-exchangers/tool/case-study/shell-tube-rating" element={<ShellTubeRating />} />
      <Route path="/modules/external-flow/tool/solver/cylinder-flow" element={<CylinderFlowCalculator />} />

      {/* --- NOTES & FORMULARY --- */}
      <Route path="/modules/:slug/:category" element={<NoteView />} />

      {/* MY NOTES */}
      <Route path="/my-notes" element={<Notes />} />
    </Routes>
  )
}

export default App
