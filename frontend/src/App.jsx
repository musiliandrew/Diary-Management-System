import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Receipt from './pages/Receipt'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receipt/:productId" element={<Receipt />} />
      </Routes>
    </div>
  )
}

export default App