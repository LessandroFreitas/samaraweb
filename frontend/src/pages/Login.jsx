import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Tenta até 3 vezes com 3 segundos de intervalo (Render pode estar acordando)
    for (let tentativa = 1; tentativa <= 3; tentativa++) {
      try {
        const res = await api.post('/login', form);
        localStorage.setItem('token', res.data.token);
        navigate('/');
        return; // deu certo, sai da função
      } catch (err) {
        // Se for erro de usuário/senha (401), não tenta de novo
        if (err.response?.status === 401) {
          setError('Usuário ou senha inválidos.');
          setLoading(false);
          return;
        }
        // Se for última tentativa, mostra erro
        if (tentativa === 3) {
          setError('Servidor demorou para responder. Aguarde 10 segundos e tente de novo.');
          setLoading(false);
          return;
        }
        // Aguarda 3 segundos antes da próxima tentativa
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-card">
        <div className="login-logo">
          <h1>EduManager</h1>
          <p>Sistema de Gerenciamento Escolar</p>
        </div>

        <div className="login-demo">
          <strong>Demo:</strong> usuário: admin / senha: admin
        </div>

        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Usuário</label>
            <input
              className="form-input"
              type="text"
              placeholder="Digite o usuário"
              value={form.usuario}
              onChange={e => setForm({ ...form, usuario: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              className="form-input"
              type="password"
              placeholder="Digite a senha"
              value={form.senha}
              onChange={e => setForm({ ...form, senha: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
          >
            {loading ? (
              <><span className="spinner" style={{ width: 16, height: 16 }} /> Entrando...</>
            ) : (
              '🔑 Entrar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
