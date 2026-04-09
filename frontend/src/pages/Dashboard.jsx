import { useState, useEffect } from 'react';
import api from '../services/api.js';

const stats = [
  { key: 'alunos', label: 'Alunos', icon: '🎓', url: '/aluno', color: '#6c63ff' },
  { key: 'professores', label: 'Professores', icon: '👨‍🏫', url: '/professor', color: '#ff6584' },
  { key: 'turmas', label: 'Turmas', icon: '🏫', url: '/turma', color: '#43e97b' },
  { key: 'disciplinas', label: 'Disciplinas', icon: '📚', url: '/disciplina', color: '#ffd166' },
  { key: 'tarefas', label: 'Tarefas', icon: '✅', url: '/tarefa', color: '#06d6a0' },
  { key: 'perfis', label: 'Perfis', icon: '👤', url: '/perfil', color: '#118ab2' },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(tentativa = 1) {
      const results = await Promise.allSettled(
        stats.map(s => api.get(s.url).then(r => ({ key: s.key, count: r.data.length })))
      );

      const data = {};
      let algumErro = false;

      results.forEach(r => {
        if (r.status === 'fulfilled') {
          data[r.value.key] = r.value.count;
        } else {
          algumErro = true;
        }
      });

      // Se deu erro e ainda tem tentativas, tenta de novo em 3 segundos
      if (algumErro && tentativa < 4) {
        setTimeout(() => load(tentativa + 1), 3000);
        return;
      }

      // Preenche os que falharam com '—'
      stats.forEach(s => {
        if (data[s.key] === undefined) data[s.key] = '—';
      });

      setCounts(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <span className="icon">📊</span> Dashboard
        </h1>
        <span style={{ color: 'var(--text3)', fontSize: 13, fontFamily: 'Space Mono, monospace' }}>
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.key}>
            <span className="stat-icon">{s.icon}</span>
            <div className="stat-value" style={{ color: s.color }}>
              {loading ? '...' : (counts[s.key] ?? '—')}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text2)' }}>
          🚀 Como usar
        </h2>
        <p style={{ color: 'var(--text3)', fontSize: 13, lineHeight: 1.8 }}>
          Use o menu lateral para navegar entre os módulos do sistema. Você pode cadastrar, editar e remover
          alunos, professores, turmas, disciplinas, tarefas e perfis.
          <br /><br />
          <strong style={{ color: 'var(--text2)' }}>Atenção:</strong> A sessão expira em <strong style={{ color: 'var(--warning)' }}>1 hora</strong> após o login.
          Ao expirar, você será redirecionado automaticamente para o login.
        </p>
      </div>
    </div>
  );
}
