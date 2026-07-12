import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Login } from './pages/Login'
import { Produtos } from './pages/Produtos'
import { Detalhes } from './pages/Detalhes'
import { Carrinho } from './pages/Carrinho'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/produtos" element={<Produtos/>} />
      <Route path="/produtos/:id" element={<Detalhes/>} />
      <Route path="/carrinho" element={<Carrinho/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/checkout" element={<h1>Checkout</h1>} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
    </>
  )
}

export default App