import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alunos from './pages/Alunos.jsx';
import Professores from './pages/Professores.jsx';
import Turmas from './pages/Turmas.jsx';
import Disciplinas from './pages/Disciplinas.jsx';
import Tarefas from './pages/Tarefas.jsx';
import Perfis from './pages/Perfis.jsx';
import Layout from './components/Layout.jsx';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="alunos" element={<Alunos />} />
          <Route path="professores" element={<Professores />} />
          <Route path="turmas" element={<Turmas />} />
          <Route path="disciplinas" element={<Disciplinas />} />
          <Route path="tarefas" element={<Tarefas />} />
          <Route path="perfis" element={<Perfis />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
