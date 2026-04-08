import { useState, useEffect } from 'react';
import api from '../services/api.js';

/**
 * CrudPage — componente genérico de CRUD
 * Props:
 *   title, icon, endpoint, fields, columns, emptyMessage
 *   fields: [{ name, label, type, required, min, max, placeholder }]
 *   columns: [{ key, label, render? }]
 */
export default function CrudPage({ title, icon, endpoint, fields, columns, emptyMessage }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modal, setModal] = useState(null); // null | 'create' | 'edit'
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  function emptyForm() {
    return fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  }

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [endpoint]);

  function openCreate() {
    setForm(emptyForm());
    setEditing(null);
    setModal('form');
    setError('');
  }

  function openEdit(item) {
    setForm({ ...emptyForm(), ...item });
    setEditing(item._id);
    setModal('form');
    setError('');
  }

  function closeModal() {
    setModal(null);
    setEditing(null);
    setForm({});
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
      // Remove campos vazios que não são obrigatórios
      const payload = Object.fromEntries(
        Object.entries(form).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
      );
      if (editing) {
        await api.put(`${endpoint}/${editing}`, payload);
        showSuccess('✅ Atualizado com sucesso!');
      } else {
        await api.post(endpoint, payload);
        showSuccess('✅ Criado com sucesso!');
      }
      closeModal();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar. Verifique os campos.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    setDeleting(id);
    try {
      await api.delete(`${endpoint}/${id}`);
      showSuccess('🗑️ Excluído com sucesso!');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir.');
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          <span className="icon">{icon}</span> {title}
        </h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + Novo {title.slice(0, -1)}
        </button>
      </div>

      {success && <div className="alert alert-success">{success}</div>}
      {error && !modal && <div className="alert alert-error">❌ {error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          Carregando...
        </div>
      ) : data.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <span className="empty-icon">{icon}</span>
            <p>{emptyMessage || `Nenhum(a) ${title.toLowerCase()} cadastrado(a) ainda.`}</p>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={openCreate}>
              + Cadastrar primeiro
            </button>
          </div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map(c => <th key={c.key}>{c.label}</th>)}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id}>
                  {columns.map(c => (
                    <td key={c.key}>
                      {c.render ? c.render(item) : (item[c.key] ?? '—')}
                    </td>
                  ))}
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => openEdit(item)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                        disabled={deleting === item._id}
                      >
                        {deleting === item._id ? '...' : '🗑️'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total */}
      {!loading && data.length > 0 && (
        <p style={{ color: 'var(--text3)', fontSize: 12, marginTop: 12, fontFamily: 'Space Mono, monospace' }}>
          {data.length} registro{data.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Modal */}
      {modal === 'form' && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {editing ? `✏️ Editar ${title.slice(0, -1)}` : `+ Novo ${title.slice(0, -1)}`}
              </h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            {error && <div className="alert alert-error">❌ {error}</div>}

            <form onSubmit={handleSubmit}>
              {fields.map(field => (
                <div className="form-group" key={field.name}>
                  <label className="form-label">
                    {field.label}
                    {field.required && <span style={{ color: 'var(--danger)' }}> *</span>}
                  </label>
                  {field.type === 'checkbox' ? (
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!form[field.name]}
                        onChange={e => setForm({ ...form, [field.name]: e.target.checked })}
                        style={{ width: 16, height: 16, accentColor: 'var(--accent)' }}
                      />
                      <span style={{ color: 'var(--text2)', fontSize: 14 }}>{field.checkLabel || 'Sim'}</span>
                    </label>
                  ) : (
                    <input
                      className="form-input"
                      type={field.type || 'text'}
                      placeholder={field.placeholder || ''}
                      value={form[field.name] ?? ''}
                      onChange={e => setForm({ ...form, [field.name]: e.target.value })}
                      required={field.required}
                      min={field.min}
                      max={field.max}
                    />
                  )}
                </div>
              ))}

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={closeModal}>
                  Cancelar
                </button>
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
