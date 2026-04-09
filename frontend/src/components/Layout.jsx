import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊', exact: true },
  { to: '/alunos', label: 'Alunos', icon: '🎓' },
  { to: '/professores', label: 'Professores', icon: '👨‍🏫' },
  { to: '/turmas', label: 'Turmas', icon: '🏫' },
  { to: '/disciplinas', label: 'Disciplinas', icon: '📚' },
  { to: '/tarefas', label: 'Tarefas', icon: '✅' },
  { to: '/perfis', label: 'Perfis', icon: '👤' },
];

export default function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tokenWarning, setTokenWarning] = useState(false);

  // Avisa quando o token tá perto de expirar (1 min = 60s, avisa com 10s de antecedência)
  useEffect(() => {
    const checkToken = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const remaining = payload.exp * 1000 - Date.now();
        if (remaining < 60000 && remaining > 0) {
          setTokenWarning(true);
        } else if (remaining <= 0) {
          setTokenWarning(false);
        }
      } catch { }
    }, 3000);
    return () => clearInterval(checkToken);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="layout">
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h1>EduManager</h1>
          <span>// sistema escolar</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">Navegação</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {tokenWarning && (
        <div className="token-warning">
          ⚠️ Sessão expirando em breve! Salve seu trabalho.
        </div>
      )}

      {/* Fecha sidebar ao clicar fora no mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(0,0,0,0.5)'
          }}
        />
      )}
    </div>
  );
}
