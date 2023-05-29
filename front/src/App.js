import Navbar from "./components/navbar"
import Alquileres from "./alquileres/alquileres";
import Videojuegos from "./videojuegos/videojuegos";
import Usuarios from "./usuarios/usuarios";
import 'bootswatch/dist/lux/bootstrap.min.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path='/usuarios' element={<Usuarios />} />
        <Route path="/alquileres" element={<Alquileres />} />
        <Route path="/" element={<Videojuegos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
