import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Login } from './pages/Login';
import { Produtos } from './pages/Produtos';
import { Detalhes } from './pages/Detalhes';
import { Carrinho } from './pages/Carrinho';
import { Checkout } from './pages/Checkout';
import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { useTheme } from './contexts/ThemeContext';

function RotaProtegida({ children }) {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!usuario){
          navigate("/login");
        }
    }, [usuario, navigate]);

    if (!usuario) return null;
    return children;
}

function App() {    
  const {temaClaro} = useTheme();
  useEffect(() => {
  document.body.className = temaClaro ? "" : "dark";
}, [temaClaro]);

  return (
    <div className={temaClaro ? "app" : "app dark"}>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/produtos" element={<Produtos/>} />
      <Route path="/produtos/:id" element={<Detalhes/>} />
      <Route path="/carrinho" element={<Carrinho/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/checkout" element={
          <RotaProtegida>
              <Checkout />
          </RotaProtegida>
          } 
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
    </div>
  )
}

export default App