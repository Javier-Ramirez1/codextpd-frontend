import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Clientes from './pages/Clientes'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/clientes' element={<Clientes />} />
    </Routes>
  )
}

export default App