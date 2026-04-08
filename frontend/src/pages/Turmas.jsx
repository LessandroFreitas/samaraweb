import { useState, useEffect } from 'react';
import api from '../services/api.js';

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nome: '' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/turma');
      setTurmas(res.data);
    } catch (err) {
      setError('Erro ao carregar turmas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm({ nome: '' });
    setEditing(null);
    setModal(true);
    setError('');
  }

  function openEdit(item) {
    setForm({ nome: item.nome });
    setEditing(item._id);
    setModal(true);
    setError('');
  }

  function closeModal() {
    setModal(false);
    setEditing(null);
    setForm({ nome: '' });
    setError('');
  }

  function showSuccess(msg) {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await api.put(`/turma/${editing}`, form);
        showSuccess('✅ Turma atualizada!');
      } else {
        await api.post('/turma', form);
        showSuccess('✅ Turma criada!');
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Excluir esta turma?')) return;
    setDeleting(id);
    try {
      await api.delete(`/turma/${id}`);
      showSuccess('🗑️ Turma excluída!');
      load();
    } catch (err) {
      setError('Erro ao excluir turma.');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title"><span className="icon">🏫</span> Turmas</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Nova Turma</button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && !modal && <div className="alert alert-error">❌ {error}</div>}

      {loading ? (
        <div className="loading"><div className="spinner" /> Carregando...</div>
      ) : turmas.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <span className="empty-icon">🏫</span>
            <p>Nenhuma turma cadastrada ainda.</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openCreate}>
              + Criar primeira turma
            </button>
          </div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Alunos</th>
                <th>Professor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map(t => (
                <tr key={t._id}>
                  <td style={{ fontWeight: 600, color: 'var(--text)' }}>{t.nome}</td>
                  <td>
                    {t.alunos?.length > 0
                      ? <span className="badge badge-purple">{t.alunos.length} aluno{t.alunos.length !== 1 ? 's' : ''}</span>
                      : <span style={{ color: 'var(--text3)' }}>Sem alunos</span>
                    }
                  </td>
                  <td>
                    {t.professor?.nome || (t.professor ? '(sem nome)' : <span style={{ color: 'var(--text3)' }}>Sem professor</span>)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(t)}>✏️ Editar</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(t._id)}
                        disabled={deleting === t._id}
                      >
                        {deleting === t._id ? '...' : '🗑️'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && turmas.length > 0 && (
        <p style={{ color: 'var(--text3)', fontSize: 12, marginTop: 12, fontFamily: 'Space Mono, monospace' }}>
          {turmas.length} turma{turmas.length !== 1 ? 's' : ''}
        </p>
      )}

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{editing ? '✏️ Editar Turma' : '+ Nova Turma'}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            {error && <div className="alert alert-error">❌ {error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nome da Turma <span style={{ color: 'var(--danger)' }}>*</span></label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ex: 3º Ano A"
                  value={form.nome}
                  onChange={e => setForm({ ...form, nome: e.target.value })}
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Salvando...' : (editing ? 'Salvar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
